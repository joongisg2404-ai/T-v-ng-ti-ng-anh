import React, { useState, useEffect, useRef } from 'react';
import { EntertainmentSong, LyricLine, SongVocab, SongQuizQuestion, VocabWord } from '../types';
import { speakWord, stopSpeech, playAudioFeedback, startAmbientMelody, stopAmbientMelody } from '../utils/audio';
import { loadYouTubeAPI } from '../utils/youtubePlayer';
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
  Mic2, 
  Music, 
  FileText, 
  Sparkles, 
  ArrowLeft,
  HelpCircle,
  Eye,
  EyeOff,
  FastForward,
  Check,
  Tv,
  ExternalLink,
  Sliders,
  CornerDownLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SongKaraokePlayerProps {
  song: EntertainmentSong;
  onBack: () => void;
  onSaveWordToSRS: (word: Partial<VocabWord>) => void;
  onShowToast: (msg: string) => void;
}

export const SongKaraokePlayer: React.FC<SongKaraokePlayerProps> = ({
  song,
  onBack,
  onSaveWordToSRS,
  onShowToast,
}) => {
  // Navigation tabs inside Song screen
  const [songTab, setSongTab] = useState<'karaoke' | 'cloze' | 'vocab' | 'sing'>('karaoke');
  const [showYouTubePlayer, setShowYouTubePlayer] = useState<boolean>(Boolean(song.youtubeId));

  // Player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [singAlongMode, setSingAlongMode] = useState(false); // Hide Vietnamese to sing along

  // YouTube Player instance & polling
  const ytPlayerRef = useRef<any>(null);
  const [isYtReady, setIsYtReady] = useState(false);
  const pollingIntervalRef = useRef<any>(null);

  // Selected vocabulary detail popup
  const [inspectedVocab, setInspectedVocab] = useState<SongVocab | null>(null);

  // CLOZE MODE STATE
  const [clozeAnswers, setClozeAnswers] = useState<{ [key: string]: string }>({});
  const [clozeSolved, setClozeSolved] = useState<{ [key: string]: boolean }>({});
  const [playingSnippetLineId, setPlayingSnippetLineId] = useState<string | null>(null);
  const snippetStopRef = useRef<number | null>(null);
  const snippetSeekInitiatedRef = useRef<number>(0);
  const snippetInfoRef = useRef<{
    lineId?: string | null;
    startTime: number;
    stopTime: number;
    initiatedAt: number;
    hasReachedStart: boolean;
    isMelody: boolean;
  } | null>(null);

  // Ordered flat list of cloze keys for sequential auto-jumping
  const orderedClozeKeys = React.useMemo(() => {
    const list: string[] = [];
    song.lyrics.forEach((line) => {
      if (!line.clozeWords || line.clozeWords.length === 0) return;
      line.english.split('\n').forEach((segment) => {
        segment.split(' ').forEach((wordPart) => {
          const clean = wordPart.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '');
          const clozeObj = line.clozeWords?.find((c) => c.cleanWord.toLowerCase() === clean);
          if (clozeObj) {
            const key = `${line.id}-${clozeObj.cleanWord}`;
            if (!list.includes(key)) {
              list.push(key);
            }
          }
        });
      });
    });
    return list;
  }, [song.lyrics]);

  // SINGING PRACTICE MODE STATE (Luyện hát từng từ qua phím Enter - Không tự phát nhạc)
  const [activeWordGlobalIndex, setActiveWordGlobalIndex] = useState<number>(0);
  const [singCompleted, setSingCompleted] = useState<boolean>(false);
  const [isPlayingMelodySnippet, setIsPlayingMelodySnippet] = useState<boolean>(false);
  const [isSpeakingLyricSample, setIsSpeakingLyricSample] = useState<boolean>(false);
  const singHorizontalScrollRef = useRef<HTMLDivElement | null>(null);
  const singActiveWordRef = useRef<HTMLSpanElement | null>(null);

  // Flatten all words across all lyric lines for word-by-word singing practice
  const songSingWords = React.useMemo(() => {
    const list: Array<{
      globalIndex: number;
      word: string;
      cleanWord: string;
      lineIndex: number;
      wordIndexInLine: number;
      line: LyricLine;
      isLineStart: boolean;
      isLineEnd: boolean;
    }> = [];

    let globalCounter = 0;
    song.lyrics.forEach((line, lineIndex) => {
      const rawWords = line.english
        .replace(/\n+/g, ' ')
        .split(/\s+/)
        .filter((w) => w.trim().length > 0);

      rawWords.forEach((word, wordIndexInLine) => {
        list.push({
          globalIndex: globalCounter,
          word,
          cleanWord: word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, ''),
          lineIndex,
          wordIndexInLine,
          line,
          isLineStart: wordIndexInLine === 0,
          isLineEnd: wordIndexInLine === rawWords.length - 1,
        });
        globalCounter++;
      });
    });

    return list;
  }, [song.lyrics]);

  // Tab switching effect: Clean up all snippet limits, speech synthesis, and melody preview across all tabs
  useEffect(() => {
    // Always stop any ongoing TTS speech and clear speech indicator
    stopSpeech();
    setIsSpeakingLyricSample(false);

    // Always clear any snippet stop times and melody flags so playback in the new tab isn't interrupted
    snippetStopRef.current = null;
    snippetInfoRef.current = null;
    setPlayingSnippetLineId(null);
    setIsPlayingMelodySnippet(false);

    // If entering 'sing' mode, pause background YouTube video so user can sing at their own pace
    if (songTab === 'sing') {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {
          // ignore
        }
      }
      setIsPlaying(false);
    }
  }, [songTab]);

  // Nghe đọc mẫu phát âm chuẩn từng từ của câu hát hiện tại (Speech Synthesis)
  const handleSpeakCurrentLineSample = () => {
    const wordItem = songSingWords[activeWordGlobalIndex] || songSingWords[0];
    if (!wordItem) return;
    const currentLine = wordItem.line;

    if (isSpeakingLyricSample) {
      stopSpeech();
      setIsSpeakingLyricSample(false);
      return;
    }

    // Tạm dừng nhạc nếu đang phát
    if (isPlayingMelodySnippet && isPlaying) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      setIsPlaying(false);
      snippetStopRef.current = null;
      snippetInfoRef.current = null;
      setIsPlayingMelodySnippet(false);
    }

    setIsSpeakingLyricSample(true);
    speakWord(
      currentLine.english,
      () => {
        setIsSpeakingLyricSample(true);
      },
      () => {
        setIsSpeakingLyricSample(false);
      }
    );
  };

  // Tùy chọn nghe giai điệu nhạc YouTube của câu hiện tại nếu người dùng chưa nhớ giai điệu
  const handleToggleCurrentLineMelody = () => {
    const wordItem = songSingWords[activeWordGlobalIndex] || songSingWords[0];
    if (!wordItem) return;
    const currentLine = wordItem.line;

    if (isSpeakingLyricSample) {
      stopSpeech();
      setIsSpeakingLyricSample(false);
    }

    if (isPlayingMelodySnippet && isPlaying) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      setIsPlaying(false);
      snippetStopRef.current = null;
      snippetInfoRef.current = null;
      setIsPlayingMelodySnippet(false);
      return;
    }

    // Target snippet duration: 10 seconds from line start
    const targetEnd = Math.min(song.duration, currentLine.timeStart + 10);
    snippetStopRef.current = targetEnd;
    snippetSeekInitiatedRef.current = Date.now();
    snippetInfoRef.current = {
      lineId: currentLine.id,
      startTime: currentLine.timeStart,
      stopTime: targetEnd,
      initiatedAt: Date.now(),
      hasReachedStart: false,
      isMelody: true,
    };
    setIsPlayingMelodySnippet(true);
    setCurrentTime(currentLine.timeStart);

    let startedOk = false;
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      try {
        if (typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
        }
        if (typeof ytPlayerRef.current.setVolume === 'function') {
          ytPlayerRef.current.setVolume(100);
        }
        ytPlayerRef.current.seekTo(currentLine.timeStart, true);
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        startedOk = true;
      } catch (err) {
        console.warn('YouTube playback error, fallback to TTS:', err);
        startedOk = false;
      }
    }

    // Safety watchdog: If YouTube didn't succeed or didn't start, fallback to speech synthesis
    if (!startedOk) {
      setIsPlayingMelodySnippet(false);
      snippetStopRef.current = null;
      snippetInfoRef.current = null;
      handleSpeakCurrentLineSample();
      onShowToast('Đang phát giọng đọc mẫu tiếng Anh cho câu hát này!');
    } else {
      // Check after 1.5s if video actually started playing; if not, fallback cleanly
      setTimeout(() => {
        if (snippetInfoRef.current && snippetInfoRef.current.isMelody) {
          try {
            const state = ytPlayerRef.current?.getPlayerState?.();
            if (state !== 1 && state !== 3) {
              console.warn('YouTube did not play, falling back to speech');
              setIsPlayingMelodySnippet(false);
              snippetStopRef.current = null;
              snippetInfoRef.current = null;
              handleSpeakCurrentLineSample();
              onShowToast('Không thể phát nhạc YouTube, chuyển sang giọng đọc mẫu tiếng Anh!');
            }
          } catch {
            // ignore
          }
        }
      }, 1500);
    }
  };

  // Handle word advancement for singing practice (KHÔNG TỰ PHÁT NHẠC KHI BẤM ENTER)
  const handleAdvanceSingWord = (delta: number = 1) => {
    // Nếu đang phát nghe thử giai điệu mà người dùng bấm Enter để hát, dừng nhạc nghe thử
    if (isPlayingMelodySnippet) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      setIsPlaying(false);
      snippetStopRef.current = null;
      snippetInfoRef.current = null;
      setIsPlayingMelodySnippet(false);
    }
    if (isSpeakingLyricSample) {
      stopSpeech();
      setIsSpeakingLyricSample(false);
    }

    setActiveWordGlobalIndex((prev) => {
      const next = Math.max(0, Math.min(songSingWords.length - 1, prev + delta));

      if (next === songSingWords.length - 1 && delta > 0 && prev === next) {
        if (!singCompleted) {
          setSingCompleted(true);
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
          playAudioFeedback('correct');
          onShowToast(`🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ bài hát "${song.title}"!`);
        }
        return next;
      }

      playAudioFeedback('click');
      return next;
    });
  };

  // Keyboard shortcut listener for Enter / Space / Backspace / Arrow Keys / M (Melody) / P (Pronounce) in Sing Practice Mode
  useEffect(() => {
    if (songTab !== 'sing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        handleAdvanceSingWord(1);
      } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        handleAdvanceSingWord(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        handleAdvanceSingWord(1);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        e.stopPropagation();
        handleToggleCurrentLineMelody();
      } else if (e.key === 'p' || e.key === 'P' || e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        e.stopPropagation();
        handleSpeakCurrentLineSample();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [songTab, songSingWords, isPlayingMelodySnippet, isSpeakingLyricSample, isPlaying, singCompleted, activeWordGlobalIndex]);

  // Center active word horizontally inside the runner
  useEffect(() => {
    if (songTab === 'sing' && singActiveWordRef.current && singHorizontalScrollRef.current) {
      const container = singHorizontalScrollRef.current;
      const target = singActiveWordRef.current;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const offsetWithinContainer = targetRect.left - containerRect.left + container.scrollLeft;
      const centeredLeft = offsetWithinContainer - container.clientWidth / 2 + targetRect.width / 2;

      container.scrollTo({
        left: Math.max(0, centeredLeft),
        behavior: 'smooth',
      });
    }
  }, [activeWordGlobalIndex, songTab]);

  // Active lyric line ref for auto-scrolling
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // Initialize YouTube Player API for real-time synchronization
  useEffect(() => {
    let isMounted = true;

    if (song.youtubeId) {
      loadYouTubeAPI().then((YT) => {
        if (!isMounted) return;

        const containerId = `yt-karaoke-player-${song.id}`;

        // Ensure container exists
        const initPlayer = () => {
          const elem = document.getElementById(containerId);
          if (!elem || !isMounted) return;

          if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
            try {
              ytPlayerRef.current.destroy();
            } catch {
              // ignore
            }
            ytPlayerRef.current = null;
          }

          try {
            const player = new YT.Player(containerId, {
              videoId: song.youtubeId,
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 0,
                controls: 1,
                rel: 0,
                modestbranding: 1,
                playsinline: 1,
                enablejsapi: 1,
                ...(typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
                  ? { origin: window.location.origin }
                  : {}),
              },
              events: {
                onReady: (event: any) => {
                  if (!isMounted) return;
                  ytPlayerRef.current = event.target;
                  setIsYtReady(true);
                  try {
                    event.target.setPlaybackRate(playbackSpeed);
                  } catch {
                    // ignore
                  }
                },
                onStateChange: (event: any) => {
                  if (!isMounted) return;
                  // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
                  if (event.data === 1) {
                    setIsPlaying(true);
                    if (snippetInfoRef.current) {
                      snippetInfoRef.current.hasReachedStart = true;
                    }
                    try {
                      if (ytPlayerRef.current?.getCurrentTime) {
                        const t = ytPlayerRef.current.getCurrentTime();
                        if (typeof t === 'number' && !isNaN(t)) {
                          setCurrentTime(t);
                        }
                      }
                    } catch {
                      // ignore
                    }
                  } else if (event.data === 2) {
                    // During seek transitions, YouTube briefly flashes PAUSED (2); don't abort snippet if recently initiated
                    const isRecentSeek = snippetInfoRef.current && Date.now() - snippetInfoRef.current.initiatedAt < 1200;
                    if (!isRecentSeek) {
                      setIsPlaying(false);
                      setIsPlayingMelodySnippet(false);
                      snippetStopRef.current = null;
                      snippetInfoRef.current = null;
                      setPlayingSnippetLineId(null);
                      try {
                        if (ytPlayerRef.current?.getCurrentTime) {
                          const t = ytPlayerRef.current.getCurrentTime();
                          if (typeof t === 'number' && !isNaN(t)) {
                            setCurrentTime(t);
                          }
                        }
                      } catch {
                        // ignore
                      }
                    }
                  } else if (event.data === 0) {
                    setIsPlaying(false);
                    setIsPlayingMelodySnippet(false);
                    snippetStopRef.current = null;
                    snippetInfoRef.current = null;
                    setPlayingSnippetLineId(null);
                    setCurrentTime(song.duration);
                  }
                },
                onPlaybackRateChange: (event: any) => {
                  if (!isMounted) return;
                  if (event.data) {
                    setPlaybackSpeed(event.data);
                  }
                },
              },
            });
          } catch (err) {
            console.error('Failed to create YouTube player', err);
          }
        };

        // Small delay to ensure React DOM has mounted the element
        const timer = setTimeout(initPlayer, 100);
        return () => clearTimeout(timer);
      });
    }

    return () => {
      isMounted = false;
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
        ytPlayerRef.current = null;
      }
    };
  }, [song.id, song.youtubeId]);

  // Synchronized playback time tracker - polls accurately whether initiated from UI or YouTube iframe
  useEffect(() => {
    if (song.youtubeId) {
      // High-precision sync polling from YouTube player (10 times per second)
      const interval = setInterval(() => {
        if (!ytPlayerRef.current) return;
        try {
          if (typeof ytPlayerRef.current.getPlayerState === 'function') {
            const playerState = ytPlayerRef.current.getPlayerState();
            // 1 = PLAYING
            if (playerState === 1) {
              setIsPlaying(true);
              const t = ytPlayerRef.current.getCurrentTime();
              if (typeof t === 'number' && !isNaN(t)) {
                setCurrentTime(t);

                // Stop snippet playback when reaching the line's timeEnd
                if (snippetInfoRef.current) {
                  const info = snippetInfoRef.current;
                  const elapsedSinceSeek = Date.now() - info.initiatedAt;

                  // Mark reached start if time is near target
                  if (t >= info.startTime - 2.0 && t <= info.stopTime + 1.0) {
                    info.hasReachedStart = true;
                  }

                  const shouldStop =
                    (info.hasReachedStart || elapsedSinceSeek > 2500) &&
                    elapsedSinceSeek > 1000 &&
                    t >= info.stopTime;

                  if (shouldStop) {
                    if (typeof ytPlayerRef.current.pauseVideo === 'function') {
                      ytPlayerRef.current.pauseVideo();
                    }
                    setIsPlaying(false);
                    snippetStopRef.current = null;
                    snippetInfoRef.current = null;
                    setPlayingSnippetLineId(null);
                    setIsPlayingMelodySnippet(false);
                  }
                } else if (snippetStopRef.current !== null) {
                  const isSeekingJustStarted = Date.now() - snippetSeekInitiatedRef.current < 800;
                  if (!isSeekingJustStarted && t >= snippetStopRef.current) {
                    if (typeof ytPlayerRef.current.pauseVideo === 'function') {
                      ytPlayerRef.current.pauseVideo();
                    }
                    setIsPlaying(false);
                    snippetStopRef.current = null;
                    setPlayingSnippetLineId(null);
                    setIsPlayingMelodySnippet(false);
                  }
                }
              }
            } else if (playerState === 2) {
              // During seek transitions, don't abort snippet if recently initiated
              const isRecentSeek = snippetInfoRef.current && Date.now() - snippetInfoRef.current.initiatedAt < 1200;
              if (!isRecentSeek) {
                setIsPlaying(false);
                setIsPlayingMelodySnippet(false);
                snippetStopRef.current = null;
                snippetInfoRef.current = null;
                setPlayingSnippetLineId(null);
                const t = ytPlayerRef.current.getCurrentTime();
                if (typeof t === 'number' && !isNaN(t)) {
                  setCurrentTime(t);
                }
              }
            } else if (playerState === 0) {
              setIsPlaying(false);
              setIsPlayingMelodySnippet(false);
              snippetStopRef.current = null;
              snippetInfoRef.current = null;
              setPlayingSnippetLineId(null);
              setCurrentTime(song.duration);
            }
          }
        } catch {
          // ignore
        }
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Fallback ambient audio timer if no YouTube ID
      if (isPlaying) {
        startAmbientMelody('acoustic');
        const interval = setInterval(() => {
          setCurrentTime((prev) => {
            if (snippetStopRef.current !== null && prev >= snippetStopRef.current) {
              setIsPlaying(false);
              stopAmbientMelody();
              snippetStopRef.current = null;
              setPlayingSnippetLineId(null);
              return prev;
            }
            if (prev >= song.duration) {
              setIsPlaying(false);
              stopAmbientMelody();
              return song.duration;
            }
            return prev + 1 * playbackSpeed;
          });
        }, 1000);
        return () => {
          clearInterval(interval);
          stopAmbientMelody();
        };
      } else {
        stopAmbientMelody();
      }
    }
  }, [isPlaying, song.youtubeId, song.duration, playbackSpeed]);

  // Find active line based on currentTime with seamless fallback across line intervals
  const activeIndex = React.useMemo(() => {
    if (!song.lyrics || song.lyrics.length === 0) return 0;

    // 1. Direct hit inside [timeStart, timeEnd)
    for (let i = 0; i < song.lyrics.length; i++) {
      const line = song.lyrics[i];
      if (currentTime >= line.timeStart && currentTime < line.timeEnd) {
        return i;
      }
    }

    // 2. If between lines (e.g. musical pause or breath), keep the most recently started line active
    for (let i = song.lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= song.lyrics[i].timeStart) {
        return i;
      }
    }

    return 0;
  }, [song.lyrics, currentTime]);

  const currentLine = song.lyrics[activeIndex] || song.lyrics[0];

  // Auto-scroll to active lyric line in "Phụ đề & Bản dịch" container as music flows
  useEffect(() => {
    if (autoScrollEnabled && activeLineRef.current && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const target = activeLineRef.current;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // Exact pixel position of the active line relative to the top of container scrollable content
      const offsetWithinContainer = (targetRect.top - containerRect.top) + container.scrollTop;
      // Center the active line in the container viewport
      const centeredTop = offsetWithinContainer - (container.clientHeight / 2) + (target.clientHeight / 2);

      container.scrollTo({
        top: Math.max(0, centeredTop),
        behavior: 'smooth',
      });
    }
  }, [activeIndex, autoScrollEnabled]);

  const handlePlayPause = () => {
    snippetStopRef.current = null;
    snippetInfoRef.current = null;
    setPlayingSnippetLineId(null);
    setIsPlayingMelodySnippet(false);
    stopSpeech();
    setIsSpeakingLyricSample(false);

    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        try {
          if (typeof ytPlayerRef.current.unMute === 'function') {
            ytPlayerRef.current.unMute();
          }
          if (typeof ytPlayerRef.current.setVolume === 'function') {
            ytPlayerRef.current.setVolume(100);
          }
          ytPlayerRef.current.playVideo();
        } catch {
          // ignore
        }
      }
    } else {
      if (isPlaying) {
        setIsPlaying(false);
        stopSpeech();
      } else {
        if (currentTime >= song.duration) {
          setCurrentTime(0);
        }
        setIsPlaying(true);
        playAudioFeedback('click');
      }
    }
  };

  const handleSeek = (time: number) => {
    snippetStopRef.current = null;
    snippetInfoRef.current = null;
    setPlayingSnippetLineId(null);
    setIsPlayingMelodySnippet(false);
    setCurrentTime(time);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(time, true);
    }
  };

  const handleNudgeTime = (delta: number) => {
    snippetStopRef.current = null;
    snippetInfoRef.current = null;
    setPlayingSnippetLineId(null);
    setIsPlayingMelodySnippet(false);
    const newTime = Math.min(song.duration, Math.max(0, currentTime + delta));
    setCurrentTime(newTime);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(newTime, true);
    }
  };

  const handleRestart = () => {
    snippetStopRef.current = null;
    snippetInfoRef.current = null;
    setPlayingSnippetLineId(null);
    setIsPlayingMelodySnippet(false);
    setCurrentTime(0);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(0, true);
      ytPlayerRef.current.pauseVideo();
    }
    setIsPlaying(false);
    stopAmbientMelody();
    stopSpeech();
    setIsSpeakingLyricSample(false);
  };

  const handleSpeedChange = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length] || 1;
    setPlaybackSpeed(nextSpeed);

    if (ytPlayerRef.current && typeof ytPlayerRef.current.setPlaybackRate === 'function') {
      try {
        ytPlayerRef.current.setPlaybackRate(nextSpeed);
      } catch (err) {
        console.warn('Playback rate change error', err);
      }
    }
    onShowToast(`Tốc độ phát: ${nextSpeed}x (Đã đồng bộ Video YouTube & Lời nhạc)`);
  };

  const handleLineClick = (line: LyricLine) => {
    snippetStopRef.current = null;
    snippetInfoRef.current = null;
    setPlayingSnippetLineId(null);
    setIsPlayingMelodySnippet(false);
    stopSpeech();
    setIsSpeakingLyricSample(false);
    setCurrentTime(line.timeStart);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      try {
        if (typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
        }
        if (typeof ytPlayerRef.current.setVolume === 'function') {
          ytPlayerRef.current.setVolume(100);
        }
        ytPlayerRef.current.seekTo(line.timeStart, true);
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      } catch (err) {
        console.warn('YouTube line click error:', err);
        speakWord(line.english);
      }
    } else {
      speakWord(line.english);
    }
  };

  // Play a specific lyric line snippet for Cloze test, auto-stopping after 10 seconds from line.timeStart without jumping/scrolling screen
  const handlePlayClozeSnippet = (line: LyricLine, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // Toggle: if currently playing this snippet, pause it
    if (playingSnippetLineId === line.id && isPlaying) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      setIsPlaying(false);
      snippetStopRef.current = null;
      snippetInfoRef.current = null;
      setPlayingSnippetLineId(null);
      return;
    }

    // Set stop time target to 10 seconds from line.timeStart (capped by song duration)
    const targetSnippetEnd = Math.min(song.duration, line.timeStart + 10);
    snippetStopRef.current = targetSnippetEnd;
    snippetSeekInitiatedRef.current = Date.now();
    snippetInfoRef.current = {
      lineId: line.id,
      startTime: line.timeStart,
      stopTime: targetSnippetEnd,
      initiatedAt: Date.now(),
      hasReachedStart: false,
      isMelody: false,
    };
    setPlayingSnippetLineId(line.id);
    setCurrentTime(line.timeStart);

    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      try {
        if (typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
        }
        if (typeof ytPlayerRef.current.setVolume === 'function') {
          ytPlayerRef.current.setVolume(100);
        }
        ytPlayerRef.current.seekTo(line.timeStart, true);
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      } catch (err) {
        console.warn('YouTube snippet error, fallback to TTS', err);
        speakWord(line.english, undefined, () => {
          setPlayingSnippetLineId(null);
          snippetStopRef.current = null;
          snippetInfoRef.current = null;
        });
      }
    } else {
      // Fallback TTS
      speakWord(line.english, undefined, () => {
        setPlayingSnippetLineId(null);
        snippetStopRef.current = null;
        snippetInfoRef.current = null;
      });
    }
  };

  const handleSaveVocab = (v: SongVocab) => {
    onSaveWordToSRS({
      word: v.word,
      phonetic: v.phonetic,
      partOfSpeech: v.partOfSpeech,
      vietnameseMeaning: v.vietnameseMeaning,
      englishDefinition: v.vietnameseMeaning,
      exampleSentence: v.exampleSentence,
      exampleVietnamese: v.contextSentence,
      topic: 'Âm nhạc & Lời bài hát',
      subtopic: song.title,
      oxfordTier: v.oxfordTier,
      level: 1,
      dueStatus: 'due_today',
      dueText: 'Học ngay hôm nay',
      imageUrl: song.coverUrl,
    });
    onShowToast(`Đã lưu "${v.word}" vào Sổ từ vựng & Hệ thống SRS!`);
  };

  // Cloze word check and automatic focus jump to next blank
  const handleClozeChange = (key: string, value: string, correctTarget: string) => {
    setClozeAnswers(prev => ({ ...prev, [key]: value }));
    const cleanUser = value.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '');
    const cleanTarget = correctTarget.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '');

    if (cleanUser === cleanTarget) {
      setClozeSolved(prev => {
        const nextSolved = { ...prev, [key]: true };
        const solvedCount = Object.values(nextSolved).filter(Boolean).length;
        if (solvedCount >= totalClozeCount && totalClozeCount > 0) {
          setTimeout(() => {
            confetti({
              particleCount: 90,
              spread: 60,
              origin: { y: 0.6 }
            });
            onShowToast(`🎉 Tuyệt vời! Bạn đã điền chính xác tất cả ${totalClozeCount} từ khuyết trong bài hát!`);
          }, 200);
        }
        return nextSolved;
      });

      playAudioFeedback('correct');
      onShowToast(`Chính xác! "${correctTarget}"`);

      // Auto-jump to next unsolved blank input
      const currentIndex = orderedClozeKeys.indexOf(key);
      if (currentIndex !== -1) {
        let nextKey: string | null = null;
        // Search forward for next unsolved
        for (let i = currentIndex + 1; i < orderedClozeKeys.length; i++) {
          const candidate = orderedClozeKeys[i];
          if (!clozeSolved[candidate] && candidate !== key) {
            nextKey = candidate;
            break;
          }
        }
        // If none found forward, wrap around
        if (!nextKey) {
          for (let i = 0; i < currentIndex; i++) {
            const candidate = orderedClozeKeys[i];
            if (!clozeSolved[candidate] && candidate !== key) {
              nextKey = candidate;
              break;
            }
          }
        }

        if (nextKey) {
          setTimeout(() => {
            const nextEl = document.getElementById(`cloze-input-${nextKey}`) as HTMLInputElement | null;
            if (nextEl) {
              nextEl.focus();
              nextEl.select();
            }
          }, 60);
        }
      }
    }
  };

  // Count total cloze words in song
  const totalClozeCount = song.lyrics.reduce((acc, line) => acc + (line.clozeWords?.length || 0), 0);
  const solvedClozeCount = Object.values(clozeSolved).filter(Boolean).length;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentSingWord = songSingWords[activeWordGlobalIndex] || songSingWords[0];
  const currentSingLine = currentSingWord ? currentSingWord.line : song.lyrics[0];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            stopAmbientMelody();
            stopSpeech();
            onBack();
          }}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#3525cd] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách thư giãn</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
            song.level === 'A1' ? 'bg-emerald-100 text-emerald-800' :
            song.level === 'A2' ? 'bg-teal-100 text-teal-800' :
            song.level === 'B1' ? 'bg-indigo-100 text-indigo-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            Cấp độ {song.level}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            {song.genre}
          </span>
        </div>
      </div>

      {/* 2:1 Split Screen Layout: 2 parts for Video Player, 1 part for Lyrics Subtitle Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: 2 parts (Ratio 2 in 2:1) for Video Player */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Video Container (YouTube or Album Art) */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-black">
            {song.youtubeId ? (
              <div className="relative w-full aspect-video">
                <div
                  id={`yt-karaoke-player-${song.id}`}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover opacity-60 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-lg animate-pulse">
                    <Music className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{song.title}</h2>
                  <p className="text-xs text-slate-300">{song.artist}</p>
                </div>
              </div>
            )}
          </div>

          {/* Integrated Synced Player Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col gap-3">
            {/* Real-time Subtitle Ticker under Video */}
            <div className="flex items-center justify-between gap-3 bg-slate-950/90 px-4 py-2.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2.5 overflow-hidden flex-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6cf8bb] animate-ping shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#6cf8bb] font-bold shrink-0 uppercase tracking-wider">
                      Đang phát (Câu {activeIndex + 1}/{song.lyrics.length}):
                    </span>
                    <p className="text-sm font-bold text-white truncate">
                      {currentLine ? currentLine.english.replace(/\n/g, '  •  ') : 'Bấm phát nhạc để bắt đầu...'}
                    </p>
                  </div>
                  {currentLine && !singAlongMode && (
                    <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
                      {currentLine.vietnamese.replace(/\n/g, '  •  ')}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {formatTime(currentTime)} / {formatTime(song.duration)}
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={song.duration}
              value={currentTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#6cf8bb]"
            />

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="w-11 h-11 rounded-2xl bg-[#3525cd] hover:bg-indigo-600 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  title={isPlaying ? 'Tạm dừng' : 'Phát nhạc & Đồng bộ phụ đề'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Phát lại từ 0:00"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNudgeTime(-5)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Tua lùi 5 giây"
                >
                  -5s
                </button>
                <button
                  type="button"
                  onClick={() => handleNudgeTime(5)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Tua nhanh 5 giây"
                >
                  +5s
                </button>

                <button
                  type="button"
                  onClick={handleSpeedChange}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1"
                  title="Đổi tốc độ phát (Đồng bộ Video & Lời nhạc)"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#6cf8bb]" />
                  <span>{playbackSpeed}x</span>
                </button>
              </div>

              {/* View Tab Buttons */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSongTab('karaoke')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    songTab === 'karaoke'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🎤 Lời bài hát
                </button>
                <button
                  type="button"
                  onClick={() => setSongTab('cloze')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    songTab === 'cloze'
                      ? 'bg-[#6cf8bb] text-[#006c49] shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🧩 Điền từ ({solvedClozeCount}/{totalClozeCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSongTab('vocab')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    songTab === 'vocab'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ⭐ Từ vựng ({song.vocabularies.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSongTab('sing')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    songTab === 'sing'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md ring-2 ring-pink-300/40'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Luyện hát (Enter)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Song Info & Description Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd] shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold text-slate-900">
                {song.title} — <span className="text-slate-600 font-normal">{song.artist}</span>
              </h2>
              {song.youtubeUrl && (
                <a
                  href={song.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold"
                >
                  <span>Mở trên YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {song.description}
            </p>
          </div>
        </div>

        {/* Right Column: 1 part (Ratio 1 in 2:1) for Lyrics / Subtitle Stream */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          <div className="h-[620px] max-h-[85vh] flex flex-col bg-white rounded-3xl border border-[#dae2fd] shadow-sm p-4 sm:p-5 overflow-hidden">
            {/* Stream Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0 gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <Mic2 className="w-4 h-4 text-[#3525cd]" />
                  <h3 className="font-headline text-sm font-bold text-slate-900">
                    Phụ đề & Bản dịch
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${autoScrollEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span>{autoScrollEnabled ? 'Đang tự cuộn theo nhạc' : 'Đã tạm dừng tự cuộn'}</span>
                </div>
              </div>

              {/* Toggles: Auto-Scroll & Bilingual */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setAutoScrollEnabled(prev => !prev)}
                  className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-xl font-bold border transition-all cursor-pointer ${
                    autoScrollEnabled
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                  title="Bật/Tắt tự động cuộn lời bài hát và bản dịch theo nhạc"
                >
                  {autoScrollEnabled ? 'Cuộn: BẬT' : 'Cuộn: TẮT'}
                </button>

                <button
                  type="button"
                  onClick={() => setSingAlongMode(prev => !prev)}
                  className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-xl font-bold border transition-all cursor-pointer ${
                    singAlongMode
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Bật/Tắt bản dịch tiếng Việt song ngữ"
                >
                  {singAlongMode ? 'Ẩn dịch' : 'Song ngữ'}
                </button>
              </div>
            </div>

            {/* Scrollable Karaoke Subtitles Stream */}
            <div
              ref={lyricsContainerRef}
              className="flex-1 overflow-y-auto pr-1 py-3 space-y-2.5 scroll-smooth relative"
            >
              {song.lyrics.map((line, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={line.id}
                    id={`lyric-line-${line.id}`}
                    ref={isActive ? activeLineRef : null}
                    onClick={() => handleLineClick(line)}
                    className={`p-3.5 rounded-2xl transition-all duration-300 cursor-pointer flex items-start justify-between gap-3 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50/95 via-purple-50/90 to-pink-50/70 border-2 border-[#3525cd] shadow-md ring-4 ring-indigo-200/50 scale-[1.01]'
                        : 'bg-slate-50/70 hover:bg-slate-100/90 border border-slate-200/60 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Active Accent Bar on Left */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#3525cd] rounded-r-full shadow-sm" />
                    )}

                    <div className="flex flex-col gap-1 flex-1 pl-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                          isActive ? 'bg-indigo-100 text-[#3525cd]' : 'bg-slate-200/60 text-slate-500'
                        }`}>
                          Câu {idx + 1}
                        </span>

                        <span className={`text-[10px] font-mono ${isActive ? 'text-[#3525cd] font-bold' : 'text-slate-400'}`}>
                          {formatTime(line.timeStart)} – {formatTime(line.timeEnd)}
                        </span>

                        {isActive && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#3525cd] text-white font-bold animate-pulse flex items-center gap-1 shadow-2xs">
                            <Music className="w-2.5 h-2.5" />
                            Đang hát
                          </span>
                        )}
                      </div>

                      <p className={`font-headline leading-snug transition-all whitespace-pre-line ${
                        isActive
                          ? 'text-base sm:text-lg font-extrabold text-[#3525cd]'
                          : 'text-xs sm:text-sm font-semibold text-slate-800'
                      }`}>
                        {line.english}
                      </p>

                      {!singAlongMode && (
                        <p className={`leading-relaxed transition-all whitespace-pre-line ${
                          isActive
                            ? 'text-xs sm:text-sm text-slate-900 font-bold'
                            : 'text-[11px] sm:text-xs text-slate-500 font-medium'
                        }`}>
                          {line.vietnamese}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLineClick(line);
                      }}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                        isActive ? 'bg-[#3525cd] text-white shadow-xs' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-200/60'
                      }`}
                      title="Phát câu này trên YouTube"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100 shrink-0">
              💡 Bấm vào câu bất kỳ để tua video YouTube tới đúng thời điểm hát
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: FULL KARAOKE LYRICS & BILINGUAL BREAKDOWN ================= */}
      {songTab === 'karaoke' && (
        <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#dae2fd] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1.5">
                <Mic2 className="w-3.5 h-3.5" /> Lời ca khúc & Phân tích ngữ âm song ngữ
              </span>
              <h3 className="font-headline text-lg font-bold text-slate-900 mt-0.5">
                Toàn bộ lời bài hát ({song.lyrics.length} câu • Cấp độ {song.level})
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSingAlongMode(prev => !prev)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer ${
                  singAlongMode
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
                }`}
                title="Bật/Tắt bản dịch tiếng Việt song ngữ"
              >
                {singAlongMode ? 'Đang ẩn bản dịch' : 'Hiện song ngữ (Anh - Việt)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSeek(0);
                  if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
                    ytPlayerRef.current.playVideo();
                    setIsPlaying(true);
                  }
                  onShowToast('Đang phát bài hát từ đầu!');
                }}
                className="text-xs px-3.5 py-1.5 rounded-xl font-bold bg-[#3525cd] hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Phát bài hát từ câu đầu tiên"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Phát từ đầu</span>
              </button>
            </div>
          </div>

          {/* Quick Learning Tip */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#3525cd] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-slate-900">Mẹo luyện hát & nghe: </strong>
              Bấm vào bất kỳ câu nào để video YouTube tua tới đúng thời điểm hát. Bạn cũng có thể bấm vào <span className="font-semibold text-[#3525cd]">từng từ tiếng Anh</span> trong mỗi câu để nghe máy phát âm chuẩn xác và luyện phát âm trước khi hát theo!
            </div>
          </div>

          {/* Lyrics lines grid / list */}
          <div className="flex flex-col gap-4 divide-y divide-slate-100">
            {song.lyrics.map((line, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={line.id}
                  className={`pt-4 first:pt-0 rounded-2xl p-4 transition-all duration-200 flex flex-col gap-2.5 ${
                    isActive
                      ? 'bg-indigo-50/80 border-2 border-indigo-300 ring-2 ring-indigo-200/50'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-[#3525cd] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Câu {idx + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {formatTime(line.timeStart)} – {formatTime(line.timeEnd)}
                      </span>
                      {isActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center gap-1">
                          <Music className="w-3 h-3" /> Đang hát
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Đọc mẫu câu */}
                      <button
                        type="button"
                        onClick={() => speakWord(line.english)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                        title="Nghe máy đọc mẫu phát âm cả câu"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Đọc mẫu</span>
                      </button>

                      {/* Tua tới câu này trên video */}
                      <button
                        type="button"
                        onClick={() => handleLineClick(line)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                          isActive && isPlaying
                            ? 'bg-pink-600 text-white shadow-xs'
                            : 'bg-[#3525cd] hover:bg-indigo-700 text-white'
                        }`}
                        title="Phát video YouTube từ câu này"
                      >
                        {isActive && isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Tạm dừng</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            <span>Hát câu này</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Interactive Word Pronunciation in English line */}
                  <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed flex flex-wrap items-center gap-1.5">
                    {line.english.split(/\s+/).map((w, wIdx) => {
                      const cleanWord = w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '');
                      const matchingVocab = song.vocabularies.find(v => v.word.toLowerCase() === cleanWord);

                      return (
                        <button
                          key={wIdx}
                          type="button"
                          onClick={() => {
                            speakWord(w);
                            playAudioFeedback('click');
                          }}
                          className={`px-1.5 py-0.5 rounded-lg transition-all cursor-pointer select-none text-left ${
                            matchingVocab
                              ? 'bg-amber-50 text-amber-900 font-extrabold border border-amber-200 hover:bg-amber-100'
                              : 'hover:bg-indigo-100 text-slate-800'
                          }`}
                          title={
                            matchingVocab
                              ? `Từ khóa: "${w}" (${matchingVocab.vietnameseMeaning}) - Bấm để nghe phát âm`
                              : `Bấm để nghe phát âm từ "${w}"`
                          }
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>

                  {/* Vietnamese Meaning */}
                  {!singAlongMode && (
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {line.vietnamese}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: CLOZE / FILL IN THE BLANK ================= */}
      {songTab === 'cloze' && (
        <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#dae2fd] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Thử thách nghe & điền từ khuyết
              </span>
              <h3 className="font-headline text-lg font-bold text-slate-900">
                Ẩn từ khóa theo nhịp điệu bài hát ({solvedClozeCount}/{totalClozeCount} hoàn thành)
              </h3>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold">
              Cấp độ: {song.level}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-indigo-100 text-xs text-slate-700 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Hướng dẫn: </strong>
              Bật nhạc phát hoặc bấm nút <strong>"Nghe 10s câu này"</strong> để nghe rõ 10 giây tính từ mốc bắt đầu câu đó, giúp bạn dễ dàng bắt trọn từ vựng trong giai điệu. Gõ từ còn thiếu vào ô trống để kiểm tra khả năng bắt âm (Listening Comprehension). Ô sẽ chuyển màu xanh ngay khi bạn gõ đúng!
            </div>
          </div>

          {/* Cloze Lines List */}
          <div className="flex flex-col gap-5 divide-y divide-slate-100">
            {song.lyrics.map((line, lIdx) => {
              const hasCloze = line.clozeWords && line.clozeWords.length > 0;
              if (!hasCloze) return null;

              const isSnippetPlaying = playingSnippetLineId === line.id && isPlaying;
              const snippetDurationLimit = Math.min(song.duration, line.timeStart + 10);

              return (
                <div key={line.id} className="pt-5 first:pt-0 flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-600 font-mono bg-slate-100 px-2.5 py-0.5 rounded-md">
                        Câu {lIdx + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {formatTime(line.timeStart)} – {formatTime(line.timeEnd)}
                      </span>
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                        Đoạn nghe 10s: {formatTime(line.timeStart)} – {formatTime(snippetDurationLimit)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handlePlayClozeSnippet(line, e)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                        isSnippetPlaying
                          ? 'bg-[#3525cd] text-white ring-2 ring-indigo-300 animate-pulse'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-[#3525cd] border border-indigo-200/80 hover:shadow-xs'
                      }`}
                      title={
                        isSnippetPlaying
                          ? 'Bấm để dừng nghe đoạn này'
                          : `Bấm để nghe đoạn nhạc này trong 10 giây (${formatTime(line.timeStart)} - ${formatTime(snippetDurationLimit)}), tính từ mốc bắt đầu câu`
                      }
                    >
                      {isSnippetPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Đang phát ({formatTime(currentTime)} / {formatTime(snippetDurationLimit)}) • Dừng</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe 10s câu này</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Render English with inline input fields for cloze words */}
                  <div className="flex flex-col gap-2 text-base font-semibold text-slate-900 leading-loose">
                    {line.english.split('\n').map((lineSegment, segIdx) => (
                      <div key={segIdx} className="flex flex-wrap items-center gap-1.5">
                        {lineSegment.split(' ').map((wordPart, wIdx) => {
                          const cleanWordPart = wordPart.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '');
                          const clozeObj = line.clozeWords?.find(c => c.cleanWord.toLowerCase() === cleanWordPart);

                          if (clozeObj) {
                            const clozeKey = `${line.id}-${clozeObj.cleanWord}`;
                            const isSolved = clozeSolved[clozeKey];
                            const val = clozeAnswers[clozeKey] || '';

                            return (
                              <span key={wIdx} className="inline-flex items-center relative my-0.5">
                                <input
                                  id={`cloze-input-${clozeKey}`}
                                  type="text"
                                  value={val}
                                  disabled={isSolved}
                                  onChange={(e) => handleClozeChange(clozeKey, e.target.value, clozeObj.cleanWord)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const currIdx = orderedClozeKeys.indexOf(clozeKey);
                                      if (currIdx !== -1 && currIdx < orderedClozeKeys.length - 1) {
                                        const nextKey = orderedClozeKeys[currIdx + 1];
                                        const nextEl = document.getElementById(`cloze-input-${nextKey}`) as HTMLInputElement | null;
                                        nextEl?.focus();
                                      }
                                    }
                                  }}
                                  placeholder={clozeObj.hint ? `(${clozeObj.hint})` : '___'}
                                  style={{ width: `${Math.max(clozeObj.cleanWord.length * 15, 95)}px` }}
                                  className={`px-2.5 py-1 text-sm font-bold rounded-lg border-2 text-center transition-all focus:outline-none ${
                                    isSolved
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-2xs'
                                      : 'bg-white border-indigo-200 focus:border-[#3525cd] focus:ring-2 focus:ring-indigo-200 text-slate-900 shadow-xs'
                                  }`}
                                />
                                {isSolved && (
                                  <Check className="w-4 h-4 text-emerald-600 absolute right-1.5 pointer-events-none" />
                                )}
                              </span>
                            );
                          }

                          return <span key={wIdx}>{wordPart}</span>;
                        })}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">
                    {line.vietnamese}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: VOCABULARY HIGHLIGHTS ================= */}
      {songTab === 'vocab' && (
        <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#dae2fd] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
                Kho báu ngôn từ từ ca khúc
              </span>
              <h3 className="font-headline text-lg font-bold text-slate-900">
                Từ vựng & Cụm từ nổi bật ({song.vocabularies.length} từ)
              </h3>
            </div>
            <span className="text-xs text-slate-400">Bấm dấu + để lưu vào SRS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {song.vocabularies.map(v => (
              <div
                key={v.id}
                className="p-4 rounded-2xl border border-slate-200 bg-[#f8f9ff] hover:border-indigo-300 transition-all flex flex-col gap-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h4 className="font-headline text-base font-bold text-slate-900">
                      {v.word}
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      /{v.phonetic}/
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-[#3525cd] font-semibold">
                      {v.partOfSpeech}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => speakWord(v.word)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#3525cd] hover:bg-white transition-colors cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveVocab(v)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-white transition-colors cursor-pointer"
                      title="Lưu vào Sổ từ vựng & SRS"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs font-bold text-[#006c49]">
                  {v.vietnameseMeaning}
                </p>

                <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex flex-col gap-1 text-xs">
                  <p className="text-slate-700 italic">
                    <span className="font-bold text-slate-400 not-italic">Trong lời bài hát: </span>
                    "{v.contextSentence}"
                  </p>
                  <p className="text-slate-500 italic mt-0.5">
                    <span className="font-bold text-slate-400 not-italic">Ví dụ thêm: </span>
                    "{v.exampleSentence}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: SINGING PRACTICE (LUYỆN HÁT - ENTER ADVANCE) ================= */}
      {songTab === 'sing' && (
        <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#dae2fd] shadow-xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Luyện hát tương tác theo từng từ
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 font-bold border border-pink-200">
                  Bấm phím Enter
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-slate-900 mt-1">
                Dải lời bài hát chạy ngang — Hát theo từng từ nhấp nháy
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleToggleCurrentLineMelody}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isPlayingMelodySnippet && isPlaying
                    ? 'bg-pink-600 border-pink-700 text-white ring-2 ring-pink-300 animate-pulse'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
                }`}
                title="Nghe giai điệu câu này (Phím M) nếu bạn chưa nhớ điệu"
              >
                {isPlayingMelodySnippet && isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current text-white" />
                    <span>Đang nghe giai điệu (Dừng)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>Nghe giai điệu câu này (M)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveWordGlobalIndex(0);
                  setSingCompleted(false);
                  onShowToast('Đã khởi động lại bài luyện hát từ đầu!');
                }}
                className="text-xs px-3 py-1.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Luyện hát lại từ đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bắt đầu lại</span>
              </button>
            </div>
          </div>

          {/* User Instruction Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border border-pink-200/80 text-xs text-slate-800 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-slate-950">Luyện hát tương tác theo nhịp: </strong>
              Khi bạn cất giọng hát từng chữ, hãy bấm phím <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded-md font-mono font-bold text-slate-900 shadow-2xs">ENTER</kbd> (hoặc phím <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded-md font-mono font-bold text-slate-900 shadow-2xs">SPACE</kbd>, hoặc chạm nút bấm to bên dưới) để chuyển từ. 
              <span className="text-pink-800 font-bold ml-1">Thao tác bấm Enter hoàn toàn không tự phát nhạc</span> để bạn thoải mái hát theo nhịp của riêng mình. Nếu không nhớ giai điệu của câu hát, bạn có thể tùy chọn bấm nút <strong className="text-indigo-700">"Nghe giai điệu câu này"</strong> (hoặc gõ phím <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900">M</kbd>) để nghe lại giai điệu mẫu!
            </div>
          </div>

          {/* Progress Bar & Indicators */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-pink-600 font-extrabold font-mono text-sm">
                  Từ {activeWordGlobalIndex + 1} / {songSingWords.length}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-700">
                  Câu {(currentSingWord?.lineIndex || 0) + 1} / {song.lyrics.length}
                </span>
              </div>
              <span className="text-slate-500 font-mono">
                {Math.round(((activeWordGlobalIndex + 1) / Math.max(1, songSingWords.length)) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round(((activeWordGlobalIndex + 1) / Math.max(1, songSingWords.length)) * 100))}%` }}
              />
            </div>
          </div>

          {/* ================= STAGE: HORIZONTAL TELEPROMPTER RUNNER ================= */}
          <div className="relative bg-slate-950 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-hidden flex flex-col gap-4">
            {/* Ambient Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-pink-600/15 blur-3xl pointer-events-none" />

            {/* Top notch indicator for center alignment */}
            <div className="flex justify-center items-center pointer-events-none z-20">
              <div className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-[11px] font-mono font-bold text-pink-300 flex items-center gap-1.5 shadow-sm">
                <span>▼ HÁT TỪ ĐANG SÁNG (BẤM ENTER ĐỂ CHUYỂN TỪ) ▼</span>
              </div>
            </div>

            {/* The Horizontal Running Tape */}
            <div className="relative w-full">
              {/* Left edge shadow gradient */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10" />
              {/* Right edge shadow gradient */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-10" />

              <div
                ref={singHorizontalScrollRef}
                className="w-full overflow-x-auto py-8 sm:py-10 px-[40vw] flex items-center gap-3 sm:gap-4 no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {songSingWords.map((item, idx) => {
                  const isPast = idx < activeWordGlobalIndex;
                  const isCurrent = idx === activeWordGlobalIndex;
                  const isFuture = idx > activeWordGlobalIndex;

                  return (
                    <React.Fragment key={item.globalIndex}>
                      {item.isLineStart && idx > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-500 uppercase tracking-wider shrink-0 select-none">
                          <span>Câu {item.lineIndex + 1}</span>
                          <span className="text-slate-600">({formatTime(item.line.timeStart)})</span>
                        </div>
                      )}

                      <span
                        ref={isCurrent ? singActiveWordRef : null}
                        onClick={() => {
                          setActiveWordGlobalIndex(idx);
                          speakWord(item.word);
                          playAudioFeedback('click');
                        }}
                        className={`transition-all duration-200 select-none cursor-pointer whitespace-nowrap shrink-0 ${
                          isCurrent
                            ? 'text-3xl sm:text-4xl md:text-5xl font-black text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 sm:px-7 py-3 rounded-2xl shadow-[0_0_35px_rgba(236,72,153,0.7)] ring-4 ring-pink-400/60 scale-110 tracking-wide animate-pulse'
                            : isPast
                            ? 'text-xl sm:text-2xl font-bold text-slate-500 opacity-40 hover:opacity-80 hover:text-slate-300'
                            : 'text-xl sm:text-2xl font-bold text-slate-300 opacity-80 hover:opacity-100 hover:text-white'
                        }`}
                        title={`Bấm để chọn và nghe phát âm từ "${item.word}"`}
                      >
                        {item.word}
                      </span>

                      {item.isLineEnd && idx < songSingWords.length - 1 && (
                        <span className="text-slate-700 font-mono text-sm px-1.5 select-none shrink-0">
                          ↵
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Bottom Notch Accent */}
            <div className="flex justify-center items-center pointer-events-none z-20">
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            </div>
          </div>

          {/* ================= ACTIVE SENTENCE IN CONTEXT ================= */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#f8f9ff] border border-indigo-100 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 font-mono bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                  Câu {(currentSingWord?.lineIndex || 0) + 1} / {song.lyrics.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {formatTime(currentSingLine.timeStart)} – {formatTime(currentSingLine.timeEnd)}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Nút 1: Nghe đọc mẫu phát âm chuẩn tiếng Anh */}
                <button
                  type="button"
                  onClick={handleSpeakCurrentLineSample}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all border ${
                    isSpeakingLyricSample
                      ? 'bg-amber-500 border-amber-600 text-white ring-2 ring-amber-300 animate-pulse'
                      : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                  title="Nghe đọc mẫu phát âm chuẩn tiếng Anh của câu này (Phím P)"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isSpeakingLyricSample ? 'animate-bounce' : 'text-amber-600'}`} />
                  <span>{isSpeakingLyricSample ? 'Đang đọc mẫu... (Dừng)' : 'Nghe đọc mẫu lời (P)'}</span>
                </button>

                {/* Nút 2: Nghe giai điệu từ YouTube */}
                <button
                  type="button"
                  onClick={handleToggleCurrentLineMelody}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all border ${
                    isPlayingMelodySnippet && isPlaying
                      ? 'bg-pink-600 border-pink-700 text-white ring-2 ring-pink-300 animate-pulse'
                      : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                  title="Bấm để nghe 10s giai điệu gốc bài hát nếu chưa nhớ nhạc (Phím M)"
                >
                  {isPlayingMelodySnippet && isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Đang phát nhạc • Dừng</span>
                    </>
                  ) : (
                    <>
                      <Music className="w-3.5 h-3.5 text-pink-600" />
                      <span>Nghe giai điệu (M)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Full sentence text with highlighted active word and word-click pronunciation */}
            <div className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed flex flex-wrap items-center gap-1.5">
              {currentSingLine.english.split(/\s+/).map((w, wIdx) => {
                const isWordActiveInLine = currentSingWord?.wordIndexInLine === wIdx;
                return (
                  <button
                    key={wIdx}
                    type="button"
                    onClick={() => {
                      speakWord(w);
                      playAudioFeedback('click');
                    }}
                    className={`px-1.5 py-0.5 rounded-lg transition-all cursor-pointer select-none text-left ${
                      isWordActiveInLine
                        ? 'bg-pink-100 text-pink-700 font-black ring-2 ring-pink-400 shadow-xs scale-105'
                        : 'text-slate-800 hover:bg-indigo-100/60 hover:text-indigo-800'
                    }`}
                    title={`Bấm để nghe phát âm riêng từ "${w}"`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>

            {/* Vietnamese Translation */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium italic border-t border-slate-200/60 pt-2">
              "{currentSingLine.vietnamese}"
            </p>
          </div>

          {/* ================= BIG TACTILE ACTION CONTROLS ================= */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            {/* Lùi lại 1 từ */}
            <button
              type="button"
              onClick={() => handleAdvanceSingWord(-1)}
              disabled={activeWordGlobalIndex === 0}
              className="px-3.5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
              title="Lùi 1 từ (Phím Backspace hoặc Mũi tên trái)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Lùi từ (←)</span>
            </button>

            {/* NÚT CHÍNH: BẤM ENTER ĐỂ CHUYỂN TỪ (KHÔNG TỰ PHÁT NHẠC) */}
            <button
              type="button"
              onClick={() => handleAdvanceSingWord(1)}
              className="flex-1 py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 active:scale-[0.98] text-white font-black text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer ring-4 ring-pink-300/30"
            >
              <div className="flex items-center gap-2">
                <CornerDownLeft className="w-5 h-5 stroke-[2.5]" />
                <span>BẤM ENTER ĐỂ HÁT TỪ TIẾP THEO</span>
              </div>
              <span className="text-[11px] font-normal text-pink-100 bg-black/25 px-2 py-0.5 rounded-md">
                Không tự phát nhạc • Tự do bắt nhịp
              </span>
            </button>

            {/* Nút tùy chọn 1: Đọc mẫu phát âm lời ca (P) */}
            <button
              type="button"
              onClick={handleSpeakCurrentLineSample}
              className={`px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                isSpeakingLyricSample
                  ? 'bg-amber-500 border-amber-600 text-white shadow-md ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white hover:bg-amber-50 border-amber-200 text-amber-800 shadow-2xs'
              }`}
              title="Nghe đọc mẫu câu tiếng Anh bằng giọng phát âm chuẩn (Phím P)"
            >
              <Volume2 className={`w-4 h-4 ${isSpeakingLyricSample ? 'animate-bounce' : 'text-amber-600'}`} />
              <span>{isSpeakingLyricSample ? 'Dừng đọc' : 'Đọc mẫu (P)'}</span>
            </button>

            {/* Nút tùy chọn 2: Nghe giai điệu câu này từ YouTube (M) */}
            <button
              type="button"
              onClick={handleToggleCurrentLineMelody}
              className={`px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                isPlayingMelodySnippet && isPlaying
                  ? 'bg-pink-600 border-pink-700 text-white shadow-md ring-2 ring-pink-300 animate-pulse'
                  : 'bg-white hover:bg-slate-50 border-indigo-200 text-indigo-700 shadow-2xs'
              }`}
              title="Nghe 10s giai điệu câu này từ video bài hát nếu bạn chưa nhớ điệu (Phím M)"
            >
              {isPlayingMelodySnippet && isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Dừng nhạc</span>
                </>
              ) : (
                <>
                  <Music className="w-4 h-4 text-pink-600" />
                  <span>Giai điệu (M)</span>
                </>
              )}
            </button>

            {/* Tiến tới 1 từ */}
            <button
              type="button"
              onClick={() => handleAdvanceSingWord(1)}
              disabled={activeWordGlobalIndex >= songSingWords.length - 1}
              className="px-3.5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
              title="Tiến 1 từ (Phím Mũi tên phải)"
            >
              <span className="hidden sm:inline">Tiến từ (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Shortcuts & Instruction Tip Box */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
            <div className="flex items-center gap-3 flex-wrap">
              <span>⌨️ Phím tắt:</span>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">Enter / Space: Hát từ tiếp</span>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">← / Backspace: Lùi từ</span>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">P: Nghe đọc mẫu lời</span>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">M: Nghe giai điệu (10s)</span>
            </div>
            <span className="italic text-slate-400">Mẹo: Bấm vào bất kỳ từ nào để nghe phát âm riêng từ đó!</span>
          </div>

          {/* Completion Celebration banner */}
          {singCompleted && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0">
                  🎉
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-extrabold">Chúc mừng! Bạn đã luyện hát trọn vẹn bài hát!</h4>
                  <p className="text-xs text-white/90">
                    Toàn bộ {songSingWords.length} từ trong bài "{song.title}" đã được bạn bắt nhịp xuất sắc.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveWordGlobalIndex(0);
                    setSingCompleted(false);
                    playAudioFeedback('click');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-all cursor-pointer shadow-sm"
                >
                  ↺ Luyện hát lại từ đầu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSongTab('karaoke');
                    playAudioFeedback('click');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-950/40 text-white font-bold text-xs hover:bg-slate-950/60 transition-all cursor-pointer border border-white/20"
                >
                  🎤 Sang Chế độ Karaoke
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
