// 智能地址生成引擎
class GlobalAddressEngine {
    constructor() {
        this.addressComponents = {
            japan: {
                prefectures: [
                    { name: '東京都', en: 'Tokyo', code: '13' },
                    { name: '大阪府', en: 'Osaka', code: '27' },
                    { name: '神奈川県', en: 'Kanagawa', code: '14' },
                    { name: '愛知県', en: 'Aichi', code: '23' },
                    { name: '福岡県', en: 'Fukuoka', code: '40' },
                    { name: '北海道', en: 'Hokkaido', code: '01' },
                    { name: '京都府', en: 'Kyoto', code: '26' },
                    { name: '兵庫県', en: 'Hyogo', code: '28' }
                ],
                cities: {
                    '東京都': [
                        { name: '千代田区', en: 'Chiyoda-ku', districts: ['丸の内', '大手町', '神田', '秋葉原'] },
                        { name: '港区', en: 'Minato-ku', districts: ['赤坂', '六本木', '青山', '麻布'] },
                        { name: '新宿区', en: 'Shinjuku-ku', districts: ['西新宿', '歌舞伎町', '新宿', '高田馬場'] },
                        { name: '渋谷区', en: 'Shibuya-ku', districts: ['渋谷', '原宿', '代官山', '恵比寿'] },
                        { name: '中央区', en: 'Chuo-ku', districts: ['銀座', '日本橋', '築地', '八重洲'] }
                    ],
                    '大阪府': [
                        { name: '大阪市中央区', en: 'Chuo-ku, Osaka', districts: ['心斎橋', '難波', '本町', '堺筋本町'] },
                        { name: '大阪市北区', en: 'Kita-ku, Osaka', districts: ['梅田', '中之島', '天満', '堂島'] }
                    ],
                    '京都府': [
                        { name: '京都市', en: 'Kyoto City', districts: ['祇園', '嵐山', '伏見'] }
                    ]
                },
                postalFormats: {
                    '東京都千代田区': { prefix: '100', range: [0, 8] },
                    '東京都港区': { prefix: '105-108', range: [0, 8] },
                    '東京都新宿区': { prefix: '160', range: [0, 999] },
                    '東京都渋谷区': { prefix: '150', range: [0, 999] },
                    '大阪府大阪市': { prefix: '530-550', range: [0, 8] },
                    '東京都京都府': { prefix: '106', range: [0, 999] }
                }
            },
            usa: {
                states: [
                    { name: 'California', abbr: 'CA', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'] },
                    { name: 'New York', abbr: 'NY', cities: ['New York City', 'Buffalo', 'Rochester', 'Albany'] },
                    { name: 'Texas', abbr: 'TX', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'] },
                    { name: 'Florida', abbr: 'FL', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
                    { name: 'Illinois', abbr: 'IL', cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet'] }
                ],
                streetNames: [
                    'Main', 'First', 'Second', 'Third', 'Park', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm',
                    'Washington', 'Jefferson', 'Madison', 'Lincoln', 'Jackson', 'Grant', 'Franklin'
                ],
                streetTypes: ['Street', 'Avenue', 'Boulevard', 'Road', 'Drive', 'Lane', 'Way', 'Court'],
                zipCodes: {
                    'Los Angeles': { range: [90001, 90899] },
                    'San Francisco': { range: [94100, 94199] },
                    'New York City': { range: [10001, 10299] },
                    'Chicago': { range: [60601, 60699] },
                    'Miami': { range: [33101, 33299] }
                }
            },
            china: {
                provinces: [
                    { name: '北京市', en: 'Beijing', type: 'municipality' },
                    { name: '上海市', en: 'Shanghai', type: 'municipality' },
                    { name: '广东省', en: 'Guangdong', type: 'province' },
                    { name: '浙江省', en: 'Zhejiang', type: 'province' },
                    { name: '江苏省', en: 'Jiangsu', type: 'province' }
                ],
                cityDistricts: {
                    '北京市': {
                        districts: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区'],
                        subDistricts: {
                            '东城区': ['东直门', '王府井', '东单', '崇文门'],
                            '朝阳区': ['三里屯', '望京', '国贸', '朝外'],
                            '海淀区': ['中关村', '五道口', '西二旗', '上地']
                        }
                    },
                    '上海市': {
                        districts: ['黄浦区', '静安区', '徐汇区', '长宁区', '浦东新区'],
                        subDistricts: {
                            '黄浦区': ['外滩', '南京东路', '人民广场', '豫园'],
                            '浦东新区': ['陆家嘴', '张江', '金桥', '世纪公园']
                        }
                    }
                },
                roadTypes: ['路', '街', '大道', '大街', '巷', '里'],
                postalCodes: {
                    '北京市东城区': { prefix: '1000', range: [10, 99] },
                    '北京市朝阳区': { prefix: '1000', range: [20, 26] },
                    '上海市黄浦区': { prefix: '2000', range: [1, 99] },
                    '上海市浦东新区': { prefix: '2001', range: [20, 99] }
                }
            }
        };
        
        this.formatRules = {
            japan: this.japaneseAddressFormat.bind(this),
            korea: this.koreanAddressFormat.bind(this),
            china: this.chineseAddressFormat.bind(this),
            taiwan: this.taiwaneseAddressFormat.bind(this),
            usa: this.americanAddressFormat.bind(this),
            uk: this.britishAddressFormat.bind(this),
            germany: this.germanAddressFormat.bind(this),
            france: this.frenchAddressFormat.bind(this),
            india: this.indianAddressFormat.bind(this),
            brazil: this.brazilianAddressFormat.bind(this)
        };
    }
    
    generateAddress(country) {
        const formatter = this.formatRules[country] || this.genericAddressFormat.bind(this);
        return formatter();
    }
    
    japaneseAddressFormat() {
        // 如果沒有詳細的地址組件，使用預設數據
        const components = this.addressComponents.japan || {
            prefectures: [
                { name: '東京都', en: 'Tokyo' },
                { name: '大阪府', en: 'Osaka' },
                { name: '京都府', en: 'Kyoto' },
                { name: '神奈川県', en: 'Kanagawa' },
                { name: '愛知県', en: 'Aichi' }
            ],
            cities: {
                '東京都': [
                    { name: '新宿区', en: 'Shinjuku', districts: ['歌舞伎町', '西新宿', '新宿'] },
                    { name: '渋谷区', en: 'Shibuya', districts: ['渋谷', '原宿', '恵比寿'] },
                    { name: '港区', en: 'Minato', districts: ['六本木', '赤坂', '青山'] }
                ],
                '大阪府': [
                    { name: '大阪市', en: 'Osaka City', districts: ['梅田', '難波', '心斎橋'] }
                ],
                '京都府': [
                    { name: '京都市', en: 'Kyoto City', districts: ['祇園', '嵐山', '伏見'] }
                ]
            },
            postalFormats: {
                '東京都新宿区': { prefix: '160', range: [0, 999] },
                '東京都渋谷区': { prefix: '150', range: [0, 999] },
                '東京都港区': { prefix: '106', range: [0, 999] }
            }
        };
        
        const prefecture = this.random(components.prefectures);
        const cities = components.cities[prefecture.name] || [{ name: '中央区', en: 'Chuo', districts: ['中央'] }];
        const city = this.random(cities);
        const district = city.districts ? this.random(city.districts) : '中央';
        const chome = this.randomInt(1, 5);
        const ban = this.randomInt(1, 30);
        const go = this.randomInt(1, 20);
        
        const jpAddress = `${prefecture.name}${city.name}${district}${chome}丁目${ban}番${go}号`;
        const enAddress = `${chome}-${ban}-${go} ${district}, ${city.en || city.name}, ${prefecture.en || prefecture.name}`;
        
        const postalKey = `${prefecture.name}${city.name}`;
        const postalInfo = components.postalFormats ? components.postalFormats[postalKey] : null;
        let postal = '100-0001';
        
        if (postalInfo) {
            const suffix = String(this.randomInt(...postalInfo.range)).padStart(3, '0');
            postal = `${postalInfo.prefix}-${suffix}`;
        } else {
            // 生成通用的日本郵遞區號格式
            const prefix = this.randomInt(100, 999);
            const suffix = String(this.randomInt(1, 9999)).padStart(4, '0');
            postal = `${prefix}-${suffix}`;
        }
        
        return {
            street: jpAddress,
            postal: postal,
            en: enAddress
        };
    }
    
    americanAddressFormat() {
        const components = this.addressComponents.usa;
        const state = this.random(components.states);
        const city = this.random(state.cities);
        const streetNumber = this.randomInt(1, 9999);
        const streetName = this.random(components.streetNames);
        const streetType = this.random(components.streetTypes);
        
        const address = `${streetNumber} ${streetName} ${streetType}`;
        const fullAddress = `${address}, ${city}, ${state.abbr}`;
        
        const zipInfo = components.zipCodes[city];
        const zipCode = zipInfo ? this.randomInt(...zipInfo.range) : this.randomInt(10001, 99999);
        
        return {
            street: fullAddress,
            postal: String(zipCode),
            en: fullAddress
        };
    }
    
    chineseAddressFormat() {
        const components = this.addressComponents.china;
        const province = this.random(components.provinces);
        const cityData = components.cityDistricts[province.name];
        
        if (!cityData) {
            return this.genericChineseAddress(province);
        }
        
        const district = this.random(cityData.districts);
        const subDistricts = cityData.subDistricts[district] || [];
        const subDistrict = this.random(subDistricts);
        const roadType = this.random(components.roadTypes);
        const roadNumber = this.randomInt(1, 500);
        
        const roadNames = ['中山', '解放', '人民', '建设', '和平', '文化'];
        const roadName = this.random(roadNames);
        
        const cnAddress = `${province.name}${district}${subDistrict}${roadName}${roadType}${roadNumber}号`;
        const enAddress = `${roadNumber} ${this.pinyin(roadName)} ${this.translateRoadType(roadType)}, ${subDistrict}, ${district}, ${province.en}`;
        
        const postalKey = `${province.name}${district}`;
        const postalInfo = components.postalCodes[postalKey];
        let postal = '100000';
        
        if (postalInfo) {
            const suffix = String(this.randomInt(...postalInfo.range)).padStart(2, '0');
            postal = `${postalInfo.prefix}${suffix}`;
        }
        
        return {
            street: cnAddress,
            postal: postal,
            en: enAddress
        };
    }
    
    koreanAddressFormat() {
        const cities = ['서울특별시', '부산광역시', '인천광역시', '대구광역시'];
        const gus = ['강남구', '서초구', '송파구', '강동구', '중구'];
        const roadNames = ['테헤란', '강남', '을지', '세종'];
        const ros = ['로', '길', '대로'];
        
        const city = this.random(cities);
        const gu = this.random(gus);
        const roadName = this.random(roadNames);
        const ro = this.random(ros);
        const mainNumber = this.randomInt(1, 200);
        
        const krAddress = `${city} ${gu} ${roadName}${ro} ${mainNumber}`;
        const enAddress = `${mainNumber} ${this.romanizeKorean(roadName)}-${ro}, ${this.romanizeKorean(gu)}, ${this.romanizeKorean(city)}`;
        const postal = this.randomInt(10000, 99999);
        
        return {
            street: krAddress,
            postal: String(postal).substring(0, 2) + '-' + String(postal).substring(2),
            en: enAddress
        };
    }
    
    taiwaneseAddressFormat() {
        const cities = [
            { name: '台北市', en: 'Taipei City', districts: ['信義區', '大安區', '中山區'] },
            { name: '新北市', en: 'New Taipei City', districts: ['板橋區', '三重區', '中和區'] },
            { name: '台中市', en: 'Taichung City', districts: ['西屯區', '北屯區', '南屯區'] },
            { name: '高雄市', en: 'Kaohsiung City', districts: ['左營區', '三民區', '前鎮區'] }
        ];
        
        const roads = ['中山路', '中正路', '民生路', '民權路', '復興路'];
        const sections = ['一段', '二段', '三段', '四段'];
        
        const city = this.random(cities);
        const district = this.random(city.districts);
        const road = this.random(roads);
        const section = Math.random() > 0.5 ? this.random(sections) : '';
        const number = this.randomInt(1, 500);
        
        const twAddress = `${city.name}${district}${road}${section}${number}號`;
        const enAddress = `${number} ${road} ${section}, ${district}, ${city.en}`.trim();
        
        const postalPrefixes = {
            '台北市': '10',
            '新北市': '22',
            '台中市': '40',
            '高雄市': '80'
        };
        const prefix = postalPrefixes[city.name] || '10';
        const postal = `${prefix}${this.randomInt(0, 9)}${this.randomInt(10, 99)}`;
        
        return {
            street: twAddress,
            postal: postal,
            en: enAddress
        };
    }
    
    britishAddressFormat() {
        const streetTypes = ['Street', 'Road', 'Lane', 'Avenue', 'Gardens'];
        const areas = ['Westminster', 'Kensington', 'Chelsea', 'Camden'];
        const cities = ['London', 'Manchester', 'Birmingham', 'Leeds'];
        
        const houseNumber = this.randomInt(1, 200);
        const streetName = this.random(['King', 'Queen', 'Church', 'High', 'Victoria']);
        const streetType = this.random(streetTypes);
        const area = this.random(areas);
        const city = this.random(cities);
        
        const address = `${houseNumber} ${streetName} ${streetType}, ${area}`;
        const fullAddress = `${address}, ${city}`;
        
        const outwardCodes = ['SW', 'NW', 'SE', 'N', 'E', 'W'];
        const outward = this.random(outwardCodes) + this.randomInt(1, 20);
        const inward = this.randomInt(1, 9) + this.randomChar() + this.randomChar();
        const postal = `${outward} ${inward}`;
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    germanAddressFormat() {
        const streetNames = ['Haupt', 'Bahnhof', 'Schiller', 'Goethe'];
        const cities = ['Berlin', 'München', 'Hamburg', 'Frankfurt'];
        
        const streetName = this.random(streetNames);
        const houseNumber = this.randomInt(1, 200);
        const city = this.random(cities);
        
        const address = `${streetName}straße ${houseNumber}`;
        const fullAddress = `${address}, ${city}`;
        const postal = this.randomInt(10000, 99999);
        
        return {
            street: fullAddress,
            postal: String(postal),
            en: fullAddress
        };
    }
    
    frenchAddressFormat() {
        const streetPrefixes = ['Rue', 'Avenue', 'Boulevard'];
        const streetNames = ['République', 'Liberté', 'Victor Hugo'];
        const cities = ['Paris', 'Lyon', 'Marseille'];
        
        const number = this.randomInt(1, 200);
        const prefix = this.random(streetPrefixes);
        const streetName = this.random(streetNames);
        const city = this.random(cities);
        
        const address = `${number} ${prefix} ${streetName}`;
        const fullAddress = `${address}, ${city}`;
        const postal = this.randomInt(10000, 99999);
        
        return {
            street: fullAddress,
            postal: String(postal),
            en: fullAddress
        };
    }
    
    indianAddressFormat() {
        const areas = ['Connaught Place', 'MG Road', 'Brigade Road'];
        const cities = [
            { name: 'New Delhi', state: 'Delhi' },
            { name: 'Mumbai', state: 'Maharashtra' },
            { name: 'Bangalore', state: 'Karnataka' }
        ];
        
        const buildingNo = this.randomInt(1, 999);
        const area = this.random(areas);
        const city = this.random(cities);
        
        const address = `${buildingNo}, ${area}`;
        const fullAddress = `${address}, ${city.name}, ${city.state}`;
        const postal = this.randomInt(100000, 999999);
        
        return {
            street: fullAddress,
            postal: String(postal),
            en: fullAddress
        };
    }
    
    brazilianAddressFormat() {
        const streetTypes = ['Rua', 'Avenida', 'Alameda'];
        const neighborhoods = ['Centro', 'Copacabana', 'Ipanema'];
        const cities = ['São Paulo', 'Rio de Janeiro', 'Brasília'];
        const states = {
            'São Paulo': 'SP',
            'Rio de Janeiro': 'RJ',
            'Brasília': 'DF'
        };
        
        const streetType = this.random(streetTypes);
        const streetName = this.random(['Santos', 'Silva', 'Oliveira']);
        const number = this.randomInt(1, 2000);
        const neighborhood = this.random(neighborhoods);
        const city = this.random(cities);
        const state = states[city];
        
        const address = `${streetType} ${streetName}, ${number} - ${neighborhood}`;
        const fullAddress = `${address}, ${city} - ${state}`;
        const postal = `${this.randomInt(10000, 99999)}-${this.randomInt(100, 999)}`;
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    genericAddressFormat() {
        const number = this.randomInt(1, 999);
        const streetName = 'Main Street';
        const city = 'Capital City';
        const postal = this.randomInt(10000, 99999);
        
        return {
            street: `${number} ${streetName}, ${city}`,
            postal: String(postal),
            en: `${number} ${streetName}, ${city}`
        };
    }
    
    // 輔助方法
    random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    randomChar() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    
    pinyin(chinese) {
        const pinyinMap = {
            '中山': 'Zhongshan',
            '解放': 'Jiefang',
            '人民': 'Renmin',
            '建设': 'Jianshe',
            '和平': 'Heping',
            '文化': 'Wenhua'
        };
        return pinyinMap[chinese] || chinese;
    }
    
    translateRoadType(type) {
        const translations = {
            '路': 'Road',
            '街': 'Street',
            '大道': 'Avenue',
            '大街': 'Street',
            '巷': 'Lane',
            '里': 'Li'
        };
        return translations[type] || 'Road';
    }
    
    romanizeKorean(korean) {
        const romanization = {
            '서울특별시': 'Seoul',
            '부산광역시': 'Busan',
            '강남구': 'Gangnam-gu',
            '서초구': 'Seocho-gu',
            '테헤란': 'Teheran',
            '강남': 'Gangnam',
            '로': 'ro',
            '길': 'gil',
            '대로': 'daero'
        };
        return romanization[korean] || korean;
    }
    
    // 擴展格式支援 - 處理特殊國家地址邏輯
    genericChineseAddress(province) {
        const cities = ['市', '自治區', '特別行政區'];
        const districts = ['中心區', '開發區', '新區', '工業區'];
        const roads = ['中山路', '解放路', '人民路', '建設路'];
        const roadTypes = ['路', '街', '大道'];
        
        const district = this.random(districts);
        const road = this.random(roads);
        const roadType = this.random(roadTypes);
        const number = this.randomInt(1, 999);
        
        const cnAddress = `${province.name}${district}${road}${roadType}${number}號`;
        const enAddress = `${number} ${road} ${roadType}, ${district}, ${province.en}`;
        
        return {
            street: cnAddress,
            postal: this.randomInt(100000, 999999).toString(),
            en: enAddress
        };
    }
    
    // 泰國地址格式
    thaiAddressFormat() {
        const provinces = ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี'];
        const districts = ['พญาไท', 'ดินแดง', 'บางรัก', 'สาทร'];
        const roads = ['สุขุมวิท', 'พหลโยธิน', 'ราชดำเนิน', 'สีลม'];
        
        const province = this.random(provinces);
        const district = this.random(districts);
        const road = this.random(roads);
        const soi = this.randomInt(1, 100);
        const number = this.randomInt(1, 999);
        
        const thAddress = `${number} ซอย ${road} ${soi} ${district} ${province}`;
        const enAddress = `${number} Soi ${this.romanizeThai(road)} ${soi}, ${this.romanizeThai(district)}, ${this.romanizeThai(province)}`;
        const postal = this.randomInt(10000, 99999);
        
        return {
            street: thAddress,
            postal: String(postal),
            en: enAddress
        };
    }
    
    romanizeThai(thai) {
        const romanization = {
            'กรุงเทพมหานคร': 'Bangkok',
            'เชียงใหม่': 'Chiang Mai',
            'ภูเก็ต': 'Phuket',
            'ชลบุรี': 'Chonburi',
            'พญาไท': 'Phaya Thai',
            'ดินแดง': 'Din Daeng',
            'บางรัก': 'Bang Rak',
            'สาทร': 'Sathon',
            'สุขุมวิท': 'Sukhumvit',
            'พหลโยธิน': 'Phahonyothin',
            'ราชดำเนิน': 'Ratchadamnoen',
            'สีลม': 'Silom'
        };
        return romanization[thai] || thai;
    }
    
    // 越南地址格式
    vietnameseAddressFormat() {
        const cities = [
            { name: 'Hà Nội', districts: ['Hoàn Kiếm', 'Ba Đình', 'Đống Đa'] },
            { name: 'TP.HCM', districts: ['Quận 1', 'Quận 3', 'Quận 5'] },
            { name: 'Đà Nẵng', districts: ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn'] }
        ];
        
        const streets = ['Nguyễn Huệ', 'Lê Lợi', 'Trần Hưng Đạo', 'Phan Chu Trinh'];
        
        const city = this.random(cities);
        const district = this.random(city.districts);
        const street = this.random(streets);
        const number = this.randomInt(1, 500);
        
        const vnAddress = `${number} ${street}, ${district}, ${city.name}`;
        const postal = this.randomInt(100000, 999999);
        
        return {
            street: vnAddress,
            postal: String(postal),
            en: vnAddress // 越南地址通常直接使用羅馬字母
        };
    }
    
    // 其他國家的通用格式支援
    genericFormat(country) {
        const templates = {
            singapore: () => this.singaporeAddressFormat(),
            malaysia: () => this.malaysianAddressFormat(),
            thailand: () => this.thaiAddressFormat(),
            vietnam: () => this.vietnameseAddressFormat(),
            indonesia: () => this.indonesianAddressFormat(),
            pakistan: () => this.pakistaniAddressFormat(),
            bangladesh: () => this.bangladeshiAddressFormat(),
            egypt: () => this.egyptianAddressFormat(),
            nigeria: () => this.nigerianAddressFormat(),
            kenya: () => this.kenyanAddressFormat(),
            morocco: () => this.moroccanAddressFormat(),
            ghana: () => this.ghanaianAddressFormat(),
            ethiopia: () => this.ethiopianAddressFormat(),
            southafrica: () => this.southAfricanAddressFormat(),
            australia: () => this.australianAddressFormat(),
            newzealand: () => this.newZealandAddressFormat(),
            argentina: () => this.argentinianAddressFormat(),
            chile: () => this.chileanAddressFormat(),
            colombia: () => this.colombianAddressFormat(),
            peru: () => this.peruvianAddressFormat(),
            mexico: () => this.mexicanAddressFormat(),
            fiji: () => this.fijianAddressFormat(),
            png: () => this.papuaNewGuineaAddressFormat()
        };
        
        const formatter = templates[country];
        return formatter ? formatter() : this.genericAddressFormat();
    }
    
    // 新加坡地址格式
    singaporeAddressFormat() {
        const districts = ['Orchard', 'Marina Bay', 'Jurong', 'Tampines', 'Woodlands'];
        const buildingTypes = ['Tower', 'Plaza', 'Centre', 'Building', 'Complex'];
        
        const district = this.random(districts);
        const roadNumber = this.randomInt(1, 200);
        const buildingName = this.random(['Marina', 'Raffles', 'Suntec', 'Capital']) + ' ' + this.random(buildingTypes);
        const unitNumber = `#${this.randomInt(1, 30)}-${this.randomInt(1, 50)}`;
        
        const address = `${roadNumber} ${district} Road, ${buildingName} ${unitNumber}`;
        const postal = String(this.randomInt(100000, 999999));
        
        return {
            street: address,
            postal: postal,
            en: address
        };
    }
    
    // 馬來西亞地址格式
    malaysianAddressFormat() {
        const states = ['Selangor', 'Kuala Lumpur', 'Penang', 'Johor'];
        const areas = ['Petaling Jaya', 'Shah Alam', 'Klang', 'Subang Jaya'];
        const jalanTypes = ['Jalan', 'Lorong', 'Persiaran'];
        
        const state = this.random(states);
        const area = this.random(areas);
        const jalanType = this.random(jalanTypes);
        const streetName = this.random(['Merdeka', 'Perdana', 'Utama', 'Jaya']);
        const number = this.randomInt(1, 200);
        
        const address = `${number}, ${jalanType} ${streetName}, ${area}`;
        const fullAddress = `${address}, ${state}`;
        const postal = String(this.randomInt(10000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    // 印尼地址格式
    indonesianAddressFormat() {
        const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan'];
        const districts = ['Pusat', 'Selatan', 'Utara', 'Barat', 'Timur'];
        const jalans = ['Sudirman', 'Thamrin', 'Gatot Subroto', 'Ahmad Yani'];
        
        const city = this.random(cities);
        const district = this.random(districts);
        const jalan = this.random(jalans);
        const number = this.randomInt(1, 300);
        const rt = this.randomInt(1, 20);
        const rw = this.randomInt(1, 10);
        
        const address = `Jl. ${jalan} No. ${number}, RT ${rt}/RW ${rw}`;
        const fullAddress = `${address}, ${city} ${district}`;
        const postal = String(this.randomInt(10000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    // 巴基斯坦地址格式
    pakistaniAddressFormat() {
        const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'];
        const areas = ['Gulshan', 'Defence', 'Clifton', 'Model Town'];
        const sectors = ['Sector', 'Block', 'Phase'];
        
        const city = this.random(cities);
        const area = this.random(areas);
        const sector = this.random(sectors);
        const sectorNumber = this.randomInt(1, 20);
        const houseNumber = this.randomInt(1, 999);
        
        const address = `House ${houseNumber}, ${sector} ${sectorNumber}, ${area}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(10000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    // 孟加拉地址格式
    bangladeshiAddressFormat() {
        const cities = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi'];
        const areas = ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara'];
        const roads = ['Road', 'Avenue', 'Lane'];
        
        const city = this.random(cities);
        const area = this.random(areas);
        const roadType = this.random(roads);
        const roadNumber = this.randomInt(1, 50);
        const houseNumber = this.randomInt(1, 200);
        
        const address = `House ${houseNumber}, ${roadType} ${roadNumber}, ${area}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(1000, 9999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    // 其他國家格式方法（簡化版本）
    egyptianAddressFormat() {
        return this.genericMiddleEastFormat('Egypt', ['Cairo', 'Alexandria', 'Giza']);
    }
    
    nigerianAddressFormat() {
        return this.genericAfricanFormat('Nigeria', ['Lagos', 'Abuja', 'Kano']);
    }
    
    kenyanAddressFormat() {
        return this.genericAfricanFormat('Kenya', ['Nairobi', 'Mombasa', 'Kisumu']);
    }
    
    moroccanAddressFormat() {
        return this.genericMiddleEastFormat('Morocco', ['Casablanca', 'Rabat', 'Marrakech']);
    }
    
    ghanaianAddressFormat() {
        return this.genericAfricanFormat('Ghana', ['Accra', 'Kumasi', 'Tamale']);
    }
    
    ethiopianAddressFormat() {
        return this.genericAfricanFormat('Ethiopia', ['Addis Ababa', 'Dire Dawa', 'Mekelle']);
    }
    
    southAfricanAddressFormat() {
        const cities = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'];
        const suburbs = ['Sandton', 'Rosebank', 'Sea Point', 'Gardens'];
        const streetNames = ['Main', 'Church', 'Long', 'Bree', 'Loop'];
        
        const city = this.random(cities);
        const suburb = this.random(suburbs);
        const street = this.random(streetNames);
        const number = this.randomInt(1, 500);
        
        const address = `${number} ${street} Street, ${suburb}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(1000, 9999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    australianAddressFormat() {
        const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth'];
        const states = {
            'Sydney': 'NSW',
            'Melbourne': 'VIC',
            'Brisbane': 'QLD',
            'Perth': 'WA'
        };
        const streetTypes = ['Street', 'Avenue', 'Road', 'Drive', 'Parade'];
        const suburbs = ['Bondi', 'St Kilda', 'Surfers Paradise', 'Fremantle'];
        
        const city = this.random(cities);
        const state = states[city];
        const suburb = this.random(suburbs);
        const streetName = this.random(['King', 'Queen', 'George', 'Collins', 'Pitt']);
        const streetType = this.random(streetTypes);
        const number = this.randomInt(1, 300);
        
        const address = `${number} ${streetName} ${streetType}`;
        const fullAddress = `${address}, ${suburb}, ${state}`;
        const postal = String(this.randomInt(1000, 9999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    newZealandAddressFormat() {
        const cities = ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'];
        const streetTypes = ['Street', 'Road', 'Avenue', 'Drive', 'Terrace'];
        const streetNames = ['Queen', 'King', 'Victoria', 'Albert', 'George'];
        
        const city = this.random(cities);
        const streetName = this.random(streetNames);
        const streetType = this.random(streetTypes);
        const number = this.randomInt(1, 500);
        
        const address = `${number} ${streetName} ${streetType}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(1000, 9999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    argentinianAddressFormat() {
        const cities = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'];
        const streetNames = ['San Martín', 'Belgrano', 'Rivadavia', 'Sarmiento'];
        const number = this.randomInt(100, 9999);
        
        const city = this.random(cities);
        const street = this.random(streetNames);
        
        const address = `${street} ${number}`;
        const fullAddress = `${address}, ${city}`;
        const postal = this.randomInt(1000, 9999);
        
        return {
            street: fullAddress,
            postal: `${postal}`,
            en: fullAddress
        };
    }
    
    chileanAddressFormat() {
        const cities = ['Santiago', 'Valparaíso', 'Concepción', 'La Serena'];
        const comunas = ['Providencia', 'Las Condes', 'Vitacura', 'La Florida'];
        const streets = ['Providencia', 'Apoquindo', 'Los Leones', 'Manuel Montt'];
        
        const city = this.random(cities);
        const comuna = this.random(comunas);
        const street = this.random(streets);
        const number = this.randomInt(100, 5000);
        
        const address = `${street} ${number}, ${comuna}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(1000000, 9999999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    colombianAddressFormat() {
        const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'];
        const types = ['Carrera', 'Calle', 'Avenida', 'Diagonal'];
        
        const city = this.random(cities);
        const type = this.random(types);
        const mainNumber = this.randomInt(1, 200);
        const secondNumber = this.randomInt(1, 100);
        const thirdNumber = this.randomInt(1, 50);
        
        const address = `${type} ${mainNumber} # ${secondNumber}-${thirdNumber}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(100000, 999999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    peruvianAddressFormat() {
        const cities = ['Lima', 'Arequipa', 'Trujillo', 'Cusco'];
        const districts = ['Miraflores', 'San Isidro', 'Barranco', 'Surco'];
        const streets = ['Larco', 'Pardo', 'Benavides', 'Arequipa'];
        
        const city = this.random(cities);
        const district = this.random(districts);
        const street = this.random(streets);
        const number = this.randomInt(100, 2000);
        
        const address = `Av. ${street} ${number}, ${district}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(10000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    mexicanAddressFormat() {
        const cities = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla'];
        const colonias = ['Roma Norte', 'Condesa', 'Polanco', 'Del Valle'];
        const streets = ['Insurgentes', 'Reforma', 'Revolución', 'Universidad'];
        
        const city = this.random(cities);
        const colonia = this.random(colonias);
        const street = this.random(streets);
        const number = this.randomInt(1, 500);
        
        const address = `${street} ${number}, Col. ${colonia}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(10000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    fijianAddressFormat() {
        const cities = ['Suva', 'Nadi', 'Lautoka', 'Labasa'];
        const areas = ['Central', 'North', 'South', 'East'];
        
        const city = this.random(cities);
        const area = this.random(areas);
        const roadName = this.random(['Queens', 'Kings', 'Princes', 'Victoria']);
        const number = this.randomInt(1, 200);
        
        const address = `${number} ${roadName} Road, ${area}`;
        const fullAddress = `${address}, ${city}`;
        const postal = '';  // 斐濟不使用郵遞區號
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    papuaNewGuineaAddressFormat() {
        const cities = ['Port Moresby', 'Lae', 'Mount Hagen', 'Madang'];
        const sections = ['Section', 'Allotment', 'Block'];
        
        const city = this.random(cities);
        const section = this.random(sections);
        const sectionNumber = this.randomInt(1, 100);
        const lotNumber = this.randomInt(1, 50);
        
        const address = `${section} ${sectionNumber}, Lot ${lotNumber}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(100, 999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    // 通用地區格式生成器
    genericMiddleEastFormat(country, cities) {
        const city = this.random(cities);
        const districts = ['Central', 'North', 'South', 'East', 'West'];
        const district = this.random(districts);
        const streetNumber = this.randomInt(1, 999);
        const streetName = this.random(['King', 'Prince', 'Independence', 'Revolution']);
        
        const address = `${streetNumber} ${streetName} Street, ${district} District`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(10000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
    
    genericAfricanFormat(country, cities) {
        const city = this.random(cities);
        const areas = ['Central Business District', 'Industrial Area', 'Residential Zone'];
        const area = this.random(areas);
        const streetName = this.random(['Independence', 'Unity', 'Freedom', 'Liberation']);
        const number = this.randomInt(1, 500);
        
        const address = `${number} ${streetName} Avenue, ${area}`;
        const fullAddress = `${address}, ${city}`;
        const postal = String(this.randomInt(1000, 99999));
        
        return {
            street: fullAddress,
            postal: postal,
            en: fullAddress
        };
    }
} 