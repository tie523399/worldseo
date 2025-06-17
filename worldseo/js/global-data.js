// 全球資料庫 - 姓名部分
const globalData = {
    japan: {
        name: '日本',
        nameEn: 'Japan',
        flag: '🇯🇵',
        lastNames: ['佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤'],
        firstNames: {
            male: ['蓮', '陽翔', '蒼', '樹', '湊', '大翔', '悠真', '陽太', '朝陽', '結翔'],
            female: ['陽菜', '凛', '結愛', '葵', '紬', '莉子', 'さくら', '美月', '心愛', '芽依']
        },
        phoneFormat: '+81-{90|80|70}-####-####'
    },
    korea: {
        name: '韓國',
        nameEn: 'South Korea',
        flag: '🇰🇷',
        lastNames: ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'],
        firstNames: {
            male: ['민준', '서준', '도윤', '예준', '시우', '하준', '주원', '지호', '지후', '준우'],
            female: ['서연', '서윤', '지우', '서현', '하은', '하윤', '민서', '지유', '윤서', '채원']
        },
        phoneFormat: '+82-10-####-####'
    },
    china: {
        name: '中國',
        nameEn: 'China',
        flag: '🇨🇳',
        lastNames: ['王', '李', '张', '刘', '陈', '杨', '黄', '赵', '周', '吴'],
        firstNames: {
            male: ['伟', '强', '磊', '洋', '勇', '军', '杰', '涛', '明', '华'],
            female: ['芳', '敏', '静', '丽', '娟', '艳', '萍', '燕', '霞', '玲']
        },
        phoneFormat: '+86-1{3|5|7|8|9}#-####-####'
    },
    taiwan: {
        name: '台灣',
        nameEn: 'Taiwan',
        flag: '🇹🇼',
        lastNames: ['陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊'],
        firstNames: {
            male: ['志明', '俊傑', '建宏', '俊宏', '志豪', '志偉', '文雄', '金龍', '志強', '建華'],
            female: ['淑芬', '淑惠', '美玲', '雅婷', '美惠', '麗華', '淑娟', '淑貞', '怡君', '淑華']
        },
        phoneFormat: '+886-9##-###-###'
    },
    india: {
        name: '印度',
        nameEn: 'India',
        flag: '🇮🇳',
        lastNames: ['Sharma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Rao', 'Verma', 'Jain', 'Nair'],
        firstNames: {
            male: ['Arjun', 'Rohit', 'Raj', 'Amit', 'Vijay', 'Arun', 'Ravi', 'Sanjay', 'Suresh', 'Ashok'],
            female: ['Priya', 'Anjali', 'Pooja', 'Kavita', 'Neha', 'Aarti', 'Sunita', 'Anita', 'Deepa', 'Meera']
        },
        phoneFormat: '+91-{9|8|7}#########'
    },
    thailand: {
        name: '泰國',
        nameEn: 'Thailand',
        flag: '🇹🇭',
        lastNames: ['ศรีสุข', 'ทองดี', 'แก้วใส', 'สุขใจ', 'ใจดี', 'รักไทย', 'มั่งมี', 'เจริญสุข'],
        firstNames: {
            male: ['สมชาย', 'สมศักดิ์', 'ประสิทธิ์', 'วิชัย', 'ชัยยา', 'นพดล', 'สุรพล', 'อภิชาต'],
            female: ['มาลี', 'สุดา', 'พรทิพย์', 'สมฤดี', 'กาญจนา', 'นันทนา', 'จิราพร', 'วิไล']
        },
        phoneFormat: '+66-{8|9}#-###-####'
    },
    vietnam: {
        name: '越南',
        nameEn: 'Vietnam',
        flag: '🇻🇳',
        lastNames: ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ'],
        firstNames: {
            male: ['Minh', 'Hùng', 'Dũng', 'Tuấn', 'Long', 'Hải', 'Nam', 'Khôi'],
            female: ['Linh', 'Hương', 'Lan', 'Mai', 'Hoa', 'Thảo', 'Ngọc', 'Trang']
        },
        phoneFormat: '+84-{9|8|7|3}#-###-####'
    },
    indonesia: {
        name: '印尼',
        nameEn: 'Indonesia',
        flag: '🇮🇩',
        lastNames: ['Wijaya', 'Santoso', 'Hidayat', 'Rahman', 'Kusuma', 'Pratama', 'Setiawan', 'Gunawan'],
        firstNames: {
            male: ['Budi', 'Agus', 'Rizki', 'Andi', 'Dedi', 'Hendra', 'Joko', 'Rudi'],
            female: ['Siti', 'Dewi', 'Sri', 'Putri', 'Ayu', 'Ratna', 'Indah', 'Maya']
        },
        phoneFormat: '+62-8##-####-####'
    },
    singapore: {
        name: '新加坡',
        nameEn: 'Singapore',
        flag: '🇸🇬',
        lastNames: ['Tan', 'Lee', 'Lim', 'Wong', 'Ng', 'Ong', 'Teo', 'Koh'],
        firstNames: {
            male: ['Wei Ming', 'Jun Wei', 'Zhi Hao', 'Yi Xuan', 'Kai Xin', 'Jia Wei', 'Chen Wei'],
            female: ['Hui Ling', 'Xin Yi', 'Jia Ying', 'Shu Ting', 'Wen Jing', 'Li Ying', 'Mei Ling']
        },
        phoneFormat: '+65-{8|9}###-####'
    },
    malaysia: {
        name: '馬來西亞',
        nameEn: 'Malaysia',
        flag: '🇲🇾',
        lastNames: ['Ahmad', 'Mohammad', 'Abdullah', 'Ibrahim', 'Tan', 'Lee', 'Wong', 'Lim'],
        firstNames: {
            male: ['Muhammad', 'Ahmad', 'Wei Jie', 'Raj', 'Kumar', 'Hafiz', 'Amir', 'Faiz'],
            female: ['Siti', 'Nur', 'Mei Ling', 'Priya', 'Devi', 'Aisyah', 'Fatimah', 'Sarah']
        },
        phoneFormat: '+60-1{2|3|4|6|7|8|9}-###-####'
    },
    pakistan: {
        name: '巴基斯坦',
        nameEn: 'Pakistan',
        flag: '🇵🇰',
        lastNames: ['احمد', 'علی', 'خان', 'حسین', 'شاہ', 'ملک', 'چوہدری', 'شیخ'],
        firstNames: {
            male: ['محمد', 'احمد', 'علی', 'حسن', 'عمر', 'فیصل', 'بلال', 'عثمان'],
            female: ['عائشہ', 'فاطمہ', 'زینب', 'مریم', 'سارہ', 'ثناء', 'نور', 'حنا']
        },
        phoneFormat: '+92-3##-#######'
    },
    bangladesh: {
        name: '孟加拉',
        nameEn: 'Bangladesh',
        flag: '🇧🇩',
        lastNames: ['রহমান', 'হোসেন', 'আহমেদ', 'খান', 'ইসলাম', 'আলী', 'হক', 'মিয়া'],
        firstNames: {
            male: ['মোহাম্মদ', 'আবদুল', 'রফিক', 'করিম', 'রহিম', 'সালাম', 'জাহিদ', 'নাসির'],
            female: ['ফাতেমা', 'আয়েশা', 'রুমা', 'সুমাইয়া', 'নাজমা', 'রাবেয়া', 'সালমা', 'পারভীন']
        },
        phoneFormat: '+880-1{7|8|9}##-######'
    },
    russia: {
        name: '俄羅斯',
        nameEn: 'Russia',
        flag: '🇷🇺',
        lastNames: ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов'],
        firstNames: {
            male: ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья'],
            female: ['Анна', 'Мария', 'Елена', 'Ольга', 'Наталья', 'Екатерина', 'Анастасия', 'Виктория']
        },
        phoneFormat: '+7-9##-###-##-##'
    },
    uk: {
        name: '英國',
        nameEn: 'United Kingdom',
        flag: '🇬🇧',
        lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'],
        firstNames: {
            male: ['James', 'William', 'Oliver', 'Henry', 'George', 'Harry', 'Jack', 'Charlie'],
            female: ['Emma', 'Olivia', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Harper']
        },
        phoneFormat: '+44-7{4|5|7|8|9}##-######'
    },
    france: {
        name: '法國',
        nameEn: 'France',
        flag: '🇫🇷',
        lastNames: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand'],
        firstNames: {
            male: ['Jean', 'Pierre', 'Michel', 'André', 'Philippe', 'René', 'Louis', 'Alain'],
            female: ['Marie', 'Jeanne', 'Françoise', 'Monique', 'Catherine', 'Nathalie', 'Isabelle', 'Sylvie']
        },
        phoneFormat: '+33-{6|7}-##-##-##-##'
    },
    germany: {
        name: '德國',
        nameEn: 'Germany',
        flag: '🇩🇪',
        lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker'],
        firstNames: {
            male: ['Maximilian', 'Alexander', 'Paul', 'Elias', 'Ben', 'Jonas', 'Leon', 'Finn'],
            female: ['Emma', 'Mia', 'Hannah', 'Sophia', 'Anna', 'Lea', 'Marie', 'Lena']
        },
        phoneFormat: '+49-1{5|6|7}#-########'
    },
    italy: {
        name: '義大利',
        nameEn: 'Italy',
        flag: '🇮🇹',
        lastNames: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci'],
        firstNames: {
            male: ['Francesco', 'Alessandro', 'Andrea', 'Lorenzo', 'Matteo', 'Giuseppe', 'Antonio', 'Giovanni'],
            female: ['Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra', 'Emma', 'Giorgia', 'Greta']
        },
        phoneFormat: '+39-3##-###-####'
    },
    spain: {
        name: '西班牙',
        nameEn: 'Spain',
        flag: '🇪🇸',
        lastNames: ['García', 'González', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez'],
        firstNames: {
            male: ['Antonio', 'Manuel', 'José', 'Francisco', 'David', 'Juan', 'Javier', 'Daniel'],
            female: ['María', 'Carmen', 'Ana', 'Isabel', 'Dolores', 'Pilar', 'Teresa', 'Rosa']
        },
        phoneFormat: '+34-6##-##-##-##'
    },
    netherlands: {
        name: '荷蘭',
        nameEn: 'Netherlands',
        flag: '🇳🇱',
        lastNames: ['de Jong', 'Jansen', 'de Vries', 'van den Berg', 'van Dijk', 'Bakker', 'Visser', 'Smit'],
        firstNames: {
            male: ['Daan', 'Sem', 'Milan', 'Levi', 'Lucas', 'Finn', 'Jayden', 'Tim'],
            female: ['Emma', 'Tess', 'Sophie', 'Julia', 'Anna', 'Isa', 'Mila', 'Sara']
        },
        phoneFormat: '+31-6-####-####'
    },
    belgium: {
        name: '比利時',
        nameEn: 'Belgium',
        flag: '🇧🇪',
        lastNames: ['Peeters', 'Janssens', 'Maes', 'Jacobs', 'Willems', 'Mertens', 'Claes', 'Wouters'],
        firstNames: {
            male: ['Lucas', 'Louis', 'Noah', 'Liam', 'Adam', 'Arthur', 'Jules', 'Victor'],
            female: ['Emma', 'Louise', 'Olivia', 'Mila', 'Alice', 'Camille', 'Lina', 'Juliette']
        },
        phoneFormat: '+32-4##-##-##-##'
    },
    sweden: {
        name: '瑞典',
        nameEn: 'Sweden',
        flag: '🇸🇪',
        lastNames: ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson'],
        firstNames: {
            male: ['Oscar', 'William', 'Lucas', 'Hugo', 'Elias', 'Oliver', 'Liam', 'Alexander'],
            female: ['Alice', 'Maja', 'Elsa', 'Astrid', 'Wilma', 'Freja', 'Olivia', 'Selma']
        },
        phoneFormat: '+46-7#-###-##-##'
    },
    switzerland: {
        name: '瑞士',
        nameEn: 'Switzerland',
        flag: '🇨🇭',
        lastNames: ['Müller', 'Meier', 'Schmid', 'Keller', 'Weber', 'Huber', 'Meyer', 'Schneider'],
        firstNames: {
            male: ['Noah', 'Liam', 'Matteo', 'Luca', 'Gabriel', 'Leon', 'Elias', 'Louis'],
            female: ['Mia', 'Emma', 'Elena', 'Lina', 'Mila', 'Emilia', 'Sofia', 'Olivia']
        },
        phoneFormat: '+41-7{8|9}-###-##-##'
    },
    poland: {
        name: '波蘭',
        nameEn: 'Poland',
        flag: '🇵🇱',
        lastNames: ['Nowak', 'Kowalski', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński'],
        firstNames: {
            male: ['Jan', 'Stanisław', 'Andrzej', 'Józef', 'Tadeusz', 'Jerzy', 'Zbigniew', 'Krzysztof'],
            female: ['Anna', 'Maria', 'Katarzyna', 'Małgorzata', 'Agnieszka', 'Barbara', 'Ewa', 'Krystyna']
        },
        phoneFormat: '+48-###-###-###'
    },
    usa: {
        name: '美國',
        nameEn: 'United States',
        flag: '🇺🇸',
        lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'],
        firstNames: {
            male: ['James', 'Michael', 'Robert', 'John', 'David', 'William', 'Richard', 'Joseph'],
            female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica']
        },
        phoneFormat: '+1-###-###-####'
    },
    canada: {
        name: '加拿大',
        nameEn: 'Canada',
        flag: '🇨🇦',
        lastNames: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Gagnon'],
        firstNames: {
            male: ['Liam', 'Noah', 'Oliver', 'William', 'Lucas', 'Benjamin', 'Jacob', 'Logan'],
            female: ['Emma', 'Olivia', 'Sophia', 'Ava', 'Isabella', 'Charlotte', 'Mia', 'Amelia']
        },
        phoneFormat: '+1-###-###-####'
    },
    mexico: {
        name: '墨西哥',
        nameEn: 'Mexico',
        flag: '🇲🇽',
        lastNames: ['García', 'Rodríguez', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez'],
        firstNames: {
            male: ['José', 'Juan', 'Miguel', 'Francisco', 'Jesús', 'Antonio', 'Alejandro', 'Pedro'],
            female: ['María', 'Guadalupe', 'Juana', 'Margarita', 'Verónica', 'Patricia', 'Elizabeth', 'Alejandra']
        },
        phoneFormat: '+52-##-####-####'
    },
    brazil: {
        name: '巴西',
        nameEn: 'Brazil',
        flag: '🇧🇷',
        lastNames: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira'],
        firstNames: {
            male: ['João', 'José', 'Antônio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas'],
            female: ['Maria', 'Ana', 'Francisca', 'Antônia', 'Adriana', 'Juliana', 'Márcia', 'Fernanda']
        },
        phoneFormat: '+55-##-9####-####'
    },
    argentina: {
        name: '阿根廷',
        nameEn: 'Argentina',
        flag: '🇦🇷',
        lastNames: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Martínez', 'García', 'Pérez'],
        firstNames: {
            male: ['Juan', 'Carlos', 'José', 'Roberto', 'Daniel', 'Luis', 'Jorge', 'Alberto'],
            female: ['María', 'Ana', 'Laura', 'Patricia', 'Claudia', 'Mónica', 'Silvia', 'Graciela']
        },
        phoneFormat: '+54-11-####-####'
    },
    chile: {
        name: '智利',
        nameEn: 'Chile',
        flag: '🇨🇱',
        lastNames: ['González', 'Muñoz', 'Rojas', 'Díaz', 'Pérez', 'Soto', 'Silva', 'Contreras'],
        firstNames: {
            male: ['Sebastián', 'Matías', 'Nicolás', 'Diego', 'Felipe', 'Cristóbal', 'Vicente', 'Benjamín'],
            female: ['Catalina', 'Sofía', 'Valentina', 'Isidora', 'Antonia', 'Fernanda', 'Constanza', 'Javiera']
        },
        phoneFormat: '+56-9-####-####'
    },
    colombia: {
        name: '哥倫比亞',
        nameEn: 'Colombia',
        flag: '🇨🇴',
        lastNames: ['Rodríguez', 'García', 'Martínez', 'López', 'González', 'Hernández', 'Gómez', 'Pérez'],
        firstNames: {
            male: ['Santiago', 'Juan', 'Samuel', 'Sebastián', 'Andrés', 'David', 'Daniel', 'Alejandro'],
            female: ['Sofía', 'Isabella', 'Camila', 'Valentina', 'Mariana', 'Luciana', 'Daniela', 'Gabriela']
        },
        phoneFormat: '+57-3##-###-####'
    },
    peru: {
        name: '秘魯',
        nameEn: 'Peru',
        flag: '🇵🇪',
        lastNames: ['García', 'Rodríguez', 'López', 'González', 'Sánchez', 'Pérez', 'Torres', 'Ramírez'],
        firstNames: {
            male: ['Carlos', 'Luis', 'Juan', 'José', 'Jorge', 'Pedro', 'Miguel', 'Diego'],
            female: ['María', 'Rosa', 'Carmen', 'Luz', 'Ana', 'Julia', 'Flor', 'Teresa']
        },
        phoneFormat: '+51-9##-###-###'
    },
    southafrica: {
        name: '南非',
        nameEn: 'South Africa',
        flag: '🇿🇦',
        lastNames: ['Nkosi', 'Dlamini', 'Khumalo', 'Ndlovu', 'Sithole', 'van der Merwe', 'Botha', 'Pretorius'],
        firstNames: {
            male: ['Thabo', 'Sipho', 'Bongani', 'Tshepo', 'Pieter', 'Johan', 'Michael', 'David'],
            female: ['Precious', 'Nomsa', 'Thandi', 'Lerato', 'Sarah', 'Michelle', 'Jessica', 'Nicole']
        },
        phoneFormat: '+27-##-###-####'
    },
    egypt: {
        name: '埃及',
        nameEn: 'Egypt',
        flag: '🇪🇬',
        lastNames: ['أحمد', 'محمد', 'علي', 'حسن', 'حسين', 'عبد الله', 'السيد', 'إبراهيم'],
        firstNames: {
            male: ['أحمد', 'محمد', 'محمود', 'مصطفى', 'عمر', 'علي', 'يوسف', 'عبد الرحمن'],
            female: ['فاطمة', 'عائشة', 'زينب', 'مريم', 'سارة', 'نور', 'هدى', 'أمل']
        },
        phoneFormat: '+20-1{0|1|2|5}########'
    },
    nigeria: {
        name: '奈及利亞',
        nameEn: 'Nigeria',
        flag: '🇳🇬',
        lastNames: ['Okafor', 'Ibrahim', 'Abubakar', 'Ogundimu', 'Adeyemi', 'Mohammed', 'Okonkwo', 'Aliyu'],
        firstNames: {
            male: ['Chinedu', 'Emeka', 'Oluwaseun', 'Ibrahim', 'Mohammed', 'Abubakar', 'Babatunde', 'Kehinde'],
            female: ['Fatima', 'Aisha', 'Chioma', 'Blessing', 'Grace', 'Funke', 'Amina', 'Folake']
        },
        phoneFormat: '+234-{80|81|90|70}########'
    },
    kenya: {
        name: '肯亞',
        nameEn: 'Kenya',
        flag: '🇰🇪',
        lastNames: ['Kamau', 'Mwangi', 'Wanjiru', 'Ochieng', 'Otieno', 'Kipchoge', 'Mutua', 'Njoroge'],
        firstNames: {
            male: ['John', 'Peter', 'James', 'Daniel', 'Joseph', 'David', 'Samuel', 'Michael'],
            female: ['Mary', 'Grace', 'Faith', 'Jane', 'Ann', 'Rose', 'Sarah', 'Esther']
        },
        phoneFormat: '+254-7##-######'
    },
    morocco: {
        name: '摩洛哥',
        nameEn: 'Morocco',
        flag: '🇲🇦',
        lastNames: ['بنعلي', 'العلوي', 'الإدريسي', 'بنموسى', 'الحسني', 'الفاسي', 'العمراني', 'بوخريص'],
        firstNames: {
            male: ['محمد', 'أحمد', 'يوسف', 'حسن', 'عبد الله', 'عمر', 'سعيد', 'خالد'],
            female: ['فاطمة', 'خديجة', 'عائشة', 'مريم', 'زينب', 'نعيمة', 'حنان', 'سعاد']
        },
        phoneFormat: '+212-6########'
    },
    ghana: {
        name: '迦納',
        nameEn: 'Ghana',
        flag: '🇬🇭',
        lastNames: ['Mensah', 'Osei', 'Boateng', 'Asante', 'Owusu', 'Agyeman', 'Asamoah', 'Appiah'],
        firstNames: {
            male: ['Kwame', 'Kofi', 'Kwesi', 'Kwaku', 'Yaw', 'Samuel', 'Isaac', 'Daniel'],
            female: ['Ama', 'Abena', 'Akosua', 'Adwoa', 'Yaa', 'Grace', 'Mercy', 'Felicia']
        },
        phoneFormat: '+233-{24|54|55|59}#######'
    },
    ethiopia: {
        name: '衣索比亞',
        nameEn: 'Ethiopia',
        flag: '🇪🇹',
        lastNames: ['Tadesse', 'Bekele', 'Haile', 'Kebede', 'Alemayehu', 'Tesfaye', 'Getachew', 'Amare'],
        firstNames: {
            male: ['Abebe', 'Dawit', 'Solomon', 'Yohannes', 'Bereket', 'Elias', 'Gabriel', 'Samuel'],
            female: ['Marta', 'Sara', 'Hana', 'Selam', 'Tigist', 'Bethlehem', 'Rahel', 'Ruth']
        },
        phoneFormat: '+251-9########'
    },
    australia: {
        name: '澳洲',
        nameEn: 'Australia',
        flag: '🇦🇺',
        lastNames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White'],
        firstNames: {
            male: ['Jack', 'Oliver', 'William', 'Noah', 'Thomas', 'James', 'Lucas', 'Henry'],
            female: ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Grace', 'Sophia', 'Zoe']
        },
        phoneFormat: '+61-4##-###-###'
    },
    newzealand: {
        name: '紐西蘭',
        nameEn: 'New Zealand',
        flag: '🇳🇿',
        lastNames: ['Smith', 'Williams', 'Brown', 'Wilson', 'Thompson', 'Anderson', 'Taylor', 'Thomas'],
        firstNames: {
            male: ['Oliver', 'Jack', 'Noah', 'Leo', 'George', 'Lucas', 'William', 'Charlie'],
            female: ['Charlotte', 'Isla', 'Olivia', 'Amelia', 'Ella', 'Harper', 'Sophie', 'Grace']
        },
        phoneFormat: '+64-2{1|2|7|8|9}-###-####'
    },
    fiji: {
        name: '斐濟',
        nameEn: 'Fiji',
        flag: '🇫🇯',
        lastNames: ['Singh', 'Kumar', 'Prasad', 'Sharma', 'Nair', 'Pillay', 'Naidu', 'Chand'],
        firstNames: {
            male: ['Ravi', 'Arun', 'Vikash', 'Sunil', 'Rajesh', 'Anand', 'Sanjay', 'Deepak'],
            female: ['Priya', 'Kavita', 'Anita', 'Sunita', 'Reena', 'Neha', 'Pooja', 'Divya']
        },
        phoneFormat: '+679-#######'
    },
    png: {
        name: '巴布亞紐幾內亞',
        nameEn: 'Papua New Guinea',
        flag: '🇵🇬',
        lastNames: ['Namaliu', 'Siaguru', 'Parkop', 'Namah', 'Temu', 'Sakias', 'Kemakeza', 'Tamate'],
        firstNames: {
            male: ['John', 'Peter', 'Michael', 'James', 'David', 'Joseph', 'Paul', 'Daniel'],
            female: ['Mary', 'Grace', 'Rose', 'Sarah', 'Ruth', 'Helen', 'Margaret', 'Elizabeth']
        },
        phoneFormat: '+675-7#######'
    }
}; 