import { EntertainmentConversation, EntertainmentSong } from '../types';

export const ENTERTAINMENT_CONVERSATIONS: EntertainmentConversation[] = [
  {
    id: 'conv-vietnam-culture',
    title: 'Exploring Vietnam: People, Culture & Daily Life',
    vietnameseTitle: 'Khám phá Việt Nam: Con người, Văn hóa & Đời sống thường nhật',
    level: 'A2',
    category: 'travel',
    categoryLabel: 'Văn hóa & Du lịch',
        duration: '05:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/4ycKrWTvzNY?si=YBaN3uv73Wu4k7fd',
    youtubeId: '4ycKrWTvzNY',
    description: 'Cuộc trò chuyện giữa Mark và Lily khi đặt chân đến Việt Nam: ấn tượng về sự thân thiện, hiếu khách, ẩm thực đường phố, giá trị gia đình, nghề trồng lúa nước, ngày Tết cổ truyền và nghệ thuật múa rối nước.',
    roles: [
      {
        name: 'Mark (Du khách)',
        roleDescription: 'Du khách hào hứng khám phá nét đẹp văn hóa Việt Nam',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'Lily (Bạn đồng hành)',
        roleDescription: 'Người bạn đồng hành yêu mến con người và phong tục bản xứ',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      }
    ],
    dialogue: [
      {
        id: 'd-vn-1',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Hi, Lily. How are you today?',
        vietnamese: 'Chào Lily. Hôm nay bạn thế nào?',
        timestampStart: 52,
        timestampEnd: 56,
      },
      {
        id: 'd-vn-2',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: "I'm good, Mark. Thanks. And you?",
        vietnamese: 'Tôi khỏe, Mark. Cảm ơn nhé. Còn bạn thì sao?',
        timestampStart: 56,
        timestampEnd: 61,
      },
      {
        id: 'd-vn-3',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: "I'm great. We are in Vietnam now. I love it here.",
        vietnamese: 'Tôi tuyệt lắm. Bây giờ chúng ta đang ở Việt Nam rồi. Tôi rất yêu nơi này.',
        timestampStart: 61,
        timestampEnd: 66,
      },
      {
        id: 'd-vn-4',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Yes, me too. The people are so nice.',
        vietnamese: 'Vâng, tôi cũng vậy. Con người ở đây thật tốt bụng.',
        timestampStart: 66,
        timestampEnd: 72,
      },
      {
        id: 'd-vn-5',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'What do you mean? Tell me more.',
        vietnamese: 'Ý bạn là sao? Kể thêm cho tôi nghe đi.',
        timestampStart: 72,
        timestampEnd: 76,
      },
      {
        id: 'd-vn-6',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Vietnamese people are friendly. They smile a lot.',
        vietnamese: 'Người Việt Nam rất thân thiện. Họ cười rất nhiều.',
        timestampStart: 76,
        timestampEnd: 83,
      },
      {
        id: 'd-vn-7',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Oh yes, they help strangers like us, right? For example, yesterday a lady showed me the way to the market.',
        vietnamese: 'Ồ đúng vậy, họ giúp đỡ những người lạ như chúng ta, phải không? Ví dụ hôm qua một người phụ nữ đã chỉ đường cho tôi đến chợ.',
        timestampStart: 83,
        timestampEnd: 96,
      },
      {
        id: 'd-vn-8',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: "That's kind. What else?",
        vietnamese: 'Thật tốt bụng. Còn gì nữa không?',
        timestampStart: 96,
        timestampEnd: 99,
      },
      {
        id: 'd-vn-9',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'They work hard every day.',
        vietnamese: 'Họ làm việc rất chăm chỉ mỗi ngày.',
        timestampStart: 99,
        timestampEnd: 104,
      },
      {
        id: 'd-vn-10',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Like what? Give me an example.',
        vietnamese: 'Như thế nào? Cho tôi một ví dụ xem nào.',
        timestampStart: 104,
        timestampEnd: 108,
      },
      {
        id: 'd-vn-11',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Many people ride bikes to work early in the morning.',
        vietnamese: 'Nhiều người đi xe đạp đi làm từ sáng sớm.',
        timestampStart: 108,
        timestampEnd: 113,
      },
      {
        id: 'd-vn-12',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'I see that they sell food on the streets.',
        vietnamese: 'Tôi thấy họ bán đồ ăn trên các con phố.',
        timestampStart: 113,
        timestampEnd: 118,
      },
      {
        id: 'd-vn-13',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Yes, street food is famous here.',
        vietnamese: 'Đúng vậy, ẩm thực đường phố ở đây rất nổi tiếng.',
        timestampStart: 118,
        timestampEnd: 123,
      },
      {
        id: 'd-vn-14',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'What is Vietnamese people like in family?',
        vietnamese: 'Người Việt Nam trong gia đình thì như thế nào?',
        timestampStart: 123,
        timestampEnd: 127,
      },
      {
        id: 'd-vn-15',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'They love family a lot. They eat together every night.',
        vietnamese: 'Họ rất yêu thương gia đình. Họ ăn cơm cùng nhau mỗi tối.',
        timestampStart: 127,
        timestampEnd: 133,
      },
      {
        id: 'd-vn-16',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: "That's nice. In my country, sometimes we eat alone. Here, family is important. They take care of old parents.",
        vietnamese: 'Thật tuyệt. Ở nước tôi, đôi khi chúng tôi ăn một mình. Ở đây, gia đình rất quan trọng. Họ chăm sóc cha mẹ già.',
        timestampStart: 133,
        timestampEnd: 147,
      },
      {
        id: 'd-vn-17',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Good value. Where do most Vietnamese people live?',
        vietnamese: 'Giá trị thật tốt đẹp. Hầu hết người Việt Nam sinh sống ở đâu?',
        timestampStart: 147,
        timestampEnd: 150,
      },
      {
        id: 'd-vn-18',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Many live in big cities like Hanoi or Ho Chi Min City. But some live in villages, right?',
        vietnamese: 'Nhiều người sống ở các thành phố lớn như Hà Nội hay TP. Hồ Chí Minh. Nhưng một số sống ở làng quê, đúng không?',
        timestampStart: 150,
        timestampEnd: 160,
      },
      {
        id: 'd-vn-19',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Yes, in the countryside. They grow rice there.',
        vietnamese: 'Đúng rồi, ở vùng nông thôn. Họ trồng lúa ở đó.',
        timestampStart: 160,
        timestampEnd: 168,
      },
      {
        id: 'd-vn-20',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'How does that work?',
        vietnamese: 'Công việc đó diễn ra thế nào?',
        timestampStart: 168,
        timestampEnd: 170,
      },
      {
        id: 'd-vn-21',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: "Farmers plant rice in fields with water. It's hard work, but beautiful.",
        vietnamese: 'Những người nông dân cấy lúa trên các cánh đồng ngập nước. Đó là công việc vất vả, nhưng rất đẹp.',
        timestampStart: 170,
        timestampEnd: 179,
      },
      {
        id: 'd-vn-22',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'When does the rice harvest happen?',
        vietnamese: 'Mùa gặt lúa diễn ra vào khi nào?',
        timestampStart: 179,
        timestampEnd: 184,
      },
      {
        id: 'd-vn-23',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'I think two times a year in spring and fall.',
        vietnamese: 'Tôi nghĩ là hai lần một năm vào mùa xuân và mùa thu.',
        timestampStart: 184,
        timestampEnd: 189,
      },
      {
        id: 'd-vn-24',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: "Yes. It's interesting to watch. What is fun about Vietnamese people?",
        vietnamese: 'Vâng. Thật thú vị khi quan sát. Có điều gì vui vẻ ở con người Việt Nam?',
        timestampStart: 189,
        timestampEnd: 195,
      },
      {
        id: 'd-vn-25',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'They like festivals like Tet holiday.',
        vietnamese: 'Họ thích những lễ hội như dịp Tết nguyên đán.',
        timestampStart: 195,
        timestampEnd: 204,
      },
      {
        id: 'd-vn-26',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'What is Tet?',
        vietnamese: 'Tết là gì vậy?',
        timestampStart: 204,
        timestampEnd: 206,
      },
      {
        id: 'd-vn-27',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: "It's the new year. It happens in January or February.",
        vietnamese: 'Đó là dịp năm mới. Tết diễn ra vào tháng Giêng hoặc tháng Hai.',
        timestampStart: 206,
        timestampEnd: 213,
      },
      {
        id: 'd-vn-28',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'What do they do?',
        vietnamese: 'Họ làm gì vào dịp đó?',
        timestampStart: 213,
        timestampEnd: 214,
      },
      {
        id: 'd-vn-29',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'They clean houses, make special food, and visit family.',
        vietnamese: 'Họ dọn dẹp nhà cửa, làm những món ăn đặc biệt và thăm hỏi gia đình.',
        timestampStart: 214,
        timestampEnd: 222,
      },
      {
        id: 'd-vn-30',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Sounds happy. Fireworks, too.',
        vietnamese: 'Nghe thật vui vẻ. Có cả pháo hoa nữa.',
        timestampStart: 222,
        timestampEnd: 225,
      },
      {
        id: 'd-vn-31',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Yes. And lion dances.',
        vietnamese: 'Đúng rồi. Và cả múa lân nữa.',
        timestampStart: 225,
        timestampEnd: 230,
      },
      {
        id: 'd-vn-32',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Cool. Vietnamese people are creative. They make art like water puppets.',
        vietnamese: 'Tuyệt thật. Người Việt Nam rất sáng tạo. Họ làm nghệ thuật như múa rối nước.',
        timestampStart: 230,
        timestampEnd: 239,
      },
      {
        id: 'd-vn-33',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'What are water puppets?',
        vietnamese: 'Múa rối nước là gì thế?',
        timestampStart: 239,
        timestampEnd: 241,
      },
      {
        id: 'd-vn-34',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Puppets on water that tell stories.',
        vietnamese: 'Những con rối trên mặt nước kể các câu chuyện tích.',
        timestampStart: 241,
        timestampEnd: 247,
      },
      {
        id: 'd-vn-35',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Where can we see that? in Hanoi at the theater.',
        vietnamese: 'Chúng ta có thể xem nghệ thuật đó ở đâu? Ở Hà Nội tại nhà hát.',
        timestampStart: 247,
        timestampEnd: 253,
      },
      {
        id: 'd-vn-36',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: "Let's go. It's unique.",
        vietnamese: 'Đi xem thôi. Thật độc đáo.',
        timestampStart: 253,
        timestampEnd: 256,
      },
      {
        id: 'd-vn-37',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Vietnamese people are also good at sports.',
        vietnamese: 'Người Việt Nam cũng rất giỏi thể thao.',
        timestampStart: 256,
        timestampEnd: 263,
      },
      {
        id: 'd-vn-38',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Like what?',
        vietnamese: 'Như môn nào vậy?',
        timestampStart: 263,
        timestampEnd: 264,
      },
      {
        id: 'd-vn-39',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Football is popular. They play in parks.',
        vietnamese: 'Bóng đá rất phổ biến. Họ chơi trong các công viên.',
        timestampStart: 264,
        timestampEnd: 271,
      },
      {
        id: 'd-vn-40',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: "Yes, with ice. It's tasty. And they love coffee. They drink it strong.",
        vietnamese: 'Đúng vậy, cà phê với đá. Rất ngon. Và họ rất mê cà phê. Họ uống cà phê đậm đặc.',
        timestampStart: 271,
        timestampEnd: 280,
      },
      {
        id: 'd-vn-41',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'their smile and hospitality.',
        vietnamese: 'Nụ cười và lòng hiếu khách của họ.',
        timestampStart: 280,
        timestampEnd: 283,
      },
      {
        id: 'd-vn-42',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'What do you think is the best thing?',
        vietnamese: 'Bạn nghĩ điều gì là tuyệt vời nhất?',
        timestampStart: 283,
        timestampEnd: 288,
      },
      {
        id: 'd-vn-43',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'I agree. Vietnam is great because of the people.',
        vietnamese: 'Tôi đồng ý. Việt Nam tuyệt vời là vì con người nơi đây.',
        timestampStart: 288,
        timestampEnd: 294,
      },
      {
        id: 'd-vn-44',
        speaker: 'Lily',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Yes, they make you feel welcome.',
        vietnamese: 'Vâng, họ làm cho bạn cảm thấy luôn được chào đón.',
        timestampStart: 294,
        timestampEnd: 299,
      },
      {
        id: 'd-vn-45',
        speaker: 'Mark',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Good idea. Bye for now.',
        vietnamese: 'Ý hay đấy. Tạm biệt nhé.',
        timestampStart: 299,
        timestampEnd: 305,
      },
    ],
    keyVocabularies: [
      {
        id: 'vocab-vn-1',
        word: 'hospitality',
        phonetic: 'ˌhɒs.pɪˈtæl.ə.ti',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'lòng hiếu khách, sự đón tiếp nồng hậu và ấm áp',
        exampleSentence: 'Vietnamese hospitality makes international tourists feel right at home.',
        exampleVietnamese: 'Lòng hiếu khách của người Việt giúp du khách quốc tế cảm thấy ấm cúng như ở nhà.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-vn-2',
        word: 'stranger',
        phonetic: 'ˈstreɪn.dʒər',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'người lạ, người chưa từng quen biết',
        exampleSentence: 'A kind local helped the stranger find the way to the old market.',
        exampleVietnamese: 'Một người dân địa phương tốt bụng đã giúp người lạ tìm đường đến khu chợ cũ.',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-vn-3',
        word: 'harvest',
        phonetic: 'ˈhɑː.vɪst',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'mùa thu hoạch, vụ mùa gặt hái nông sản',
        exampleSentence: 'The autumn rice harvest fills the northern valleys with golden color.',
        exampleVietnamese: 'Vụ thu hoạch lúa mùa thu nhuộm vàng rực rỡ khắp các thung lũng miền Bắc.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-vn-4',
        word: 'puppet',
        phonetic: 'ˈpʌp.ɪt',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'con rối (trong nghệ thuật biểu diễn)',
        exampleSentence: 'Traditional water puppets tell ancient folk stories over the pool.',
        exampleVietnamese: 'Múa rối nước truyền thống kể lại những câu chuyện dân gian cổ trên mặt hồ.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-vn-5',
        word: 'unique',
        phonetic: 'juːˈniːk',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'độc đáo, đặc sắc, độc nhất vô nhị',
        exampleSentence: 'Water puppetry is a unique cultural heritage of Vietnam.',
        exampleVietnamese: 'Múa rối nước là một di sản văn hóa độc đáo của Việt Nam.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-vn-6',
        word: 'creative',
        phonetic: 'kriˈeɪ.tɪv',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'sáng tạo, giàu sức tưởng tượng và nghệ thuật',
        exampleSentence: 'The craftsmen are very creative in carving wooden puppets.',
        exampleVietnamese: 'Các nghệ nhân rất sáng tạo khi đục đẽo những con rối gỗ.',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-vn-7',
        word: 'countryside',
        phonetic: 'ˈkʌn.tri.saɪd',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'vùng nông thôn, miền quê',
        exampleSentence: 'Life in the Vietnamese countryside is peaceful with endless green rice fields.',
        exampleVietnamese: 'Cuộc sống ở vùng nông thôn Việt Nam rất yên bình với những cánh đồng lúa xanh ngút ngàn.',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-vn-8',
        word: 'value',
        phonetic: 'ˈvæl.juː',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'giá trị đạo đức, nét đẹp truyền thống đáng quý',
        exampleSentence: 'Respecting elders and loving family are core values in Vietnamese culture.',
        exampleVietnamese: 'Kính trọng người lớn tuổi và yêu thương gia đình là những giá trị cốt lõi trong văn hóa Việt Nam.',
        oxfordTier: 'B1',
      },
    ]
  },
  {
    id: 'conv-a1-cafe',
    title: 'Ordering Coffee & Breakfast at Sunshine Café',
    vietnameseTitle: 'Gọi cà phê & bữa sáng tại quán Sunshine Café',
    level: 'A1',
    category: 'daily',
    categoryLabel: 'Giao tiếp hằng ngày',
    duration: '02:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    description: 'Tình huống giao tiếp cơ bản tại quán cà phê: gọi thức uống, chọn loại sữa, đặt đồ ăn nhẹ và thanh toán.',
    roles: [
      {
        name: 'Barista (Leo)',
        roleDescription: 'Nhân viên pha chế thân thiện tại quầy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'Customer (Bạn)',
        roleDescription: 'Khách hàng ghé mua cà phê sáng',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      }
    ],
    dialogue: [
      {
        id: 'd1-1',
        speaker: 'Barista (Leo)',
        speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        english: 'Good morning! Welcome to Sunshine Café. What can I get started for you today?',
        vietnamese: 'Chào buổi sáng! Chào mừng bạn đến với Sunshine Café. Tôi có thể chuẩn bị gì cho bạn hôm nay?',
        timestampStart: 0,
        timestampEnd: 4,
      },
      {
        id: 'd1-2',
        speaker: 'Customer (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        english: 'Hi! Could I get a large hot cappuccino, please?',
        vietnamese: 'Xin chào! Cho tôi một ly cappuccino nóng cỡ lớn được không?',
        timestampStart: 5,
        timestampEnd: 9,
      },
      {
        id: 'd1-3',
        speaker: 'Barista (Leo)',
        speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        english: 'Sure thing! What kind of milk would you prefer? We have whole milk, skim milk, and oat milk.',
        vietnamese: 'Chắc chắn rồi! Bạn thích loại sữa nào? Chúng tôi có sữa nguyên kem, sữa tách béo và sữa yến mạch.',
        timestampStart: 10,
        timestampEnd: 16,
      },
      {
        id: 'd1-4',
        speaker: 'Customer (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        english: 'Oat milk, please. And could you make it with extra foam?',
        vietnamese: 'Cho tôi sữa yến mạch nhé. Và bạn có thể cho thêm nhiều bọt sữa được không?',
        timestampStart: 17,
        timestampEnd: 22,
      },
      {
        id: 'd1-5',
        speaker: 'Barista (Leo)',
        speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        english: 'You got it! Would you like anything sweet or savoury to eat with that?',
        vietnamese: 'Được ngay! Bạn có muốn dùng thêm món bánh ngọt hay món mặn nào kèm theo không?',
        timestampStart: 23,
        timestampEnd: 28,
      },
      {
        id: 'd1-6',
        speaker: 'Customer (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        english: 'Yes, I would love a warm blueberry muffin, please.',
        vietnamese: 'Vâng, cho tôi một chiếc bánh muffin việt quất hâm nóng nhé.',
        timestampStart: 29,
        timestampEnd: 34,
      },
      {
        id: 'd1-7',
        speaker: 'Barista (Leo)',
        speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        english: 'Is that for here or to go?',
        vietnamese: 'Bạn dùng tại đây hay mang về ạ?',
        timestampStart: 35,
        timestampEnd: 38,
      },
      {
        id: 'd1-8',
        speaker: 'Customer (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        english: 'To go, please. Can I pay by contactless credit card?',
        vietnamese: 'Mang về giúp tôi nhé. Tôi có thể thanh toán bằng thẻ không tiếp xúc được không?',
        timestampStart: 39,
        timestampEnd: 44,
      },
      {
        id: 'd1-9',
        speaker: 'Barista (Leo)',
        speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        english: 'Absolutely! Just tap right here. Your total is seven dollars and fifty cents.',
        vietnamese: 'Tất nhiên rồi! Bạn chỉ cần chạm thẻ vào đây. Tổng cộng của bạn là bảy đô la năm mươi xu.',
        timestampStart: 45,
        timestampEnd: 51,
      }
    ],
    keyVocabularies: [
      {
        id: 'vocab-conv1-1',
        word: 'cappuccino',
        phonetic: 'ˌkæp.əˈtʃiː.nəʊ',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'cà phê cappuccino (cà phê espresso phủ bọt sữa)',
        exampleSentence: 'Could I get a large hot cappuccino, please?',
        exampleVietnamese: 'Cho tôi một ly cappuccino nóng cỡ lớn nhé.',
        oxfordTier: 'A1',
      },
      {
        id: 'vocab-conv1-2',
        word: 'oat milk',
        phonetic: 'ˈəʊt ˌmɪlk',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sữa yến mạch',
        exampleSentence: 'Many people prefer oat milk over dairy milk in their coffee.',
        exampleVietnamese: 'Nhiều người thích sữa yến mạch hơn sữa bò trong cà phê.',
        oxfordTier: 'A1',
      },
      {
        id: 'vocab-conv1-3',
        word: 'muffin',
        phonetic: 'ˈmʌf.ɪn',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'bánh nướng xốp tròn nhỏ',
        exampleSentence: 'I would love a warm blueberry muffin with my latte.',
        exampleVietnamese: 'Tôi muốn một chiếc bánh muffin việt quất hâm nóng cùng cà phê latte.',
        oxfordTier: 'A1',
      },
      {
        id: 'vocab-conv1-4',
        word: 'contactless',
        phonetic: 'ˈkɒn.tækt.ləs',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'không tiếp xúc (thanh toán chạm thẻ / điện thoại)',
        exampleSentence: 'Can I pay by contactless credit card?',
        exampleVietnamese: 'Tôi có thể thanh toán bằng thẻ không tiếp xúc được không?',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-conv1-5',
        word: 'to go',
        phonetic: 'tə ˈɡəʊ',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'mang đi, mang về (đồ ăn / thức uống)',
        exampleSentence: 'I would like two iced coffees to go, please.',
        exampleVietnamese: 'Cho tôi hai ly cà phê đá mang về nhé.',
        oxfordTier: 'A1',
      }
    ]
  },
  {
    id: 'conv-a2-hotel',
    title: 'Hotel Check-in & Asking for Local Recommendations',
    vietnameseTitle: 'Nhận phòng khách sạn & Hỏi địa điểm ẩm thực địa phương',
    level: 'A2',
    category: 'travel',
    categoryLabel: 'Du lịch & Khách sạn',
    duration: '02:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    description: 'Học cách làm thủ tục check-in tại khách sạn, hỏi mật khẩu Wi-Fi, bữa sáng và nhờ lễ tân gợi ý nhà hàng hải sản ngon gần đó.',
    roles: [
      {
        name: 'Receptionist (Daniel)',
        roleDescription: 'Nhân viên lễ tân khách sạn 4 sao',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'Guest (Bạn)',
        roleDescription: 'Du khách vừa đến sau chuyến bay dài',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      }
    ],
    dialogue: [
      {
        id: 'd2-1',
        speaker: 'Receptionist (Daniel)',
        speakerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        english: 'Good afternoon, welcome to Grand Palace Hotel! How may I assist you today?',
        vietnamese: 'Xin chào buổi chiều, chào mừng quý khách đến khách sạn Grand Palace! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
        timestampStart: 0,
        timestampEnd: 5,
      },
      {
        id: 'd2-2',
        speaker: 'Guest (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Hello! I have a reservation for three nights under the name Jessica Nguyen.',
        vietnamese: 'Xin chào! Tôi có đặt phòng ba đêm dưới tên Jessica Nguyen.',
        timestampStart: 6,
        timestampEnd: 11,
      },
      {
        id: 'd2-3',
        speaker: 'Receptionist (Daniel)',
        speakerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        english: 'Yes, here it is! A deluxe double room with ocean view. May I please see your passport?',
        vietnamese: 'Vâng, thông tin đây rồi! Một phòng đôi cao cấp hướng biển. Cho tôi xin phép xem hộ chiếu của bạn nhé?',
        timestampStart: 12,
        timestampEnd: 18,
      },
      {
        id: 'd2-4',
        speaker: 'Guest (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Here you go. Also, what time is breakfast served in the morning?',
        vietnamese: 'Của bạn đây. Tiện thể, bữa sáng được phục vụ vào khung giờ nào buổi sáng vậy?',
        timestampStart: 19,
        timestampEnd: 24,
      },
      {
        id: 'd2-5',
        speaker: 'Receptionist (Daniel)',
        speakerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        english: 'Breakfast buffet is available from 6:30 to 10:00 AM on the second floor. Here are your room keycards for room 504.',
        vietnamese: 'Buffet sáng mở từ 6:30 đến 10:00 sáng tại tầng hai. Đây là thẻ từ phòng 504 của bạn.',
        timestampStart: 25,
        timestampEnd: 33,
      },
      {
        id: 'd2-6',
        speaker: 'Guest (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        english: 'Thank you! Could you recommend a good seafood restaurant within walking distance?',
        vietnamese: 'Cảm ơn bạn! Bạn có thể gợi ý một nhà hàng hải sản ngon nằm trong khoảng cách đi bộ được không?',
        timestampStart: 34,
        timestampEnd: 40,
      },
      {
        id: 'd2-7',
        speaker: 'Receptionist (Daniel)',
        speakerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        english: 'Definitely! "The Blue Cove" is just two blocks away down harbor street. They serve the freshest grilled oysters in town.',
        vietnamese: 'Chắc chắn rồi! Quán "The Blue Cove" chỉ cách đây hai dãy nhà dọc theo phố cảng. Họ phục vụ món hàu nướng tươi ngon nhất thị trấn.',
        timestampStart: 41,
        timestampEnd: 48,
      }
    ],
    keyVocabularies: [
      {
        id: 'vocab-conv2-1',
        word: 'reservation',
        phonetic: 'ˌrez.əˈveɪ.ʃən',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sự đặt chỗ trước, phòng đã đặt',
        exampleSentence: 'I have a hotel reservation under the name Jessica.',
        exampleVietnamese: 'Tôi có đặt phòng trước dưới tên Jessica.',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-conv2-2',
        word: 'keycard',
        phonetic: 'ˈkiː.kɑːd',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'thẻ từ mở khóa phòng',
        exampleSentence: 'Please keep your keycard away from your mobile phone magnets.',
        exampleVietnamese: 'Vui lòng để thẻ từ xa nam châm điện thoại của bạn.',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-conv2-3',
        word: 'walking distance',
        phonetic: 'ˈwɔː.kɪŋ ˌdɪs.təns',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'khoảng cách gần có thể đi bộ được',
        exampleSentence: 'The beach is within walking distance of our resort.',
        exampleVietnamese: 'Bãi biển nằm trong khoảng cách đi bộ từ khu nghỉ dưỡng của chúng tôi.',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-conv2-4',
        word: 'recommend',
        phonetic: 'ˌrek.əˈmend',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'giới thiệu, đề xuất, gợi ý',
        exampleSentence: 'Could you recommend a local restaurant with authentic dishes?',
        exampleVietnamese: 'Bạn có thể gợi ý một quán ăn địa phương với các món ăn chuẩn vị không?',
        oxfordTier: 'A2',
      },
      {
        id: 'vocab-conv2-5',
        word: 'buffet',
        phonetic: 'ˈbʊf.eɪ',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'tiệc ăn tự chọn (buffet)',
        exampleSentence: 'The breakfast buffet includes fresh fruit, pastries, and eggs.',
        exampleVietnamese: 'Buffet sáng bao gồm trái cây tươi, bánh ngọt và trứng.',
        oxfordTier: 'A2',
      }
    ]
  },
  {
    id: 'conv-b1-interview',
    title: 'Job Interview: Discussing Experience & Strengths',
    vietnameseTitle: 'Phỏng vấn xin việc: Trao đổi kinh nghiệm & thế mạnh',
    level: 'B1',
    category: 'work',
    categoryLabel: 'Công việc & Phỏng vấn',
    duration: '03:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    description: 'Tình huống phỏng vấn xin việc thực tế: trình bày kinh nghiệm dự án gần nhất, cách giải quyết xung đột ý kiến và kỹ năng làm việc dưới áp lực thời hạn.',
    roles: [
      {
        name: 'Interviewer (Ms. Rebecca)',
        roleDescription: 'Trưởng phòng tuyển dụng nhân sự cấp cao',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'Candidate (Bạn)',
        roleDescription: 'Ứng viên tiềm năng với 3 năm kinh nghiệm',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      }
    ],
    dialogue: [
      {
        id: 'd3-1',
        speaker: 'Interviewer (Ms. Rebecca)',
        speakerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        english: 'Welcome Alex. To start off, could you walk me through your key achievements in your previous role?',
        vietnamese: 'Chào mừng Alex. Để bắt đầu, bạn có thể tóm tắt cho tôi về những thành tựu nổi bật nhất trong vai trò trước đây của bạn không?',
        timestampStart: 0,
        timestampEnd: 6,
      },
      {
        id: 'd3-2',
        speaker: 'Candidate (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'Certainly! In my last position, I spearheaded a digital campaign that increased user engagement by thirty-five percent.',
        vietnamese: 'Chắc chắn rồi! Ở vị trí trước đây, tôi đã dẫn dắt một chiến dịch kỹ thuật số giúp tăng tỷ lệ tương tác của người dùng lên 35%.',
        timestampStart: 7,
        timestampEnd: 15,
      },
      {
        id: 'd3-3',
        speaker: 'Interviewer (Ms. Rebecca)',
        speakerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        english: 'Impressive. How do you handle situations when you face tight deadlines and unexpected roadblocks?',
        vietnamese: 'Rất ấn tượng. Bạn xử lý như thế nào trong những tình huống đối mặt với thời hạn gấp gáp và các trở ngại bất ngờ?',
        timestampStart: 16,
        timestampEnd: 23,
      },
      {
        id: 'd3-4',
        speaker: 'Candidate (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'I prioritize tasks using an Eisenhower matrix and maintain transparent communication with team members to resolve bottlenecks.',
        vietnamese: 'Tôi phân loại ưu tiên công việc bằng ma trận Eisenhower và duy trì trao đổi minh bạch với đồng đội để giải quyết các điểm nghẽn.',
        timestampStart: 24,
        timestampEnd: 32,
      },
      {
        id: 'd3-5',
        speaker: 'Interviewer (Ms. Rebecca)',
        speakerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        english: 'That demonstrates great composure. What attracted you specifically to our company values?',
        vietnamese: 'Điều đó thể hiện sự bình tĩnh và chuyên nghiệp. Điều gì đã đặc biệt thu hút bạn đến với những giá trị cốt lõi của công ty chúng tôi?',
        timestampStart: 33,
        timestampEnd: 39,
      },
      {
        id: 'd3-6',
        speaker: 'Candidate (Bạn)',
        speakerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        english: 'I admire your commitment to continuous learning and how you empower engineers to take initiative on product innovations.',
        vietnamese: 'Tôi rất ngưỡng mộ cam kết học tập liên tục của công ty và cách các bạn trao quyền cho kỹ sư chủ động tạo ra các đột phá về sản phẩm.',
        timestampStart: 40,
        timestampEnd: 48,
      }
    ],
    keyVocabularies: [
      {
        id: 'vocab-conv3-1',
        word: 'spearhead',
        phonetic: 'ˈspɪə.hed',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'dẫn đầu, khởi xướng và chỉ đạo chiến dịch/dự án',
        exampleSentence: 'She spearheaded the company’s expansion into European markets.',
        exampleVietnamese: 'Cô ấy đã dẫn dắt chiến lược mở rộng của công ty sang thị trường Châu Âu.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-conv3-2',
        word: 'tight deadline',
        phonetic: 'taɪt ˈded.laɪn',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'thời hạn chót gấp gáp, ngặt nghèo',
        exampleSentence: 'Working under tight deadlines requires strong prioritization.',
        exampleVietnamese: 'Làm việc dưới thời hạn gấp gáp đòi hỏi kỹ năng sắp xếp ưu tiên mạnh mẽ.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-conv3-3',
        word: 'roadblock',
        phonetic: 'ˈrəʊd.blɒk',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'vật cản, trở ngại ngăn chặn tiến độ',
        exampleSentence: 'We encountered technical roadblocks during the beta release.',
        exampleVietnamese: 'Chúng tôi đã gặp phải một số trở ngại kỹ thuật trong đợt ra mắt bản thử nghiệm.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-conv3-4',
        word: 'composure',
        phonetic: 'kəmˈpəʊ.ʒər',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sự bình tĩnh, điềm tĩnh khi gặp áp lực',
        exampleSentence: 'He kept his composure despite tough questioning from reporters.',
        exampleVietnamese: 'Anh ấy vẫn giữ được sự bình tĩnh dù bị các phóng viên chất vấn gay gắt.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-conv3-5',
        word: 'empower',
        phonetic: 'ɪmˈpaʊ.ər',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'trao quyền, tạo điều kiện phát huy năng lực',
        exampleSentence: 'Good leaders empower team members to make autonomous decisions.',
        exampleVietnamese: 'Nhà lãnh đạo giỏi trao quyền cho các thành viên tự đưa ra quyết định.',
        oxfordTier: 'B1',
      }
    ]
  },
  {
    id: 'conv-b2-movie',
    title: 'Movie Scene: Heated Debate on Green Technology & Ethics',
    vietnameseTitle: 'Trích đoạn phim: Tranh luận về công nghệ xanh & đạo đức phát triển',
    level: 'B2',
    category: 'movie',
    categoryLabel: 'Phim điện ảnh & Tranh luận',
    duration: '03:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    description: 'Trích đoạn kịch tính giữa một nhà khoa học khí hậu và nhà đầu tư mạo hiểm về tính khả thi của công nghệ lưu trữ hydro so với chi phí sinh thái tiềm ẩn.',
    roles: [
      {
        name: 'Dr. Katherine (Nhà khoa học)',
        roleDescription: 'Chuyên gia vật lý năng lượng nghiêm khắc',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'Thomas (Bạn - Nhà đầu tư)',
        roleDescription: 'Nhà sáng lập công nghệ với tầm nhìn thị trường',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      }
    ],
    dialogue: [
      {
        id: 'd4-1',
        speaker: 'Dr. Katherine (Nhà khoa học)',
        speakerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
        english: 'Thomas, your prototype looks promising on paper, but the thermal dissipation rate at industrial scale is unsustainable.',
        vietnamese: 'Thomas, nguyên mẫu của bạn nhìn trên giấy tờ thì rất triển vọng, nhưng tỷ lệ tiêu hao nhiệt ở quy mô công nghiệp là không bền vững.',
        timestampStart: 0,
        timestampEnd: 7,
      },
      {
        id: 'd4-2',
        speaker: 'Thomas (Bạn - Nhà đầu tư)',
        speakerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        english: 'We have factored that in, Katherine. Our proprietary catalyst operates at fifty degrees lower than conventional models.',
        vietnamese: 'Chúng tôi đã tính đến điều đó rồi, Katherine. Chất xúc tác độc quyền của chúng tôi hoạt động ở mức nhiệt thấp hơn 50 độ so với các mô hình thông thường.',
        timestampStart: 8,
        timestampEnd: 16,
      },
      {
        id: 'd4-3',
        speaker: 'Dr. Katherine (Nhà khoa học)',
        speakerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
        english: 'Even so, extracting those rare-earth elements incurs an undeniable ecological footprint. Are we merely shifting the burden?',
        vietnamese: 'Dù vậy, việc khai thác các nguyên tố đất hiếm đó gây ra vết chân sinh thái không thể phủ nhận. Liệu chúng ta có đang chỉ đơn thuần chuyển giao gánh nặng sang nơi khác?',
        timestampStart: 17,
        timestampEnd: 25,
      },
      {
        id: 'd4-4',
        speaker: 'Thomas (Bạn - Nhà đầu tư)',
        speakerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        english: 'Not if we implement a closed-loop recycling protocol. We can reclaim ninety percent of the materials after decommissioning.',
        vietnamese: 'Sẽ không như vậy nếu chúng ta triển khai quy trình tái chế vòng kín. Chúng ta có thể thu hồi đến 90% vật liệu sau khi hết niên hạn sử dụng.',
        timestampStart: 26,
        timestampEnd: 34,
      },
      {
        id: 'd4-5',
        speaker: 'Dr. Katherine (Nhà khoa học)',
        speakerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
        english: 'If you can demonstrate empirical evidence in the next pilot trial, I will officially endorse your grant proposal.',
        vietnamese: 'Nếu bạn có thể chứng minh được bằng chứng thực nghiệm trong đợt thử nghiệm sắp tới, tôi sẽ chính thức bảo trợ đề xuất tài trợ của bạn.',
        timestampStart: 35,
        timestampEnd: 42,
      },
      {
        id: 'd4-6',
        speaker: 'Thomas (Bạn - Nhà đầu tư)',
        speakerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        english: 'Deal. You will have full transparency into all telemetry and safety metrics by next Monday morning.',
        vietnamese: 'Thỏa thuận thế nhé. Bạn sẽ có sự minh bạch hoàn toàn đối với toàn bộ dữ liệu đo từ xa và chỉ số an toàn vào sáng thứ Hai tới.',
        timestampStart: 43,
        timestampEnd: 50,
      }
    ],
    keyVocabularies: [
      {
        id: 'vocab-conv4-1',
        word: 'dissipation',
        phonetic: 'ˌdɪs.ɪˈpeɪ.ʃən',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sự hao phí, thất thoát năng lượng (nhiệt, điện)',
        exampleSentence: 'Engineers struggled to reduce heat dissipation in the turbine.',
        exampleVietnamese: 'Các kỹ sư đã nỗ lực giảm thiểu thất thoát nhiệt trong tuabin.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-conv4-2',
        word: 'proprietary',
        phonetic: 'prəˈpraɪə.tər.i',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'độc quyền, thuộc quyền sở hữu riêng biệt',
        exampleSentence: 'The software uses proprietary encryption algorithms.',
        exampleVietnamese: 'Phần mềm này sử dụng các thuật toán mã hóa độc quyền.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-conv4-3',
        word: 'ecological footprint',
        phonetic: 'ˌiː.kəˈlɒdʒ.ɪ.kəl ˈfʊt.prɪnt',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'vết chân sinh thái (tác động môi trường)',
        exampleSentence: 'We must reduce our ecological footprint by conserving energy.',
        exampleVietnamese: 'Chúng ta phải cắt giảm vết chân sinh thái bằng cách tiết kiệm năng lượng.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-conv4-4',
        word: 'closed-loop',
        phonetic: 'ˌkləʊzdˈluːp',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'vòng kín, tuần hoàn khép kín',
        exampleSentence: 'A closed-loop manufacturing model produces almost zero waste.',
        exampleVietnamese: 'Mô hình sản xuất vòng kín hầu như không tạo ra bất kỳ chất thải nào.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-conv4-5',
        word: 'empirical evidence',
        phonetic: 'ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'bằng chứng thực nghiệm, dữ liệu kiểm chứng thực tế',
        exampleSentence: 'The theory was supported by substantial empirical evidence.',
        exampleVietnamese: 'Lý thuyết này đã được củng cố bởi các bằng chứng thực nghiệm vững chắc.',
        oxfordTier: 'B2',
      }
    ]
  }
];

export const ENTERTAINMENT_SONGS: EntertainmentSong[] = [
  {
    id: 'song-stim-worry',
    title: 'Worry',
    artist: 'Stim',
    level: 'B1',
    genre: 'Indie Pop / Melodic R&B',
    duration: 150,
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/tqUUNbBruXw?si=S7QyyOA6L2EvSbWU',
    youtubeId: 'tqUUNbBruXw',
    description: 'Bản hit Indie/R&B giàu chiều sâu của Stim với giai điệu lôi cuốn, kể về sự giằng xé nội tâm, nỗi cô đơn, hy vọng được chữa lành và sự kiên nhẫn đợi chờ trong tình cảm ("I want to wait don\'t worry, for low and high I love you twice").',
    lyrics: [
      {
        id: 'worry-1',
        timeStart: 0,
        timeEnd: 6,
        english: "I wanna wait don't worry\nGive it a day\nWe're early for tonight",
        vietnamese: "Anh muốn đợi chờ, xin đừng lo lắng\nHãy cho nhau thêm một ngày\nChúng ta vẫn còn sớm cho đêm nay",
        clozeWords: [
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng, bận tâm', difficulty: 'A2' },
          { word: 'wait', cleanWord: 'wait', hint: 'chờ đợi', difficulty: 'A1' },
          { word: 'early', cleanWord: 'early', hint: 'sớm, chưa muộn', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-2',
        timeStart: 6,
        timeEnd: 14,
        english: "I wanna wait don't worry\nFor lows and highs\nI'll love you twice\nWear a smile like crown",
        vietnamese: "Anh muốn đợi chờ đừng lo lắng\nDù qua bao thăng trầm cuộc đời\nAnh sẽ yêu em gấp bội lần\nHãy mang nụ cười rạng rỡ như chiếc vương miện",
        clozeWords: [
          { word: 'twice', cleanWord: 'twice', hint: 'hai lần, gấp đôi', difficulty: 'A2' },
          { word: 'smile', cleanWord: 'smile', hint: 'nụ cười', difficulty: 'A1' },
          { word: 'crown', cleanWord: 'crown', hint: 'vương miện', difficulty: 'B1' },
        ]
      },
      {
        id: 'worry-3',
        timeStart: 14,
        timeEnd: 20,
        english: "You weave\nGolden web I sow the thread\nUntil my heart is bound",
        vietnamese: "Mà chính em dệt nên\nMạng lưới vàng son nơi anh gieo từng sợi chỉ\nCho đến khi trái tim anh được ràng buộc",
        clozeWords: [
          { word: 'weave', cleanWord: 'weave', hint: 'dệt, đan', difficulty: 'B2' },
          { word: 'thread', cleanWord: 'thread', hint: 'sợi chỉ', difficulty: 'B1' },
          { word: 'bound', cleanWord: 'bound', hint: 'bị trói buộc, gắn kết', difficulty: 'B2' },
        ]
      },
      {
        id: 'worry-4',
        timeStart: 20,
        timeEnd: 24,
        english: "If you need a million hours\nI'll count the stars while I float",
        vietnamese: "Nếu em cần tới cả triệu giờ đồng hồ\nAnh sẽ đếm từng vì sao khi thả mình trôi bồng bềnh",
        clozeWords: [
          { word: 'hours', cleanWord: 'hours', hint: 'những giờ', difficulty: 'A1' },
          { word: 'stars', cleanWord: 'stars', hint: 'những vì sao', difficulty: 'A1' },
          { word: 'float', cleanWord: 'float', hint: 'trôi nổi, lơ lửng', difficulty: 'B1' },
        ]
      },
      {
        id: 'worry-5',
        timeStart: 24,
        timeEnd: 34,
        english: "I know you got a scar mosaic\nFrom far away places yeah\nI see the art baby\nA coat of arms maybe\nSeal that storm",
        vietnamese: "Anh biết em mang bức tranh khảm từ những vết sẹo cũ\nĐến từ những miền đất xa xôi\nAnh nhìn thấy vẻ đẹp nghệ thuật trong đó em à\nTựa như một chiếc huy hiệu kiêu hãnh\nHãy phong ấn cơn bão tố ấy lại",
        clozeWords: [
          { word: 'scar', cleanWord: 'scar', hint: 'vết sẹo', difficulty: 'B1' },
          { word: 'places', cleanWord: 'places', hint: 'nơi chốn', difficulty: 'A1' },
          { word: 'storm', cleanWord: 'storm', hint: 'cơn bão lòng', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-6',
        timeStart: 34,
        timeEnd: 37,
        english: "And wait to worry more cause\nI think the waters are calm",
        vietnamese: "Và đừng vội bận lòng thêm nữa bởi vì\nAnh cảm thấy mặt nước giờ đã phẳng lặng bình yên",
        clozeWords: [
          { word: 'waters', cleanWord: 'waters', hint: 'làn nước', difficulty: 'A2' },
          { word: 'calm', cleanWord: 'calm', hint: 'êm đềm, bình lặng', difficulty: 'B1' },
        ]
      },
      {
        id: 'worry-7',
        timeStart: 37,
        timeEnd: 40,
        english: "I wanna wait don't worry",
        vietnamese: "Anh muốn kiên nhẫn đợi chờ",
        clozeWords: [
          { word: 'wait', cleanWord: 'wait', hint: 'chờ đợi', difficulty: 'A1' },
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-8',
        timeStart: 40,
        timeEnd: 46,
        english: "Give it a day\nWe're early for tonight",
        vietnamese: "Hãy cho nhau thêm một ngày\nChúng ta vẫn còn sớm cho đêm nay",
        clozeWords: [
          { word: 'early', cleanWord: 'early', hint: 'sớm', difficulty: 'A2' },
          { word: 'tonight', cleanWord: 'tonight', hint: 'tối nay', difficulty: 'A1' },
        ]
      },
      {
        id: 'worry-9',
        timeStart: 46,
        timeEnd: 54,
        english: "I wanna wait don't worry\nFor lows and highs\nI'll love you twice",
        vietnamese: "Anh muốn đợi chờ đừng lo lắng\nDù qua bao nốt thăng trầm cuộc đời\nAnh sẽ yêu em gấp bội lần",
        clozeWords: [
          { word: 'wait', cleanWord: 'wait', hint: 'chờ đợi', difficulty: 'A1' },
          { word: 'twice', cleanWord: 'twice', hint: 'gấp hai lần', difficulty: 'A2' },
          { word: 'highs', cleanWord: 'highs', hint: 'thăng hoa', difficulty: 'B1' },
        ]
      },
      {
        id: 'worry-10',
        timeStart: 54,
        timeEnd: 62,
        english: "I wanna wait don't worry\nGive it a day\nWe're early for tonight",
        vietnamese: "Anh muốn đợi chờ xin đừng bận lòng\nHãy cho nhau thêm một ngày\nTa vẫn còn sớm cho đêm nay",
        clozeWords: [
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng', difficulty: 'A2' },
          { word: 'early', cleanWord: 'early', hint: 'sớm', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-11',
        timeStart: 62,
        timeEnd: 67,
        english: "I wanna wait don't worry\nFor lows and highs\nI'll love you twice",
        vietnamese: "Anh muốn đợi chờ đừng bận lòng\nDù thăng hay trầm\nAnh sẽ mãi yêu em gấp đôi",
        clozeWords: [
          { word: 'twice', cleanWord: 'twice', hint: 'gấp đôi', difficulty: 'A2' },
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-12',
        timeStart: 67,
        timeEnd: 73,
        english: "Say you wanna try\nDon't know why\nI should have have told you I\nPersonify a reliance",
        vietnamese: "Nói rằng em muốn thử một lần nữa\nChẳng hiểu vì sao\nLẽ ra anh phải nói cho em biết rằng anh\nChính là hiện thân của sự nương tựa",
        clozeWords: [
          { word: 'personify', cleanWord: 'personify', hint: 'hiện thân của', difficulty: 'B2' },
          { word: 'reliance', cleanWord: 'reliance', hint: 'sự nương tựa', difficulty: 'B2' },
        ]
      },
      {
        id: 'worry-13',
        timeStart: 73,
        timeEnd: 80,
        english: "On this loneliness inside of me\nProvides for me\nDecidedly\nWith all I need",
        vietnamese: "Vào nỗi cô đơn sâu thẳm bên trong\nNó nuôi dưỡng anh\nMột cách dứt khoát\nVới tất cả những gì anh cần",
        clozeWords: [
          { word: 'loneliness', cleanWord: 'loneliness', hint: 'nỗi cô đơn', difficulty: 'B1' },
          { word: 'decidedly', cleanWord: 'decidedly', hint: 'dứt khoát, rõ ràng', difficulty: 'B2' },
        ]
      },
      {
        id: 'worry-14',
        timeStart: 80,
        timeEnd: 91,
        english: "It's hard to forsee I'm sorry\nIt's just I'm not tryna mislead by starting\nI'm thinking my heart's gonna need more charging\nAt your expense",
        vietnamese: "Thật khó để lường trước, anh xin lỗi\nChỉ là anh không hề cố tình gây hiểu lầm khi bắt đầu\nAnh nghĩ trái tim mình cần được sạc thêm năng lượng\nBằng tổn thương của em",
        clozeWords: [
          { word: 'sorry', cleanWord: 'sorry', hint: 'xin lỗi', difficulty: 'A1' },
          { word: 'charging', cleanWord: 'charging', hint: 'sạc năng lượng', difficulty: 'B1' },
          { word: 'expense', cleanWord: 'expense', hint: 'tổn hại (at expense)', difficulty: 'B2' },
        ]
      },
      {
        id: 'worry-15',
        timeStart: 91,
        timeEnd: 97,
        english: "I guess I thought that I could fix it\nI could twist and turn emotions that I elicit",
        vietnamese: "Có lẽ anh từng ảo tưởng mình có thể hàn gắn được tất cả\nRằng anh có thể uốn nắn những cảm xúc mà mình khơi gợi",
        clozeWords: [
          { word: 'guess', cleanWord: 'guess', hint: 'đoán, nghĩ', difficulty: 'A2' },
          { word: 'fix', cleanWord: 'fix', hint: 'sửa chữa, hàn gắn', difficulty: 'A2' },
          { word: 'emotions', cleanWord: 'emotions', hint: 'cảm xúc', difficulty: 'B1' },
        ]
      },
      {
        id: 'worry-16',
        timeStart: 97,
        timeEnd: 104,
        english: "Make 'em drown, break you down\n'Till you dismiss it\nPut me six feet in the ground\nSomewhere I'll never be found\nMove on without me around",
        vietnamese: "Nhấn chìm chúng, làm em gục ngã\nCho đến khi em buông tay gạt bỏ\nHãy chôn vùi anh sáu tấc dưới lòng đất\nNơi anh mãi mãi không bao giờ bị tìm thấy\nHãy bước tiếp cuộc đời mà không cần có anh bên cạnh",
        clozeWords: [
          { word: 'drown', cleanWord: 'drown', hint: 'nhấn chìm', difficulty: 'B1' },
          { word: 'dismiss', cleanWord: 'dismiss', hint: 'gạt bỏ, xua đi', difficulty: 'B2' },
          { word: 'ground', cleanWord: 'ground', hint: 'mặt đất', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-17',
        timeStart: 104,
        timeEnd: 113,
        english: "I wanna wait don't worry\nGive it a day\nWe're early for tonight\nI wanna wait don't worry\nFor lows and highs",
        vietnamese: "Anh muốn đợi chờ đừng lo âu\nHãy cho nhau thêm một ngày\nChúng ta vẫn còn sớm cho đêm nay\nAnh muốn đợi chờ đừng bận lòng\nDù qua bao thăng trầm cuộc đời",
        clozeWords: [
          { word: 'wait', cleanWord: 'wait', hint: 'chờ đợi', difficulty: 'A1' },
          { word: 'early', cleanWord: 'early', hint: 'sớm', difficulty: 'A2' },
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng', difficulty: 'A2' },
        ]
      },
      {
        id: 'worry-18',
        timeStart: 113,
        timeEnd: 118,
        english: "I'll love you twice",
        vietnamese: "Anh sẽ yêu em gấp bội lần",
        clozeWords: [
          { word: 'twice', cleanWord: 'twice', hint: 'gấp hai lần', difficulty: 'A2' },
          { word: 'love', cleanWord: 'love', hint: 'yêu', difficulty: 'A1' },
        ]
      },
      {
        id: 'worry-19',
        timeStart: 118,
        timeEnd: 127,
        english: "I wanna wait don't worry\nGive it a day\nWe're early for tonight\nI wanna wait don't worry",
        vietnamese: "Anh muốn đợi chờ đừng bận lòng\nHãy cho nhau thêm một ngày\nTa vẫn còn sớm cho đêm nay\nAnh muốn kiên nhẫn đợi chờ",
        clozeWords: [
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng', difficulty: 'A2' },
          { word: 'wait', cleanWord: 'wait', hint: 'chờ đợi', difficulty: 'A1' },
        ]
      },
      {
        id: 'worry-20',
        timeStart: 127,
        timeEnd: 145,
        english: "For lows and highs\nI'll love you twice",
        vietnamese: "Dù thăng hay trầm\nAnh mãi yêu em gấp đôi lần",
        clozeWords: [
          { word: 'twice', cleanWord: 'twice', hint: 'gấp đôi', difficulty: 'A2' },
          { word: 'love', cleanWord: 'love', hint: 'yêu thương', difficulty: 'A1' },
        ]
      },
    ],
    vocabularies: [
      {
        id: 'vocab-worry-1',
        word: 'personify',
        phonetic: 'pərˈsɑː.nə.faɪ',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'hiện thân của, là biểu tượng sống động cho',
        contextSentence: 'I should have told you I personify a reliance on this loneliness inside of me.',
        exampleSentence: 'The poet personified grief as a quiet shadow following him everywhere.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-worry-2',
        word: 'reliance',
        phonetic: 'rɪˈlaɪ.əns',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sự nương tựa, sự phụ thuộc tin cậy',
        contextSentence: 'I personify a reliance on this loneliness inside of me.',
        exampleSentence: 'Heavy reliance on one source of income can be financially risky.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-worry-3',
        word: 'mosaic',
        phonetic: 'moʊˈzeɪ.ɪk',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'bức tranh ghép mảnh, tranh khảm nghệ thuật',
        contextSentence: 'I know you got a scar mosaic from far away places.',
        exampleSentence: 'Her life story is a colorful mosaic of triumphs and heartbreaks.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-worry-4',
        word: 'mislead',
        phonetic: 'mɪsˈliːd',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'gây hiểu lầm, dẫn dắt sai lạc',
        contextSentence: "It's just I'm not tryna mislead by starting.",
        exampleSentence: 'The advertisement was banned because it misled consumers about product safety.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-worry-5',
        word: 'elicit',
        phonetic: 'iˈlɪs.ɪt',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'khơi gợi, gợi mở ra (cảm xúc, phản hồi, thông tin)',
        contextSentence: 'I could twist and turn emotions that I elicit.',
        exampleSentence: 'The emotional melody never fails to elicit tears from the audience.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-worry-6',
        word: 'dismiss',
        phonetic: 'dɪsˈmɪs',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'gạt bỏ, xua đi, bác bỏ không đoái hoài',
        contextSentence: "Make 'em drown, break you down 'till you dismiss it.",
        exampleSentence: 'Do not dismiss her concerns as mere exaggeration.',
        oxfordTier: 'B1',
      },
      {
        id: 'vocab-worry-7',
        word: 'bound',
        phonetic: 'baʊnd',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'bị ràng buộc, gắn kết chặt chẽ',
        contextSentence: 'Golden web I sow the thread until my heart is bound.',
        exampleSentence: 'We are bound together by shared memories and mutual trust.',
        oxfordTier: 'B2',
      },
      {
        id: 'vocab-worry-8',
        word: 'at one\'s expense',
        phonetic: 'ət wʌnz ɪkˈspens',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'làm tổn hại đến ai, trả giá bằng sự đau đớn của ai',
        contextSentence: "My heart's gonna need more charging at your expense.",
        exampleSentence: 'He succeeded in his career, but unfortunately at the expense of his family life.',
        oxfordTier: 'B2',
      },
    ],
    quiz: [
      {
        id: 'quiz-worry-1',
        question: 'Chủ đề và cảm xúc trọng tâm của bài hát "Worry" là gì?',
        questionType: 'theme',
        options: [
          'Sự giằng xé nội tâm, chấp nhận chờ đợi người thương dù bản thân mang vết thương tâm lý và sợ làm tổn thương đối phương',
          'Một lời trách móc gay gắt đối phương vì đã rời bỏ mối quan hệ quá sớm',
          'Khát vọng phiêu lưu đến những miền đất xa xôi để tìm kiếm danh vọng',
          'Niềm vui tự do tuyệt đối khi được sống một mình trong nỗi cô đơn'
        ],
        correctIndex: 0,
        explanation: 'Ca khúc thể hiện sâu sắc tâm sự của một người nhận thức rõ những vết sẹo và sự phụ thuộc vào nỗi cô đơn bên trong mình, nhưng vẫn tha thiết kiên nhẫn đợi chờ và muốn trao đi tình yêu gấp bội ("I\'ll love you twice").'
      },
      {
        id: 'quiz-worry-2',
        question: 'Hình ảnh ẩn dụ "scar mosaic" (bức tranh khảm từ những vết sẹo) trong bài hát mang ý nghĩa gì?',
        questionType: 'metaphor',
        options: [
          'Những mảnh gốm vỡ trong một căn phòng trang trí',
          'Những tổn thương trong quá khứ được tác giả nhìn nhận như một tác phẩm nghệ thuật ("I see the art") kiên cường và sâu sắc',
          'Một căn bệnh ngoài da cần được chữa trị y tế ngay lập tức',
          'Một biểu tượng bản đồ địa lý các nước trên thế giới'
        ],
        correctIndex: 1,
        explanation: '"I know you got a scar mosaic... I see the art baby". Tác giả không xem vết thương cũ là điều xấu xí, mà trân trọng chúng như một bức tranh nghệ thuật khảm ghép tạo nên con người sâu sắc của đối phương.'
      },
      {
        id: 'quiz-worry-3',
        question: 'Điệp khúc "For lows and highs, I\'ll love you twice" khẳng định điều gì?',
        questionType: 'emotion',
        options: [
          'Chỉ yêu đối phương khi mọi chuyện thuận lợi và vui vẻ',
          'Sự cam kết bền chặt: dù trong lúc khó khăn nhất (lows) hay thăng hoa nhất (highs), tình yêu sẽ luôn vẹn nguyên và nhân đôi',
          'Tác giả muốn chia tay hai lần để kiểm tra tình cảm',
          'Yêu cầu đối phương phải chứng minh tình cảm gấp đôi mới được chấp nhận'
        ],
        correctIndex: 1,
        explanation: '"Lows and highs" tượng trưng cho mọi thăng trầm, vui buồn của cuộc sống; "I\'ll love you twice" khẳng định tình yêu kiên định, son sắt vượt qua mọi thử thách.'
      },
      {
        id: 'quiz-worry-4',
        question: 'Trong câu "My heart\'s gonna need more charging at your expense", cụm từ "at your expense" có nghĩa là gì?',
        questionType: 'vocab',
        options: [
          'Bằng tiền bạc và hóa đơn mua sắm của em',
          'Bằng sự hy sinh, hao tổn và chịu đựng đau đớn từ phía em',
          'Em sẽ phải chi trả tiền điện thoại cho anh',
          'Miễn phí hoàn toàn mà không tốn chi phí nào'
        ],
        correctIndex: 1,
        explanation: 'Thành ngữ "at someone\'s expense" chỉ việc một việc gì đó đạt được bằng cái giá tổn thất, hao mòn hoặc nỗi đau mà người khác phải gánh chịu.'
      }
    ]
  },
  {
    id: 'song-dream-love',
    title: 'Dream Love',
    artist: 'DLSS',
    level: 'A2',
    genre: 'Dream Pop / Ambient R&B',
    duration: 125, // 02:05
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/tvgEYsXBjXg?si=X6qRVXRLfmmJAjIP',
    youtubeId: 'tvgEYsXBjXg',
    description: 'Bản ballad mộng mơ "Dream Love" của DLSS với giai điệu lơ lửng, bay bổng giữa những vì sao và lời ca ngọt ngào về một tình yêu vượt qua không gian ("High up in the chain so bright with stars... In a galaxy of us two").',
    lyrics: [
      {
        id: 'dl-1',
        timeStart: 0,
        timeEnd: 4,
        english: 'High up in the chain so bright with stars',
        vietnamese: 'Tít trên cao rực sáng ngàn vì sao',
        clozeWords: [
          { word: 'bright', cleanWord: 'bright', hint: 'tươi sáng, rực rỡ', difficulty: 'A1' },
          { word: 'stars', cleanWord: 'stars', hint: 'các vì sao', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-2',
        timeStart: 4,
        timeEnd: 7,
        english: 'That kiss the night, your love was all',
        vietnamese: 'Hôn nhẹ màn đêm, tình yêu em là tất cả',
        clozeWords: [
          { word: 'kiss', cleanWord: 'kiss', hint: 'hôn lên', difficulty: 'A1' },
          { word: 'night', cleanWord: 'night', hint: 'màn đêm', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-3',
        timeStart: 7,
        timeEnd: 12,
        english: 'Insight me in this fight in a galaxy of us two',
        vietnamese: 'Soi tỏ lòng anh giữa dải ngân hà của riêng hai ta',
        clozeWords: [
          { word: 'fight', cleanWord: 'fight', hint: 'cuộc chiến, thử thách', difficulty: 'A2' },
          { word: 'galaxy', cleanWord: 'galaxy', hint: 'dải ngân hà', difficulty: 'B1' },
        ]
      },
      {
        id: 'dl-4',
        timeStart: 12,
        timeEnd: 16,
        english: 'Nothing can break this view',
        vietnamese: 'Không điều gì có thể phá vỡ khung cảnh tuyệt đẹp này',
        clozeWords: [
          { word: 'break', cleanWord: 'break', hint: 'phá vỡ, làm tan vỡ', difficulty: 'A2' },
          { word: 'view', cleanWord: 'view', hint: 'khung cảnh, tầm nhìn', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-5',
        timeStart: 16,
        timeEnd: 19,
        english: 'You touch a silver clue guiding me through and through',
        vietnamese: 'Em chạm vào manh mối ánh bạc, dẫn lối anh suốt hành trình',
        clozeWords: [
          { word: 'silver', cleanWord: 'silver', hint: 'ánh bạc', difficulty: 'A2' },
          { word: 'clue', cleanWord: 'clue', hint: 'manh mối, chỉ dẫn', difficulty: 'B1' },
        ]
      },
      {
        id: 'dl-6',
        timeStart: 19,
        timeEnd: 25,
        english: 'Chain skate loud in the sky',
        vietnamese: 'Lướt vang ngân nga giữa bầu trời',
        clozeWords: [
          { word: 'loud', cleanWord: 'loud', hint: 'vang vọng, to lớn', difficulty: 'A1' },
          { word: 'sky', cleanWord: 'sky', hint: 'bầu trời', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-7',
        timeStart: 25,
        timeEnd: 30,
        english: 'You and me way up high',
        vietnamese: 'Em và anh ở tận trên cao',
        clozeWords: [
          { word: 'high', cleanWord: 'high', hint: 'ở trên cao', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-8',
        timeStart: 30,
        timeEnd: 34,
        english: "No lie, it's just you and I",
        vietnamese: 'Chẳng hề dối gian, chỉ có em và anh',
        clozeWords: [
          { word: 'lie', cleanWord: 'lie', hint: 'dối trá', difficulty: 'A2' },
        ]
      },
      {
        id: 'dl-9',
        timeStart: 34,
        timeEnd: 38,
        english: 'Turn it and never',
        vietnamese: 'Hãy quay lại và không bao giờ buông',
        clozeWords: [
          { word: 'never', cleanWord: 'never', hint: 'không bao giờ', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-10',
        timeStart: 38,
        timeEnd: 43,
        english: 'Thought showing stars across the blue',
        vietnamese: 'Từng ngỡ rằng những vì sao rực sáng khắp nền trời xanh',
        clozeWords: [
          { word: 'thought', cleanWord: 'thought', hint: 'đã nghĩ rằng', difficulty: 'A2' },
          { word: 'blue', cleanWord: 'blue', hint: 'màu xanh bầu trời', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-11',
        timeStart: 43,
        timeEnd: 46,
        english: 'Whisper secrets only we knew',
        vietnamese: 'Thì thầm những điều bí mật mà chỉ hai ta thấu hiểu',
        clozeWords: [
          { word: 'whisper', cleanWord: 'whisper', hint: 'thì thầm', difficulty: 'B1' },
          { word: 'secrets', cleanWord: 'secrets', hint: 'bí mật', difficulty: 'A2' },
        ]
      },
      {
        id: 'dl-12',
        timeStart: 46,
        timeEnd: 64,
        english: 'Universe bending the truth forever',
        vietnamese: 'Vũ trụ uốn cong mọi sự thật mãi mãi',
        clozeWords: [
          { word: 'universe', cleanWord: 'universe', hint: 'vũ trụ bao la', difficulty: 'B1' },
          { word: 'forever', cleanWord: 'forever', hint: 'mãi mãi', difficulty: 'A2' },
        ]
      },
      {
        id: 'dl-13',
        timeStart: 64,
        timeEnd: 68,
        english: 'High up in the chain so bright with stars',
        vietnamese: 'Tít trên cao rực sáng ngàn vì sao',
        clozeWords: [
          { word: 'bright', cleanWord: 'bright', hint: 'rực rỡ', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-14',
        timeStart: 68,
        timeEnd: 71,
        english: 'They kiss the night, your love was all',
        vietnamese: 'Chúng hôn nhẹ màn đêm, tình yêu em là tất cả',
        clozeWords: [
          { word: 'love', cleanWord: 'love', hint: 'tình yêu', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-15',
        timeStart: 71,
        timeEnd: 76,
        english: 'Insight with me in this fight in a galaxy of us two',
        vietnamese: 'Đồng hành cùng anh giữa dải ngân hà của riêng đôi ta',
        clozeWords: [
          { word: 'galaxy', cleanWord: 'galaxy', hint: 'dải ngân hà', difficulty: 'B1' },
        ]
      },
      {
        id: 'dl-16',
        timeStart: 76,
        timeEnd: 80,
        english: 'Nothing can break this view',
        vietnamese: 'Không gì có thể làm lu mờ khung cảnh này',
        clozeWords: [
          { word: 'break', cleanWord: 'break', hint: 'phá vỡ', difficulty: 'A2' },
        ]
      },
      {
        id: 'dl-17',
        timeStart: 80,
        timeEnd: 84,
        english: 'You touch a silver clue guiding me through and through',
        vietnamese: 'Em chạm vào manh mối ánh bạc, dẫn lối anh suốt chặng đường',
        clozeWords: [
          { word: 'silver', cleanWord: 'silver', hint: 'ánh bạc', difficulty: 'A2' },
          { word: 'guiding', cleanWord: 'guiding', hint: 'chỉ dẫn, dẫn đường', difficulty: 'B1' },
        ]
      },
      {
        id: 'dl-18',
        timeStart: 84,
        timeEnd: 88,
        english: 'Dreamscape loud in the sky',
        vietnamese: 'Cõi mơ vang vọng khắp bầu trời cao',
        clozeWords: [
          { word: 'dreamscape', cleanWord: 'dreamscape', hint: 'cõi mộng, cảnh mơ', difficulty: 'B2' },
        ]
      },
      {
        id: 'dl-19',
        timeStart: 88,
        timeEnd: 94,
        english: 'Oh, you and me way up high',
        vietnamese: 'Ôi, em và anh đang ở tận trên đỉnh trời',
        clozeWords: [
          { word: 'high', cleanWord: 'high', hint: 'trên cao', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-20',
        timeStart: 94,
        timeEnd: 99,
        english: 'Life is just you and I',
        vietnamese: 'Cuộc đời này chỉ có riêng em và anh',
        clozeWords: [
          { word: 'life', cleanWord: 'life', hint: 'cuộc sống, cuộc đời', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-21',
        timeStart: 99,
        timeEnd: 103,
        english: 'Turn it and never',
        vietnamese: 'Xoay chuyển và không bao giờ đổi thay',
        clozeWords: [
          { word: 'turn', cleanWord: 'turn', hint: 'xoay chuyển', difficulty: 'A2' },
        ]
      },
      {
        id: 'dl-22',
        timeStart: 103,
        timeEnd: 107,
        english: 'Thought showing stars across the blue',
        vietnamese: 'Tưởng như ngàn sao rải khắp nền trời xanh',
        clozeWords: [
          { word: 'stars', cleanWord: 'stars', hint: 'những vì sao', difficulty: 'A1' },
        ]
      },
      {
        id: 'dl-23',
        timeStart: 107,
        timeEnd: 111,
        english: 'Whisper secrets only we knew',
        vietnamese: 'Thì thầm những điều bí mật chỉ hai ta thấu hiểu',
        clozeWords: [
          { word: 'secrets', cleanWord: 'secrets', hint: 'điều bí mật', difficulty: 'A2' },
        ]
      },
      {
        id: 'dl-24',
        timeStart: 111,
        timeEnd: 125,
        english: 'Universe bending the truth forever',
        vietnamese: 'Vũ trụ uốn cong mọi sự thật đến muôn đời',
        clozeWords: [
          { word: 'universe', cleanWord: 'universe', hint: 'vũ trụ', difficulty: 'B1' },
        ]
      }
    ],
    vocabularies: [
      {
        id: 'dl-v1',
        word: 'galaxy',
        phonetic: 'ˈɡæl.ək.si',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'dải ngân hà, thiên hà rộng lớn',
        exampleSentence: 'In a galaxy of us two, nothing can break this view.',
        contextSentence: 'Dải ngân hà bao la chứa đựng vô vàn vì tinh tú.',
        oxfordTier: 'B1'
      },
      {
        id: 'dl-v2',
        word: 'whisper',
        phonetic: 'ˈwɪs.pər',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'thì thầm, nói nhỏ nhẹ vào tai',
        exampleSentence: 'Whisper secrets only we knew in the quiet night.',
        contextSentence: 'Họ thì thầm trao nhau những lời yêu thương.',
        oxfordTier: 'B1'
      },
      {
        id: 'dl-v3',
        word: 'universe',
        phonetic: 'ˈjuː.nɪ.vɜːs',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'vũ trụ, toàn bộ không gian và thời gian',
        exampleSentence: 'The universe is bending the truth forever.',
        contextSentence: 'Vũ trụ bao la huyền bí với hàng triệu vì sao.',
        oxfordTier: 'B1'
      },
      {
        id: 'dl-v4',
        word: 'guiding',
        phonetic: 'ˈɡaɪ.dɪŋ',
        partOfSpeech: 'adj',
        vietnameseMeaning: 'dẫn đường, soi lối chỉ đường',
        exampleSentence: 'You touch a silver clue guiding me through.',
        contextSentence: 'Ánh sáng ngọn hải đăng dẫn lối cho tàu thuyền cập bến an toàn.',
        oxfordTier: 'B1'
      }
    ],
    quiz: [
      {
        id: 'dl-q1',
        questionType: 'metaphor',
        question: 'Cụm từ "galaxy of us two" trong bài hát mang ý nghĩa gì?',
        options: [
          'Một thế giới tình yêu riêng tư, tách biệt và lãng mạn chỉ có hai người',
          'Một chuyến bay khám phá vũ trụ khoa học viễn tưởng',
          'Một trận chiến đấu giữa các vì sao',
          'Hai người đang quan sát bầu trời bằng kính thiên văn'
        ],
        correctIndex: 0,
        explanation: '"A galaxy of us two" là hình ảnh ẩn dụ tuyệt đẹp về không gian tình yêu lãng mạn, nơi chỉ có hai người bên nhau giữa vũ trụ.'
      },
      {
        id: 'dl-q2',
        questionType: 'vocab',
        question: 'Từ "whisper" đồng nghĩa với hành động nào dưới đây?',
        options: [
          'Speak very quietly using breath rather than full voice',
          'Shout loudly across the room',
          'Sing with a loud microphone',
          'Argue with someone angrily'
        ],
        correctIndex: 0,
        explanation: '"Whisper" nghĩa là thì thầm, nói rất khẽ bằng hơi thở thay vì giọng lớn.'
      }
    ]
  },
  {
    id: 'song-paris-in-the-rain',
    title: 'Paris in the Rain',
    artist: 'Lauv',
    level: 'B1',
    genre: 'Indie Pop / Chill R&B',
    duration: 215, // 03:35
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/kOCkne-Bku4?si=lz8tTiJF3jinVy-U',
    youtubeId: 'kOCkne-Bku4',
    description: 'Bản tình ca lãng mạn kinh điển của Lauv với giai điệu êm dịu, ca từ đậm chất thơ về cảm giác bình yên, say đắm bên người thương bất kể đang ở bất kỳ nơi đâu như đang dạo bước dưới cơn mưa Paris ("Anywhere with you feels like Paris in the rain").',
    lyrics: [
      {
        id: 'pitr-1',
        timeStart: 22,
        timeEnd: 26,
        english: "All I know is (ooh ooh ooh)",
        vietnamese: "Tất cả những gì anh biết chỉ là",
        clozeWords: [
                  {
                            "word": "know",
                            "cleanWord": "know",
                            "hint": "biết, thấu hiểu",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-2',
        timeStart: 26,
        timeEnd: 28,
        english: "We could go anywhere we could do",
        vietnamese: "Chúng ta có thể đi tới bất cứ đâu, làm bất cứ điều gì",
        clozeWords: [
                  {
                            "word": "anywhere",
                            "cleanWord": "anywhere",
                            "hint": "bất cứ đâu",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-3',
        timeStart: 28,
        timeEnd: 34,
        english: "Anything girl whatever the mood we're in",
        vietnamese: "Bất kể tâm trạng chúng ta ra sao, hỡi cô gái",
        clozeWords: [
                  {
                            "word": "mood",
                            "cleanWord": "mood",
                            "hint": "tâm trạng, cảm xúc",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-4',
        timeStart: 34,
        timeEnd: 36,
        english: "All I know is (ooh ooh ooh)",
        vietnamese: "Tất cả những gì anh biết lúc này là",
        clozeWords: [
                  {
                            "word": "know",
                            "cleanWord": "know",
                            "hint": "biết rõ",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-5',
        timeStart: 36,
        timeEnd: 39,
        english: "Getting lost late at night under stars",
        vietnamese: "Cùng nhau lạc lối giữa đêm muộn dưới những vì sao",
        clozeWords: [
                  {
                            "word": "lost",
                            "cleanWord": "lost",
                            "hint": "lạc lối",
                            "difficulty": "A2"
                  },
                  {
                            "word": "stars",
                            "cleanWord": "stars",
                            "hint": "những vì sao",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-6',
        timeStart: 39,
        timeEnd: 44,
        english: "Finding love standing right where we are your lips",
        vietnamese: "Tìm thấy tình yêu ngay tại nơi ta đang đứng, bờ môi em",
        clozeWords: [
                  {
                            "word": "standing",
                            "cleanWord": "standing",
                            "hint": "đang đứng",
                            "difficulty": "A1"
                  },
                  {
                            "word": "lips",
                            "cleanWord": "lips",
                            "hint": "đôi môi",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-7',
        timeStart: 44,
        timeEnd: 46,
        english: "They pull me in the moment",
        vietnamese: "Chúng kéo anh đắm chìm vào khoảnh khắc này",
        clozeWords: [
                  {
                            "word": "pull",
                            "cleanWord": "pull",
                            "hint": "kéo, cuốn hút",
                            "difficulty": "A2"
                  },
                  {
                            "word": "moment",
                            "cleanWord": "moment",
                            "hint": "khoảnh khắc",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-8',
        timeStart: 46,
        timeEnd: 49,
        english: "You and I alone and",
        vietnamese: "Chỉ có em và anh đơn độc và",
        clozeWords: [
                  {
                            "word": "alone",
                            "cleanWord": "alone",
                            "hint": "cô độc, một mình",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-9',
        timeStart: 49,
        timeEnd: 55,
        english: "People may be watching I don't mind 'cause",
        vietnamese: "Mọi người có thể đang dõi nhìn nhưng anh chẳng hề bận tâm vì",
        clozeWords: [
                  {
                            "word": "watching",
                            "cleanWord": "watching",
                            "hint": "quan sát, nhìn",
                            "difficulty": "A1"
                  },
                  {
                            "word": "mind",
                            "cleanWord": "mind",
                            "hint": "bận tâm, phiền lòng",
                            "difficulty": "B1"
                  }
        ]
      },
      {
        id: 'pitr-10',
        timeStart: 55,
        timeEnd: 58,
        english: "Anywhere with you feels right",
        vietnamese: "Ở bất cứ đâu bên em đều cảm thấy thật đúng đắn",
        clozeWords: [
                  {
                            "word": "right",
                            "cleanWord": "right",
                            "hint": "đúng đắn, hoàn hảo",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-11',
        timeStart: 58,
        timeEnd: 61,
        english: "Anywhere with you feels like",
        vietnamese: "Bất cứ nơi nào bên em đều ngỡ như là",
        clozeWords: [
                  {
                            "word": "feels",
                            "cleanWord": "feels",
                            "hint": "cảm giác như",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-12',
        timeStart: 61,
        timeEnd: 63,
        english: "Paris in the rain",
        vietnamese: "Paris dưới cơn mưa lãng mạn",
        clozeWords: [
                  {
                            "word": "rain",
                            "cleanWord": "rain",
                            "hint": "cơn mưa",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-13',
        timeStart: 63,
        timeEnd: 66,
        english: "Paris in the rain",
        vietnamese: "Paris dịu êm dưới hạt mưa rơi",
        clozeWords: [
                  {
                            "word": "Paris",
                            "cleanWord": "paris",
                            "hint": "thủ đô nước Pháp",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-14',
        timeStart: 66,
        timeEnd: 70,
        english: "We don't need a fancy town",
        vietnamese: "Ta chẳng cần một thị trấn sang trọng, xa hoa",
        clozeWords: [
                  {
                            "word": "fancy",
                            "cleanWord": "fancy",
                            "hint": "sang trọng, hoa lệ",
                            "difficulty": "B1"
                  },
                  {
                            "word": "town",
                            "cleanWord": "town",
                            "hint": "thị trấn, phố xá",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-15',
        timeStart: 70,
        timeEnd: 72,
        english: "Or bottles that we can't pronounce",
        vietnamese: "Hay những chai rượu ngoại ta chẳng biết đọc tên",
        clozeWords: [
                  {
                            "word": "bottles",
                            "cleanWord": "bottles",
                            "hint": "những chai rượu",
                            "difficulty": "A2"
                  },
                  {
                            "word": "pronounce",
                            "cleanWord": "pronounce",
                            "hint": "phát âm, đọc tên",
                            "difficulty": "B1"
                  }
        ]
      },
      {
        id: 'pitr-16',
        timeStart: 72,
        timeEnd: 74,
        english: "Cause anywhere babe",
        vietnamese: "Bởi vì bất kỳ nơi đâu, em yêu ơi",
        clozeWords: [
                  {
                            "word": "anywhere",
                            "cleanWord": "anywhere",
                            "hint": "bất kỳ nơi đâu",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-17',
        timeStart: 74,
        timeEnd: 77,
        english: "Is like Paris in the rain",
        vietnamese: "Cũng đều tuyệt vời như Paris dưới cơn mưa",
        clozeWords: [
                  {
                            "word": "rain",
                            "cleanWord": "rain",
                            "hint": "cơn mưa",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-18',
        timeStart: 77,
        timeEnd: 83,
        english: "When I'm with you",
        vietnamese: "Khi anh được ở bên em",
        clozeWords: [
                  {
                            "word": "with",
                            "cleanWord": "with",
                            "hint": "ở bên, cùng với",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-19',
        timeStart: 83,
        timeEnd: 88,
        english: "I look at you now and I want this forever",
        vietnamese: "Lúc này anh ngắm nhìn em và mong khoảnh khắc này kéo dài mãi mãi",
        clozeWords: [
                  {
                            "word": "forever",
                            "cleanWord": "forever",
                            "hint": "mãi mãi",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-20',
        timeStart: 88,
        timeEnd: 92,
        english: "I might not deserve it but there's nothing better",
        vietnamese: "Có thể anh không xứng đáng nhưng chẳng còn điều gì tuyệt vời hơn thế",
        clozeWords: [
                  {
                            "word": "deserve",
                            "cleanWord": "deserve",
                            "hint": "xứng đáng",
                            "difficulty": "B1"
                  },
                  {
                            "word": "better",
                            "cleanWord": "better",
                            "hint": "tốt hơn",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-21',
        timeStart: 92,
        timeEnd: 98,
        english: "Don't know how I ever did it all without you",
        vietnamese: "Chẳng hiểu nổi trước đây anh đã sống ra sao khi không có em",
        clozeWords: [
                  {
                            "word": "without",
                            "cleanWord": "without",
                            "hint": "thiếu vắng, không có",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-22',
        timeStart: 98,
        timeEnd: 100,
        english: "My heart is about to about to jump out of my chest",
        vietnamese: "Trái tim anh như sắp sửa nhảy tung ra khỏi lồng ngực",
        clozeWords: [
                  {
                            "word": "heart",
                            "cleanWord": "heart",
                            "hint": "trái tim",
                            "difficulty": "A1"
                  },
                  {
                            "word": "chest",
                            "cleanWord": "chest",
                            "hint": "lồng ngực",
                            "difficulty": "B1"
                  }
        ]
      },
      {
        id: 'pitr-23',
        timeStart: 100,
        timeEnd: 103,
        english: "Feelings they come and they go that they do",
        vietnamese: "Những cảm xúc thường đến rồi lại đi như quy luật",
        clozeWords: [
                  {
                            "word": "feelings",
                            "cleanWord": "feelings",
                            "hint": "cảm xúc",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-24',
        timeStart: 103,
        timeEnd: 106,
        english: "Feelings they come and they go not with you",
        vietnamese: "Cảm xúc đến rồi đi, nhưng riêng với em thì ở lại mãi",
        clozeWords: [
                  {
                            "word": "feelings",
                            "cleanWord": "feelings",
                            "hint": "những cảm xúc",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-25',
        timeStart: 106,
        timeEnd: 110,
        english: "The late nights, and the street lights, and the people, look at me girl, and the whole world could stop",
        vietnamese: "Đêm muộn, ánh đèn đường, dòng người qua lại, hãy nhìn anh đi và cả thế giới dường như dừng lại",
        clozeWords: [
                  {
                            "word": "world",
                            "cleanWord": "world",
                            "hint": "thế giới",
                            "difficulty": "A1"
                  },
                  {
                            "word": "stop",
                            "cleanWord": "stop",
                            "hint": "dừng lại",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-26',
        timeStart: 110,
        timeEnd: 113,
        english: "Anywhere with you feels right",
        vietnamese: "Ở bất cứ đâu bên em cũng thật trọn vẹn",
        clozeWords: [
                  {
                            "word": "right",
                            "cleanWord": "right",
                            "hint": "thật đúng đắn",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-27',
        timeStart: 113,
        timeEnd: 115,
        english: "Anywhere with you feels like",
        vietnamese: "Bất cứ nơi nào bên em cũng cảm giác như",
        clozeWords: [
                  {
                            "word": "feels",
                            "cleanWord": "feels",
                            "hint": "mang lại cảm xúc",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-28',
        timeStart: 115,
        timeEnd: 118,
        english: "Paris in the rain",
        vietnamese: "Paris trong màn mưa",
        clozeWords: [
                  {
                            "word": "rain",
                            "cleanWord": "rain",
                            "hint": "cơn mưa",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-29',
        timeStart: 118,
        timeEnd: 122,
        english: "Paris in the rain",
        vietnamese: "Paris dưới mưa",
        clozeWords: [
                  {
                            "word": "Paris",
                            "cleanWord": "paris",
                            "hint": "Paris",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-30',
        timeStart: 122,
        timeEnd: 125,
        english: "We don't need a fancy town",
        vietnamese: "Chúng ta không cần một thị trấn hoa lệ",
        clozeWords: [
                  {
                            "word": "fancy",
                            "cleanWord": "fancy",
                            "hint": "xa hoa",
                            "difficulty": "B1"
                  }
        ]
      },
      {
        id: 'pitr-31',
        timeStart: 125,
        timeEnd: 127,
        english: "Or bottles that we can't pronounce",
        vietnamese: "Hay những chai vang đắt tiền khó gọi tên",
        clozeWords: [
                  {
                            "word": "pronounce",
                            "cleanWord": "pronounce",
                            "hint": "phát âm",
                            "difficulty": "B1"
                  }
        ]
      },
      {
        id: 'pitr-32',
        timeStart: 127,
        timeEnd: 129,
        english: "Cause anywhere babe",
        vietnamese: "Vì bất cứ nơi nào em hỡi",
        clozeWords: [
                  {
                            "word": "anywhere",
                            "cleanWord": "anywhere",
                            "hint": "nơi nào",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-33',
        timeStart: 129,
        timeEnd: 134,
        english: "Is like Paris in the rain",
        vietnamese: "Cũng đều lãng mạn tựa Paris dưới mưa",
        clozeWords: [
                  {
                            "word": "rain",
                            "cleanWord": "rain",
                            "hint": "mưa",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-34',
        timeStart: 134,
        timeEnd: 139,
        english: "When I'm with you",
        vietnamese: "Mỗi khi anh ở cạnh em",
        clozeWords: [
                  {
                            "word": "with",
                            "cleanWord": "with",
                            "hint": "cùng với",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-35',
        timeStart: 139,
        timeEnd: 148,
        english: "Paris in the rain",
        vietnamese: "Paris dịu dàng dưới làn mưa bay",
        clozeWords: [
                  {
                            "word": "rain",
                            "cleanWord": "rain",
                            "hint": "mưa",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-36',
        timeStart: 149,
        timeEnd: 152,
        english: "Girl when I'm not with you",
        vietnamese: "Những lúc không ở bên em",
        clozeWords: [
                  {
                            "word": "Girl",
                            "cleanWord": "girl",
                            "hint": "cô gái",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-37',
        timeStart: 152,
        timeEnd: 160,
        english: "All I do is miss you",
        vietnamese: "Tất cả những gì anh làm chỉ là nhớ em da diết",
        clozeWords: [
                  {
                            "word": "miss",
                            "cleanWord": "miss",
                            "hint": "nhớ nhung",
                            "difficulty": "A1"
                  }
        ]
      },
      {
        id: 'pitr-38',
        timeStart: 160,
        timeEnd: 163,
        english: "Come and set the mood right",
        vietnamese: "Hãy đến và tạo nên bầu không khí lãng mạn này",
        clozeWords: [
                  {
                            "word": "mood",
                            "cleanWord": "mood",
                            "hint": "tâm trạng, không khí",
                            "difficulty": "A2"
                  }
        ]
      },
      {
        id: 'pitr-39',
        timeStart: 163,
        timeEnd: 170,
        english: "Underneath the moonlight",
        vietnamese: "Dưới ánh trăng dịu êm",
        clozeWords: [
                  {
                            "word": "moonlight",
                            "cleanWord": "moonlight",
                            "hint": "ánh trăng",
                            "difficulty": "B1"
                  }
        ]
      },
      {
        id: 'pitr-40',
        timeStart: 170,
        timeEnd: 182,
        english: "Paint you with my eyes closed. Wonder where the time goes",
        vietnamese: "Khắc họa hình bóng em ngay cả khi nhắm mắt, tự hỏi thời gian đã trôi đi đâu mất",
        clozeWords: [
          {
            word: "closed",
            cleanWord: "closed",
            hint: "nhắm lại",
            difficulty: "A1"
          },
          {
            word: "Wonder",
            cleanWord: "wonder",
            hint: "tự hỏi, ngỡ ngàng",
            difficulty: "B1"
          }
        ]
      },
      {
        id: 'pitr-41',
        timeStart: 182,
        timeEnd: 185,
        english: "Come and set the mood right",
        vietnamese: "Hãy đến cùng anh thắp lên cảm xúc",
        clozeWords: [
          {
            word: "mood",
            cleanWord: "mood",
            hint: "tâm trạng",
            difficulty: "A2"
          }
        ]
      },
      {
        id: 'pitr-42',
        timeStart: 185,
        timeEnd: 188,
        english: "Underneath the moonlight",
        vietnamese: "Bên dưới ánh trăng huyền ảo",
        clozeWords: [
          {
            word: "moonlight",
            cleanWord: "moonlight",
            hint: "ánh trăng",
            difficulty: "B1"
          }
        ]
      },
      {
        id: 'pitr-43',
        timeStart: 188,
        timeEnd: 193,
        english: "Anywhere with you feel right. Anywhere with you feels like",
        vietnamese: "Bên em ở đâu cũng là điều tuyệt nhất, nơi nào có em cũng ngập tràn cảm xúc",
        clozeWords: [
          {
            word: "right",
            cleanWord: "right",
            hint: "đúng đắn, trọn vẹn",
            difficulty: "A1"
          },
          {
            word: "feels",
            cleanWord: "feels",
            hint: "cảm nhận",
            difficulty: "A1"
          }
        ]
      },
      {
        id: 'pitr-44',
        timeStart: 193,
        timeEnd: 199,
        english: "Paris in the rain",
        vietnamese: "Paris đắm say dưới cơn mưa",
        clozeWords: [
          {
            word: "rain",
            cleanWord: "rain",
            hint: "cơn mưa",
            difficulty: "A1"
          }
        ]
      },
      {
        id: 'pitr-45',
        timeStart: 199,
        timeEnd: 202,
        english: "Walking down an empty street",
        vietnamese: "Dạo bước trên con phố vắng không một bóng người",
        clozeWords: [
          {
            word: "empty",
            cleanWord: "empty",
            hint: "trống vắng, vắng lặng",
            difficulty: "A2"
          },
          {
            word: "street",
            cleanWord: "street",
            hint: "đường phố",
            difficulty: "A1"
          }
        ]
      },
      {
        id: 'pitr-46',
        timeStart: 202,
        timeEnd: 215,
        english: "Puddles underneath our feet",
        vietnamese: "Những vũng nước đọng dưới bước chân đôi ta",
        clozeWords: [
          {
            word: "Puddles",
            cleanWord: "puddles",
            hint: "những vũng nước mưa",
            difficulty: "B1"
          },
          {
            word: "feet",
            cleanWord: "feet",
            hint: "đôi bàn chân",
            difficulty: "A1"
          }
        ]
      }
    ],
    vocabularies: [
      {
        id: 'pitr-v1',
        word: 'fancy',
        phonetic: 'ˈfæn.si',
        partOfSpeech: 'adj',
        vietnameseMeaning: 'sang trọng, hoa lệ, đắt tiền',
        exampleSentence: "We don't need a fancy town to be happy.",
        contextSentence: 'Họ không cần một bữa tiệc xa hoa để tận hưởng niềm vui.',
        oxfordTier: 'B1'
      },
      {
        id: 'pitr-v2',
        word: 'pronounce',
        phonetic: 'prəˈnaʊns',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'phát âm, đọc tên một từ hoặc tên riêng',
        exampleSentence: "Bottles of wine that we can't pronounce.",
        contextSentence: 'Rất nhiều từ tiếng Pháp có cách phát âm đặc biệt khó.',
        oxfordTier: 'B1'
      },
      {
        id: 'pitr-v3',
        word: 'puddle',
        phonetic: 'ˈpʌd.əl',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'vũng nước đọng trên mặt đất sau cơn mưa',
        exampleSentence: 'Puddles underneath our feet reflect the streetlights.',
        contextSentence: 'Đứa trẻ thích thú nhảy qua những vũng nước mưa đọng trên vỉa hè.',
        oxfordTier: 'B1'
      },
      {
        id: 'pitr-v4',
        word: 'deserve',
        phonetic: 'dɪˈzɜːv',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'xứng đáng nhận được điều gì đó',
        exampleSentence: "I might not deserve it, but there's nothing better.",
        contextSentence: 'Bạn hoàn toàn xứng đáng với sự thành công sau bao nỗ lực.',
        oxfordTier: 'B1'
      }
    ],
    quiz: [
      {
        id: 'pitr-q1',
        questionType: 'theme',
        question: 'Thông điệp cốt lõi của bài hát "Paris in the Rain" là gì?',
        options: [
          'Chỉ cần ở cạnh người mình yêu, bất kỳ nơi đâu cũng trở nên lãng mạn và tuyệt diệu như Paris dưới mưa',
          'Du lịch đến Paris là ước mơ tốn kém nhất của chàng trai',
          'Chàng trai thích đi dạo một mình dưới trời mưa tại nước Pháp',
          'Họ đang tìm kiếm một nhà hàng đắt đỏ tại Paris'
        ],
        correctIndex: 0,
        explanation: "Lời bài hát khẳng định \"Anywhere with you feels like Paris in the rain... We don't need a fancy town\", nhấn mạnh chính tình yêu mang lại sự lãng mạn chứ không phụ thuộc vào địa điểm sang trọng."
      },
      {
        id: 'pitr-q2',
        questionType: 'vocab',
        question: 'Từ "puddle" xuất hiện ở cuối bài hát nghĩa là gì?',
        options: [
          'Vũng nước đọng sau mưa trên mặt đường',
          'Đôi giày đi tuyết',
          'Chiếc ô che mưa',
          'Dòng sông Seine chảy qua Paris'
        ],
        correctIndex: 0,
        explanation: '"Puddle" là vũng nước mưa đọng lại trên mặt đường vỉa hè.'
      }
    ]
  },
  {
    id: 'song-silence',
    title: 'Silence',
    artist: 'Before You Exit',
    level: 'B1',
    genre: 'Acoustic Pop / Indie Ballad',
    duration: 200, // 03:20
    coverUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/7t4qnH8tpd4?si=5Aadjp_fIyEpwmFU',
    youtubeId: '7t4qnH8tpd4',
    description: 'Bản Pop/Acoustic sâu lắng từ ban nhạc Before You Exit về sự tĩnh lặng bình yên giữa thế giới ồn ào khi ta ở bên cạnh người mình yêu thương ("The world gets quiet... When we sat in silence").',
    lyrics: [
      {
        id: 'sil-1',
        timeStart: 9,
        timeEnd: 11,
        english: 'Talking',
        vietnamese: 'Những lời nói',
        clozeWords: [
          { word: 'Talking', cleanWord: 'talking', hint: 'nói chuyện', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-2',
        timeStart: 11,
        timeEnd: 14,
        english: "Why's everyone always talking",
        vietnamese: 'Tại sao ai nấy cũng không ngừng nói những lời vô nghĩa',
        clozeWords: [
          { word: 'everyone', cleanWord: 'everyone', hint: 'mọi người', difficulty: 'A1' },
          { word: 'always', cleanWord: 'always', hint: 'luôn luôn', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-3',
        timeStart: 14,
        timeEnd: 17,
        english: "Noise in my head but it's nonsense",
        vietnamese: 'Tiếng ồn trong tâm trí anh toàn điều vô nghĩa',
        clozeWords: [
          { word: 'Noise', cleanWord: 'noise', hint: 'tiếng ồn ào', difficulty: 'A2' },
          { word: 'nonsense', cleanWord: 'nonsense', hint: 'điều vô nghĩa, nhảm nhí', difficulty: 'B1' }
        ]
      },
      {
        id: 'sil-4',
        timeStart: 17,
        timeEnd: 20,
        english: "I can't feel nothing",
        vietnamese: 'Anh chẳng còn cảm nhận được gì nữa',
        clozeWords: [
          { word: 'feel', cleanWord: 'feel', hint: 'cảm nhận', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-5',
        timeStart: 20,
        timeEnd: 22,
        english: 'Guarded',
        vietnamese: 'Khép kín, dè chừng',
        clozeWords: [
          { word: 'Guarded', cleanWord: 'guarded', hint: 'khép kín, thận trọng', difficulty: 'B1' }
        ]
      },
      {
        id: 'sil-6',
        timeStart: 22,
        timeEnd: 25,
        english: "Don't over think how we started",
        vietnamese: 'Đừng nghĩ ngợi quá nhiều về cách chúng ta đã bắt đầu',
        clozeWords: [
          { word: 'started', cleanWord: 'started', hint: 'đã bắt đầu', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-7',
        timeStart: 25,
        timeEnd: 28,
        english: 'Knew from the second you walked in',
        vietnamese: 'Anh đã biết ngay từ giây phút em bước vào',
        clozeWords: [
          { word: 'second', cleanWord: 'second', hint: 'giây phút', difficulty: 'A1' },
          { word: 'walked', cleanWord: 'walked', hint: 'đã bước vào', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-8',
        timeStart: 28,
        timeEnd: 31,
        english: 'This could be something',
        vietnamese: 'Rằng giữa chúng ta sẽ có một điều gì đó thật đặc biệt',
        clozeWords: [
          { word: 'something', cleanWord: 'something', hint: 'điều gì đó đặc biệt', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-9',
        timeStart: 31,
        timeEnd: 34,
        english: "Everybody's looking for a love",
        vietnamese: 'Mọi người ngoài kia đều đang tìm kiếm một tình yêu',
        clozeWords: [
          { word: 'looking', cleanWord: 'looking', hint: 'đang tìm kiếm', difficulty: 'A1' },
          { word: 'love', cleanWord: 'love', hint: 'tình yêu', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-10',
        timeStart: 34,
        timeEnd: 37,
        english: 'To start a riot',
        vietnamese: 'Đủ mãnh liệt để tạo nên cơn chấn động',
        clozeWords: [
          { word: 'riot', cleanWord: 'riot', hint: 'cơn nổi loạn, náo loạn', difficulty: 'B2' }
        ]
      },
      {
        id: 'sil-11',
        timeStart: 37,
        timeEnd: 40,
        english: 'But every time I look in your eyes',
        vietnamese: 'Nhưng mỗi khi anh nhìn sâu vào đôi mắt em',
        clozeWords: [
          { word: 'eyes', cleanWord: 'eyes', hint: 'đôi mắt', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-12',
        timeStart: 40,
        timeEnd: 43,
        english: 'The world gets quiet',
        vietnamese: 'Cả thế giới xung quanh bỗng trở nên tĩnh lặng',
        clozeWords: [
          { word: 'world', cleanWord: 'world', hint: 'thế giới', difficulty: 'A1' },
          { word: 'quiet', cleanWord: 'quiet', hint: 'yên ắng, tĩnh lặng', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-13',
        timeStart: 43,
        timeEnd: 46,
        english: 'So let it go, let it fall, let it fly',
        vietnamese: 'Vậy hãy buông bỏ, để mọi thứ rơi rụng, để nó bay đi',
        clozeWords: [
          { word: 'fall', cleanWord: 'fall', hint: 'rơi xuống', difficulty: 'A1' },
          { word: 'fly', cleanWord: 'fly', hint: 'bay đi', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-14',
        timeStart: 46,
        timeEnd: 48,
        english: 'And keep on trying',
        vietnamese: 'Và tiếp tục không ngừng nỗ lực',
        clozeWords: [
          { word: 'trying', cleanWord: 'trying', hint: 'cố gắng, nỗ lực', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-15',
        timeStart: 48,
        timeEnd: 52,
        english: "'Cause I knew I was in love with you",
        vietnamese: 'Bởi anh biết mình đã yêu em tha thiết',
        clozeWords: [
          { word: 'knew', cleanWord: 'knew', hint: 'đã biết, đã hiểu', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-16',
        timeStart: 52,
        timeEnd: 55,
        english: 'When we sat in silence',
        vietnamese: 'Kể từ khoảnh khắc hai ta ngồi bên nhau trong yên lặng',
        clozeWords: [
          { word: 'sat', cleanWord: 'sat', hint: 'đã ngồi', difficulty: 'A1' },
          { word: 'silence', cleanWord: 'silence', hint: 'sự yên lặng, tĩnh mịch', difficulty: 'B1' }
        ]
      },
      {
        id: 'sil-17',
        timeStart: 55,
        timeEnd: 57,
        english: 'Dreaming',
        vietnamese: 'Mơ mộng',
        clozeWords: [
          { word: 'Dreaming', cleanWord: 'dreaming', hint: 'mơ mộng', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-18',
        timeStart: 57,
        timeEnd: 100,
        english: "I'm wide awake while I'm dreaming",
        vietnamese: 'Anh hoàn toàn tỉnh táo ngay cả khi đang mơ',
        clozeWords: [
          { word: 'awake', cleanWord: 'awake', hint: 'tỉnh táo', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-19',
        timeStart: 100,
        timeEnd: 103,
        english: "See in your eyes what you're thinking",
        vietnamese: 'Thấy trong mắt em những gì em đang suy nghĩ',
        clozeWords: [
          { word: 'thinking', cleanWord: 'thinking', hint: 'đang suy nghĩ', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-20',
        timeStart: 103,
        timeEnd: 106,
        english: "So please don't worry",
        vietnamese: 'Nên xin em đừng lo lắng nhé',
        clozeWords: [
          { word: 'worry', cleanWord: 'worry', hint: 'lo lắng', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-21',
        timeStart: 106,
        timeEnd: 108,
        english: 'Waiting',
        vietnamese: 'Chờ đợi',
        clozeWords: [
          { word: 'Waiting', cleanWord: 'waiting', hint: 'chờ đợi', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-22',
        timeStart: 108,
        timeEnd: 111,
        english: "Know that I'll always be waiting",
        vietnamese: 'Hãy biết rằng anh sẽ luôn kiên nhẫn đợi chờ em',
        clozeWords: [
          { word: 'always', cleanWord: 'always', hint: 'luôn luôn', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-23',
        timeStart: 111,
        timeEnd: 114,
        english: "Do you believe what I'm saying",
        vietnamese: 'Em có tin những lời anh đang nói không',
        clozeWords: [
          { word: 'believe', cleanWord: 'believe', hint: 'tin tưởng', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-24',
        timeStart: 114,
        timeEnd: 117,
        english: "I'm in no hurry",
        vietnamese: 'Anh chẳng hề vội vã đâu',
        clozeWords: [
          { word: 'hurry', cleanWord: 'hurry', hint: 'vội vã, hấp tấp', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-25',
        timeStart: 117,
        timeEnd: 120,
        english: "Everybody's looking for a love",
        vietnamese: 'Ai ai cũng tìm kiếm một mối tình',
        clozeWords: [
          { word: 'love', cleanWord: 'love', hint: 'tình yêu', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-26',
        timeStart: 120,
        timeEnd: 123,
        english: 'To start a riot',
        vietnamese: 'Có thể thổi bùng lên ngọn lửa dữ dội',
        clozeWords: [
          { word: 'riot', cleanWord: 'riot', hint: 'náo loạn', difficulty: 'B2' }
        ]
      },
      {
        id: 'sil-27',
        timeStart: 123,
        timeEnd: 126,
        english: 'But every time I look in your eyes',
        vietnamese: 'Nhưng mỗi khi anh nhìn vào ánh mắt em',
        clozeWords: [
          { word: 'eyes', cleanWord: 'eyes', hint: 'ánh mắt', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-28',
        timeStart: 126,
        timeEnd: 129,
        english: 'The world gets quiet',
        vietnamese: 'Cả vũ trụ bỗng chốc lặng im',
        clozeWords: [
          { word: 'quiet', cleanWord: 'quiet', hint: 'yên lặng', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-29',
        timeStart: 129,
        timeEnd: 132,
        english: 'So let it go, let it fall, let it fly',
        vietnamese: 'Cứ buông xuôi, mặc nó rơi, để nó vụt bay',
        clozeWords: [
          { word: 'fall', cleanWord: 'fall', hint: 'rơi', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-30',
        timeStart: 132,
        timeEnd: 134,
        english: 'And keep on trying',
        vietnamese: 'Và không ngừng cố gắng',
        clozeWords: [
          { word: 'trying', cleanWord: 'trying', hint: 'cố gắng', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-31',
        timeStart: 134,
        timeEnd: 138,
        english: "'Cause I knew I was in love with you",
        vietnamese: 'Bởi anh nhận ra trái tim mình đã trao trọn cho em',
        clozeWords: [
          { word: 'love', cleanWord: 'love', hint: 'yêu thương', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-32',
        timeStart: 138,
        timeEnd: 141,
        english: 'When we sat in silence',
        vietnamese: 'Khi đôi ta cùng ngồi trong cõi lặng im',
        clozeWords: [
          { word: 'silence', cleanWord: 'silence', hint: 'sự tĩnh lặng', difficulty: 'B1' }
        ]
      },
      {
        id: 'sil-33',
        timeStart: 141,
        timeEnd: 144,
        english: 'Let it go, let it fall, let it fly',
        vietnamese: 'Hãy để mọi thứ tự nhiên trôi đi',
        clozeWords: [
          { word: 'fly', cleanWord: 'fly', hint: 'bay đi', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-34',
        timeStart: 144,
        timeEnd: 147,
        english: 'And keep on trying',
        vietnamese: 'Và bền bỉ vượt qua tất cả',
        clozeWords: [
          { word: 'trying', cleanWord: 'trying', hint: 'kiên trì', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-35',
        timeStart: 147,
        timeEnd: 151,
        english: "'Cause I knew I was in love with you",
        vietnamese: 'Vì anh biết anh đã yêu em sâu đậm',
        clozeWords: [
          { word: 'knew', cleanWord: 'knew', hint: 'đã hiểu rõ', difficulty: 'A2' }
        ]
      },
      {
        id: 'sil-36',
        timeStart: 151,
        timeEnd: 154,
        english: 'When we sat in silence',
        vietnamese: 'Khoảnh khắc đôi ta ngồi trong thinh lặng',
        clozeWords: [
          { word: 'silence', cleanWord: 'silence', hint: 'sự thinh lặng', difficulty: 'B1' }
        ]
      },
      {
        id: 'sil-37',
        timeStart: 154,
        timeEnd: 185,
        english: '[Guitar solo & Instrumental melody]',
        vietnamese: '[Đoạn độc tấu Guitar acoustic sâu lắng]',
        clozeWords: []
      },
      {
        id: 'sil-38',
        timeStart: 185,
        timeEnd: 188,
        english: 'So let it go, let it fall, let it fly',
        vietnamese: 'Cứ buông bỏ, để mọi ưu phiền rơi rụng',
        clozeWords: [
          { word: 'fall', cleanWord: 'fall', hint: 'rơi xuống', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-39',
        timeStart: 188,
        timeEnd: 191,
        english: 'And keep on trying',
        vietnamese: 'Và tiếp tục kiên trì yêu thương',
        clozeWords: [
          { word: 'trying', cleanWord: 'trying', hint: 'nỗ lực', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-40',
        timeStart: 191,
        timeEnd: 195,
        english: "'Cause I knew I was in love with you",
        vietnamese: 'Bởi vì anh biết mình đã yêu em',
        clozeWords: [
          { word: 'love', cleanWord: 'love', hint: 'tình yêu', difficulty: 'A1' }
        ]
      },
      {
        id: 'sil-41',
        timeStart: 195,
        timeEnd: 200,
        english: 'When we sat in silence',
        vietnamese: 'Khi ta cùng ngồi bên nhau trong sự tĩnh lặng thiêng liêng',
        clozeWords: [
          { word: 'silence', cleanWord: 'silence', hint: 'sự tĩnh lặng', difficulty: 'B1' }
        ]
      }
    ],
    vocabularies: [
      {
        id: 'sil-v1',
        word: 'silence',
        phonetic: 'ˈsaɪ.ləns',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'sự tĩnh lặng, cõi yên ắng thiêng liêng',
        exampleSentence: 'I knew I was in love with you when we sat in silence.',
        contextSentence: 'Đôi khi sự im lặng thấu hiểu còn ý nghĩa hơn ngàn lời nói.',
        oxfordTier: 'B1'
      },
      {
        id: 'sil-v2',
        word: 'nonsense',
        phonetic: 'ˈnɒn.səns',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'điều vô nghĩa, lời nhảm nhí, chuyện vớ vẩn',
        exampleSentence: "Noise in my head, but it's nonsense.",
        contextSentence: 'Đừng bận tâm tới những lời bàn tán vô căn cứ ngoài kia.',
        oxfordTier: 'B1'
      },
      {
        id: 'sil-v3',
        word: 'guarded',
        phonetic: 'ˈɡɑː.dɪd',
        partOfSpeech: 'adj',
        vietnameseMeaning: 'thận trọng, dè dặt, khép kín tâm can',
        exampleSentence: 'I was guarded before I met you.',
        contextSentence: 'Sau những tổn thương trong quá khứ, cô ấy trở nên khép kín hơn.',
        oxfordTier: 'B1'
      },
      {
        id: 'sil-v4',
        word: 'wide awake',
        phonetic: 'ˌwaɪd əˈweɪk',
        partOfSpeech: 'idiom',
        vietnameseMeaning: 'hoàn toàn tỉnh táo, không hề ngái ngủ',
        exampleSentence: "I'm wide awake while I'm dreaming of you.",
        contextSentence: 'Uống một tách trà xanh giúp anh ấy hoàn toàn tỉnh táo suốt buổi làm việc.',
        oxfordTier: 'B1'
      }
    ],
    quiz: [
      {
        id: 'sil-q1',
        questionType: 'emotion',
        question: 'Ý nghĩa của câu "I knew I was in love with you when we sat in silence" là gì?',
        options: [
          'Đỉnh cao của tình yêu đích thực là khi hai người ở cạnh nhau trong im lặng mà vẫn cảm thấy bình yên, ấm áp và thấu hiểu',
          'Hai người giận nhau nên không ai chịu nói chuyện',
          'Họ đang ở trong thư viện nên buộc phải giữ im lặng',
          'Họ không còn chủ đề gì để trò chuyện cùng nhau'
        ],
        correctIndex: 0,
        explanation: 'Sự tĩnh lặng đồng điệu (comfortable silence) là minh chứng cho một tình cảm sâu sắc, nơi hai trái tim gắn kết mà không cần sự ồn ào của ngôn từ.'
      },
      {
        id: 'sil-q2',
        questionType: 'vocab',
        question: 'Từ "nonsense" đồng nghĩa với từ nào sau đây?',
        options: [
          'Meaningless or foolish ideas',
          'Deep wisdom',
          'Scientific facts',
          'Musical harmony'
        ],
        correctIndex: 0,
        explanation: '"Nonsense" là điều vô nghĩa, không có giá trị hay cơ sở thực tế.'
      }
    ]
  },
  {
    id: 'song-scared-2-be-lonely',
    title: 'Scared 2 Be Lonely (Rap / Beat Remix)',
    artist: 'Martin Garrix & Dua Lipa (Rap Remix)',
    level: 'B1',
    genre: 'Melodic Rap / Future Bass / Emotional',
    duration: 238, // 3:58
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/1Ob9vx0BtT0?si=mzSNH9wi5OwgICkH',
    youtubeId: '1Ob9vx0BtT0',
    description: 'Bản phối Beat & Rap đầy xúc cảm của "Scared to Be Lonely" (3:58), khắc họa nỗi đau sau chia tay, cảm giác trống trải khi đêm về, sự giằng xé giữa việc cố gắng buông bỏ và nỗi sợ hãi khi phải đối mặt với sự cô độc một mình.',
    lyrics: [
      {
        id: 's2bl-1',
        timeStart: 0,
        timeEnd: 8,
        english: "Too many heartaches and I'm not just believing",
        vietnamese: "Quá nhiều nỗi đau đớn xé lòng và tôi không còn đơn thuần tin tưởng nữa",
        clozeWords: [
          { word: 'heartaches', cleanWord: 'heartaches', hint: 'nỗi đau lòng', difficulty: 'B1' },
          { word: 'believing', cleanWord: 'believing', hint: 'tin tưởng', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-2',
        timeStart: 8,
        timeEnd: 11,
        english: "And I break down 'cause you said it'd be easy",
        vietnamese: "Và tôi suy sụp hoàn toàn vì người từng nói mọi thứ sẽ thật dễ dàng",
        clozeWords: [
          { word: 'break', cleanWord: 'break', hint: 'suy sụp (break down)', difficulty: 'A2' },
          { word: 'easy', cleanWord: 'easy', hint: 'dễ dàng', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-3',
        timeStart: 15,
        timeEnd: 18,
        english: "Too many lonely days, too many sold on nights",
        vietnamese: "Quá nhiều ngày tháng cô đơn, quá nhiều đêm trường chìm trong giá lạnh",
        clozeWords: [
          { word: 'lonely', cleanWord: 'lonely', hint: 'cô đơn', difficulty: 'A2' },
          { word: 'nights', cleanWord: 'nights', hint: 'những đêm tối', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-4',
        timeStart: 18,
        timeEnd: 24,
        english: "I'll be back in your arms at midnight",
        vietnamese: "Tôi lại tìm về trong vòng tay người lúc nửa đêm",
        clozeWords: [
          { word: 'arms', cleanWord: 'arms', hint: 'vòng tay', difficulty: 'A1' },
          { word: 'midnight', cleanWord: 'midnight', hint: 'nửa đêm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-5',
        timeStart: 24,
        timeEnd: 30,
        english: "Hold me 'cause I'm scared to be lonely",
        vietnamese: "Hãy ôm lấy tôi, bởi vì tôi sợ phải cô đơn một mình",
        clozeWords: [
          { word: 'Hold', cleanWord: 'hold', hint: 'ôm, giữ', difficulty: 'A1' },
          { word: 'scared', cleanWord: 'scared', hint: 'sợ hãi', difficulty: 'A2' },
          { word: 'lonely', cleanWord: 'lonely', hint: 'cô đơn', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-6',
        timeStart: 30,
        timeEnd: 31,
        english: "Yeah. Late night staring at the ceiling",
        vietnamese: "Phải rồi. Đêm muộn nằm trân trân nhìn lên trần nhà",
        clozeWords: [
          { word: 'staring', cleanWord: 'staring', hint: 'nhìn chằm chằm', difficulty: 'B1' },
          { word: 'ceiling', cleanWord: 'ceiling', hint: 'trần nhà', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-7',
        timeStart: 31,
        timeEnd: 33,
        english: "I'm racing fast",
        vietnamese: "Tâm trí tôi chạy đua dồn dập",
        clozeWords: [
          { word: 'racing', cleanWord: 'racing', hint: 'chạy đua, dồn dập', difficulty: 'B1' },
          { word: 'fast', cleanWord: 'fast', hint: 'nhanh', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-8',
        timeStart: 34,
        timeEnd: 36,
        english: "Every scar from the past trying to make it last",
        vietnamese: "Từng vết sẹo trong quá khứ, cố gắng níu giữ mối duyên này",
        clozeWords: [
          { word: 'scar', cleanWord: 'scar', hint: 'vết sẹo', difficulty: 'B2' },
          { word: 'past', cleanWord: 'past', hint: 'quá khứ', difficulty: 'A2' },
          { word: 'last', cleanWord: 'last', hint: 'kéo dài', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-9',
        timeStart: 36,
        timeEnd: 38,
        english: "You promised light left me in the dark",
        vietnamese: "Người từng hứa hẹn ánh sáng, nhưng lại bỏ rơi tôi trong bóng tối",
        clozeWords: [
          { word: 'promised', cleanWord: 'promised', hint: 'đã hứa', difficulty: 'A2' },
          { word: 'dark', cleanWord: 'dark', hint: 'bóng tối', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-10',
        timeStart: 38,
        timeEnd: 41,
        english: "So cold. Words cut deep",
        vietnamese: "Lạnh buốt giá. Từng lời nói sắc nhọn cứa sâu vào tâm can",
        clozeWords: [
          { word: 'cold', cleanWord: 'cold', hint: 'lạnh lẽo', difficulty: 'A1' },
          { word: 'deep', cleanWord: 'deep', hint: 'sâu thẳm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-11',
        timeStart: 41,
        timeEnd: 43,
        english: "Now my heart's stuck in a hole",
        vietnamese: "Giờ đây trái tim tôi đang mắc kẹt nơi hố sâu tăm tối",
        clozeWords: [
          { word: 'stuck', cleanWord: 'stuck', hint: 'mắc kẹt', difficulty: 'B1' },
          { word: 'hole', cleanWord: 'hole', hint: 'hố sâu', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-12',
        timeStart: 43,
        timeEnd: 45,
        english: "I've been drowning in silence",
        vietnamese: "Tôi như đang chìm nghỉm trong sự tĩnh lặng đến ngột ngạt",
        clozeWords: [
          { word: 'drowning', cleanWord: 'drowning', hint: 'chìm đắm, chết đuối', difficulty: 'B2' },
          { word: 'silence', cleanWord: 'silence', hint: 'sự tĩnh lặng', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-13',
        timeStart: 45,
        timeEnd: 48,
        english: "Don't want to hear",
        vietnamese: "Chẳng còn muốn lắng nghe bất cứ điều gì nữa",
        clozeWords: [
          { word: 'hear', cleanWord: 'hear', hint: 'lắng nghe', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-14',
        timeStart: 48,
        timeEnd: 50,
        english: "All these tears falling down, washing away my fear",
        vietnamese: "Những giọt nước mắt lăn dài, gột rửa đi nỗi sợ hãi trong tôi",
        clozeWords: [
          { word: 'tears', cleanWord: 'tears', hint: 'nước mắt', difficulty: 'A2' },
          { word: 'fear', cleanWord: 'fear', hint: 'nỗi sợ hãi', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-15',
        timeStart: 52,
        timeEnd: 54,
        english: "Used to think we'd be timeless, forever intertwined",
        vietnamese: "Từng ngỡ rằng đôi ta sẽ là vĩnh cửu, gắn kết không rời",
        clozeWords: [
          { word: 'timeless', cleanWord: 'timeless', hint: 'vĩnh cửu, vượt thời gian', difficulty: 'B2' },
          { word: 'intertwined', cleanWord: 'intertwined', hint: 'đan xen, quấn quýt', difficulty: 'C1' },
        ]
      },
      {
        id: 's2bl-16',
        timeStart: 54,
        timeEnd: 57,
        english: "Now I'm picking up pieces left behind",
        vietnamese: "Giờ đây tôi đang nhặt nhạnh từng mảnh vỡ còn sót lại phía sau",
        clozeWords: [
          { word: 'pieces', cleanWord: 'pieces', hint: 'những mảnh vỡ', difficulty: 'A2' },
          { word: 'behind', cleanWord: 'behind', hint: 'ở phía sau', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-17',
        timeStart: 57,
        timeEnd: 64,
        english: "Every call goes unless, every text left on red",
        vietnamese: "Mọi cuộc gọi đều vô ích, từng dòng tin nhắn đều bị ngó lơ đã xem",
        clozeWords: [
          { word: 'call', cleanWord: 'call', hint: 'cuộc gọi', difficulty: 'A1' },
          { word: 'text', cleanWord: 'text', hint: 'tin nhắn', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-18',
        timeStart: 64,
        timeEnd: 66,
        english: "Feeling like a stranger in the life we used to live",
        vietnamese: "Cảm giác như một kẻ xa lạ trong chính cuộc đời mà ta từng chung sống",
        clozeWords: [
          { word: 'stranger', cleanWord: 'stranger', hint: 'kẻ xa lạ', difficulty: 'B1' },
          { word: 'live', cleanWord: 'live', hint: 'sống', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-19',
        timeStart: 66,
        timeEnd: 68,
        english: "I'm tired of pretending that I'm okay inside",
        vietnamese: "Tôi đã quá mệt mỏi khi phải giả vờ rằng nội tâm mình vẫn ổn",
        clozeWords: [
          { word: 'tired', cleanWord: 'tired', hint: 'mệt mỏi', difficulty: 'A1' },
          { word: 'pretending', cleanWord: 'pretending', hint: 'giả vờ', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-20',
        timeStart: 68,
        timeEnd: 72,
        english: "Broken and bleeding, but I still try to hide",
        vietnamese: "Tan vỡ và rỉ máu, nhưng tôi vẫn cố gắng giấu kín",
        clozeWords: [
          { word: 'bleeding', cleanWord: 'bleeding', hint: 'rỉ máu, đau đớn', difficulty: 'B2' },
          { word: 'hide', cleanWord: 'hide', hint: 'che giấu', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-21',
        timeStart: 72,
        timeEnd: 77,
        english: "Chasing echoes of you in every empty space",
        vietnamese: "Mải miết đuổi theo những âm vang của người ở mọi khoảng không trống rỗng",
        clozeWords: [
          { word: 'echoes', cleanWord: 'echoes', hint: 'tiếng vọng, âm vang', difficulty: 'B2' },
          { word: 'empty', cleanWord: 'empty', hint: 'trống rỗng', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-22',
        timeStart: 77,
        timeEnd: 82,
        english: "This loneliness weighing heavy I can't erase",
        vietnamese: "Nỗi cô đơn này đè nặng trĩu mà tôi chẳng thể nào xóa nhòa",
        clozeWords: [
          { word: 'loneliness', cleanWord: 'loneliness', hint: 'nỗi cô đơn', difficulty: 'B1' },
          { word: 'erase', cleanWord: 'erase', hint: 'xóa nhòa', difficulty: 'B2' },
        ]
      },
      {
        id: 's2bl-23',
        timeStart: 82,
        timeEnd: 86,
        english: "Craving a touch like the air I need to breathe",
        vietnamese: "Khao khát một cái chạm ấm áp như dưỡng khí tôi cần để thở",
        clozeWords: [
          { word: 'Craving', cleanWord: 'craving', hint: 'khao khát cháy bỏng', difficulty: 'B2' },
          { word: 'breathe', cleanWord: 'breathe', hint: 'hít thở', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-24',
        timeStart: 86,
        timeEnd: 88,
        english: "Scared of the quiet, scared of what's left for me",
        vietnamese: "Sợ sự tĩnh mịch, sợ hãi những gì còn sót lại cho bản thân",
        clozeWords: [
          { word: 'quiet', cleanWord: 'quiet', hint: 'sự yên ắng', difficulty: 'A2' },
          { word: 'left', cleanWord: 'left', hint: 'còn sót lại', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-25',
        timeStart: 88,
        timeEnd: 90,
        english: "So I hold on tight to the memories we make",
        vietnamese: "Nên tôi chỉ biết bám víu thật chặt vào những kỷ niệm đôi ta đã tạo nên",
        clozeWords: [
          { word: 'tight', cleanWord: 'tight', hint: 'chặt chẽ', difficulty: 'A2' },
          { word: 'memories', cleanWord: 'memories', hint: 'những kỷ niệm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-26',
        timeStart: 96,
        timeEnd: 99,
        english: "Hoping you'll come back. Make the pain fade",
        vietnamese: "Hy vọng người sẽ trở lại, để làm vơi dịu nỗi đau này",
        clozeWords: [
          { word: 'pain', cleanWord: 'pain', hint: 'nỗi đau', difficulty: 'A2' },
          { word: 'fade', cleanWord: 'fade', hint: 'mờ dần, tan biến', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-27',
        timeStart: 104,
        timeEnd: 107,
        english: "Too many heartaches and I'm not. Just believe me",
        vietnamese: "Quá nhiều nỗi đau lòng và tôi chẳng thể chịu nổi. Xin hãy tin tôi",
        clozeWords: [
          { word: 'heartaches', cleanWord: 'heartaches', hint: 'nỗi đau đớn', difficulty: 'B1' },
          { word: 'believe', cleanWord: 'believe', hint: 'tin tưởng', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-28',
        timeStart: 112,
        timeEnd: 115,
        english: "And I break down 'cause you said it be easy",
        vietnamese: "Và tôi gục ngã vì người từng bảo mọi điều sẽ đơn giản",
        clozeWords: [
          { word: 'break', cleanWord: 'break', hint: 'suy sụp', difficulty: 'A2' },
          { word: 'easy', cleanWord: 'easy', hint: 'dễ dàng', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-29',
        timeStart: 119,
        timeEnd: 122,
        english: "Too many lonely days, too many sold on nights",
        vietnamese: "Quá nhiều ngày cô độc, quá nhiều đêm tối buốt giá",
        clozeWords: [
          { word: 'lonely', cleanWord: 'lonely', hint: 'cô đơn', difficulty: 'A2' },
          { word: 'nights', cleanWord: 'nights', hint: 'những đêm', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-30',
        timeStart: 122,
        timeEnd: 125,
        english: "I'll be back in your arms at midnight",
        vietnamese: "Tôi sẽ lại quay về trong vòng tay người lúc nửa đêm",
        clozeWords: [
          { word: 'arms', cleanWord: 'arms', hint: 'vòng tay', difficulty: 'A1' },
          { word: 'midnight', cleanWord: 'midnight', hint: 'nửa đêm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-31',
        timeStart: 127,
        timeEnd: 130,
        english: "Hold me 'cause I'm scared to be lonely",
        vietnamese: "Hãy ôm lấy tôi, bởi vì tôi rất sợ cảm giác cô đơn",
        clozeWords: [
          { word: 'scared', cleanWord: 'scared', hint: 'sợ hãi', difficulty: 'A2' },
          { word: 'lonely', cleanWord: 'lonely', hint: 'cô đơn', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-32',
        timeStart: 132,
        timeEnd: 136,
        english: "Yeah. Yeah. Late night staring at the ceiling. My racing fast",
        vietnamese: "Đêm khuya ngước nhìn trần nhà. Tâm trí tôi quay cuồng dồn dập",
        clozeWords: [
          { word: 'staring', cleanWord: 'staring', hint: 'nhìn chăm chú', difficulty: 'B1' },
          { word: 'racing', cleanWord: 'racing', hint: 'chạy dồn dập', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-33',
        timeStart: 136,
        timeEnd: 139,
        english: "Every scar from the past trying to make it last",
        vietnamese: "Từng vết sẹo cũ, vẫn cố gắng níu giữ mối duyên này",
        clozeWords: [
          { word: 'scar', cleanWord: 'scar', hint: 'vết sẹo', difficulty: 'B2' },
          { word: 'last', cleanWord: 'last', hint: 'kéo dài', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-34',
        timeStart: 139,
        timeEnd: 142,
        english: "You promised light, left me in the dark. So cold",
        vietnamese: "Người hứa hẹn ánh sáng, rồi bỏ tôi lại trong bóng tối. Lạnh lẽo biết bao",
        clozeWords: [
          { word: 'promised', cleanWord: 'promised', hint: 'đã hứa', difficulty: 'A2' },
          { word: 'cold', cleanWord: 'cold', hint: 'lạnh lẽo', difficulty: 'A1' },
        ]
      },
      {
        id: 's2bl-35',
        timeStart: 142,
        timeEnd: 145,
        english: "Words cut deep",
        vietnamese: "Những lời nói cứa sâu vào lòng",
        clozeWords: [
          { word: 'Words', cleanWord: 'words', hint: 'lời nói', difficulty: 'A1' },
          { word: 'deep', cleanWord: 'deep', hint: 'sâu thẳm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-36',
        timeStart: 145,
        timeEnd: 148,
        english: "Now my heart's stuck in a hole",
        vietnamese: "Giờ trái tim tôi lọt thỏm nơi hố sâu",
        clozeWords: [
          { word: 'stuck', cleanWord: 'stuck', hint: 'mắc kẹt', difficulty: 'B1' },
          { word: 'hole', cleanWord: 'hole', hint: 'hố sâu', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-37',
        timeStart: 148,
        timeEnd: 152,
        english: "I've been drowning in silence. I want to hear all these tears falling down",
        vietnamese: "Tôi chìm trong im lặng, chỉ muốn lắng nghe những giọt nước mắt đang rơi",
        clozeWords: [
          { word: 'silence', cleanWord: 'silence', hint: 'sự im lặng', difficulty: 'B1' },
          { word: 'tears', cleanWord: 'tears', hint: 'nước mắt', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-38',
        timeStart: 152,
        timeEnd: 154,
        english: "Washing away my fear",
        vietnamese: "Cuốn trôi đi những nỗi sợ hãi trong tôi",
        clozeWords: [
          { word: 'Washing', cleanWord: 'washing', hint: 'gột rửa', difficulty: 'A2' },
          { word: 'fear', cleanWord: 'fear', hint: 'nỗi sợ', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-39',
        timeStart: 154,
        timeEnd: 156,
        english: "Used to think we'd be timeless forever in it",
        vietnamese: "Từng nghĩ rằng chúng ta sẽ là mãi mãi",
        clozeWords: [
          { word: 'timeless', cleanWord: 'timeless', hint: 'vĩnh hằng', difficulty: 'B2' },
          { word: 'forever', cleanWord: 'forever', hint: 'mãi mãi', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-40',
        timeStart: 156,
        timeEnd: 160,
        english: "Now I'm picking up pieces",
        vietnamese: "Giờ đây tôi gom nhặt những mảnh vụn vỡ",
        clozeWords: [
          { word: 'picking', cleanWord: 'picking', hint: 'nhặt nhạnh', difficulty: 'A2' },
          { word: 'pieces', cleanWord: 'pieces', hint: 'mảnh vỡ', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-41',
        timeStart: 160,
        timeEnd: 162,
        english: "Left behind, left behind",
        vietnamese: "Bị bỏ lại phía sau, trôi dạt phía sau",
        clozeWords: [
          { word: 'behind', cleanWord: 'behind', hint: 'phía sau', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-42',
        timeStart: 162,
        timeEnd: 165,
        english: "Every call goes unless every text left",
        vietnamese: "Từng cuộc gọi nhỡ, từng dòng tin nhắn bị lãng quên",
        clozeWords: [
          { word: 'call', cleanWord: 'call', hint: 'cuộc gọi', difficulty: 'A1' },
          { word: 'text', cleanWord: 'text', hint: 'tin nhắn', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-43',
        timeStart: 167,
        timeEnd: 169,
        english: "Feeling like a stranger in the life we used to live",
        vietnamese: "Hóa thành người xa lạ trong cuộc sống ta từng chung đôi",
        clozeWords: [
          { word: 'stranger', cleanWord: 'stranger', hint: 'người xa lạ', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-44',
        timeStart: 169,
        timeEnd: 172,
        english: "I'm tired of pretending that I'm okay inside",
        vietnamese: "Tôi kiệt sức vì phải vờ như mình ổn",
        clozeWords: [
          { word: 'pretending', cleanWord: 'pretending', hint: 'giả vờ', difficulty: 'B1' },
          { word: 'inside', cleanWord: 'inside', hint: 'bên trong', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-45',
        timeStart: 172,
        timeEnd: 175,
        english: "Broken and bleeding, but I still try to hide",
        vietnamese: "Đau đớn và vụn vỡ, nhưng tôi vẫn cố giấu đi",
        clozeWords: [
          { word: 'Broken', cleanWord: 'broken', hint: 'tan vỡ', difficulty: 'A2' },
          { word: 'hide', cleanWord: 'hide', hint: 'che giấu', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-46',
        timeStart: 178,
        timeEnd: 181,
        english: "Chasing echoes of you in every empty space",
        vietnamese: "Đuổi theo bóng hình vang vọng của người trong căn phòng trống",
        clozeWords: [
          { word: 'echoes', cleanWord: 'echoes', hint: 'tiếng vọng', difficulty: 'B2' },
          { word: 'empty', cleanWord: 'empty', hint: 'trống rỗng', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-47',
        timeStart: 181,
        timeEnd: 183,
        english: "This loneliness weighing heavy I can't erase",
        vietnamese: "Nỗi cô đơn nặng trĩu này chẳng thể xóa nhòa",
        clozeWords: [
          { word: 'loneliness', cleanWord: 'loneliness', hint: 'nỗi cô đơn', difficulty: 'B1' },
          { word: 'erase', cleanWord: 'erase', hint: 'xóa bỏ', difficulty: 'B2' },
        ]
      },
      {
        id: 's2bl-48',
        timeStart: 183,
        timeEnd: 187,
        english: "Craving your touch like the air I need to breathe",
        vietnamese: "Khao khát hơi ấm của người như không khí cần để thở",
        clozeWords: [
          { word: 'Craving', cleanWord: 'craving', hint: 'khao khát', difficulty: 'B2' },
          { word: 'touch', cleanWord: 'touch', hint: 'cái chạm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-49',
        timeStart: 189,
        timeEnd: 191,
        english: "Scared of the quiet. Scared of what's left for me",
        vietnamese: "Sợ sự tĩnh mịch. Sợ những gì còn lại cho tôi",
        clozeWords: [
          { word: 'quiet', cleanWord: 'quiet', hint: 'yên tĩnh', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-50',
        timeStart: 191,
        timeEnd: 197,
        english: "So I hold on tight to the memories we make",
        vietnamese: "Nên tôi giữ chặt những kỷ niệm ta từng có",
        clozeWords: [
          { word: 'tight', cleanWord: 'tight', hint: 'chặt chẽ', difficulty: 'A2' },
          { word: 'memories', cleanWord: 'memories', hint: 'kỷ niệm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-51',
        timeStart: 200,
        timeEnd: 203,
        english: "Hoping you'll come back. Make the pain fade",
        vietnamese: "Mong người quay về, để nỗi đau dần tan biến",
        clozeWords: [
          { word: 'fade', cleanWord: 'fade', hint: 'tan biến', difficulty: 'B1' },
        ]
      },
      {
        id: 's2bl-52',
        timeStart: 210,
        timeEnd: 214,
        english: "I just believe me",
        vietnamese: "Chỉ xin hãy tin tôi",
        clozeWords: [
          { word: 'believe', cleanWord: 'believe', hint: 'tin tưởng', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-53',
        timeStart: 215,
        timeEnd: 218,
        english: "And I break down 'cause you said it be easy",
        vietnamese: "Và tôi gục ngã vì người từng hứa sẽ dễ dàng",
        clozeWords: [
          { word: 'break', cleanWord: 'break', hint: 'suy sụp', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-54',
        timeStart: 222,
        timeEnd: 226,
        english: "Too many lonely days, too many sold on nights. I'll be back in your arms at midnight",
        vietnamese: "Quá nhiều ngày cô độc, quá nhiều đêm lạnh giá. Tôi sẽ trở về trong vòng tay người lúc nửa đêm",
        clozeWords: [
          { word: 'midnight', cleanWord: 'midnight', hint: 'nửa đêm', difficulty: 'A2' },
        ]
      },
      {
        id: 's2bl-55',
        timeStart: 231,
        timeEnd: 238,
        english: "Hold me 'cause I'm scared to be lonely",
        vietnamese: "Hãy ôm tôi, vì tôi sợ phải cô đơn...",
        clozeWords: [
          { word: 'scared', cleanWord: 'scared', hint: 'sợ hãi', difficulty: 'A2' },
          { word: 'lonely', cleanWord: 'lonely', hint: 'cô đơn', difficulty: 'A2' },
        ]
      }
    ],
    vocabularies: [
      {
        id: 'vs-s2bl-1',
        word: 'heartache',
        phonetic: 'ˈhɑːrt.eɪk',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'nỗi đau lòng, nỗi buồn phiền sâu sắc',
        contextSentence: "Too many heartaches and I'm not just believing.",
        exampleSentence: 'Time helped heal the deep heartache caused by the sudden breakup.',
        oxfordTier: 'B1',
      },
      {
        id: 'vs-s2bl-2',
        word: 'intertwined',
        phonetic: 'ˌɪn.tərˈtwaɪnd',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'gắn kết chặt chẽ, quấn quýt không rời',
        contextSentence: "Used to think we'd be timeless, forever intertwined.",
        exampleSentence: 'Our personal and professional lives became closely intertwined.',
        oxfordTier: 'C1',
      },
      {
        id: 'vs-s2bl-3',
        word: 'echo',
        phonetic: 'ˈek.oʊ',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'tiếng vang vọng, dư âm kỷ niệm',
        contextSentence: 'Chasing echoes of you in every empty space.',
        exampleSentence: 'The empty hallway was filled with the faint echoes of footsteps.',
        oxfordTier: 'B2',
      },
      {
        id: 'vs-s2bl-4',
        word: 'craving',
        phonetic: 'ˈkreɪ.vɪŋ',
        partOfSpeech: 'noun / verb-ing',
        vietnameseMeaning: 'sự khao khát cháy bỏng, thèm muốn mãnh liệt',
        contextSentence: 'Craving a touch like the air I need to breathe.',
        exampleSentence: 'In moments of distress, she felt a strong craving for comfort and reassurance.',
        oxfordTier: 'B2',
      },
      {
        id: 'vs-s2bl-5',
        word: 'erase',
        phonetic: 'ɪˈreɪs',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'xóa bỏ, gột sạch không còn dấu vết',
        contextSentence: "This loneliness weighing heavy I can't erase.",
        exampleSentence: 'No apology could completely erase the pain she had endured.',
        oxfordTier: 'B2',
      },
      {
        id: 'vs-s2bl-6',
        word: 'stranger',
        phonetic: 'ˈstreɪn.dʒər',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'người lạ mặt, kẻ xa lạ',
        contextSentence: 'Feeling like a stranger in the life we used to live.',
        exampleSentence: 'After years apart, they looked at each other like total strangers.',
        oxfordTier: 'B1',
      }
    ],
    quiz: [
      {
        id: 'qs-s2bl-1',
        question: 'Chủ đề và cảm xúc cốt lõi của ca khúc "Scared 2 Be Lonely" là gì?',
        questionType: 'theme',
        options: [
          'Sự giằng xé nội tâm: khao khát quay lại chỉ vì nỗi sợ phải đối mặt với sự cô đơn một mình',
          'Một khúc ca ăn mừng sự giải thoát tự do sau khi chia tay người yêu cũ',
          'Lời khuyên người trẻ nên từ bỏ mạng xã hội để bảo vệ sức khỏe tâm thần',
          'Một chuyến đi phượt khám phá phong cảnh thiên nhiên hoang dã'
        ],
        correctIndex: 0,
        explanation: 'Lời bài hát bộc bạch nỗi sợ cô đơn tột cùng ("scared to be lonely"), khiến nhân vật dù biết mối quan hệ đã rạn nứt và để lại nhiều vết sẹo nhưng vẫn tìm về vòng tay người cũ lúc nửa đêm.'
      },
      {
        id: 'qs-s2bl-2',
        question: 'Hình ảnh so sánh "Craving a touch like the air I need to breathe" thể hiện mức độ cảm xúc như thế nào?',
        questionType: 'metaphor',
        options: [
          'Một nhu cầu bình thường, có cũng được không có cũng không sao',
          'Cảm giác nghẹt thở, xem hơi ấm và sự quan tâm của đối phương là điều thiết yếu để có thể sinh tồn',
          'Một căn bệnh về đường hô hấp cần bác sĩ điều trị',
          'Ý định muốn đi ra ngoài hít thở không khí trong lành'
        ],
        correctIndex: 1,
        explanation: 'Tác giả ví "cái chạm" của người yêu như "không khí cần để thở", nhấn mạnh sự phụ thuộc tình cảm và mức độ tuyệt vọng, ngột ngạt khi thiếu vắng đối phương.'
      },
      {
        id: 'qs-s2bl-3',
        question: 'Trong câu rap "every text left on read", cụm từ "left on read" ám chỉ điều gì?',
        questionType: 'vocab',
        options: [
          'Tin nhắn đã được gửi qua đường bưu điện',
          'Tin nhắn hiển thị trạng thái "Đã xem" nhưng đối phương cố tình im lặng không trả lời',
          'Tin nhắn bị lỗi kết nối mạng không gửi đi được',
          'Người nhận đã đọc to tin nhắn trước mặt mọi người'
        ],
        correctIndex: 1,
        explanation: '"Left on read" là tiếng lóng hiện đại trên các ứng dụng nhắn tin (như iMessage/Messenger), chỉ việc đối phương đã đọc tin nhắn nhưng lạnh lùng bỏ qua không hồi đáp.'
      }
    ]
  },
  {
    id: 'song-hopeless',
    title: 'Hopeless',
    artist: 'niko rain & jøno',
    level: 'B1',
    genre: 'Chill Lofi / Indie Pop / Alternative',
    duration: 175, // 2:55
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/fCVb2Bv--bc?si=3lXh8VKZUsiGlhGd',
    youtubeId: 'fCVb2Bv--bc',
    description: 'Bản tình ca Indie Lofi đầy tâm trạng của niko rain & jøno về cảm giác tuyệt vọng khi trải qua những giai đoạn chông chênh, nhưng tìm thấy điểm tựa tinh thần khi có người luôn bên cạnh nâng đỡ ("keeps my head afloat").',
    lyrics: [
      {
        id: 'hl-1',
        timeStart: 1,
        timeEnd: 4,
        english: "It is that time again",
        vietnamese: "Khoảnh khắc ấy lại đến một lần nữa",
        clozeWords: [
          { word: 'time', cleanWord: 'time', hint: 'thời điểm, khoảnh khắc', difficulty: 'A1' },
          { word: 'again', cleanWord: 'again', hint: 'lại lần nữa', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-2',
        timeStart: 4,
        timeEnd: 8,
        english: "Making wishes that never come true",
        vietnamese: "Thầm ước những điều ước chẳng bao giờ trở thành hiện thực",
        clozeWords: [
          { word: 'wishes', cleanWord: 'wishes', hint: 'những điều ước', difficulty: 'A2' },
          { word: 'true', cleanWord: 'true', hint: 'thành sự thật (come true)', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-3',
        timeStart: 8,
        timeEnd: 11,
        english: "And there goes a year",
        vietnamese: "Và thế là lại một năm nữa trôi qua",
        clozeWords: [
          { word: 'year', cleanWord: 'year', hint: 'một năm', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-4',
        timeStart: 11,
        timeEnd: 14,
        english: "If I could change how it ends, I would",
        vietnamese: "Nếu tôi có thể thay đổi hồi kết của nó, tôi nhất định sẽ làm",
        clozeWords: [
          { word: 'change', cleanWord: 'change', hint: 'thay đổi', difficulty: 'A2' },
          { word: 'ends', cleanWord: 'ends', hint: 'kết thúc', difficulty: 'A2' },
        ]
      },
      {
        id: 'hl-5',
        timeStart: 14,
        timeEnd: 22,
        english: "Going through phases, hoping hopelessly it'll get better",
        vietnamese: "Trải qua từng giai đoạn chông chênh, nuôi hy vọng trong vô vọng rằng mọi thứ sẽ tốt hơn",
        clozeWords: [
          { word: 'phases', cleanWord: 'phases', hint: 'các giai đoạn', difficulty: 'B2' },
          { word: 'hopelessly', cleanWord: 'hopelessly', hint: 'trong vô vọng', difficulty: 'B1' },
          { word: 'better', cleanWord: 'better', hint: 'tốt đẹp hơn', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-6',
        timeStart: 22,
        timeEnd: 25,
        english: "And it didn't change a thing",
        vietnamese: "Thế nhưng chẳng có điều gì đổi thay cả",
        clozeWords: [
          { word: 'change', cleanWord: 'change', hint: 'thay đổi', difficulty: 'A2' },
          { word: 'thing', cleanWord: 'thing', hint: 'điều gì', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-7',
        timeStart: 25,
        timeEnd: 32,
        english: "Oh, I'm fading",
        vietnamese: "Ôi, tôi dường như đang tan biến dần",
        clozeWords: [
          { word: 'fading', cleanWord: 'fading', hint: 'nhạt nhòa, tan biến', difficulty: 'B2' },
        ]
      },
      {
        id: 'hl-8',
        timeStart: 32,
        timeEnd: 40,
        english: "With tears in my eyes, when I told you how I felt, you said that it's all right",
        vietnamese: "Với giọt lệ ngấn trong mắt, khi tôi thổ lộ cảm xúc, em bảo rằng mọi chuyện rồi sẽ ổn thôi",
        clozeWords: [
          { word: 'tears', cleanWord: 'tears', hint: 'nước mắt', difficulty: 'A2' },
          { word: 'felt', cleanWord: 'felt', hint: 'đã cảm thấy', difficulty: 'A2' },
          { word: 'right', cleanWord: 'right', hint: 'ổn thỏa (all right)', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-9',
        timeStart: 40,
        timeEnd: 45,
        english: "It's all right, but I can't help the fact that I'm falling slowly",
        vietnamese: "Mọi chuyện ổn, nhưng tôi chẳng thể ngăn bản thân đang dần chìm sâu vào hụt hẫng",
        clozeWords: [
          { word: 'fact', cleanWord: 'fact', hint: 'sự thật', difficulty: 'A2' },
          { word: 'falling', cleanWord: 'falling', hint: 'rơi xuống, sụp đổ', difficulty: 'A2' },
          { word: 'slowly', cleanWord: 'slowly', hint: 'chậm rãi', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-10',
        timeStart: 45,
        timeEnd: 53,
        english: "Giving up on you, I'll hold you close since I don't like",
        vietnamese: "Từ bỏ em ư? Tôi sẽ ôm em thật chặt bởi tôi ghét cảm giác xa cách",
        clozeWords: [
          { word: 'Giving', cleanWord: 'giving', hint: 'từ bỏ (give up)', difficulty: 'A2' },
          { word: 'close', cleanWord: 'close', hint: 'gần gũi, sát bên', difficulty: 'A2' },
        ]
      },
      {
        id: 'hl-11',
        timeStart: 53,
        timeEnd: 61,
        english: "God, you're the only thing that keeps my head afloat",
        vietnamese: "Chúa ơi, em là điều duy nhất giữ cho đầu tôi còn nổi trên mặt nước (giúp tôi không gục ngã)",
        clozeWords: [
          { word: 'only', cleanWord: 'only', hint: 'duy nhất', difficulty: 'A1' },
          { word: 'afloat', cleanWord: 'afloat', hint: 'nổi trên mặt nước', difficulty: 'B2' },
        ]
      },
      {
        id: 'hl-12',
        timeStart: 61,
        timeEnd: 68,
        english: "There must be something under it all, when I responded, I don't feel it at all",
        vietnamese: "Chắc hẳn phải có điều gì ẩn sâu bên dưới, khi tôi đáp lại rằng tôi chẳng còn cảm xúc gì nữa",
        clozeWords: [
          { word: 'something', cleanWord: 'something', hint: 'điều gì đó', difficulty: 'A1' },
          { word: 'responded', cleanWord: 'responded', hint: 'đáp lại, phản hồi', difficulty: 'B1' },
          { word: 'feel', cleanWord: 'feel', hint: 'cảm nhận', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-13',
        timeStart: 68,
        timeEnd: 74,
        english: "But if you believe I'll never leave, I guess I'm not so hopeless",
        vietnamese: "Nhưng nếu em tin rằng tôi sẽ không bao giờ rời đi, tôi nghĩ mình không đến nỗi tuyệt vọng",
        clozeWords: [
          { word: 'believe', cleanWord: 'believe', hint: 'tin tưởng', difficulty: 'A2' },
          { word: 'leave', cleanWord: 'leave', hint: 'rời xa', difficulty: 'A1' },
          { word: 'hopeless', cleanWord: 'hopeless', hint: 'tuyệt vọng', difficulty: 'B1' },
        ]
      },
      {
        id: 'hl-14',
        timeStart: 76,
        timeEnd: 88,
        english: "There must be something under it all, when I responded, I don't feel it at all, but if you believe I'll never leave, I guess I'm not so hopeless",
        vietnamese: "Phải có điều gì đó bên dưới tất cả; chỉ cần em tin anh luôn ở lại, anh tin mình sẽ không tuyệt vọng",
        clozeWords: [
          { word: 'responded', cleanWord: 'responded', hint: 'phản hồi', difficulty: 'B1' },
          { word: 'hopeless', cleanWord: 'hopeless', hint: 'vô vọng', difficulty: 'B1' },
        ]
      },
      {
        id: 'hl-15',
        timeStart: 93,
        timeEnd: 106,
        english: "Wiped all your tears, till the morning I'll be here, and you say that you're fading, but I won't let you disappear",
        vietnamese: "Lau khô những dòng lệ của em, anh sẽ ở đây cho tới sớm mai; em bảo mình đang mờ phai, nhưng anh sẽ không để em biến mất",
        clozeWords: [
          { word: 'Wiped', cleanWord: 'wiped', hint: 'lau khô', difficulty: 'B1' },
          { word: 'morning', cleanWord: 'morning', hint: 'buổi sáng', difficulty: 'A1' },
          { word: 'disappear', cleanWord: 'disappear', hint: 'biến mất', difficulty: 'B1' },
        ]
      },
      {
        id: 'hl-16',
        timeStart: 106,
        timeEnd: 116,
        english: "You say that you're falling slowly, giving up hope, I'll hold you close and I won't let go",
        vietnamese: "Em nói em đang chìm dần, từ bỏ mọi hy vọng; anh sẽ ôm em thật sát và nhất định không buông tay",
        clozeWords: [
          { word: 'falling', cleanWord: 'falling', hint: 'rơi xuống', difficulty: 'A2' },
          { word: 'hope', cleanWord: 'hope', hint: 'hy vọng', difficulty: 'A2' },
          { word: 'close', cleanWord: 'close', hint: 'sát gần', difficulty: 'A2' },
        ]
      },
      {
        id: 'hl-17',
        timeStart: 116,
        timeEnd: 137,
        english: "You're the only thing that keeps my head afloat, there must be something under it all, when I responded, I don't feel it at all, but if you believe I'll never leave, I guess I'm not so hopeless",
        vietnamese: "Em là điều duy nhất nâng đỡ tâm hồn anh; dẫu anh từng nói mình vô cảm, chỉ cần em tin anh không rời bước, anh tin mình chẳng còn tuyệt vọng",
        clozeWords: [
          { word: 'afloat', cleanWord: 'afloat', hint: 'nổi, không chìm', difficulty: 'B2' },
          { word: 'hopeless', cleanWord: 'hopeless', hint: 'tuyệt vọng', difficulty: 'B1' },
        ]
      },
      {
        id: 'hl-18',
        timeStart: 139,
        timeEnd: 148,
        english: "Something under it all, then I responded, I don't feel it, feel it at all",
        vietnamese: "Ẩn sâu trong tất cả, anh từng đáp lại rằng anh chẳng còn cảm nhận được gì nữa",
        clozeWords: [
          { word: 'responded', cleanWord: 'responded', hint: 'đáp lại', difficulty: 'B1' },
          { word: 'feel', cleanWord: 'feel', hint: 'cảm nhận', difficulty: 'A1' },
        ]
      },
      {
        id: 'hl-19',
        timeStart: 148,
        timeEnd: 151,
        english: "Never, I guess I'm not so hopeless",
        vietnamese: "Không bao giờ, anh đoán rằng mình không đến mức vô vọng",
        clozeWords: [
          { word: 'guess', cleanWord: 'guess', hint: 'đoán, nghĩ rằng', difficulty: 'A2' },
          { word: 'hopeless', cleanWord: 'hopeless', hint: 'tuyệt vọng', difficulty: 'B1' },
        ]
      },
      {
        id: 'hl-20',
        timeStart: 164,
        timeEnd: 175,
        english: "Anymore, I guess I'm not so hopeless anymore",
        vietnamese: "Chẳng còn nữa, giờ anh tin rằng mình không còn tuyệt vọng nữa rồi...",
        clozeWords: [
          { word: 'hopeless', cleanWord: 'hopeless', hint: 'tuyệt vọng', difficulty: 'B1' },
          { word: 'anymore', cleanWord: 'anymore', hint: 'nữa, không còn nữa', difficulty: 'A2' },
        ]
      }
    ],
    vocabularies: [
      {
        id: 'vs-hl-1',
        word: 'hopeless',
        phonetic: 'ˈhoʊp.ləs',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'tuyệt vọng, không còn chút hy vọng nào',
        contextSentence: "I guess I'm not so hopeless anymore.",
        exampleSentence: 'Even in what seemed like a hopeless situation, they refused to surrender.',
        oxfordTier: 'B1',
      },
      {
        id: 'vs-hl-2',
        word: 'afloat',
        phonetic: 'əˈfloʊt',
        partOfSpeech: 'adjective',
        vietnameseMeaning: 'nổi trên mặt nước (nghĩa bóng: duy trì sự sống sót, không bị phá sản hay gục ngã)',
        contextSentence: "You're the only thing that keeps my head afloat.",
        exampleSentence: 'Government subsidies helped keep several struggling businesses afloat during the crisis.',
        oxfordTier: 'B2',
      },
      {
        id: 'vs-hl-3',
        word: 'fade',
        phonetic: 'feɪd',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'mờ phai, tàn úa, mất dần năng lượng sống',
        contextSentence: "And you say that you're fading, but I won't let you disappear.",
        exampleSentence: 'As darkness fell, the sounds of the bustling street began to fade.',
        oxfordTier: 'B2',
      },
      {
        id: 'vs-hl-4',
        word: 'disappear',
        phonetic: 'ˌdɪs.əˈpɪr',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'biến mất, tiêu tan không còn nhìn thấy',
        contextSentence: "I won't let you disappear.",
        exampleSentence: 'The magician made the coin disappear into thin air.',
        oxfordTier: 'A2',
      },
      {
        id: 'vs-hl-5',
        word: 'phase',
        phonetic: 'feɪz',
        partOfSpeech: 'noun',
        vietnameseMeaning: 'giai đoạn, thời kỳ thăng trầm',
        contextSentence: "Going through phases, hoping hopelessly it'll get better.",
        exampleSentence: 'Adolescence is a challenging phase that everyone must navigate.',
        oxfordTier: 'B1',
      }
    ],
    quiz: [
      {
        id: 'qs-hl-1',
        question: 'Thành ngữ "keeps my head afloat" trong bài hát mang ý nghĩa biểu tượng gì?',
        questionType: 'metaphor',
        options: [
          'Học bơi để không bị sặc nước ở bể bơi',
          'Sự nâng đỡ tinh thần to lớn giúp nhân vật không bị chìm nghỉm trong sự suy sụp và tuyệt vọng',
          'Một chiếc phao cứu sinh bằng cao su trên biển',
          'Cố gắng ngẩng đầu lên để nhìn rõ đồ vật trên cao'
        ],
        correctIndex: 1,
        explanation: '"Keep one\'s head afloat" (hoặc keep one\'s head above water) là thành ngữ chỉ việc gắng gượng sinh tồn, không để nghịch cảnh hay đau buồn nhấn chìm bản thân.'
      },
      {
        id: 'qs-hl-2',
        question: 'Tâm trạng của nhân vật đã có bước chuyển biến tích cực như thế nào qua ca khúc?',
        questionType: 'theme',
        options: [
          'Từ chán nản, tê liệt cảm xúc chuyển sang nhận ra mình "không còn tuyệt vọng nữa" nhờ có người yêu thương đồng hành',
          'Từ vui vẻ lạc quan chuyển sang bi quan cùng cực',
          'Không hề có chuyển biến nào, nhân vật ngày càng đau khổ hơn',
          'Nhân vật quyết định chia tay để tìm kiếm tự do riêng'
        ],
        correctIndex: 0,
        explanation: 'Từ cảm giác vô cảm "I don\'t feel it at all" ở đầu bài, đến cuối cùng sự cam kết đồng hành đã giúp nhân vật nhận ra "I guess I\'m not so hopeless anymore".'
      }
    ]
  },
  {
    id: 'song-leaving',
    title: 'Leaving',
    artist: 'niko rain & EJEAN',
    level: 'A2',
    genre: 'Dream Pop / Indie Electronic / Chill',
    duration: 120, // 2:00
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    youtubeUrl: 'https://youtu.be/x4B5HNzArB4?si=YyuduZuzm8LUdrL9',
    youtubeId: 'x4B5HNzArB4',
    description: 'Giai điệu Dream Pop da diết của niko rain kết hợp cùng EJEAN, mở ra không gian hoài niệm về lời chia tay, nỗi tiếc nuối những giây phút quý giá và lời hẹn ước tìm lại nhau giữa bầu trời bao la.',
    lyrics: [
      {
        id: 'lv-1',
        timeStart: 13,
        timeEnd: 22,
        english: "If I told you save you the tears falling down for",
        vietnamese: "Nếu anh nói với em, hãy giữ lại những giọt lệ đang tuôn rơi vì...",
        clozeWords: [
          { word: 'tears', cleanWord: 'tears', hint: 'nước mắt', difficulty: 'A2' },
          { word: 'falling', cleanWord: 'falling', hint: 'rơi xuống', difficulty: 'A2' },
        ]
      },
      {
        id: 'lv-2',
        timeStart: 22,
        timeEnd: 26,
        english: "Liv don't chish you",
        vietnamese: "Hãy trân trọng và đừng để lòng mình phải quặn đau",
        clozeWords: [
          { word: "don't", cleanWord: 'dont', hint: 'đừng', difficulty: 'A1' },
        ]
      },
      {
        id: 'lv-3',
        timeStart: 26,
        timeEnd: 32,
        english: "To promise I'll find you and we in the sky",
        vietnamese: "Lời hứa rằng anh sẽ tìm thấy em và chúng ta cùng hòa vào bầu trời",
        clozeWords: [
          { word: 'promise', cleanWord: 'promise', hint: 'lời hứa', difficulty: 'A2' },
          { word: 'find', cleanWord: 'find', hint: 'tìm thấy', difficulty: 'A1' },
          { word: 'sky', cleanWord: 'sky', hint: 'bầu trời', difficulty: 'A1' },
        ]
      },
      {
        id: 'lv-4',
        timeStart: 32,
        timeEnd: 41,
        english: "Hanging on to the seconds the promises we don't have time to spare cuz I know that you're",
        vietnamese: "Níu giữ từng giây từng phút, những lời hẹn ước mà ta chẳng còn thời gian để lãng phí, bởi anh biết em đang...",
        clozeWords: [
          { word: 'seconds', cleanWord: 'seconds', hint: 'những giây phút', difficulty: 'A2' },
          { word: 'promises', cleanWord: 'promises', hint: 'lời hứa', difficulty: 'A2' },
          { word: 'spare', cleanWord: 'spare', hint: 'dư dả, để dành', difficulty: 'B1' },
        ]
      },
      {
        id: 'lv-5',
        timeStart: 41,
        timeEnd: 52,
        english: "Leaving fight in half a million reasons you shouldn't go cuz I just don't believeing let to go",
        vietnamese: "Rời đi, dẫu đấu tranh với nửa triệu lý do em không nên ra đi, bởi anh chẳng thể chấp nhận buông tay",
        clozeWords: [
          { word: 'Leaving', cleanWord: 'leaving', hint: 'rời đi', difficulty: 'A2' },
          { word: 'million', cleanWord: 'million', hint: 'hàng triệu', difficulty: 'A2' },
          { word: 'reasons', cleanWord: 'reasons', hint: 'những lý do', difficulty: 'A2' },
        ]
      },
      {
        id: 'lv-6',
        timeStart: 52,
        timeEnd: 56,
        english: "I know that in my dreams I won't be alone",
        vietnamese: "Anh biết rằng trong những giấc mơ của mình, anh sẽ không còn cô độc",
        clozeWords: [
          { word: 'dreams', cleanWord: 'dreams', hint: 'những giấc mơ', difficulty: 'A2' },
          { word: 'alone', cleanWord: 'alone', hint: 'cô đơn, một mình', difficulty: 'A2' },
        ]
      },
      {
        id: 'lv-7',
        timeStart: 75,
        timeEnd: 79,
        english: "You falling down from your eyes",
        vietnamese: "Từng giọt lệ rơi xuống từ đôi mắt em",
        clozeWords: [
          { word: 'falling', cleanWord: 'falling', hint: 'rơi xuống', difficulty: 'A2' },
          { word: 'eyes', cleanWord: 'eyes', hint: 'đôi mắt', difficulty: 'A1' },
        ]
      },
      {
        id: 'lv-8',
        timeStart: 83,
        timeEnd: 87,
        english: "Don't promise I'll find you and we're up in the skies",
        vietnamese: "Hãy tin lời hứa anh sẽ tìm lại em khi đôi ta bay vút lên bầu trời cao",
        clozeWords: [
          { word: 'promise', cleanWord: 'promise', hint: 'lời hứa', difficulty: 'A2' },
          { word: 'find', cleanWord: 'find', hint: 'tìm thấy', difficulty: 'A1' },
          { word: 'skies', cleanWord: 'skies', hint: 'bầu trời', difficulty: 'A2' },
        ]
      },
      {
        id: 'lv-9',
        timeStart: 94,
        timeEnd: 102,
        english: "If I told you the LIE save do the tears falling down from your life",
        vietnamese: "Nếu anh từng nói lời nói dối để cứu lấy những dòng lệ rơi từ cuộc đời em",
        clozeWords: [
          { word: 'tears', cleanWord: 'tears', hint: 'nước mắt', difficulty: 'A2' },
          { word: 'life', cleanWord: 'life', hint: 'cuộc đời', difficulty: 'A1' },
        ]
      },
      {
        id: 'lv-10',
        timeStart: 102,
        timeEnd: 107,
        english: "Don't cry chish your time",
        vietnamese: "Đừng khóc, hãy nâng niu và trân trọng thời gian của em",
        clozeWords: [
          { word: 'cry', cleanWord: 'cry', hint: 'khóc lóc', difficulty: 'A1' },
          { word: 'time', cleanWord: 'time', hint: 'thời gian', difficulty: 'A1' },
        ]
      },
      {
        id: 'lv-11',
        timeStart: 107,
        timeEnd: 120,
        english: "Promise I'll find you when we're up in the sky",
        vietnamese: "Anh hứa rằng sẽ tìm thấy em khi chúng ta cùng hội ngộ nơi bầu trời bao la...",
        clozeWords: [
          { word: 'Promise', cleanWord: 'promise', hint: 'hứa hẹn', difficulty: 'A2' },
          { word: 'find', cleanWord: 'find', hint: 'tìm thấy', difficulty: 'A1' },
          { word: 'sky', cleanWord: 'sky', hint: 'bầu trời', difficulty: 'A1' },
        ]
      }
    ],
    vocabularies: [
      {
        id: 'vs-lv-1',
        word: 'time to spare',
        phonetic: 'taɪm tuː sper',
        partOfSpeech: 'phrase',
        vietnameseMeaning: 'thời gian dư dả, thời gian rảnh để lãng phí',
        contextSentence: "We don't have time to spare cuz I know that you're leaving.",
        exampleSentence: 'We arrived at the airport with an hour to spare before boarding.',
        oxfordTier: 'B1',
      },
      {
        id: 'vs-lv-2',
        word: 'cherish',
        phonetic: 'ˈtʃer.ɪʃ',
        partOfSpeech: 'verb',
        vietnameseMeaning: 'nâng niu, trân trọng, ấp ủ tình cảm thiêng liêng',
        contextSentence: 'Don\'t cry, cherish your time.',
        exampleSentence: 'Always cherish every moment spent with the people you love.',
        oxfordTier: 'B2',
      },
      {
        id: 'vs-lv-3',
        word: 'promise',
        phonetic: 'ˈprɑː.mɪs',
        partOfSpeech: 'noun / verb',
        vietnameseMeaning: 'lời hứa, cam kết',
        contextSentence: "Promise I'll find you when we're up in the sky.",
        exampleSentence: 'A broken promise can shatter trust in a relationship.',
        oxfordTier: 'A2',
      },
      {
        id: 'vs-lv-4',
        word: 'alone',
        phonetic: 'əˈloʊn',
        partOfSpeech: 'adjective / adverb',
        vietnameseMeaning: 'một mình, đơn độc',
        contextSentence: "I know that in my dreams I won't be alone.",
        exampleSentence: 'She enjoyed walking alone by the lake in the quiet evening.',
        oxfordTier: 'A2',
      }
    ],
    quiz: [
      {
        id: 'qs-lv-1',
        question: 'Ca khúc "Leaving" gửi gắm tâm trạng gì trước sự chia ly?',
        questionType: 'theme',
        options: [
          'Nỗi lưu luyến, tiếc nuối từng giây phút còn lại và lời hứa hẹn sẽ tái ngộ giữa bầu trời rộng lớn',
          'Sự giận dữ và oán trách vì bị phản bội',
          'Sự hào hứng khi bắt đầu chuyến du lịch máy bay một mình',
          'Sự dửng dưng không quan tâm đến người ra đi'
        ],
        correctIndex: 0,
        explanation: 'Bài hát khắc họa khoảnh khắc níu giữ từng giây ("hanging on to the seconds") trước khi đối phương rời đi ("leaving"), nhưng vẫn nuôi dưỡng niềm tin sẽ gặp lại nhau trên bầu trời cao.'
      },
      {
        id: 'qs-lv-2',
        question: 'Cụm từ "we don\'t have time to spare" có nghĩa là gì?',
        questionType: 'vocab',
        options: [
          'Chúng ta có rất nhiều thời gian rảnh rỗi',
          'Chúng ta không còn thời gian để lãng phí nữa, từng giây phút đều vô cùng quý giá',
          'Chúng ta cần mua thêm một chiếc đồng hồ dự phòng',
          'Chúng ta không biết bây giờ là mấy giờ'
        ],
        correctIndex: 1,
        explanation: '"Time to spare" chỉ lượng thời gian dư ra. "Don\'t have time to spare" nghĩa là thời gian đã cạn kiệt, phải trân trọng từng khoảnh khắc khẩn cấp.'
      }
    ]
  }
];
