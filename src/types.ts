export type NavigationTab = 
  | 'trang-chu' 
  | 'tu-vung' 
  | 'on-tap' 
  | 'lich-hoc' 
  | 'nhat-ky' 
  | 'thong-ke'
  | 'thu-gian';

export type LearningMode = 'flashcard' | 'spelling' | 'quiz';

export type SRSLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface DialogueLine {
  id: string;
  speaker: string;
  speakerAvatar?: string;
  english: string;
  vietnamese: string;
  timestampStart?: number;
  timestampEnd?: number;
  highlightWords?: string[];
}

export interface EntertainmentConversation {
  id: string;
  title: string;
  vietnameseTitle: string;
  level: CEFRLevel;
  category: 'daily' | 'work' | 'travel' | 'movie' | 'academic';
  categoryLabel: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  youtubeId?: string;
  description: string;
  dialogue: DialogueLine[];
  roles: {
    name: string;
    roleDescription: string;
    avatar: string;
  }[];
  keyVocabularies: {
    id: string;
    word: string;
    phonetic: string;
    partOfSpeech: string;
    vietnameseMeaning: string;
    exampleSentence: string;
    exampleVietnamese?: string;
    oxfordTier?: string;
  }[];
}

export interface LyricLine {
  id: string;
  timeStart: number;
  timeEnd: number;
  english: string;
  vietnamese: string;
  clozeWords?: {
    word: string;
    cleanWord: string;
    hint?: string;
    difficulty: CEFRLevel;
  }[];
}

export interface SongVocab {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  vietnameseMeaning: string;
  contextSentence: string;
  exampleSentence: string;
  oxfordTier: string;
}

export interface SongQuizQuestion {
  id: string;
  question: string;
  questionType: 'theme' | 'emotion' | 'metaphor' | 'vocab';
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EntertainmentSong {
  id: string;
  title: string;
  artist: string;
  level: CEFRLevel;
  genre: string;
  duration: number;
  coverUrl: string;
  audioUrl?: string;
  youtubeUrl?: string;
  youtubeId?: string;
  description: string;
  lyrics: LyricLine[];
  vocabularies: SongVocab[];
  quiz: SongQuizQuestion[];
}

export interface StudySessionFilter {
  type: 'unit' | 'subtopic';
  id: string;
  title: string;
  unitName?: string;
  subtopicNumber?: number;
  pages?: string;
}

export interface OxfordSubtopic {
  id: string;
  subtopicNumber: number;
  englishTitle: string;
  vietnameseTitle: string;
  pages: string;
}

export interface OxfordUnit {
  id: string;
  unitNumber: number;
  name: string;
  vietnameseName: string;
  pages: string;
  icon: string;
  color?: string;
  subtopics: OxfordSubtopic[];
}

export interface VocabWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  vietnameseMeaning: string;
  englishDefinition: string;
  exampleSentence: string;
  exampleVietnamese?: string;
  topic: string;
  subtopic?: string;
  unitId?: string;
  subtopicId?: string;
  level: SRSLevel;
  imageUrl: string;
  imageAlt?: string;
  dueStatus: 'overdue' | 'due_today' | 'upcoming' | 'mastered' | 'new' | 'learning';
  dueText: string;
  dueTime?: string;
  oxfordTier?: string; // e.g. 'B2', 'C1', 'B1'
  collocations?: string[];
  synonyms?: string[];
  retentionScore?: number; // e.g. 0.85
  nextReviewDays?: number;
  lastReviewed?: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  content: string;
  wordCount: number;
  targetWordsUsed: string[];
  newWordsCount: number;
}

export interface DailyGoal {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
}

export interface UserStats {
  streakDays: number;
  tier: number;
  dailyQuota: number;
  todayReviewed: number;
  todayDue: number;
  todayNew: number;
  retentionAccuracy: number;
  reactionSpeed: number;
  daysToC1: number;
  totalWords: number;
  levelCounts: {
    l0: number;
    l1_2: number;
    l3_4: number;
    l5: number;
  };
}
