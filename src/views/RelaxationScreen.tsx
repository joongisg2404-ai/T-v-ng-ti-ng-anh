import React, { useState } from 'react';
import { 
  EntertainmentConversation, 
  EntertainmentSong, 
  CEFRLevel, 
  VocabWord 
} from '../types';
import { 
  ENTERTAINMENT_CONVERSATIONS, 
  ENTERTAINMENT_SONGS 
} from '../data/entertainmentData';
import { ConversationPlayer } from '../components/ConversationPlayer';
import { SongKaraokePlayer } from '../components/SongKaraokePlayer';
import { 
  Tv, 
  Music, 
  Search, 
  Sparkles, 
  Play, 
  Clock, 
  Layers, 
  Plus, 
  Upload, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  X,
  FileText
} from 'lucide-react';

interface RelaxationScreenProps {
  onSaveWordToSRS: (word: Partial<VocabWord>) => void;
  onShowToast: (msg: string) => void;
}

export const RelaxationScreen: React.FC<RelaxationScreenProps> = ({
  onSaveWordToSRS,
  onShowToast,
}) => {
  const [mediaType, setMediaType] = useState<'conversation' | 'song'>('conversation');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | CEFRLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item to view/play
  const [activeConversation, setActiveConversation] = useState<EntertainmentConversation | null>(null);
  const [activeSong, setActiveSong] = useState<EntertainmentSong | null>(null);

  // Custom User Upload Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<'video' | 'song'>('video');
  const [customTitle, setCustomTitle] = useState('');
  const [customVietnameseTitle, setCustomVietnameseTitle] = useState('');
  const [customLevel, setCustomLevel] = useState<CEFRLevel>('A2');
  const [customContent, setCustomContent] = useState('');

  // Local state to store added items
  const [conversations, setConversations] = useState<EntertainmentConversation[]>(ENTERTAINMENT_CONVERSATIONS);
  const [songs, setSongs] = useState<EntertainmentSong[]>(ENTERTAINMENT_SONGS);

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    const matchLevel = selectedLevel === 'ALL' || c.level === selectedLevel;
    const matchQuery = !searchQuery.trim() || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vietnameseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchQuery;
  });

  // Filter songs
  const filteredSongs = songs.filter(s => {
    const matchLevel = selectedLevel === 'ALL' || s.level === selectedLevel;
    const matchQuery = !searchQuery.trim() || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchQuery;
  });

  const handleCreateCustomMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customContent.trim()) {
      onShowToast('Vui lòng nhập tiêu đề và nội dung!');
      return;
    }

    if (uploadCategory === 'video') {
      // Parse custom dialogue lines (format: Speaker: English | Vietnamese)
      const lines = customContent.split('\n').filter(l => l.trim().length > 0).map((rawLine, idx) => {
        const parts = rawLine.split('|');
        const englishPart = parts[0] || '';
        const vietnamesePart = parts[1] || '';
        
        let speaker = idx % 2 === 0 ? 'Person A' : 'Bạn (Person B)';
        let cleanEnglish = englishPart.trim();
        if (englishPart.includes(':')) {
          const sSplit = englishPart.split(':');
          speaker = sSplit[0].trim();
          cleanEnglish = sSplit.slice(1).join(':').trim();
        }

        return {
          id: `custom-dl-${idx}`,
          speaker,
          english: cleanEnglish,
          vietnamese: vietnamesePart.trim() || cleanEnglish,
          timestampStart: idx * 4,
          timestampEnd: (idx + 1) * 4,
        };
      });

      const newConv: EntertainmentConversation = {
        id: `custom-conv-${Date.now()}`,
        title: customTitle,
        vietnameseTitle: customVietnameseTitle || customTitle,
        level: customLevel,
        category: 'daily',
        categoryLabel: 'Nội dung tùy chỉnh',
        duration: '02:00',
        thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
        description: 'Cuộc hội thoại do bạn tải lên để luyện tập phản xạ dịch thuật.',
        roles: [
          { name: 'Person A', roleDescription: 'Nhân vật đối thoại', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
          { name: 'Bạn (Person B)', roleDescription: 'Nhân vật bạn đóng vai', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' },
        ],
        dialogue: lines.length > 0 ? lines : [
          { id: '1', speaker: 'Person A', english: 'Hello, how can I help you today?', vietnamese: 'Xin chào, tôi có thể giúp gì cho bạn hôm nay?' },
          { id: '2', speaker: 'Bạn (Person B)', english: 'I would like to practice speaking English.', vietnamese: 'Tôi muốn thực hành nói tiếng Anh.' }
        ],
        keyVocabularies: [
          {
            id: 'cv-1',
            word: 'practice',
            phonetic: 'ˈpræk.tɪs',
            partOfSpeech: 'verb',
            vietnameseMeaning: 'thực hành, luyện tập',
            exampleSentence: 'Practice makes perfect.',
            exampleVietnamese: 'Có công mài sắt có ngày nên kim.',
            oxfordTier: 'A1',
          }
        ]
      };

      setConversations(prev => [newConv, ...prev]);
      setActiveConversation(newConv);
      setShowUploadModal(false);
      onShowToast(`Đã thêm thành công cuộc hội thoại: "${newConv.title}"!`);
    } else {
      // Parse custom song lyrics
      const rawLines = customContent.split('\n').filter(l => l.trim().length > 0);
      const lyrics = rawLines.map((l, idx) => {
        const parts = l.split('|');
        const en = parts[0]?.trim() || '';
        const vi = parts[1]?.trim() || en;
        const words = en.split(' ').filter(w => w.length > 4);
        const clozeWord = words[0] || 'music';

        return {
          id: `c-lyric-${idx}`,
          timeStart: idx * 8,
          timeEnd: (idx + 1) * 8,
          english: en,
          vietnamese: vi,
          clozeWords: [
            {
              word: clozeWord,
              cleanWord: clozeWord.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, ''),
              hint: 'từ vựng',
              difficulty: customLevel,
            }
          ]
        };
      });

      const newSong: EntertainmentSong = {
        id: `custom-song-${Date.now()}`,
        title: customTitle,
        artist: 'Nghệ sĩ bạn yêu thích',
        level: customLevel,
        genre: 'Acoustic / Pop',
        duration: Math.max(120, lyrics.length * 8),
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        description: 'Bài hát do bạn tự thêm để học qua lời bài hát và điền từ khuyết.',
        lyrics: lyrics.length > 0 ? lyrics : [
          { id: '1', timeStart: 0, timeEnd: 8, english: 'Music brings joy to everyone.', vietnamese: 'Âm nhạc mang lại niềm vui cho mọi người.' }
        ],
        vocabularies: [
          {
            id: 'csv-1',
            word: 'melody',
            phonetic: 'ˈmel.ə.di',
            partOfSpeech: 'noun',
            vietnameseMeaning: 'giai điệu bài hát',
            contextSentence: 'Music brings joy to everyone.',
            exampleSentence: 'She hummed a cheerful melody.',
            oxfordTier: 'A2',
          }
        ],
        quiz: [
          {
            id: 'cq-1',
            question: 'Bạn cảm thấy thông điệp bài hát này như thế nào?',
            questionType: 'theme',
            options: ['Tươi vui, tích cực', 'Trầm lắng, sâu sắc', 'Hùng tráng', 'Thư giãn'],
            correctIndex: 0,
            explanation: 'Mỗi bài hát đều mang lại góc nhìn và nguồn cảm hứng riêng biệt.'
          }
        ]
      };

      setSongs(prev => [newSong, ...prev]);
      setActiveSong(newSong);
      setShowUploadModal(false);
      onShowToast(`Đã thêm thành công bài hát: "${newSong.title}"!`);
    }
  };

  // If viewing a conversation
  if (activeConversation) {
    return (
      <ConversationPlayer
        conversation={activeConversation}
        onBack={() => setActiveConversation(null)}
        onSaveWordToSRS={onSaveWordToSRS}
        onShowToast={onShowToast}
      />
    );
  }

  // If viewing a song
  if (activeSong) {
    return (
      <SongKaraokePlayer
        song={activeSong}
        onBack={() => setActiveSong(null)}
        onSaveWordToSRS={onSaveWordToSRS}
        onShowToast={onShowToast}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Top Welcome & Navigation Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#3525cd] uppercase tracking-wider">
            Thư giãn & Học tập đa giác quan
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900">
            Góc Thư Giãn (Xem Phim & Nghe Nhạc)
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Học tiếng Anh tự nhiên qua trích đoạn phim, đóng vai hội thoại phản xạ và karaoke song ngữ cuộn theo lời.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Thêm bài hát / video của bạn</span>
        </button>
      </div>

      {/* Main Mode Toggle Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-[#dae2fd] shadow-xs">
        {/* Left: Type Pill */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setMediaType('conversation')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mediaType === 'conversation'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Xem Phim & Luyện Hội Thoại ({conversations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setMediaType('song')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mediaType === 'song'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Nghe Nhạc & Lời Bài Hát ({songs.length})</span>
          </button>
        </div>

        {/* Right: Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={mediaType === 'conversation' ? 'Tìm cuộc hội thoại...' : 'Tìm bài hát, nghệ sĩ...'}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3525cd] focus:bg-white text-slate-900 font-medium"
          />
        </div>
      </div>

      {/* Level Filters (A1 to B2) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0">Cấp độ CEFR:</span>
        {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => (
          <button
            key={lvl}
            type="button"
            onClick={() => setSelectedLevel(lvl)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedLevel === lvl
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {lvl === 'ALL' ? 'Tất cả cấp độ' : `Cấp độ ${lvl}`}
          </button>
        ))}
      </div>

      {/* ================= VIEW 1: CONVERSATIONS LIST ================= */}
      {mediaType === 'conversation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className="group bg-white rounded-3xl border border-[#dae2fd] overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all flex flex-col"
            >
              {/* Thumbnail header */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={conv.thumbnailUrl}
                  alt={conv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    conv.level === 'A1' ? 'bg-emerald-500 text-white' :
                    conv.level === 'A2' ? 'bg-teal-500 text-white' :
                    conv.level === 'B1' ? 'bg-indigo-600 text-white' :
                    'bg-purple-600 text-white'
                  }`}>
                    {conv.level}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-xs text-white font-medium">
                    {conv.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs flex items-center gap-1 font-medium text-slate-200">
                    <Clock className="w-3.5 h-3.5" />
                    {conv.duration}
                  </span>
                  <span className="text-xs flex items-center gap-1 font-medium text-slate-200">
                    <Users className="w-3.5 h-3.5" />
                    {conv.roles.length} nhân vật đóng vai
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline text-base font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors line-clamp-1">
                    {conv.title}
                  </h3>
                  <p className="text-xs text-[#006c49] font-semibold">
                    {conv.vietnameseTitle}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                    {conv.description}
                  </p>
                </div>

                {/* Key Vocabs Preview */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Từ vựng:</span>
                  {conv.keyVocabularies.slice(0, 3).map(v => (
                    <span
                      key={v.id}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-[#3525cd] font-semibold"
                    >
                      {v.word}
                    </span>
                  ))}
                  {conv.keyVocabularies.length > 3 && (
                    <span className="text-[10px] text-slate-400">+{conv.keyVocabularies.length - 3}</span>
                  )}
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => setActiveConversation(conv)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#3525cd] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Xem kịch bản & Đóng vai luyện dịch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= VIEW 2: SONGS LIST ================= */}
      {mediaType === 'song' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSongs.map(song => (
            <div
              key={song.id}
              className="group bg-white rounded-3xl border border-[#dae2fd] overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    song.level === 'A1' ? 'bg-emerald-500 text-white' :
                    song.level === 'A2' ? 'bg-teal-500 text-white' :
                    song.level === 'B1' ? 'bg-indigo-600 text-white' :
                    'bg-purple-600 text-white'
                  }`}>
                    {song.level}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/50 text-white font-medium">
                    {song.genre}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs text-slate-200">
                    {song.artist}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    {Math.floor(song.duration / 60)}:{(song.duration % 60) < 10 ? '0' : ''}{song.duration % 60}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline text-base font-bold text-slate-900 group-hover:text-[#3525cd] transition-colors line-clamp-1">
                    {song.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {song.description}
                  </p>
                </div>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-600 pt-2 border-t border-slate-100">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                    🎤 Karaoke cuộn
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                    🧩 Điền từ Cloze
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
                    ⭐ {song.vocabularies.length} từ vựng
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSong(song)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#3525cd] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe nhạc & Luyện karaoke</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-xl w-full p-6 sm:p-8 flex flex-col gap-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#3525cd]" />
                <h3 className="font-headline text-lg font-bold text-slate-900">
                  Tải lên bài hát hoặc trích đoạn phim của bạn
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomMedia} className="flex flex-col gap-4">
              {/* Type selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUploadCategory('video')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    uploadCategory === 'video'
                      ? 'bg-indigo-50 border-[#3525cd] text-[#3525cd]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  🎬 Cuộc hội thoại / Video ngắn
                </button>
                <button
                  type="button"
                  onClick={() => setUploadCategory('song')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    uploadCategory === 'song'
                      ? 'bg-pink-50 border-pink-600 text-pink-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  🎵 Bài hát & Lời karaoke
                </button>
              </div>

              {/* Title inputs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700">Tên tiếng Anh *</label>
                  <input
                    type="text"
                    required
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Ví dụ: Friends Episode 1 / Perfect Song"
                    className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#3525cd]"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700">Tên dịch tiếng Việt</label>
                  <input
                    type="text"
                    value={customVietnameseTitle}
                    onChange={(e) => setCustomVietnameseTitle(e.target.value)}
                    placeholder="Ví dụ: Tập 1 Phim Những Người Bạn"
                    className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#3525cd]"
                  />
                </div>
              </div>

              {/* Level select */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-700">Cấp độ phù hợp:</label>
                {(['A1', 'A2', 'B1', 'B2'] as const).map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setCustomLevel(l)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      customLevel === l
                        ? 'bg-[#3525cd] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Content text area */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">
                  {uploadCategory === 'video' 
                    ? 'Nội dung kịch bản (định dạng: Tiếng Anh | Tiếng Việt mỗi dòng):'
                    : 'Lời bài hát (định dạng: Câu tiếng Anh | Lời dịch tiếng Việt mỗi dòng):'}
                </label>
                <textarea
                  rows={6}
                  required
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                  placeholder={
                    uploadCategory === 'video'
                      ? "Hi, how can I help you today? | Chào bạn, tôi có thể giúp gì cho bạn hôm nay?\nCould I get a coffee? | Cho tôi một ly cà phê nhé?"
                      : "I see trees of green, red roses too | Tôi thấy những hàng cây xanh, và cả hoa hồng đỏ\nI see them bloom for me and you | Tôi thấy chúng nở hoa vì bạn và vì tôi"
                  }
                  className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#3525cd] font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                >
                  Lưu & Học ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
