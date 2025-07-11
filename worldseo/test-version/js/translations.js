// 多語言翻譯系統
const translations = {
    'zh-TW': {
        title: '全球智能身份資料生成器',
        subtitle: '採用先進地址邏輯引擎，動態生成符合各國規範的真實地址格式',
        engineStatus: '智能引擎運行中',
        asia: '🌏 亞洲',
        europe: '🌍 歐洲',
        americas: '🌎 美洲',
        africa: '🌍 非洲',
        oceania: '🌏 大洋洲',
        generate: '🎲 生成身份',
        clear: '🗑️ 清除結果',
        selectCountry: '請先選擇一個國家！',
        name: '姓名：',
        gender: '性別：',
        phone: '手機號碼：',
        address: '地址：',
        postal: '郵遞區號：',
        male: '男性',
        female: '女性',
        privacy: '隱私政策',
        terms: '使用條款',
        api: 'API文檔',
        contact: '聯絡我們',
        disclaimer: '免責聲明：本工具生成的所有資料僅供測試和教育用途，不得用於任何非法或欺詐活動。',
        aboutTitle: '智能地址生成引擎的技術革新',
        aboutDesc: '本系統採用了革命性的智能地址邏輯引擎，這是一個能夠理解並遵循全球各國地址規範的精密系統。與傳統的硬編碼地址庫不同，我們的引擎能夠根據每個國家獨特的地址格式規則，動態生成符合當地標準的地址。',
        engineTitle: '地址邏輯引擎的核心優勢',
        feature1Title: '智能格式識別',
        feature1Desc: '引擎內建了40+國家的地址格式規則，能夠識別並應用每個國家獨特的地址結構。',
        feature2Title: '郵遞區號算法',
        feature2Desc: '根據地理位置和行政區劃，精確計算符合各國郵政系統的郵遞區號。',
        feature3Title: '多語言轉換',
        feature3Desc: '內建羅馬化引擎，能將非拉丁文字地址準確轉換為國際通用格式。',
        addressFormatsTitle: '各國地址格式邏輯解析',
        japanFormatTitle: '🇯🇵 日本地址系統',
        japanFormatDesc: '日本地址遵循都道府県 → 市区町村 → 町名 → 丁目 → 番地 → 号的層級結構。我們的引擎理解這種獨特的區劃系統，能夠生成如「東京都渋谷区道玄坂2丁目15番1号」這樣的標準地址。',
        usaFormatTitle: '🇺🇸 美國地址系統',
        usaFormatDesc: '美國地址採用門牌號 + 街道名 + 街道類型 + 城市 + 州 + 郵遞區號的格式。引擎能識別Street、Avenue、Boulevard等街道類型，並根據城市自動匹配正確的ZIP碼範圍。',
        chinaFormatTitle: '🇨🇳 中國地址系統',
        chinaFormatDesc: '中國地址遵循省/市 → 區/縣 → 街道/鎮 → 路/街 → 門牌號的結構。系統能夠根據不同級別的行政區劃，生成符合中國郵政標準的6位郵遞區號。',
        technicalTitle: '技術實現細節',
        tech1: '採用模組化架構，每個國家的地址規則獨立封裝',
        tech2: '使用組件化地址生成，動態組合街道、地區、城市等元素',
        tech3: '實現智能權重分配，確保生成的地址分布符合實際人口密度',
        tech4: '內建地址驗證機制，確保生成的地址格式完全正確',
        tech5: '支援增量學習，可持續優化地址生成質量',
        privacyTitle: '隱私保護與合規性',
        privacyDesc: '所有生成的地址雖然格式真實、可通過地圖驗證，但不對應任何真實居民。門牌號碼採用隨機算法生成，確保不會意外匹配到真實住址。本工具嚴格遵守各國隱私保護法規，僅供合法的測試、開發和教育用途。',
        learnMore: '了解更多',
        todayNews: '今日新聞',
        readMore: '閱讀全文',
        newsCategory: '地址技術',
        today: '今天',
        yesterday: '昨天',
        daysAgo: '天前',
        adLoadError: '無法載入廣告資料',
        newsLoadError: '無法載入新聞資料'
    },
    'zh-CN': {
        title: '全球智能身份资料生成器',
        subtitle: '采用先进地址逻辑引擎，动态生成符合各国规范的真实地址格式',
        engineStatus: '智能引擎运行中',
        asia: '🌏 亚洲',
        europe: '🌍 欧洲',
        americas: '🌎 美洲',
        africa: '🌍 非洲',
        oceania: '🌏 大洋洲',
        generate: '🎲 生成身份',
        clear: '🗑️ 清除结果',
        selectCountry: '请先选择一个国家！',
        name: '姓名：',
        gender: '性别：',
        phone: '手机号码：',
        address: '地址：',
        postal: '邮政编码：',
        male: '男性',
        female: '女性',
        privacy: '隐私政策',
        terms: '使用条款',
        api: 'API文档',
        contact: '联系我们',
        disclaimer: '免责声明：本工具生成的所有资料仅供测试和教育用途，不得用于任何非法或欺诈活动。',
        aboutTitle: '智能地址生成引擎的技术革新',
        aboutDesc: '本系统采用了革命性的智能地址逻辑引擎，这是一个能够理解并遵循全球各国地址规范的精密系统。与传统的硬编码地址库不同，我们的引擎能够根据每个国家独特的地址格式规则，动态生成符合当地标准的地址。',
        engineTitle: '地址逻辑引擎的核心优势',
        feature1Title: '智能格式识别',
        feature1Desc: '引擎内建了40+国家的地址格式规则，能够识别并应用每个国家独特的地址结构。',
        feature2Title: '邮政编码算法',
        feature2Desc: '根据地理位置和行政区划，精确计算符合各国邮政系统的邮政编码。',
        feature3Title: '多语言转换',
        feature3Desc: '内建罗马化引擎，能将非拉丁文字地址准确转换为国际通用格式。',
        addressFormatsTitle: '各国地址格式逻辑解析',
        japanFormatTitle: '🇯🇵 日本地址系统',
        japanFormatDesc: '日本地址遵循都道府县 → 市区町村 → 町名 → 丁目 → 番地 → 号的层级结构。我们的引擎理解这种独特的区划系统，能够生成如「东京都涩谷区道玄坂2丁目15番1号」这样的标准地址。',
        usaFormatTitle: '🇺🇸 美国地址系统',
        usaFormatDesc: '美国地址采用门牌号 + 街道名 + 街道类型 + 城市 + 州 + 邮政编码的格式。引擎能识别Street、Avenue、Boulevard等街道类型，并根据城市自动匹配正确的ZIP码范围。',
        chinaFormatTitle: '🇨🇳 中国地址系统',
        chinaFormatDesc: '中国地址遵循省/市 → 区/县 → 街道/镇 → 路/街 → 门牌号的结构。系统能够根据不同级别的行政区划，生成符合中国邮政标准的6位邮政编码。',
        technicalTitle: '技术实现细节',
        tech1: '采用模块化架构，每个国家的地址规则独立封装',
        tech2: '使用组件化地址生成，动态组合街道、地区、城市等元素',
        tech3: '实现智能权重分配，确保生成的地址分布符合实际人口密度',
        tech4: '内建地址验证机制，确保生成的地址格式完全正确',
        tech5: '支持增量学习，可持续优化地址生成质量',
        privacyTitle: '隐私保护与合规性',
        privacyDesc: '所有生成的地址虽然格式真实、可通过地图验证，但不对应任何真实居民。门牌号码采用随机算法生成，确保不会意外匹配到真实住址。本工具严格遵守各国隐私保护法规，仅供合法的测试、开发和教育用途。',
        learnMore: '了解更多',
        todayNews: '今日新闻',
        readMore: '阅读全文',
        newsCategory: '地址技术',
        today: '今天',
        yesterday: '昨天',
        daysAgo: '天前',
        adLoadError: '无法加载广告资料',
        newsLoadError: '无法加载新闻资料'
    },
    'en': {
        title: 'Global Smart Identity Generator',
        subtitle: 'Advanced address logic engine dynamically generates real address formats for each country',
        engineStatus: 'Smart Engine Running',
        asia: '🌏 Asia',
        europe: '🌍 Europe',
        americas: '🌎 Americas',
        africa: '🌍 Africa',
        oceania: '🌏 Oceania',
        generate: '🎲 Generate Identity',
        clear: '🗑️ Clear Results',
        selectCountry: 'Please select a country first!',
        name: 'Name:',
        gender: 'Gender:',
        phone: 'Phone Number:',
        address: 'Address:',
        postal: 'Postal Code:',
        male: 'Male',
        female: 'Female',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        api: 'API Documentation',
        contact: 'Contact Us',
        disclaimer: 'Disclaimer: All data generated by this tool is for testing and educational purposes only and must not be used for any illegal or fraudulent activities.',
        aboutTitle: 'Technical Innovation of Smart Address Generation Engine',
        aboutDesc: 'This system employs a revolutionary smart address logic engine, a sophisticated system that understands and follows address standards across countries worldwide. Unlike traditional hard-coded address libraries, our engine can dynamically generate addresses that comply with local standards based on each country\'s unique address format rules.',
        engineTitle: 'Core Advantages of Address Logic Engine',
        feature1Title: 'Smart Format Recognition',
        feature1Desc: 'The engine has built-in address format rules for 40+ countries, capable of recognizing and applying each country\'s unique address structure.',
        feature2Title: 'Postal Code Algorithm',
        feature2Desc: 'Accurately calculates postal codes that comply with national postal systems based on geographic location and administrative divisions.',
        feature3Title: 'Multi-language Conversion',
        feature3Desc: 'Built-in romanization engine that accurately converts non-Latin script addresses to internationally recognized formats.',
        addressFormatsTitle: 'Analysis of Address Format Logic by Country',
        japanFormatTitle: '🇯🇵 Japanese Address System',
        japanFormatDesc: 'Japanese addresses follow a hierarchical structure: Prefecture → City/Ward → District → Chome → Ban → Go. Our engine understands this unique zoning system and can generate standard addresses like "2-15-1 Dogenzaka, Shibuya-ku, Tokyo".',
        usaFormatTitle: '🇺🇸 American Address System',
        usaFormatDesc: 'US addresses use the format: House Number + Street Name + Street Type + City + State + ZIP Code. The engine recognizes street types like Street, Avenue, Boulevard, and automatically matches the correct ZIP code range based on the city.',
        chinaFormatTitle: '🇨🇳 Chinese Address System',
        chinaFormatDesc: 'Chinese addresses follow the structure: Province/City → District/County → Street/Town → Road/Street → House Number. The system can generate 6-digit postal codes that comply with China Post standards based on different administrative levels.',
        technicalTitle: 'Technical Implementation Details',
        tech1: 'Adopts modular architecture with independently encapsulated address rules for each country',
        tech2: 'Uses component-based address generation to dynamically combine streets, districts, cities, and other elements',
        tech3: 'Implements smart weight distribution to ensure generated addresses match actual population density',
        tech4: 'Built-in address validation mechanism ensures completely correct address formats',
        tech5: 'Supports incremental learning for continuous optimization of address generation quality',
        privacyTitle: 'Privacy Protection and Compliance',
        privacyDesc: 'While all generated addresses have realistic formats and can be verified on maps, they do not correspond to any real residents. House numbers are generated using random algorithms to ensure no accidental matches with real addresses. This tool strictly complies with privacy protection regulations of various countries and is intended solely for legitimate testing, development, and educational purposes.',
        learnMore: 'Learn More',
        todayNews: "Today's News",
        readMore: 'Read More',
        newsCategory: 'Address Tech',
        today: 'Today',
        yesterday: 'Yesterday',
        daysAgo: 'days ago',
        adLoadError: 'Unable to load advertisements',
        newsLoadError: 'Unable to load news'
    },
    'ja': {
        title: 'グローバルスマート身分データジェネレーター',
        subtitle: '高度な住所ロジックエンジンが各国の規範に準拠した実際の住所形式を動的に生成',
        engineStatus: 'スマートエンジン稼働中',
        asia: '🌏 アジア',
        europe: '🌍 ヨーロッパ',
        americas: '🌎 アメリカ大陸',
        africa: '🌍 アフリカ',
        oceania: '🌏 オセアニア',
        generate: '🎲 身分を生成',
        clear: '🗑️ 結果をクリア',
        selectCountry: '先に国を選択してください！',
        name: '氏名：',
        gender: '性別：',
        phone: '電話番号：',
        address: '住所：',
        postal: '郵便番号：',
        male: '男性',
        female: '女性',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        api: 'APIドキュメント',
        contact: 'お問い合わせ',
        disclaimer: '免責事項：このツールで生成されたデータは、テストおよび教育目的のみです。',
        learnMore: 'もっと詳しく',
        todayNews: '今日のニュース',
        readMore: '続きを読む',
        newsCategory: '住所技術',
        today: '今日',
        yesterday: '昨日',
        daysAgo: '日前',
        adLoadError: '広告を読み込めません',
        newsLoadError: 'ニュースを読み込めません'
    },
    'hi': {
        title: 'वैश्विक स्मार्ट पहचान जनरेटर',
        subtitle: 'उन्नत पता तर्क इंजन प्रत्येक देश के लिए वास्तविक पता प्रारूप गतिशील रूप से उत्पन्न करता है',
        engineStatus: 'स्मार्ट इंजन चल रहा है',
        asia: '🌏 एशिया',
        europe: '🌍 यूरोप',
        americas: '🌎 अमेरिका',
        africa: '🌍 अफ्रीका',
        oceania: '🌏 ओशिनिया',
        generate: '🎲 पहचान उत्पन्न करें',
        clear: '🗑️ परिणाम साफ़ करें',
        selectCountry: 'कृपया पहले एक देश चुनें!',
        name: 'नाम:',
        gender: 'लिंग:',
        phone: 'फ़ोन नंबर:',
        address: 'पता:',
        postal: 'पिन कोड:',
        male: 'पुरुष',
        female: 'महिला',
        api: 'API दस्तावेज़',
        contact: 'संपर्क करें',
        disclaimer: 'अस्वीकरण: इस उपकरण द्वारा उत्पन्न सभी डेटा केवल परीक्षण और शैक्षिक उद्देश्यों के लिए है।',
        learnMore: 'और जानें',
        todayNews: 'आज की खबरें',
        readMore: 'पूरा पढ़ें',
        newsCategory: 'पता प्रौद्योगिकी',
        today: 'आज',
        yesterday: 'कल',
        daysAgo: 'दिन पहले',
        adLoadError: 'विज्ञापन लोड नहीं हो सका',
        newsLoadError: 'समाचार लोड नहीं हो सका'
    },
    'id': {
        title: 'Generator Identitas Pintar Global',
        subtitle: 'Mesin logika alamat canggih menghasilkan format alamat nyata untuk setiap negara secara dinamis',
        engineStatus: 'Mesin Pintar Berjalan',
        asia: '🌏 Asia',
        europe: '🌍 Eropa',
        americas: '🌎 Amerika',
        africa: '🌍 Afrika',
        oceania: '🌏 Oseania',
        generate: '🎲 Hasilkan Identitas',
        clear: '🗑️ Hapus Hasil',
        selectCountry: 'Silakan pilih negara terlebih dahulu!',
        name: 'Nama:',
        gender: 'Jenis Kelamin:',
        phone: 'Nomor Telepon:',
        address: 'Alamat:',
        postal: 'Kode Pos:',
        male: 'Laki-laki',
        female: 'Perempuan',
        api: 'Dokumentasi API',
        contact: 'Hubungi Kami',
        disclaimer: 'Penyangkalan: Semua data yang dihasilkan alat ini hanya untuk tujuan pengujian dan pendidikan.',
        learnMore: 'Pelajari Lebih',
        todayNews: 'Berita Hari Ini',
        readMore: 'Baca Selengkapnya',
        newsCategory: 'Teknologi Alamat',
        today: 'Hari ini',
        yesterday: 'Kemarin',
        daysAgo: 'hari yang lalu',
        adLoadError: 'Tidak dapat memuat iklan',
        newsLoadError: 'Tidak dapat memuat berita'
    },
    'pt': {
        title: 'Gerador Inteligente de Identidade Global',
        subtitle: 'Motor de lógica de endereço avançado gera dinamicamente formatos de endereço reais para cada país',
        engineStatus: 'Motor Inteligente em Execução',
        asia: '🌏 Ásia',
        europe: '🌍 Europa',
        americas: '🌎 Américas',
        africa: '🌍 África',
        oceania: '🌏 Oceania',
        generate: '🎲 Gerar Identidade',
        clear: '🗑️ Limpar Resultados',
        selectCountry: 'Por favor, selecione um país primeiro!',
        name: 'Nome:',
        gender: 'Gênero:',
        phone: 'Número de Telefone:',
        address: 'Endereço:',
        postal: 'Código Postal:',
        male: 'Masculino',
        female: 'Feminino',
        api: 'Documentação API',
        contact: 'Contate-nos',
        disclaimer: 'Aviso: Todos os dados gerados por esta ferramenta são apenas para fins de teste e educação.',
        learnMore: 'Saiba Mais',
        todayNews: 'Notícias de Hoje',
        readMore: 'Leia Mais',
        newsCategory: 'Tecnologia de Endereços',
        today: 'Hoje',
        yesterday: 'Ontem',
        daysAgo: 'dias atrás',
        adLoadError: 'Não foi possível carregar anúncios',
        newsLoadError: 'Não foi possível carregar notícias'
    },
    'ur': {
        title: 'عالمی سمارٹ شناخت جنریٹر',
        subtitle: 'جدید ایڈریس لاجک انجن ہر ملک کے لیے حقیقی ایڈریس فارمیٹ متحرک طور پر تیار کرتا ہے',
        engineStatus: 'سمارٹ انجن چل رہا ہے',
        asia: '🌏 ایشیا',
        europe: '🌍 یورپ',
        americas: '🌎 امریکہ',
        africa: '🌍 افریقہ',
        oceania: '🌏 اوشیانیا',
        generate: '🎲 شناخت بنائیں',
        clear: '🗑️ نتائج صاف کریں',
        selectCountry: 'براہ کرم پہلے ایک ملک منتخب کریں!',
        name: 'نام:',
        gender: 'جنس:',
        phone: 'فون نمبر:',
        address: 'پتہ:',
        postal: 'پوسٹل کوڈ:',
        male: 'مرد',
        female: 'عورت',
        api: 'API دستاویزات',
        contact: 'ہم سے رابطہ کریں',
        disclaimer: 'اعلان: اس ٹول کے ذریعے تیار کردہ تمام ڈیٹا صرف ٹیسٹنگ اور تعلیمی مقاصد کے لیے ہے۔',
        learnMore: 'مزید جانیں',
        todayNews: 'آج کی خبریں',
        readMore: 'مکمل پڑھیں',
        newsCategory: 'ایڈریس ٹیکنالوجی',
        today: 'آج',
        yesterday: 'کل',
        daysAgo: 'دن پہلے',
        adLoadError: 'اشتہارات لوڈ نہیں ہو سکے',
        newsLoadError: 'خبریں لوڈ نہیں ہو سکیں'
    },
    'yo': {
        title: 'Olupilẹṣẹ Idanimọ Ọlọgbọn Agbaye',
        subtitle: 'Ẹrọ imọ-ẹrọ adirẹsi to ga julọ n ṣe agbejade awọn ọna kika adirẹsi gidi fun orilẹ-ede kọọkan',
        engineStatus: 'Ẹrọ Ọlọgbọn n ṣiṣẹ',
        asia: '🌏 Asia',
        europe: '🌍 Yuropu',
        americas: '🌎 Amẹrika',
        africa: '🌍 Afirika',
        oceania: '🌏 Oceania',
        generate: '🎲 Ṣe Idanimọ',
        clear: '🗑️ Pa Awọn Esi Rẹ',
        selectCountry: 'Jọwọ yan orilẹ-ede kan ni akọkọ!',
        name: 'Orukọ:',
        gender: 'Akọ tabi Abo:',
        phone: 'Nọmba Foonu:',
        address: 'Adirẹsi:',
        postal: 'Koodu Ifiweranṣẹ:',
        male: 'Ọkunrin',
        female: 'Obinrin',
        api: 'Iwe API',
        contact: 'Pe wa',
        disclaimer: 'Ikilo: Gbogbo data ti a ṣe nipasẹ ọpa yii jẹ fun idanwo ati eto-ẹkọ nikan.',
        learnMore: 'Kọ ẹkun',
        todayNews: 'Iroyin Oni',
        readMore: 'Ka Siwaju',
        newsCategory: 'Imọ-ẹrọ Adirẹsi',
        today: 'Oni',
        yesterday: 'Ana',
        daysAgo: 'ọjọ sẹhin',
        adLoadError: 'Ko le gba ipolowo',
        newsLoadError: 'Ko le gba iroyin'
    },
    'ru': {
        title: 'Глобальный умный генератор личных данных',
        subtitle: 'Продвинутый механизм адресной логики динамически генерирует реальные форматы адресов для каждой страны',
        engineStatus: 'Умный движок работает',
        asia: '🌏 Азия',
        europe: '🌍 Европа',
        americas: '🌎 Америка',
        africa: '🌍 Африка',
        oceania: '🌏 Океания',
        generate: '🎲 Создать личность',
        clear: '🗑️ Очистить результаты',
        selectCountry: 'Пожалуйста, сначала выберите страну!',
        name: 'Имя:',
        gender: 'Пол:',
        phone: 'Номер телефона:',
        address: 'Адрес:',
        postal: 'Почтовый индекс:',
        male: 'Мужской',
        female: 'Женский',
        api: 'Документация API',
        contact: 'Связаться с нами',
        disclaimer: 'Отказ от ответственности: Все данные созданы только для тестирования и образования.',
        learnMore: 'Узнать больше',
        todayNews: 'Новости дня',
        readMore: 'Читать далее',
        newsCategory: 'Адресные технологии',
        today: 'Сегодня',
        yesterday: 'Вчера',
        daysAgo: 'дней назад',
        adLoadError: 'Не удалось загрузить рекламу',
        newsLoadError: 'Не удалось загрузить новости'
    },
    'bn': {
        title: 'বৈশ্বিক স্মার্ট পরিচয় জেনারেটর',
        subtitle: 'উন্নত ঠিকানা লজিক ইঞ্জিন প্রতিটি দেশের জন্য বাস্তব ঠিকানা ফর্ম্যাট গতিশীলভাবে তৈরি করে',
        engineStatus: 'স্মার্ট ইঞ্জিন চলছে',
        asia: '🌏 এশিয়া',
        europe: '🌍 ইউরোপ',
        americas: '🌎 আমেরিকা',
        africa: '🌍 আফ্রিকা',
        oceania: '🌏 ওশেনিয়া',
        generate: '🎲 পরিচয় তৈরি করুন',
        clear: '🗑️ ফলাফল মুছুন',
        selectCountry: 'অনুগ্রহ করে প্রথমে একটি দেশ নির্বাচন করুন!',
        name: 'নাম:',
        gender: 'লিঙ্গ:',
        phone: 'ফোন নম্বর:',
        address: 'ঠিকানা:',
        postal: 'পোস্টাল কোড:',
        male: 'পুরুষ',
        female: 'মহিলা',
        api: 'API ডকুমেন্টেশন',
        contact: 'যোগাযোগ করুন',
        disclaimer: 'দাবিত্যাগ: এই টুল দ্বারা তৈরি সমস্ত ডেটা শুধুমাত্র পরীক্ষা এবং শিক্ষার উদ্দেশ্যে।',
        learnMore: 'আরও জানুন',
        todayNews: 'আজকের খবর',
        readMore: 'আরও পড়ুন',
        newsCategory: 'ঠিকানা প্রযুক্তি',
        today: 'আজ',
        yesterday: 'গতকাল',
        daysAgo: 'দিন আগে',
        adLoadError: 'বিজ্ঞাপন লোড করা যায়নি',
        newsLoadError: 'সংবাদ লোড করা যায়নি'
    }
}; 