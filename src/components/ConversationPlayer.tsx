import React, { useState, useEffect, useRef } from 'react';
import { EntertainmentConversation, DialogueLine, VocabWord } from '../types';
import { speakWord, stopSpeech, playAudioFeedback } from '../utils/audio';
import { loadYouTubeAPI, YouTubePlayerInstance } from '../utils/youtubePlayer';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  BookmarkPlus, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ChevronRight, 
  MessageSquare, 
  UserCheck, 
  Sparkles, 
  ArrowLeft,
  BookOpen,
  VolumeX,
  Sliders,
  Mic,
  MicOff,
  RefreshCw,
  Headphones,
  Repeat,
  Check,
  Globe
} from 'lucide-react';

interface ConversationPlayerProps {
  conversation: EntertainmentConversation;
  onBack: () => void;
  onSaveWordToSRS: (word: Partial<VocabWord>) => void;
  onShowToast: (msg: string) => void;
}

export const ConversationPlayer: React.FC<ConversationPlayerProps> = ({
  conversation,
  onBack,
  onSaveWordToSRS,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'roleplay'>('study');
  const [subtitleMode, setSubtitleMode] = useState<'bilingual' | 'english' | 'vietnamese'>('bilingual');
  
  // YouTube IFrame Player & sync state
  const ytPlayerRef = useRef<YouTubePlayerInstance | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(310);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  
  // Precision snippet playback (like SongKaraokePlayer)
  const snippetStopRef = useRef<number | null>(null);
  const snippetSeekInitiatedRef = useRef<number>(0);
  const [playingSnippetLineId, setPlayingSnippetLineId] = useState<string | null>(null);
  const [loopCurrentSnippet, setLoopCurrentSnippet] = useState(false);
  const loopSnippetRef = useRef(false);
  loopSnippetRef.current = loopCurrentSnippet;

  // Active dialogue index & line
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number>(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const dialogueContainerRef = useRef<HTMLDivElement | null>(null);
  const activeDialogueLineRef = useRef<HTMLDivElement | null>(null);

  // Role-play state
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(1); // Default to second role
  const userRole = conversation.roles[selectedRoleIndex] || conversation.roles[0];
  const partnerRole = conversation.roles[selectedRoleIndex === 0 ? 1 : 0] || conversation.roles[0];

  const [roleplayStep, setRoleplayStep] = useState<number>(0);
  const [userInputText, setUserInputText] = useState('');
  const [turnStatus, setTurnStatus] = useState<'waiting_user' | 'waiting_partner' | 'correct' | 'incorrect' | 'completed'>('waiting_partner');
  const [showHint, setShowHint] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [speechMatchRatio, setSpeechMatchRatio] = useState<number | null>(null);
  const [autoPlayPartnerVideo, setAutoPlayPartnerVideo] = useState(true);

  const speechRecognitionRef = useRef<any>(null);
  const isPartnerPlayingRef = useRef<boolean>(false);

  // Parse duration string into seconds helper
  const parseDuration = (durStr?: string): number => {
    if (!durStr) return 310;
    const parts = durStr.split(':').map(p => parseInt(p, 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    return 310;
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Clean text helper
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Calculate similarity between two phrases
  const calculateMatchRatio = (userInput: string, targetInput: string): number => {
    const cleanUser = normalizeText(userInput);
    const cleanTarget = normalizeText(targetInput);
    if (!cleanUser || !cleanTarget) return 0;
    if (cleanUser === cleanTarget) return 1;

    const userWords = cleanUser.split(' ');
    const targetWords = cleanTarget.split(' ');
    let matches = 0;
    targetWords.forEach(w => {
      if (userWords.includes(w)) matches++;
    });
    return matches / targetWords.length;
  };

  // Initialize YouTube Player
  useEffect(() => {
    let isMounted = true;
    if (!conversation.youtubeId) return;

    loadYouTubeAPI().then((YT) => {
      if (!isMounted) return;
      const containerId = `yt-conv-shared-player`;

      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
        ytPlayerRef.current = null;
      }

      setTimeout(() => {
        if (!isMounted || !document.getElementById(containerId)) return;
        try {
          const player = new YT.Player(containerId, {
            videoId: conversation.youtubeId,
            playerVars: {
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              enablejsapi: 1,
              origin: window.location.origin,
            },
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                ytPlayerRef.current = event.target;
                const dur = event.target.getDuration();
                if (dur && dur > 0) {
                  setVideoDuration(dur);
                } else {
                  setVideoDuration(parseDuration(conversation.duration));
                }
                event.target.setPlaybackRate(playbackSpeed);
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                // 1 = playing, 2 = paused, 0 = ended
                if (event.data === 1) {
                  setIsPlayingVideo(true);
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlayingVideo(false);
                }
              },
            },
          });
        } catch (err) {
          console.error('Failed to init YouTube player:', err);
        }
      }, 150);
    });

    return () => {
      isMounted = false;
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
        ytPlayerRef.current = null;
      }
    };
  }, [conversation.id, conversation.youtubeId]);

  // High precision polling tracker (every 100ms like SongKaraokePlayer)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!ytPlayerRef.current) return;
      try {
        if (typeof ytPlayerRef.current.getPlayerState === 'function') {
          const playerState = ytPlayerRef.current.getPlayerState();
          
          if (playerState === 1) {
            setIsPlayingVideo(true);
            const t = ytPlayerRef.current.getCurrentTime();
            if (typeof t === 'number' && !isNaN(t)) {
              setCurrentTime(t);

              // Check snippet stop
              const isSeekingJustStarted = Date.now() - snippetSeekInitiatedRef.current < 450;
              if (!isSeekingJustStarted && snippetStopRef.current !== null && t >= snippetStopRef.current - 0.05) {
                if (loopSnippetRef.current && playingSnippetLineId) {
                  const targetLine = conversation.dialogue.find(d => d.id === playingSnippetLineId);
                  if (targetLine && targetLine.timestampStart !== undefined) {
                    snippetSeekInitiatedRef.current = Date.now();
                    ytPlayerRef.current.seekTo(targetLine.timestampStart, true);
                    return;
                  }
                }

                // Stop video
                if (typeof ytPlayerRef.current.pauseVideo === 'function') {
                  ytPlayerRef.current.pauseVideo();
                }
                setIsPlayingVideo(false);
                snippetStopRef.current = null;
                setPlayingSnippetLineId(null);

                // If in roleplay mode and partner just finished speaking
                if (isPartnerPlayingRef.current) {
                  isPartnerPlayingRef.current = false;
                  setTurnStatus('waiting_user');
                }
              }

              // Update active subtitle matching current time in dialogue
              const matchedIdx = conversation.dialogue.findIndex((d) => {
                const start = d.timestampStart ?? 0;
                const end = d.timestampEnd ?? (start + 4);
                return t >= start && t < end;
              });

              if (matchedIdx !== -1 && matchedIdx !== currentPlayingIndex) {
                setCurrentPlayingIndex(matchedIdx);
              }
            }
          } else if (playerState === 2) {
            setIsPlayingVideo(false);
            const t = ytPlayerRef.current.getCurrentTime();
            if (typeof t === 'number' && !isNaN(t)) {
              setCurrentTime(t);
            }
          } else if (playerState === 0) {
            setIsPlayingVideo(false);
            setCurrentTime(videoDuration);
          }
        }
      } catch {
        // ignore
      }
    }, 100);

    return () => clearInterval(interval);
  }, [conversation.dialogue, currentPlayingIndex, videoDuration, playingSnippetLineId]);

  // Smooth auto-scroll to active subtitle
  useEffect(() => {
    if (autoScrollEnabled && activeDialogueLineRef.current && dialogueContainerRef.current) {
      activeDialogueLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentPlayingIndex, autoScrollEnabled, activeTab]);

  // Play exact snippet for a dialogue line
  const handlePlaySnippet = (line: DialogueLine, loop: boolean = false) => {
    stopSpeech();
    const lineIndex = conversation.dialogue.findIndex(d => d.id === line.id);
    if (lineIndex !== -1) setCurrentPlayingIndex(lineIndex);

    if (line.timestampStart !== undefined && line.timestampEnd !== undefined && ytPlayerRef.current) {
      setLoopCurrentSnippet(loop);
      snippetStopRef.current = line.timestampEnd;
      snippetSeekInitiatedRef.current = Date.now();
      setPlayingSnippetLineId(line.id);

      try {
        ytPlayerRef.current.seekTo(line.timestampStart, true);
        ytPlayerRef.current.playVideo();
        setIsPlayingVideo(true);
      } catch (e) {
        console.error('Error seeking snippet:', e);
      }
    } else {
      // Fallback TTS
      setPlayingSnippetLineId(line.id);
      speakWord(line.english, undefined, () => {
        setPlayingSnippetLineId(null);
      });
    }
  };

  // Master Play/Pause full video
  const handleToggleFullPlay = () => {
    stopSpeech();
    if (ytPlayerRef.current) {
      if (isPlayingVideo) {
        ytPlayerRef.current.pauseVideo();
        setIsPlayingVideo(false);
      } else {
        snippetStopRef.current = null;
        setPlayingSnippetLineId(null);
        ytPlayerRef.current.playVideo();
        setIsPlayingVideo(true);
      }
    } else {
      // TTS playback fallback
      if (isPlayingVideo) {
        stopSpeech();
        setIsPlayingVideo(false);
      } else {
        setIsPlayingVideo(true);
        speakWord(conversation.dialogue[currentPlayingIndex]?.english || '', undefined, () => {
          setIsPlayingVideo(false);
        });
      }
    }
  };

  // Playback speed toggle
  const handleSpeedChange = () => {
    const nextSpeed = playbackSpeed === 1 ? 0.75 : playbackSpeed === 0.75 ? 1.25 : 1;
    setPlaybackSpeed(nextSpeed);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setPlaybackRate === 'function') {
      ytPlayerRef.current.setPlaybackRate(nextSpeed);
    }
  };

  // Seek bar click handler
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    snippetStopRef.current = null;
    setPlayingSnippetLineId(null);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(newTime, true);
    }
  };

  // Jump to specific second
  const handleJumpSeconds = (delta: number) => {
    if (!ytPlayerRef.current) return;
    const target = Math.max(0, Math.min(videoDuration, currentTime + delta));
    snippetStopRef.current = null;
    setPlayingSnippetLineId(null);
    ytPlayerRef.current.seekTo(target, true);
  };

  // Reset dialogue to beginning
  const handleResetDialogue = () => {
    stopSpeech();
    snippetStopRef.current = null;
    setPlayingSnippetLineId(null);
    setCurrentPlayingIndex(0);
    if (ytPlayerRef.current) {
      ytPlayerRef.current.seekTo(0, true);
      ytPlayerRef.current.pauseVideo();
      setIsPlayingVideo(false);
    }
  };

  // ================= ROLEPLAY CONTROLS =================
  const currentDialogueLine: DialogueLine | undefined = conversation.dialogue[roleplayStep];
  const isUserTurn = currentDialogueLine && currentDialogueLine.speaker.toLowerCase().includes(userRole.name.split(' ')[0].toLowerCase());

  // Roleplay step monitor
  useEffect(() => {
    if (activeTab !== 'roleplay') return;
    if (roleplayStep >= conversation.dialogue.length) {
      setTurnStatus('completed');
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      playAudioFeedback('success');
      return;
    }

    const currentLine = conversation.dialogue[roleplayStep];
    if (!currentLine) return;

    const lineIsUser = currentLine.speaker.toLowerCase().includes(userRole.name.split(' ')[0].toLowerCase());

    if (!lineIsUser) {
      setTurnStatus('waiting_partner');
      isPartnerPlayingRef.current = true;

      // Auto-play partner voice from video if enabled
      if (autoPlayPartnerVideo) {
        const timer = setTimeout(() => {
          handlePlaySnippet(currentLine);
        }, 500);
        return () => clearTimeout(timer);
      }
    } else {
      setTurnStatus('waiting_user');
      setUserInputText('');
      setShowHint(false);
      setSpeechMatchRatio(null);
    }
  }, [roleplayStep, activeTab, selectedRoleIndex, autoPlayPartnerVideo]);

  // Speech Recognition (Mic)
  const handleToggleMic = () => {
    if (isListeningMic) {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {}
      }
      setIsListeningMic(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      onShowToast('Trình duyệt chưa hỗ trợ ghi âm trực tiếp. Bạn có thể gõ câu trả lời bằng bàn phím nhé!');
      return;
    }

    try {
      const recognition = new SpeechRec();
      speechRecognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListeningMic(true);
        onShowToast('🎙️ Đang lắng nghe... Hãy nói câu tiếng Anh của bạn!');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setUserInputText(transcript);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsListeningMic(false);
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      setIsListeningMic(false);
      onShowToast('Không thể bật microphone. Vui lòng cấp quyền micro cho trang web.');
    }
  };

  // Submit roleplay answer
  const handleCheckRoleplayAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentDialogueLine || turnStatus !== 'waiting_user') return;

    const ratio = calculateMatchRatio(userInputText, currentDialogueLine.english);
    setSpeechMatchRatio(Math.round(ratio * 100));

    if (ratio >= 0.65 || normalizeText(userInputText) === normalizeText(currentDialogueLine.english)) {
      setTurnStatus('correct');
      playAudioFeedback('correct');
      onShowToast('Chính xác! Phản xạ xuất sắc!');

      setTimeout(() => {
        setRoleplayStep(prev => prev + 1);
      }, 1500);
    } else {
      setTurnStatus('incorrect');
      playAudioFeedback('wrong');
      onShowToast('Gần đúng rồi! Hãy thử nói lại hoặc bấm nút nghe phát âm mẫu nhé.');
    }
  };

  // Reset roleplay
  const handleResetRoleplay = () => {
    stopSpeech();
    if (ytPlayerRef.current) {
      ytPlayerRef.current.pauseVideo();
    }
    setIsPlayingVideo(false);
    snippetStopRef.current = null;
    setPlayingSnippetLineId(null);
    setRoleplayStep(0);
    setUserInputText('');
    setTurnStatus('waiting_partner');
    setSpeechMatchRatio(null);
  };

  // Save Vocab to SRS
  const handleSaveVocab = (v: typeof conversation.keyVocabularies[0]) => {
    onSaveWordToSRS({
      word: v.word,
      phonetic: v.phonetic,
      partOfSpeech: v.partOfSpeech,
      vietnameseMeaning: v.vietnameseMeaning,
      englishDefinition: v.vietnameseMeaning,
      exampleSentence: v.exampleSentence,
      exampleVietnamese: v.exampleVietnamese,
      topic: conversation.categoryLabel,
      subtopic: conversation.vietnameseTitle,
      oxfordTier: v.oxfordTier || conversation.level,
      level: 1,
      dueStatus: 'due_today',
      dueText: 'Học ngay hôm nay',
      imageUrl: conversation.thumbnailUrl,
    });
    onShowToast(`Đã lưu "${v.word}" vào Sổ từ vựng & Hàng chờ ôn tập SRS!`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            stopSpeech();
            if (ytPlayerRef.current) {
              try { ytPlayerRef.current.pauseVideo(); } catch {}
            }
            onBack();
          }}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#3525cd] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách thư giãn</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
            conversation.level === 'A1' ? 'bg-emerald-100 text-emerald-800' :
            conversation.level === 'A2' ? 'bg-teal-100 text-teal-800' :
            conversation.level === 'B1' ? 'bg-indigo-100 text-indigo-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            Cấp độ {conversation.level}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            {conversation.categoryLabel}
          </span>
        </div>
      </div>

      {/* Mode Tabs: Study (2:1 Video & Subtitle) vs Roleplay (Interactive Dialogue) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#dae2fd] shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'study'
                ? 'bg-[#3525cd] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Khám phá Phụ đề & Video (Tỷ lệ 2:1)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('roleplay');
              handleResetRoleplay();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roleplay'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>2. Luyện Đóng vai Khớp Âm thanh Video</span>
          </button>
        </div>

        {/* Global Video Sound Status Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Âm thanh gốc YouTube: <strong className="text-slate-900">{formatTime(currentTime)} / {formatTime(videoDuration)}</strong></span>
        </div>
      </div>

      {/* ================= SHARED PERSISTENT VIDEO CONTAINER ================= */}
      {/* Keeping this mounted avoids resetting the YouTube player when switching tabs */}
      <div className={`grid ${activeTab === 'study' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-12'} gap-6 items-start`}>
        
        {/* VIDEO COLUMN */}
        <div className={`${activeTab === 'study' ? 'lg:col-span-2' : 'lg:col-span-5'} flex flex-col gap-4`}>
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-black">
            <div className="relative w-full aspect-video">
              <div
                id="yt-conv-shared-player"
                className="w-full h-full"
              />
            </div>

            {/* Active snippet indicator banner on video */}
            {playingSnippetLineId && (
              <div className="absolute top-3 left-3 right-3 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white flex items-center justify-between z-10 animate-in fade-in">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-xs font-bold truncate text-emerald-300">
                    Đang phát âm thanh khớp câu {currentPlayingIndex + 1}
                  </span>
                </div>
                {loopCurrentSnippet && (
                  <span className="text-[10px] bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                    Lặp lại
                  </span>
                )}
              </div>
            )}

            {/* In-video Control Bar */}
            <div className="p-3 bg-slate-950/95 border-t border-slate-800/80 flex flex-col gap-2">
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-medium text-slate-300 min-w-[36px]">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={videoDuration || 310}
                  step="0.5"
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#6cf8bb]"
                />
                <span className="text-[11px] font-mono font-medium text-slate-400 min-w-[36px]">
                  {formatTime(videoDuration)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleToggleFullPlay}
                    className="p-2 rounded-xl bg-[#6cf8bb] hover:bg-[#58e0a7] text-slate-950 font-bold transition-transform active:scale-95 cursor-pointer"
                    title={isPlayingVideo ? 'Tạm dừng video' : 'Phát video'}
                  >
                    {isPlayingVideo ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpSeconds(-5)}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                    title="Lùi lại 5 giây"
                  >
                    -5s
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpSeconds(5)}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                    title="Tua tới 5 giây"
                  >
                    +5s
                  </button>

                  <button
                    type="button"
                    onClick={handleResetDialogue}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Phát lại từ đầu"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed toggle */}
                  <button
                    type="button"
                    onClick={handleSpeedChange}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1"
                    title="Đổi tốc độ phát video & âm thanh"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#6cf8bb]" />
                    <span>{playbackSpeed}x</span>
                  </button>

                  {/* Loop snippet toggle */}
                  <button
                    type="button"
                    onClick={() => setLoopCurrentSnippet(prev => !prev)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      loopCurrentSnippet
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                    title="Bật/Tắt chế độ lặp lại câu hiện tại"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Lặp câu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Roles Overview Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline text-base sm:text-lg font-bold text-slate-900">
                  {conversation.title}
                </h2>
                <p className="text-xs text-slate-500">
                  {conversation.vietnameseTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
              {conversation.roles.map((role, rIdx) => (
                <div key={role.name} className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#f8f9ff] border border-slate-100">
                  <img
                    src={role.avatar}
                    alt={role.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {role.name}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate">
                      {role.roleDescription}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Vocabularies in Tab 1 */}
          {activeTab === 'study' && (
            <div className="bg-white p-5 rounded-3xl border border-[#dae2fd] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-headline text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Từ vựng trọng tâm trong cuộc hội thoại ({conversation.keyVocabularies.length})</span>
                </h3>
                <span className="text-[11px] text-slate-400">Bấm + để lưu vào SRS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {conversation.keyVocabularies.map(v => (
                  <div
                    key={v.id}
                    className="p-3 rounded-2xl border border-slate-100 bg-[#f8f9ff] hover:border-indigo-200 transition-all flex flex-col justify-between gap-1.5"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-sm font-bold text-slate-900">{v.word} </span>
                        <span className="text-[11px] font-mono text-slate-400">/{v.phonetic}/</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSaveVocab(v)}
                        className="p-1 rounded-md text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                        title="Lưu vào SRS"
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      {v.vietnameseMeaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: EITHER SUBTITLE STREAM (TAB 1) OR INTERACTIVE ROLEPLAY (TAB 2) */}
        {activeTab === 'study' ? (
          /* ================= TAB 1: SUBTITLES STREAM (Ratio 1 in 2:1) ================= */
          <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="h-[680px] max-h-[85vh] flex flex-col bg-white rounded-3xl border border-[#dae2fd] shadow-sm p-4 sm:p-5 overflow-hidden">
              {/* Subtitles Header */}
              <div className="flex flex-col gap-2 pb-3 border-b border-slate-100 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#3525cd]" />
                    <h3 className="font-headline text-sm font-bold text-slate-900">
                      Phụ đề hội thoại ({conversation.dialogue.length} câu)
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutoScrollEnabled(prev => !prev)}
                    className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-xl font-bold border transition-all cursor-pointer ${
                      autoScrollEnabled
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                    title="Bật/Tắt tự động cuộn phụ đề theo lời thoại video"
                  >
                    {autoScrollEnabled ? 'Cuộn: BẬT' : 'Cuộn: TẮT'}
                  </button>
                </div>

                {/* Subtitle mode filter */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSubtitleMode('bilingual')}
                    className={`flex-1 py-1 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      subtitleMode === 'bilingual' ? 'bg-white text-[#3525cd] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Song ngữ
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubtitleMode('english')}
                    className={`flex-1 py-1 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      subtitleMode === 'english' ? 'bg-white text-[#3525cd] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Chỉ Tiếng Anh
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubtitleMode('vietnamese')}
                    className={`flex-1 py-1 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      subtitleMode === 'vietnamese' ? 'bg-white text-[#3525cd] shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Chỉ Tiếng Việt
                  </button>
                </div>
              </div>

              {/* Scrollable Subtitle Lines */}
              <div
                ref={dialogueContainerRef}
                className="flex-1 overflow-y-auto pr-1 py-3 space-y-2.5 scroll-smooth"
              >
                {conversation.dialogue.map((line, idx) => {
                  const isActive = currentPlayingIndex === idx;
                  const isPlayingThisSnippet = playingSnippetLineId === line.id;
                  const isFirstRole = line.speaker.toLowerCase().includes(conversation.roles[0].name.split(' ')[0].toLowerCase());

                  return (
                    <div
                      key={line.id}
                      ref={isActive ? activeDialogueLineRef : null}
                      onClick={() => handlePlaySnippet(line)}
                      className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-start gap-3 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-50/95 via-purple-50/95 to-pink-50/80 border-2 border-[#3525cd] shadow-md ring-2 ring-indigo-200/60 scale-[1.01]'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 border border-slate-200/60 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={line.speakerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={line.speaker}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
                      />

                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-bold ${
                            isFirstRole ? 'text-[#3525cd]' : 'text-emerald-700'
                          }`}>
                            {line.speaker}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {line.timestampStart !== undefined && line.timestampEnd !== undefined && (
                              <span className={`text-[10px] font-mono ${isActive ? 'text-[#3525cd] font-bold' : 'text-slate-400'}`}>
                                {formatTime(line.timestampStart)} - {formatTime(line.timestampEnd)}
                              </span>
                            )}
                            {isPlayingThisSnippet && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#3525cd] text-white font-bold animate-pulse">
                                Khớp âm thanh
                              </span>
                            )}
                          </div>
                        </div>

                        {/* English text */}
                        {(subtitleMode === 'bilingual' || subtitleMode === 'english') && (
                          <p className={`font-headline leading-snug transition-all ${
                            isActive
                              ? 'text-xs sm:text-sm font-extrabold text-[#3525cd]'
                              : 'text-xs sm:text-sm font-semibold text-slate-800'
                          }`}>
                            {line.english}
                          </p>
                        )}

                        {/* Vietnamese text */}
                        {(subtitleMode === 'bilingual' || subtitleMode === 'vietnamese') && (
                          <p className={`leading-relaxed transition-all ${
                            isActive
                              ? 'text-xs sm:text-sm text-slate-900 font-bold'
                              : 'text-[11px] sm:text-xs text-slate-500 font-medium'
                          }`}>
                            {line.vietnamese}
                          </p>
                        )}
                      </div>

                      {/* Snippet Play Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySnippet(line);
                        }}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          isPlayingThisSnippet ? 'bg-[#3525cd] text-white' : 'text-slate-400 hover:text-slate-800'
                        }`}
                        title="Phát câu này từ video YouTube"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100 shrink-0">
                💡 Bấm vào câu bất kỳ để tua video YouTube và nghe đúng âm thanh gốc từng câu
              </div>
            </div>
          </div>
        ) : (
          /* ================= TAB 2: INTERACTIVE ROLEPLAY (SYNCHRONIZED WITH VIDEO AUDIO) ================= */
          <div className="lg:col-span-7 flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#dae2fd] shadow-sm">
            {/* Header & Character Selection */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                  Luyện phản xạ giao tiếp theo kịch bản video
                </span>
                <h3 className="font-headline text-lg font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <span>Vai của bạn: <strong className="text-emerald-700">{userRole.name}</strong></span>
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">Đổi nhân vật:</span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {conversation.roles.map((r, idx) => (
                    <button
                      key={r.name}
                      type="button"
                      onClick={() => {
                        setSelectedRoleIndex(idx);
                        handleResetRoleplay();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedRoleIndex === idx
                          ? 'bg-white text-[#3525cd] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {r.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleResetRoleplay}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Bắt đầu lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Auto-play Partner Video Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#3525cd]" />
                <span className="font-semibold text-slate-800">Tự động phát âm thanh gốc đối tác từ Video YouTube</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoPlayPartnerVideo(prev => !prev)}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  autoPlayPartnerVideo
                    ? 'bg-[#3525cd] text-white border-[#3525cd]'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {autoPlayPartnerVideo ? 'Đang bật' : 'Đang tắt'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#3525cd] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round(((roleplayStep) / conversation.dialogue.length) * 100))}%`,
                }}
              />
            </div>

            {/* Completed Screen */}
            {turnStatus === 'completed' ? (
              <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-slate-900">
                  Xuất sắc! Bạn đã hoàn thành toàn bộ cuộc hội thoại!
                </h3>
                <p className="text-sm text-slate-600 max-w-md">
                  Bạn đã luyện đóng vai và phản xạ thành công toàn bộ lời thoại của nhân vật <strong className="text-slate-900">{userRole.name}</strong> khớp với từng câu trong video.
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleResetRoleplay}
                    className="px-6 py-2.5 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Luyện tập lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('study')}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Xem lại toàn bộ phụ đề
                  </button>
                </div>
              </div>
            ) : (
              /* Active Roleplay Workspace */
              <div className="flex flex-col gap-5">
                {/* Previous Dialogue Line (Context) */}
                {roleplayStep > 0 && conversation.dialogue[roleplayStep - 1] && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3 opacity-75">
                    <span className="text-xs font-bold text-slate-500 uppercase shrink-0 mt-0.5">
                      {conversation.dialogue[roleplayStep - 1].speaker}:
                    </span>
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-slate-800">
                        "{conversation.dialogue[roleplayStep - 1].english}"
                      </p>
                      <p className="text-[11px] text-slate-500">
                        ({conversation.dialogue[roleplayStep - 1].vietnamese})
                      </p>
                    </div>
                  </div>
                )}

                {/* CURRENT LINE CARD */}
                {currentDialogueLine && (
                  <div className={`p-6 rounded-3xl border flex flex-col gap-4 transition-all ${
                    isUserTurn
                      ? 'bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white border-indigo-200 shadow-sm'
                      : 'bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-white border-emerald-200 shadow-sm'
                  }`}>
                    {/* Header: Turn number & Speaker */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#3525cd] shadow-xs">
                        Lượt {roleplayStep + 1} / {conversation.dialogue.length} • {currentDialogueLine.speaker}
                      </span>

                      {!isUserTurn ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-emerald-700 animate-pulse flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Đối tác đang nói từ video...</span>
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-lg">
                          Lượt của bạn! Hãy đáp lại
                        </span>
                      )}
                    </div>

                    {/* CASE 1: PARTNER'S TURN */}
                    {!isUserTurn ? (
                      <div className="flex flex-col gap-3 py-2">
                        <p className="font-headline text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                          "{currentDialogueLine.english}"
                        </p>
                        <p className="text-sm text-slate-600 font-medium">
                          {currentDialogueLine.vietnamese}
                        </p>

                        <div className="flex items-center gap-3 pt-3 border-t border-emerald-100/70">
                          <button
                            type="button"
                            onClick={() => handlePlaySnippet(currentDialogueLine)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <Headphones className="w-4 h-4" />
                            <span>Nghe lại âm thanh video</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRoleplayStep(prev => prev + 1)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer ml-auto"
                          >
                            <span>Sang lượt của tôi</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* CASE 2: USER'S TURN TO TRANSLATE & SPEAK */
                      <form onSubmit={handleCheckRoleplayAnswer} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
                          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                            Nói hoặc dịch sang tiếng Anh theo ngữ cảnh:
                          </span>
                          <h4 className="font-headline text-lg sm:text-xl font-bold text-slate-900">
                            "{currentDialogueLine.vietnamese}"
                          </h4>
                        </div>

                        {/* Hint box */}
                        {showHint && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Gợi ý từ khóa: </span>
                              <span>{currentDialogueLine.english.split(' ').slice(0, 4).join(' ')}...</span>
                            </div>
                          </div>
                        )}

                        {/* Match Ratio Feedback if submitted */}
                        {speechMatchRatio !== null && (
                          <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-bold ${
                            speechMatchRatio >= 65
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            <span>Độ chuẩn xác: {speechMatchRatio}%</span>
                            {speechMatchRatio >= 65 ? (
                              <span className="flex items-center gap-1 text-emerald-700">
                                <CheckCircle2 className="w-4 h-4" /> Tuyệt vời!
                              </span>
                            ) : (
                              <span>Cần thử lại hoặc xem gợi ý</span>
                            )}
                          </div>
                        )}

                        {/* Input Field with Mic & Submit */}
                        <div className="flex flex-col gap-2">
                          <div className="relative">
                            <input
                              type="text"
                              value={userInputText}
                              onChange={(e) => setUserInputText(e.target.value)}
                              placeholder="Bấm micro để nói, hoặc gõ câu trả lời tiếng Anh..."
                              className="w-full px-5 py-4 rounded-2xl border-2 border-[#dae2fd] focus:border-[#3525cd] focus:outline-none text-sm sm:text-base text-slate-900 font-medium bg-white shadow-xs pr-28"
                              autoFocus
                            />

                            <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1.5">
                              {/* Mic Button */}
                              <button
                                type="button"
                                onClick={handleToggleMic}
                                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                                  isListeningMic
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                                title={isListeningMic ? 'Đang lắng nghe... bấm để dừng' : 'Bấm để nói bằng Microphone'}
                              >
                                {isListeningMic ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                              </button>

                              {/* Send Button */}
                              <button
                                type="submit"
                                disabled={!userInputText.trim()}
                                className="px-3 py-2.5 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                              >
                                <span>Gửi</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Helper toolbar for user */}
                          <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              {/* Hear original video actor pronunciation */}
                              <button
                                type="button"
                                onClick={() => handlePlaySnippet(currentDialogueLine)}
                                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                                title="Nghe người bản xứ trong video phát âm câu này"
                              >
                                <Headphones className="w-3.5 h-3.5" />
                                <span>Nghe mẫu từ video</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setShowHint(prev => !prev)}
                                className="text-[#3525cd] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Lightbulb className="w-3.5 h-3.5" />
                                <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý từ khóa'}</span>
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setUserInputText(currentDialogueLine.english);
                                handlePlaySnippet(currentDialogueLine);
                              }}
                              className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                            >
                              Xem đáp án mẫu & tiếp tục
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
