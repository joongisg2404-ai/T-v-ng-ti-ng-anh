import { VocabWord, OxfordSubtopic, OxfordUnit } from '../types';
import { CLASSROOM_WORDS } from './classroomWords';
import { PERSONAL_INFO_WORDS } from './personalInfoWords';
import { SCHOOL_WORDS } from './schoolWords';
import { STUDYING_WORDS } from './studyingWords';

/**
 * Sample vocabulary templates for Oxford Picture Dictionary subtopics
 * Provides authentic, bilingual Oxford dictionary items for immediate study.
 */
export const generateSampleWordsForSubtopic = (
  subtopic: OxfordSubtopic,
  unit: OxfordUnit
): VocabWord[] => {
  const timestamp = Date.now();
  const subNum = subtopic.subtopicNumber;
  const unitNum = unit.unitNumber;

  // Authentic 39 Oxford Picture Dictionary items for Unit 1, Lesson 1: A Classroom
  if (unitNum === 1 && subNum === 1) {
    return CLASSROOM_WORDS.map((w, idx) => ({
      ...w,
      id: `opd-1-1-${idx}-${timestamp}`,
      topic: `${unit.name} (${unit.vietnameseName})`,
      subtopic: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      unitId: unit.id,
      subtopicId: subtopic.id,
    }));
  }

  // Authentic 16 Oxford Picture Dictionary items for Unit 1, Lesson 2: Personal Information (Lý Lịch)
  if (unitNum === 1 && subNum === 2) {
    return PERSONAL_INFO_WORDS.map((w, idx) => ({
      ...w,
      id: `opd-1-2-${idx}-${timestamp}`,
      topic: `${unit.name} (${unit.vietnameseName})`,
      subtopic: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      unitId: unit.id,
      subtopicId: subtopic.id,
    }));
  }

  // Authentic 18 Oxford Picture Dictionary items for Unit 1, Lesson 3: School (Trường Học)
  if (unitNum === 1 && subNum === 3) {
    return SCHOOL_WORDS.map((w, idx) => ({
      ...w,
      id: `opd-1-3-${idx}-${timestamp}`,
      topic: `${unit.name} (${unit.vietnameseName})`,
      subtopic: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      unitId: unit.id,
      subtopicId: subtopic.id,
    }));
  }

  // Authentic 26 Oxford Picture Dictionary items for Unit 1, Lesson 4: Studying (Học - A to Z)
  if (unitNum === 1 && subNum === 4) {
    return STUDYING_WORDS.map((w, idx) => ({
      ...w,
      id: `opd-1-4-${idx}-${timestamp}`,
      topic: `${unit.name} (${unit.vietnameseName})`,
      subtopic: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      unitId: unit.id,
      subtopicId: subtopic.id,
    }));
  }

  // Curated samples for various units/subtopics
  const wordPresets: Record<string, Array<Omit<VocabWord, 'id' | 'topic' | 'subtopic' | 'unitId' | 'subtopicId' | 'level' | 'dueStatus' | 'dueText' | 'retentionScore' | 'nextReviewDays'>>> = {
    // Unit 1: Everyday Language
    '1-1': [ // A Classroom
      {
        word: 'Whiteboard',
        phonetic: '/ˈwaɪt.bɔːd/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Bảng trắng viết bút dạ',
        englishDefinition: 'A smooth, white board that can be written or drawn on with special marker pens and easily wiped clean.',
        exampleSentence: 'The teacher wrote the lesson objectives on the magnetic whiteboard.',
        exampleVietnamese: 'Giáo viên viết mục tiêu bài học lên bảng trắng từ tính.',
        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Bảng trắng lớp học',
        oxfordTier: 'A1',
        collocations: ['write on the whiteboard', 'erase the whiteboard'],
      },
      {
        word: 'Projector',
        phonetic: '/prəˈdʒek.tər/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Máy chiếu bài giảng',
        englishDefinition: 'An optical device that projects an image or video onto a screen.',
        exampleSentence: 'Turn on the overhead projector so everyone can see the vocabulary presentation slides.',
        exampleVietnamese: 'Bật máy chiếu lên để mọi người cùng xem các slide bài giảng từ vựng.',
        imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Máy chiếu lớp học',
        oxfordTier: 'A2',
        collocations: ['overhead projector', 'digital projector'],
      },
      {
        word: 'Desk',
        phonetic: '/desk/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Bàn học của học sinh',
        englishDefinition: 'A piece of furniture with a flat surface used for reading, writing, or studying.',
        exampleSentence: 'Please keep your student desk neat and organized during the examination.',
        exampleVietnamese: 'Xin vui lòng giữ bàn học gọn gàng và ngăn nắp trong suốt giờ thi.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Bàn học sinh trong lớp',
        oxfordTier: 'A1',
        collocations: ['sit at a desk', 'school desk'],
      }
    ],
    '1-2': [ // Personal Information
      {
        word: 'Signature',
        phonetic: '/ˈsɪɡ.nə.tʃər/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Chữ ký cá nhân trên giấy tờ',
        englishDefinition: 'Your name written in your own personal style on a document to authorize or confirm it.',
        exampleSentence: 'Please place your signature at the bottom right corner of the registration form.',
        exampleVietnamese: 'Vui lòng ký tên của bạn vào góc dưới cùng bên phải của mẫu đăng ký.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Chữ ký trên tài liệu',
        oxfordTier: 'A2',
        collocations: ['digital signature', 'put your signature'],
      },
      {
        word: 'Date of birth',
        phonetic: '/deɪt əv bɜːθ/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Ngày tháng năm sinh',
        englishDefinition: 'The day, month, and year on which a person was born.',
        exampleSentence: 'Fill in your exact date of birth as recorded on your national passport.',
        exampleVietnamese: 'Điền chính xác ngày tháng năm sinh như ghi trên hộ chiếu quốc gia của bạn.',
        imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Lịch ngày sinh',
        oxfordTier: 'A1',
        collocations: ['verify date of birth', 'place of birth'],
      }
    ],
    '1-3': [ // School
      {
        word: 'Principal',
        phonetic: '/ˈprɪn.sə.pəl/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Hiệu trưởng trường học',
        englishDefinition: 'The person in charge of a school or educational college.',
        exampleSentence: 'The school principal delivered an inspiring welcome speech on opening day.',
        exampleVietnamese: 'Thầy hiệu trưởng đã có bài phát biểu chào mừng đầy cảm hứng trong ngày khai giảng.',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Hiệu trưởng trường học',
        oxfordTier: 'B1',
        collocations: ['school principal', 'assistant principal'],
      },
      {
        word: 'Auditorium',
        phonetic: '/ˌɔː.dɪˈtɔː.ri.əm/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Giảng đường lớn, hội trường trường học',
        englishDefinition: 'A large building or hall used for school assemblies, concerts, and lectures.',
        exampleSentence: 'The entire student body gathered in the school auditorium for the awards ceremony.',
        exampleVietnamese: 'Toàn thể học sinh tập trung tại hội trường của trường để tham dự lễ trao giải.',
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Hội trường lớn của trường',
        oxfordTier: 'B2',
        collocations: ['school auditorium', 'seated in the auditorium'],
      }
    ],
    '2-1': [ // Adults and Children
      {
        word: 'Toddler',
        phonetic: '/ˈtɒd.lər/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Trẻ chập chững biết đi (1-3 tuổi)',
        englishDefinition: 'A young child who is just beginning to learn how to walk.',
        exampleSentence: 'The toddler took her first unsteady steps across the living room carpet.',
        exampleVietnamese: 'Đứa trẻ chập chững bước những bước đi đầu tiên chưa vững trên tấm thảm phòng khách.',
        imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Em bé chập chững biết đi',
        oxfordTier: 'B1',
        collocations: ['active toddler', 'toddler playgroup'],
      }
    ],
    '3-1': [ // The Home
      {
        word: 'Porch',
        phonetic: '/pɔːtʃ/',
        partOfSpeech: 'noun [C]',
        vietnameseMeaning: 'Hiên nhà, hàng ba phía trước cửa',
        englishDefinition: 'A covered shelter projecting in front of the entrance of a building.',
        exampleSentence: 'We enjoyed drinking cold iced tea on the front porch during sunset.',
        exampleVietnamese: 'Chúng tôi thưởng thức trà đá mát lạnh ở hiên trước nhà khi hoàng hôn buông xuống.',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
        imageAlt: 'Hiên trước ngôi nhà ấm cúng',
        oxfordTier: 'B1',
        collocations: ['front porch', 'back porch'],
      }
    ],
  };

  const key = `${unitNum}-${subNum}`;
  const presets = wordPresets[key];

  if (presets && presets.length > 0) {
    return presets.map((p, idx) => ({
      ...p,
      id: `opd-${unitNum}-${subNum}-${idx}-${timestamp}`,
      topic: `${unit.name} (${unit.vietnameseName})`,
      subtopic: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      unitId: unit.id,
      subtopicId: subtopic.id,
      level: 0,
      dueStatus: 'due_today',
      dueText: 'Hôm nay',
      retentionScore: 0.5,
      nextReviewDays: 1,
    }));
  }

  // Fallback authentic generative items based on subtopic titles
  const cleanEn = subtopic.englishTitle;
  const cleanVn = subtopic.vietnameseTitle;

  return [
    {
      id: `opd-${unitNum}-${subNum}-sample1-${timestamp}`,
      word: cleanEn.split(' ')[0] || 'Vocabulary item',
      phonetic: `/${(cleanEn.split(' ')[0] || 'word').toLowerCase()}/`,
      partOfSpeech: 'noun [C]',
      vietnameseMeaning: cleanVn,
      englishDefinition: `Key vocabulary term from Oxford Picture Dictionary topic: ${cleanEn}`,
      exampleSentence: `Practice pronouncing and using the word in sentences related to ${cleanEn}.`,
      exampleVietnamese: `Luyện phát âm và đặt câu với chủ đề "${cleanVn}".`,
      topic: `${unit.name} (${unit.vietnameseName})`,
      subtopic: `${subtopic.englishTitle} (${subtopic.vietnameseTitle})`,
      unitId: unit.id,
      subtopicId: subtopic.id,
      level: 0,
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=80',
      imageAlt: `Hình ảnh minh họa cho ${cleanEn}`,
      dueStatus: 'due_today',
      dueText: 'Hôm nay',
      oxfordTier: 'B1',
      retentionScore: 0.5,
      nextReviewDays: 1,
    }
  ];
};
