// Letter mapping for Pythagorean numerology
const PYTHAGOREAN_MAP = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
};

// Accents mapping to convert Vietnamese to ASCII
const ACCENTS_MAP = {
    'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A', 'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A', 'Â': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
    'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E', 'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O', 'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O', 'Ơ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U', 'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
    'Đ': 'D', 'đ': 'D'
};

// Database of Hán-Việt names and their scores/meanings
const NAMES_DICTIONARY = [
    { name: "Minh Anh", meaning: "Sự anh minh, thông minh sáng suốt vượt trội.", gender: "Unisex", wuxing: "Hỏa", w_score: 25, rarity: 3, sound: 9 },
    { name: "Khánh Vy", meaning: "Sự tràn đầy sức sống, vui tươi, đức hạnh phong phú.", gender: "Nữ", wuxing: "Mộc", w_score: 23, rarity: 4, sound: 10 },
    { name: "Bảo Nam", meaning: "Cực kỳ quý giá, viên ngọc quý của gia đình phương Nam.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 3, sound: 8 },
    { name: "Gia Bảo", meaning: "Báu vật linh thiêng và trân quý của toàn gia đình.", gender: "Nam", wuxing: "Kim", w_score: 25, rarity: 4, sound: 9 },
    { name: "Anh Thư", meaning: "Nữ anh hùng trí tuệ, thông minh, yêu chuộng sách vở.", gender: "Nữ", wuxing: "Hỏa", w_score: 24, rarity: 5, sound: 9 },
    { name: "Thùy Dương", meaning: "Cây thùy dương cao lớn tràn ngập ánh dương ấm áp.", gender: "Nữ", wuxing: "Thủy", w_score: 22, rarity: 5, sound: 8 },
    { name: "Tấn Phát", meaning: "Phát triển không ngừng, đạt nhiều tài lộc và may mắn.", gender: "Nam", wuxing: "Hỏa", w_score: 23, rarity: 4, sound: 9 },
    { name: "Thanh Vân", meaning: "Áng mây xanh thanh tú tự do trôi trên nền trời.", gender: "Nữ", wuxing: "Thủy", w_score: 22, rarity: 5, sound: 10 },
    { name: "Tuấn Kiệt", meaning: "Xuất chúng vượt trội về tài năng kiệt xuất và vẻ tuấn tú.", gender: "Nam", wuxing: "Mộc", w_score: 25, rarity: 3, sound: 9 },
    { name: "Thái Sơn", meaning: "Vững chãi, kiên định như ngọn núi Thái Sơn vĩ đại.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 4, sound: 8 },
    { name: "Hà An", meaning: "Dòng sông êm đềm, thanh bình và luôn yên ả cát tường.", gender: "Nữ", wuxing: "Thủy", w_score: 23, rarity: 6, sound: 9 },
    { name: "Như Quỳnh", meaning: "Đẹp dịu dàng thanh tao như đóa hoa quỳnh nở về đêm.", gender: "Nữ", wuxing: "Mộc", w_score: 22, rarity: 4, sound: 9 },
    { name: "Nhật Minh", meaning: "Ánh sáng mặt trời chiếu rọi nhân gian bao la, trí tuệ lớn.", gender: "Nam", wuxing: "Hỏa", w_score: 25, rarity: 3, sound: 9 },
    { name: "Thảo Chi", meaning: "Cành cỏ thơm thanh nhã, mang lại sự dễ chịu cho đời.", gender: "Nữ", wuxing: "Mộc", w_score: 22, rarity: 6, sound: 9 },
    { name: "Bình An", meaning: "Suốt cuộc đời thong thả, bình yên, không chút sóng gió.", gender: "Unisex", wuxing: "Kim", w_score: 25, rarity: 2, sound: 8 },
    { name: "Đức Duy", meaning: "Chỉ duy trì tâm đức cao quý làm gốc rễ cho cuộc sống.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 5, sound: 9 },
    { name: "Hữu Phước", meaning: "Người có nhiều phước lành, đức độ độ trì cuộc đời.", gender: "Nam", wuxing: "Thủy", w_score: 23, rarity: 5, sound: 8 },
    { name: "Cát Tường", meaning: "Sự may mắn lành cát, như ý cát tường viên mãn.", gender: "Unisex", wuxing: "Thổ", w_score: 25, rarity: 4, sound: 9 },
    { name: "Phúc Lâm", meaning: "Phước đức ngập tràn như rừng cây tươi tốt xum xuê.", gender: "Nam", wuxing: "Mộc", w_score: 24, rarity: 4, sound: 8 },
    { name: "Quốc Anh", meaning: "Tinh anh của quốc gia, tấm lòng vĩ đại hiếu nghĩa.", gender: "Nam", wuxing: "Thổ", w_score: 24, rarity: 3, sound: 9 },
    { name: "Tâm An", meaning: "Tâm hồn luôn thư thái, tĩnh lặng, an vui tự tại.", gender: "Nữ", wuxing: "Thủy", w_score: 25, rarity: 5, sound: 9 },
    { name: "Minh Triết", meaning: "Trí tuệ uyên bác, thông thái sâu rộng nhìn xa trông rộng.", gender: "Nam", wuxing: "Hỏa", w_score: 25, rarity: 6, sound: 9 },
    { name: "Hoàng Yến", meaning: "Chim yến vàng quý tộc, lanh lợi, hoạt bát và hát hay.", gender: "Nữ", wuxing: "Kim", w_score: 23, rarity: 5, sound: 9 },
    { name: "Phan Minh Khuê", meaning: "Ngôi sao Khuê lấp lánh thông tuệ trên bầu trời học thuật.", gender: "Nữ", wuxing: "Mộc", w_score: 25, rarity: 6, sound: 10 }
];

// Vietnamese Name Syllables Database
const VIETNAMESE_SYLLABLES = [
    { syllable: "An", gender: "Unisex", wuxing: "Thủy", meaning: "Bình an, yên ổn, cuộc sống thái bình.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Anh", gender: "Unisex", wuxing: "Hỏa", meaning: "Tinh anh, thông minh, kiệt xuất.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Bách", gender: "Nam", wuxing: "Mộc", meaning: "Vững chãi, trường tồn như cây tùng bách.", score: 24, sound: 8, rarity: 5 },
    { syllable: "Bảo", gender: "Unisex", wuxing: "Hỏa", meaning: "Bảo vật quý giá, trân quý.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Bình", gender: "Unisex", wuxing: "Kim", meaning: "Thanh bình, ôn hòa, êm ả.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Cát", gender: "Unisex", wuxing: "Thổ", meaning: "Cát tường, may mắn, tốt lành.", score: 24, sound: 8, rarity: 5 },
    { syllable: "Chi", gender: "Nữ", wuxing: "Mộc", meaning: "Cành cỏ thơm thanh nhã, quý phái.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Châu", gender: "Unisex", wuxing: "Thổ", meaning: "Viên ngọc lấp lánh, quý giá.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Cường", gender: "Nam", wuxing: "Mộc", meaning: "Mạnh mẽ, kiên cường, lực lưỡng.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Duy", gender: "Nam", wuxing: "Thổ", meaning: "Duy trì đức độ, tư duy nhạy bén.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Dũng", gender: "Nam", wuxing: "Hỏa", meaning: "Dũng cảm, can đảm, chí khí.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Dương", gender: "Unisex", wuxing: "Thủy", meaning: "Ánh dương rực rỡ hoặc biển cả rộng lớn.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Đạt", gender: "Nam", wuxing: "Hỏa", meaning: "Thành đạt, hoàn thành chí hướng.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Đức", gender: "Nam", wuxing: "Thổ", meaning: "Đạo đức, đức độ, tâm lành.", score: 24, sound: 8, rarity: 3, is_middle: true },
    { syllable: "Gia", gender: "Unisex", wuxing: "Kim", meaning: "Gia đình ấm áp, hưng thịnh.", score: 24, sound: 9, rarity: 4, is_middle: true },
    { syllable: "Giang", gender: "Unisex", wuxing: "Thủy", meaning: "Dòng sông dài chảy êm đềm.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Hà", gender: "Nữ", wuxing: "Thủy", meaning: "Dòng sông êm đềm, thanh bình.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Hải", gender: "Unisex", wuxing: "Thủy", meaning: "Biển cả bao la, khoáng đạt.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Hạnh", gender: "Nữ", wuxing: "Thủy", meaning: "Đức hạnh, hạnh phúc tròn đầy.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hiếu", gender: "Nam", wuxing: "Thủy", meaning: "Hiếu thảo, nhân đức, kính trên nhường dưới.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hoàng", gender: "Unisex", wuxing: "Hỏa", meaning: "Huy hoàng, rực rỡ, quý phái.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Huy", gender: "Nam", wuxing: "Hỏa", meaning: "Ánh sáng rực rỡ, huy hoàng, tốt đẹp.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Hùng", gender: "Nam", wuxing: "Thủy", meaning: "Hùng dũng, mạnh mẽ, chí lớn.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hương", gender: "Nữ", wuxing: "Thủy", meaning: "Hương thơm dịu dàng thanh tao.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Hữu", gender: "Nam", wuxing: "Thủy", meaning: "Hữu ích, sở hữu tài đức.", score: 23, sound: 8, rarity: 3, is_middle: true },
    { syllable: "Khánh", gender: "Unisex", wuxing: "Kim", meaning: "Niềm vui, hạnh phúc, đức hạnh tràn đầy.", score: 24, sound: 10, rarity: 4 },
    { syllable: "Khoa", gender: "Nam", wuxing: "Thủy", meaning: "Khoa học, học vấn cao, đỗ đạt.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Khôi", gender: "Nam", wuxing: "Mộc", meaning: "Khôi ngô tuấn tú, thông minh nổi bật.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Khuê", gender: "Nữ", wuxing: "Mộc", meaning: "Ngôi sao Khuê sáng ngời trí tuệ.", score: 25, sound: 10, rarity: 5 },
    { syllable: "Kiệt", gender: "Nam", wuxing: "Mộc", meaning: "Kiệt xuất, xuất chúng hơn người.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Lâm", gender: "Unisex", wuxing: "Mộc", meaning: "Rừng cây tươi tốt, vững chãi.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Linh", gender: "Unisex", wuxing: "Hỏa", meaning: "Linh hoạt, thông minh, kỳ diệu.", score: 24, sound: 10, rarity: 3 },
    { syllable: "Long", gender: "Nam", wuxing: "Thủy", meaning: "Rồng thiêng bay cao, mạnh mẽ, uy quyền.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Lộc", gender: "Nam", wuxing: "Mộc", meaning: "Tài lộc, thịnh vượng, phước lành.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Mai", gender: "Nữ", wuxing: "Mộc", meaning: "Hoa mai nở rộ, tương lai tươi sáng.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Minh", gender: "Unisex", wuxing: "Thủy", meaning: "Anh minh, sáng suốt, trí tuệ lớn.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Nam", gender: "Nam", wuxing: "Hỏa", meaning: "Phương Nam vững chãi, mạnh mẽ.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Nghĩa", gender: "Nam", wuxing: "Kim", meaning: "Trọng nghĩa tình, đạo lý sâu sắc.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Ngọc", gender: "Unisex", wuxing: "Thổ", meaning: "Viên ngọc thanh cao, trân quý.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Nguyên", gender: "Unisex", wuxing: "Thủy", meaning: "Nguyên vẹn, rộng lớn bao la.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Nguyệt", gender: "Nữ", wuxing: "Kim", meaning: "Vầng trăng dịu dàng, thanh khiết.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Nhân", gender: "Unisex", wuxing: "Mộc", meaning: "Nhân hậu, hiền từ, đạo đức cao quý.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Nhật", gender: "Unisex", wuxing: "Hỏa", meaning: "Mặt trời chiếu sáng rực rỡ, ấm áp.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Nhi", gender: "Nữ", wuxing: "Thủy", meaning: "Nhỏ nhắn, hoạt bát, dễ thương.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Như", gender: "Nữ", wuxing: "Kim", meaning: "Như ý, dịu dàng, nết na.", score: 23, sound: 9, rarity: 3, is_middle: true },
    { syllable: "Phong", gender: "Nam", wuxing: "Thổ", meaning: "Ngọn gió phóng khoáng, tự do.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Phú", gender: "Nam", wuxing: "Thủy", meaning: "Phú quý, giàu sang, tài năng phú bẩm.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Phúc", gender: "Nam", wuxing: "Hỏa", meaning: "Phước lành tốt đẹp, cát tường.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Phương", gender: "Unisex", wuxing: "Thủy", meaning: "Hướng đi đúng đắn, hương thơm dịu nhẹ.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Quân", gender: "Nam", wuxing: "Thủy", meaning: "Chính trực, anh minh như bậc quân vương.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Quang", gender: "Nam", wuxing: "Hỏa", meaning: "Ánh sáng rực rỡ, tương lai sáng lạng.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Quốc", gender: "Nam", wuxing: "Thổ", meaning: "Quốc gia đại sự, chí khí lớn.", score: 24, sound: 8, rarity: 3 },
    { syllable: "Quỳnh", gender: "Nữ", wuxing: "Mộc", meaning: "Đóa hoa quỳnh thanh tao, quý phái.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Sơn", gender: "Nam", wuxing: "Thổ", meaning: "Núi non vững chãi, kiên định vĩ đại.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Thảo", gender: "Nữ", wuxing: "Mộc", meaning: "Cỏ xanh tươi mát, hiếu thảo.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Thái", gender: "Nam", wuxing: "Hỏa", meaning: "Thái bình, an khang, thư thả.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Thanh", gender: "Unisex", wuxing: "Kim", meaning: "Trong sáng, thanh tao, thanh lịch.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Thành", gender: "Nam", wuxing: "Kim", meaning: "Thành công, chân thành, vững chãi.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Thiên", gender: "Unisex", wuxing: "Hỏa", meaning: "Trời rộng bao la, ý chí lớn lao.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Thịnh", gender: "Nam", wuxing: "Hỏa", meaning: "Hưng thịnh, phát đạt, sung túc.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Thị", gender: "Nữ", wuxing: "Thủy", meaning: "Truyền thống, dịu dàng, nết na.", score: 15, sound: 6, rarity: 1, is_middle: true },
    { syllable: "Thu", gender: "Nữ", wuxing: "Thủy", meaning: "Mùa thu êm đềm, dịu dàng, trong trẻo.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Thư", gender: "Nữ", wuxing: "Hỏa", meaning: "Thư thả, tâm hồn nho nhã, yêu văn học.", score: 24, sound: 9, rarity: 5 },
    { syllable: "Thương", gender: "Nữ", wuxing: "Kim", meaning: "Thương yêu, trắc ẩn, nhân ái.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Thủy", gender: "Nữ", wuxing: "Thủy", meaning: "Nước mát trong lành, uyển chuyển.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Tiến", gender: "Nam", wuxing: "Thủy", meaning: "Tiến bước vươn lên, chí hướng rộng mở.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Trang", gender: "Nữ", wuxing: "Kim", meaning: "Đoan trang, nghiêm túc, đài các.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Trọng", gender: "Nam", wuxing: "Thổ", meaning: "Trọng nghĩa, cốt cách quý tộc.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Trung", gender: "Nam", wuxing: "Thổ", meaning: "Trung thực, kiên định, đáng tin cậy.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Trúc", gender: "Nữ", wuxing: "Mộc", meaning: "Cây trúc thanh cao, kiên cường quân tử.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Tú", gender: "Unisex", wuxing: "Kim", meaning: "Thanh tú, lấp lánh như sao trời.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Tuấn", gender: "Nam", wuxing: "Mộc", meaning: "Tuấn tú, tài giỏi xuất chúng.", score: 25, sound: 9, rarity: 3 },
    { syllable: "Tùng", gender: "Nam", wuxing: "Mộc", meaning: "Cây tùng vững vàng trước phong ba.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Tường", gender: "Unisex", wuxing: "Thổ", meaning: "Cát tường, thấu suốt mọi điều.", score: 25, sound: 9, rarity: 4 },
    { syllable: "Uyên", gender: "Nữ", wuxing: "Thủy", meaning: "Uyên bác, duyên dáng, thông thái.", score: 25, sound: 9, rarity: 5 },
    { syllable: "Văn", gender: "Nam", wuxing: "Thủy", meaning: "Văn hóa, nho nhã, có học thức.", score: 18, sound: 7, rarity: 1, is_middle: true },
    { syllable: "Vân", gender: "Nữ", wuxing: "Thủy", meaning: "Mây trắng tự do trôi trên trời cao.", score: 22, sound: 10, rarity: 5 },
    { syllable: "Việt", gender: "Nam", wuxing: "Kim", meaning: "Ưu việt, thông minh bản lĩnh.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Vy", gender: "Nữ", wuxing: "Mộc", meaning: "Nhỏ nhắn đáng yêu, sinh khí tràn đầy.", score: 23, sound: 10, rarity: 4 },
    { syllable: "Xuân", gender: "Unisex", wuxing: "Kim", meaning: "Mùa xuân tươi mới, tràn ngập hy vọng.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Yên", gender: "Unisex", wuxing: "Thủy", meaning: "Tĩnh lặng, bình yên, nhẹ nhàng.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Yến", gender: "Nữ", wuxing: "Thủy", meaning: "Chim yến báo tin vui mùa xuân.", score: 23, sound: 9, rarity: 5 },
    // ── Expanded database ──────────────────────────────────────────────────────
    // Nữ
    { syllable: "Băng", gender: "Nữ", wuxing: "Thủy", meaning: "Trong trắng tinh khiết như băng tuyết.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Diệu", gender: "Nữ", wuxing: "Hỏa", meaning: "Tuyệt diệu, kỳ diệu, xuất chúng.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Hiền", gender: "Nữ", wuxing: "Thủy", meaning: "Hiền lành, đức hạnh, nhu mì.", score: 22, sound: 8, rarity: 3 },
    { syllable: "Hoa", gender: "Nữ", wuxing: "Mộc", meaning: "Hoa đẹp rực rỡ, phồn thịnh.", score: 22, sound: 9, rarity: 3 },
    { syllable: "Hồng", gender: "Nữ", wuxing: "Hỏa", meaning: "Hoa hồng đẹp tươi, rực rỡ, duyên dáng.", score: 22, sound: 8, rarity: 3 },
    { syllable: "Khuyên", gender: "Nữ", wuxing: "Kim", meaning: "Lời khuyên bổ ích, nhẫn nại, tâm lý.", score: 22, sound: 9, rarity: 5 },
    { syllable: "Lan", gender: "Nữ", wuxing: "Mộc", meaning: "Hoa lan thanh tao, quý phái, thơm ngát.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Loan", gender: "Nữ", wuxing: "Hỏa", meaning: "Phượng loan uy nghi, tài hoa, quý phái.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Nga", gender: "Nữ", wuxing: "Thủy", meaning: "Dáng vẻ uyển chuyển đẹp như chim nga.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Ngân", gender: "Nữ", wuxing: "Kim", meaning: "Tiếng ngân vang trong trẻo, bạc trắng.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Ngọt", gender: "Nữ", wuxing: "Thổ", meaning: "Ngọt ngào dịu dàng, chan chứa yêu thương.", score: 22, sound: 8, rarity: 5 },
    { syllable: "Nương", gender: "Nữ", wuxing: "Thủy", meaning: "Nương tựa vững chắc, hiền hòa.", score: 21, sound: 8, rarity: 5 },
    { syllable: "Oanh", gender: "Nữ", wuxing: "Hỏa", meaning: "Chim oanh hót hay, tài năng âm nhạc.", score: 22, sound: 9, rarity: 5 },
    { syllable: "Phấn", gender: "Nữ", wuxing: "Thổ", meaning: "Phấn khởi, hăng hái, nhiệt tình.", score: 22, sound: 8, rarity: 5 },
    { syllable: "Tâm", gender: "Nữ", wuxing: "Hỏa", meaning: "Tâm hồn thuần khiết, tình yêu thương.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Thắm", gender: "Nữ", wuxing: "Hỏa", meaning: "Thắm đỏ rực rỡ, tình cảm nồng nàn.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Thi", gender: "Nữ", wuxing: "Hỏa", meaning: "Thi thơ lãng mạn, tâm hồn nghệ sĩ.", score: 22, sound: 9, rarity: 4 },
    { syllable: "Trâm", gender: "Nữ", wuxing: "Kim", meaning: "Chiếc trâm cài tóc quý phái, duyên dáng.", score: 23, sound: 8, rarity: 5 },
    { syllable: "Trinh", gender: "Nữ", wuxing: "Kim", meaning: "Trinh trắng, trong sáng, thuần khiết.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Uyển", gender: "Nữ", wuxing: "Thủy", meaning: "Uyển chuyển, mềm mại, khéo léo.", score: 24, sound: 9, rarity: 5 },
    { syllable: "Xuân", gender: "Nữ", wuxing: "Mộc", meaning: "Mùa xuân tươi đẹp, niềm vui sống.", score: 23, sound: 9, rarity: 3 },
    // Nam
    { syllable: "Bảo Long", gender: "Nam", wuxing: "Thủy", meaning: "Rồng quý giá, tài năng phi thường.", score: 25, sound: 9, rarity: 5 },
    { syllable: "Chí", gender: "Nam", wuxing: "Hỏa", meaning: "Chí lớn, hoài bão, ý chí kiên định.", score: 23, sound: 8, rarity: 4, is_middle: true },
    { syllable: "Đăng", gender: "Nam", wuxing: "Hỏa", meaning: "Ánh đèn soi sáng, vươn lên cao.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Hào", gender: "Nam", wuxing: "Hỏa", meaning: "Hào hiệp, hào kiệt, chí khí lớn.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Hưng", gender: "Nam", wuxing: "Hỏa", meaning: "Hưng thịnh, phát triển mạnh mẽ.", score: 24, sound: 8, rarity: 4 },
    { syllable: "Khải", gender: "Nam", wuxing: "Kim", meaning: "Khải hoàn, chiến thắng vang danh.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Mạnh", gender: "Nam", wuxing: "Mộc", meaning: "Mạnh mẽ, cường tráng, vượt trội.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Quý", gender: "Nam", wuxing: "Kim", meaning: "Quý giá, trân trọng, hiếm có.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Tài", gender: "Nam", wuxing: "Thổ", meaning: "Tài năng vượt trội, tài lộc phong phú.", score: 24, sound: 9, rarity: 3 },
    { syllable: "Thắng", gender: "Nam", wuxing: "Hỏa", meaning: "Chiến thắng, vượt khó, xứng đáng.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Trí", gender: "Nam", wuxing: "Hỏa", meaning: "Trí tuệ sắc bén, thông minh lanh lợi.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Trường", gender: "Nam", wuxing: "Thủy", meaning: "Trường thọ, lâu dài, sự nghiệp vững bền.", score: 23, sound: 8, rarity: 4 },
    // Unisex
    { syllable: "Ân", gender: "Unisex", wuxing: "Thủy", meaning: "Ân huệ, ơn nghĩa, tình sâu nghĩa nặng.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Bình Minh", gender: "Unisex", wuxing: "Hỏa", meaning: "Bình minh rạng rỡ, hy vọng mới.", score: 25, sound: 10, rarity: 5 },
    { syllable: "Đan", gender: "Unisex", wuxing: "Hỏa", meaning: "Màu son đỏ đẹp, tấm lòng son sắt.", score: 23, sound: 9, rarity: 5 },
    { syllable: "Hòa", gender: "Unisex", wuxing: "Thổ", meaning: "Hòa bình, hòa thuận, hài hòa.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Huyền", gender: "Nữ", wuxing: "Thủy", meaning: "Huyền diệu, bí ẩn cuốn hút.", score: 23, sound: 9, rarity: 4 },
    { syllable: "Mỹ", gender: "Nữ", wuxing: "Kim", meaning: "Xinh đẹp, mỹ miều, tốt đẹp.", score: 23, sound: 9, rarity: 3 },
    { syllable: "Phi", gender: "Unisex", wuxing: "Hỏa", meaning: "Bay cao, vượt trội, phi thường.", score: 24, sound: 9, rarity: 4 },
    { syllable: "Quân Anh", gender: "Unisex", wuxing: "Hỏa", meaning: "Anh hùng quân tử, tài ba lỗi lạc.", score: 25, sound: 9, rarity: 5 },
    { syllable: "Sáng", gender: "Unisex", wuxing: "Hỏa", meaning: "Sáng suốt, rực rỡ, khai sáng.", score: 23, sound: 8, rarity: 4 },
    { syllable: "Tân", gender: "Unisex", wuxing: "Kim", meaning: "Mới mẻ, tươi tắn, đổi mới.", score: 22, sound: 8, rarity: 4 },
    { syllable: "Vinh", gender: "Unisex", wuxing: "Hỏa", meaning: "Vinh quang, rực rỡ, thịnh vượng.", score: 23, sound: 8, rarity: 3 },
    { syllable: "Vĩnh", gender: "Nam", wuxing: "Thủy", meaning: "Vĩnh cửu, trường tồn, bất diệt.", score: 23, sound: 8, rarity: 4 },
];

// Feng Shui Helper Engine (Client-side)
const FengShui = {
    getElementByYear(year) {
        const canWeights = {
            "Canh": 4, "Tân": 4, "Nhâm": 5, "Quý": 5,
            "Giáp": 1, "Ất": 1, "Bính": 2, "Đinh": 2,
            "Mậu": 3, "Kỷ": 3
        };
        const chiWeights = {
            "Tý": 0, "Sửu": 0, "Ngọ": 0, "Mùi": 0,
            "Dần": 1, "Mão": 1, "Thân": 1, "Dậu": 1,
            "Thìn": 2, "Tỵ": 2, "Tuất": 2, "Hợi": 2
        };
        const canNames = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
        const chiNames = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
        
        const canName = canNames[year % 10];
        const chiName = chiNames[year % 12];
        
        let total = (canWeights[canName] || 0) + (chiWeights[chiName] || 0);
        if (total > 5) total -= 5;
        
        const elements = {
            1: "Kim",
            2: "Thủy",
            3: "Hỏa",
            4: "Thổ",
            5: "Mộc"
        };
        return elements[total] || "Thổ";
    },
    
    getElementOfName(nameStr) {
        const words = stripAccents(nameStr).split(/\s+/);
        const lastWord = words[words.length - 1];
        if (!lastWord) return "Thổ";
        
        const match = VIETNAMESE_SYLLABLES.find(s => stripAccents(s.syllable) === lastWord);
        if (match) return match.wuxing;
        
        const nameElements = {
            "KHOI": "Mộc", "LAM": "Mộc", "VY": "Mộc", "QUYNH": "Mộc", "CHI": "Mộc", "TUNG": "Mộc", "NHAN": "Mộc", "BACH": "Mộc",
            "HAI": "Thủy", "GIANG": "Thủy", "AN": "Thủy", "VAN": "Thủy", "YEN": "Thủy", "HA": "Thủy", "THUY": "Thủy", "DUONG": "Thủy", "MINH": "Thủy",
            "ANH": "Hỏa", "THU": "Hỏa", "PHAT": "Hỏa", "KIET": "Hỏa", "HOANG": "Hỏa", "NAM": "Hỏa", "BAO": "Hỏa", "TRIET": "Hỏa",
            "SON": "Thổ", "DUY": "Thổ", "TUONG": "Thổ", "PHUOC": "Thổ", "PHONG": "Thổ", "CHAU": "Thổ",
            "KHANH": "Kim", "BINH": "Kim", "TRANG": "Kim", "TRAM": "Kim", "XUAN": "Kim", "KIM": "Kim", "NGAN": "Kim"
        };
        return nameElements[lastWord] || "Thổ";
    },
    
    getRelationship(el1, el2) {
        const relations = {
            "Kim": "Thủy",
            "Thủy": "Mộc",
            "Mộc": "Hỏa",
            "Hỏa": "Thổ",
            "Thổ": "Kim"
        };
        if (relations[el1] === el2) return "sinh"; // el1 sinh el2
        if (relations[el2] === el1) return "sinh"; // el2 sinh el1
        if (el1 === el2) return "hợp";
        return "khắc";
    }
};

// Evaluate custom typed name dynamically by splitting into syllables and matching dictionary values
function evaluateCustomName(nameText) {
    const words = nameText.trim().split(/\s+/);
    if (words.length === 0 || words[0] === "") {
        return {
            name: nameText,
            middle: { syllable: "", gender: "Unisex", wuxing: "Thổ", meaning: "", score: 20, sound: 8, rarity: 4 },
            first: { syllable: "", gender: "Unisex", wuxing: "Thổ", meaning: "", score: 20, sound: 8, rarity: 4 }
        };
    }
    
    const firstNameVal = words[words.length - 1];
    const middleNameVal = words.slice(0, words.length - 1).join(" ");
    
    // Look up in syllables
    let firstSyl = VIETNAMESE_SYLLABLES.find(s => s.syllable.toLowerCase() === firstNameVal.toLowerCase());
    if (!firstSyl) {
        firstSyl = {
            syllable: firstNameVal,
            gender: "Unisex",
            wuxing: FengShui.getElementOfName(firstNameVal),
            meaning: "Tên có ý nghĩa cát tường.",
            score: 22,
            sound: 8,
            rarity: 4
        };
    }
    
    let middleSyl = null;
    if (middleNameVal) {
        const lastMiddleWord = words[words.length - 2] || "";
        middleSyl = VIETNAMESE_SYLLABLES.find(s => s.syllable.toLowerCase() === lastMiddleWord.toLowerCase());
    }
    if (!middleSyl) {
        middleSyl = {
            syllable: middleNameVal || "",
            gender: "Unisex",
            wuxing: "Thổ",
            meaning: "Đệm bổ trợ ý chí.",
            score: 20,
            sound: 8,
            rarity: 4
        };
    }
    
    return {
        name: nameText,
        middle: middleSyl,
        first: firstSyl
    };
}

// Generate human-readable reasons from score breakdown
function generateReasons(filledNumbers, nameNums, hasDebt, parentBonus, wishBonus) {
    const reasons = [];
    if (filledNumbers && filledNumbers.length > 0) {
        reasons.push(`+ Bổ sung ${filledNumbers.length} số thiếu (${filledNumbers.join(', ')})`);
    }
    if (hasDebt) {
        reasons.push('⚠ Tạo Karmic Debt — cân nhắc kỹ');
    } else {
        reasons.push('+ Không tạo Karmic Debt');
    }
    if ([11, 22, 33].includes(nameNums.expression)) {
        reasons.push(`+ Mang số Master ${nameNums.expression} — năng lượng đặc biệt`);
    }
    if (parentBonus >= 8) {
        reasons.push('+ Tương hợp tốt với bố mẹ');
    }
    if (wishBonus > 0) {
        reasons.push('+ Phù hợp với nguyện vọng gia đình');
    }
    const m = NUMBER_MEANINGS[nameNums.expression];
    if (m) reasons.push(`+ Biểu đạt: ${m.vi}`);
    return reasons;
}

// Score Name Combination (100-point system)
function scoreNameCombination(middle, first, wish) {
    const lp = activeChildData.lp;
    const childYear = parseInt(activeChildData.dob.split('-')[0]) || 2026;
    const childElement = FengShui.getElementByYear(childYear);

    let fatherElement = null;
    let motherElement = null;
    if (activeChildData.parents.fatherDob) {
        const fYear = parseInt(activeChildData.parents.fatherDob.split('-')[0]);
        if (!isNaN(fYear)) fatherElement = FengShui.getElementByYear(fYear);
    }
    if (activeChildData.parents.motherDob) {
        const mYear = parseInt(activeChildData.parents.motherDob.split('-')[0]);
        if (!isNaN(mYear)) motherElement = FengShui.getElementByYear(mYear);
    }

    const nameText = `${middle.syllable} ${first.syllable}`.trim();
    const fullName = `${activeChildData.lastName} ${nameText}`;

    const dobDigits = activeChildData.dob.replace(/-/g, '').split('').map(Number).filter(d => d !== 0);
    const lastNameNormalized = stripAccents(activeChildData.lastName);
    const lastNameDigits = lastNameNormalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);
    const baseGrid = Array(10).fill(0);
    dobDigits.forEach(d => baseGrid[d]++);
    lastNameDigits.forEach(d => baseGrid[d]++);

    const missingNumbers = [];
    for (let num = 1; num <= 9; num++) {
        if (baseGrid[num] === 0) missingNumbers.push(num);
    }

    const emptyArrowCodes = activeChildData.gridData.emptyArrows.map(a => a.code);
    const lines = {
        "1-2-3": [1, 2, 3], "4-5-6": [4, 5, 6], "7-8-9": [7, 8, 9],
        "1-4-7": [1, 4, 7], "2-5-8": [2, 5, 8], "3-6-9": [3, 6, 9],
        "1-5-9": [1, 5, 9], "3-5-7": [3, 5, 7]
    };

    const nameNormalized = stripAccents(nameText);
    const nameDigits = nameNormalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);

    // ═══════════════════════════════════════
    // CRITERION 1: Numerology Match (35 pts)
    // ═══════════════════════════════════════
    const nameNums = RuleEngine.calculateNameNumbers(fullName);
    const friendlyGroups = [[1, 5, 7], [2, 4, 8, 11, 22], [3, 6, 9, 33]];
    let numerologyMatch = 22; // base
    if (lp === nameNums.expression) {
        numerologyMatch = 35;
    } else {
        let friendly = false;
        for (let g of friendlyGroups) {
            if (g.includes(lp) && g.includes(nameNums.expression)) { friendly = true; break; }
        }
        numerologyMatch = friendly ? 30 : 22;
    }

    // ═══════════════════════════════════════════
    // CRITERION 2: Missing Number Compensation (25 pts)
    // ═══════════════════════════════════════════
    let filledCount = 0;
    const filledNumbers = [];
    missingNumbers.forEach(num => {
        if (nameDigits.includes(num)) { filledCount++; filledNumbers.push(num); }
    });
    const totalMissing = missingNumbers.length || 1;
    const missingCompensation = Math.round((filledCount / totalMissing) * 25);

    // Arrow bonus is folded into compensation
    let arrowBonus = 0;
    emptyArrowCodes.forEach(code => {
        const cells = lines[code];
        cells.forEach(cell => { if (nameDigits.includes(cell)) arrowBonus += 2; });
    });
    arrowBonus = Math.min(5, arrowBonus);

    // ═══════════════════════════════════════
    // CRITERION 3: Meaning Score (20 pts)
    // ═══════════════════════════════════════
    const rawMeaning = Math.round((middle.score + first.score) / 2);
    const meaningScore = Math.round((rawMeaning / 25) * 20); // normalize to 20

    // ═══════════════════════════════════════════
    // CRITERION 4: Parent Compatibility (10 pts)
    // ═══════════════════════════════════════════
    const firstWuxing = first.wuxing;
    let parentBonus = 0;
    if (fatherElement) {
        const rel = FengShui.getRelationship(fatherElement, firstWuxing);
        if (rel === 'sinh') parentBonus += 5;
        else if (rel === 'hợp') parentBonus += 3;
    }
    if (motherElement) {
        const rel = FengShui.getRelationship(motherElement, firstWuxing);
        if (rel === 'sinh') parentBonus += 5;
        else if (rel === 'hợp') parentBonus += 3;
    }
    // Child-name harmony
    const childRel = FengShui.getRelationship(childElement, firstWuxing);
    if (childRel === 'sinh') parentBonus += 2;
    parentBonus = Math.min(10, parentBonus);

    // ═══════════════════════════════════════
    // CRITERION 5: Pronunciation (5 pts)
    // ═══════════════════════════════════════
    const rawSound = Math.round((middle.sound + first.sound) / 2);
    const pronunciationScore = Math.round((rawSound / 10) * 5);

    // ═══════════════════════════════════════
    // CRITERION 6: Popularity (5 pts)
    // ═══════════════════════════════════════
    const avgRarity = Math.round((middle.rarity + first.rarity) / 2);
    // rarity 1=very common (low score), 6=unique (highest)
    const popularityScore = Math.min(5, Math.max(1, avgRarity - 1));

    // WISH ALIGNMENT bonus
    let wishBonus = 0;
    if (wish === 'Bình an & Nhân hậu' && [2, 6, 9].includes(nameNums.expression)) wishBonus = 3;
    else if (wish === 'Thông minh & Tài lộc' && [3, 5, 8].includes(nameNums.expression)) wishBonus = 3;
    else if (wish === 'Lãnh đạo & Thành công' && [1, 8, 22].includes(nameNums.expression)) wishBonus = 3;
    else if (wish === 'Sức khỏe & Tự do' && [4, 5, 7].includes(nameNums.expression)) wishBonus = 3;

    // KARMIC DEBT penalty
    const karmicPenalty = nameNums.hasDebt ? -15 : 0;

    // ═══════════════════════════════════════
    // TOTAL
    // ═══════════════════════════════════════
    const rawTotal = numerologyMatch + missingCompensation + arrowBonus +
                     meaningScore + parentBonus + pronunciationScore + popularityScore +
                     wishBonus + karmicPenalty;
    const totalScore = Math.max(30, Math.min(100, Math.round(rawTotal)));

    const combinedMeaning = `Ghép từ đệm "${middle.syllable}" (${middle.meaning.replace(/\.$/, '')}) và tên chính "${first.syllable}" (${first.meaning.toLowerCase()})`;

    return {
        name: nameText,
        fullName,
        meaning: combinedMeaning,
        expression: nameNums.expression,
        soul: nameNums.soulUrge,
        personality: nameNums.personality,
        filledNumbers,
        filledCount,
        score: totalScore,
        wuxing: firstWuxing,
        hasMaster: [11, 22, 33].includes(nameNums.expression),
        hasDebt: nameNums.hasDebt,
        // 100-point breakdown
        breakdown: {
            numerologyMatch,
            missingCompensation: missingCompensation + arrowBonus,
            meaning: meaningScore,
            parentCompat: parentBonus,
            pronunciation: pronunciationScore,
            popularity: popularityScore,
            wishBonus,
            karmicPenalty
        },
        reasons: generateReasons(filledNumbers, nameNums, nameNums.hasDebt, parentBonus, wishBonus)
    };
}


// ============================================================
// Karmic Debt Numbers Info (MODULE 3)
// ============================================================
const KARMIC_DEBT_INFO = {
    13: {
        title: "Nợ nghiệp 13/4: Nghiệp Lười Biếng / Trốn Tránh",
        desc: "Nguyên nhân tiền kiếp: Đã từng lười nhác, đùn đẩy trách nhiệm, sống tầm gửi hoặc lợi dụng công sức lao động của người khác. Biểu hiện kiếp này: Gặp rất nhiều rào cản, việc gì cũng phải nỗ lực gấp đôi người khác mới thành. Bản thân dễ rơi vào trạng thái trì trệ, cả thèm chóng chán.",
        lesson: "Tuyệt đối không được đi đường tắt. Phải rèn luyện tính kỷ luật thép, làm việc tỉ mỉ, kiên trì, đối mặt trực diện với khó khăn."
    },
    14: {
        title: "Nợ nghiệp 14/5: Nghiệp Lạm Dụng Tự Do / Tổn Hại Niềm Tin",
        desc: "Nguyên nhân tiền kiếp: Lạm dụng sự tự do cá nhân để thỏa mãn đam mê ích kỷ, gây tổn thương hoặc tước đoạt sự tự do của người khác. Biểu hiện kiếp này: Cuộc sống thường xuyên gặp những biến cố bất ngờ làm đảo lộn kế hoạch. Dễ sa ngã vào các cơn nghiện (game, chất kích thích, mua sắm) hoặc các mối quan hệ độc hại.",
        lesson: "Học cách cam kết và tự kiểm soát hành vi. Rèn luyện lối sống lành mạnh, tìm kiếm sự tự do trong tâm trí thay vì buông thả thể xác."
    },
    16: {
        title: "Nợ nghiệp 16/7: Nghiệp Hủy Hoại / Ngạo Mạn Tình Ái",
        desc: "Nguyên nhân tiền kiếp: Sống vô cảm, chà đạp lên tình cảm của người khác, hoặc dùng quyền lực/sự ngạo mạn để phá hoại sự bình yên của người xung quanh. Biểu hiện kiếp này: Trải qua những cú sụp đổ mang tính 'tái sinh' (đổ vỡ hôn nhân đột ngột, phá sản, mất mát người thân). Cái tôi thường bị tổn thương sâu sắc.",
        lesson: "Học cách khiêm nhường, hạ cái tôi xuống. Quay vào bên trong để thức tỉnh tâm linh, thấu hiểu quy luật nhân quả và bao dung với tổn thương."
    },
    19: {
        title: "Nợ nghiệp 19/1: Nghiệp Lạm Dụng Quyền Lực / Ích Kỷ",
        desc: "Nguyên nhân tiền kiếp: Đứng ở vị trí cao nhưng độc đoán, thao túng, chỉ biết nghĩ đến lợi ích bản thân và phớt lờ tiếng nói của người yếu thế. Biểu hiện kiếp này: Thường rơi vào cảnh đơn độc, tự lực cánh sinh, khó tìm được sự trợ giúp từ quý nhân kể cả lúc ngặt nghèo nhất. Thường bị người khác hiểu lầm hoặc cô lập.",
        lesson: "Học cách tự lập một cách kiên cường nhưng không cô lập bản thân. Chủ động giúp đỡ người khác mà không mong cầu đền đáp, học cách lắng nghe và phụng sự."
    }
};

// ============================================================
// MODULE 1: Ý nghĩa chi tiết các con số cốt lõi
// ============================================================
const NUMEROLOGY_DETAILS = {
    1: {
        title: "Số 1: Nhà Tiên Phong Độc Lập",
        overview: "Đại diện cho năng lượng gốc, sự khởi đầu, lòng định kiến, cái tôi và năng lực lãnh đạo độc lập.",
        strengths: "Kiên định, tự lực cánh sinh, quyết đoán, có khả năng dẫn dắt và mở đường.",
        weaknesses: "Độc đoán, ích kỷ, cứng đầu, đôi khi quá tự phụ và cô độc.",
        lesson: "Học cách lắng nghe ý kiến đóng góp của người khác, kiềm chế cái tôi cá nhân, chuyển đổi từ tư duy 'Tôi là nhất' sang tư duy phối hợp đội nhóm."
    },
    2: {
        title: "Số 2: Sứ Giả Hòa Bình & Kết Nối",
        overview: "Đại diện cho sự trực giác, nhạy cảm, lòng trắc ẩn, khả năng ngoại giao và kết nối đồng thuận.",
        strengths: "Lắng nghe tốt, hòa nhã, có khả năng hòa giải mâu thuẫn, trực giác cực kỳ nhạy bén.",
        weaknesses: "Dễ bị tổn thương, phụ thuộc cảm xúc vào người khác, hay do dự, thiếu quyết đoán.",
        lesson: "Học cách đặt ra giới hạn cá nhân để bảo vệ cảm xúc của mình; rèn luyện sự dũng cảm để tự đưa ra quyết định mà không cần người khác công nhận."
    },
    3: {
        title: "Số 3: Ngọn Đuốc Sáng Tạo & Ngôn Từ",
        overview: "Năng lượng của sự biểu đạt, nghệ thuật, giao tiếp, lan tỏa niềm vui và sự lạc quan.",
        strengths: "Hoạt ngôn, thông minh, tư duy sáng tạo đột phá, có khả năng truyền cảm hứng trước đám đông.",
        weaknesses: "Cực kỳ ngẫu hứng, dễ mất tập trung, đôi khi nông nổi hoặc dùng ngôn từ làm tổn thương người khác (khẩu nghiệp).",
        lesson: "Học cách kỷ luật hóa tư duy, quản trị năng lượng để không bị cả thèm chóng chán; học cách uốn lưỡi trước khi nói."
    },
    4: {
        title: "Số 4: Bậc Thầy Kỷ Luật & Thực Tế",
        overview: "Năng lượng của sự ổn định, nền tảng, quy trình, tính thực tế và quản trị hệ thống.",
        strengths: "Đáng tin cậy, tổ chức tốt, kiên nhẫn, tỉ mỉ, làm việc có kế hoạch rõ ràng.",
        weaknesses: "Bảo thủ, cứng nhắc, sợ thay đổi, dễ rơi vào trạng thái cuồng công việc và thiếu lãng mạn.",
        lesson: "Học cách mở rộng góc nhìn, chấp nhận sự linh hoạt; rèn luyện việc cân bằng giữa công việc và tận hưởng cuộc sống."
    },
    5: {
        title: "Số 5: Cơn Gió Tự Do & Trải Nghiệm",
        overview: "Đại diện cho sự đột phá, đổi mới, ưa thích phiêu lưu, linh hoạt và không thích trói buộc.",
        strengths: "Thích nghi nhanh, giàu năng lượng, dám nghĩ dám làm, có sức hút tự nhiên.",
        weaknesses: "Cả thèm chóng chán, vô kỷ luật, dễ sa ngã vào các thú vui ngắn hạn hoặc các thói quen độc hại.",
        lesson: "Học cách tìm thấy 'tự do trong sự tự kỷ luật'; rèn luyện sự kiên trì đi đến cùng với các mục tiêu dài hạn."
    },
    6: {
        title: "Số 6: Trái Tim Yêu Thương & Phụng Sự",
        overview: "Đại diện cho tình mẫu tử/phụ tử, gia đình, trách nhiệm nuôi dưỡng, chăm sóc và chữa lành.",
        strengths: "Giàu lòng vị tha, bao dung, có tính thẩm mỹ cao, luôn che chở cho người yếu thế.",
        weaknesses: "Hay lo lắng thái quá, kiểm soát người thân dưới danh nghĩa tình yêu, dễ bị bao biện hoặc ôm đồm việc người khác.",
        lesson: "Học cách yêu thương thông thái: để người khác tự chịu trách nhiệm với cuộc đời họ; học cách yêu thương chính mình trước khi phụng sự xã hội."
    },
    7: {
        title: "Số 7: Nhà Triết Học & Trí Tuệ Tâm Linh",
        overview: "Năng lượng của sự chiêm nghiệm, nghiên cứu sâu, trải nghiệm thực tế và thức tỉnh tâm linh.",
        strengths: "Khả năng tự học xuất sắc, tư duy phân tích sâu sắc, độc lập, có đức tin vững chắc sau biến cố.",
        weaknesses: "Hay hoài nghi, đa nghi, cô độc, khó đặt niềm tin vào người khác, có xu hướng tự lập rào cản.",
        lesson: "Học cách mở lòng chia sẻ tri thức thay vì giữ cho riêng mình; chấp nhận rằng cuộc đời có những mất mát là để đổi lấy bài học trí tuệ."
    },
    8: {
        title: "Số 8: Ông Chủ Quyền Lực & Vật Chất",
        overview: "Đại diện cho năng lượng điều hành, tài chính, kinh doanh, sự độc lập mạnh mẽ và quy luật nhân quả.",
        strengths: "Có đầu óc kinh doanh, thực tế, chịu áp lực giỏi, thu hút tiền bạc và quyền lực tự nhiên.",
        weaknesses: "Thực dụng, lạnh lùng, khó thể hiện cảm xúc, dễ bị cuốn vào lòng tham vật chất.",
        lesson: "Học cách cân bằng giữa thế giới vật chất và đời sống tinh thần; sử dụng quyền lực và tiền bạc để tạo ra giá trị nhân văn cho xã hội."
    },
    9: {
        title: "Số 9: Nhà Nhân Đạo & Lý Tưởng Đại Đồng",
        overview: "Con số của lòng bao dung, ước mơ lớn, lý tưởng xã hội, sự buông bỏ và đức tin nhân đạo.",
        strengths: "Vị tha, có tầm nhìn vĩ mô, luôn hướng về cộng đồng, sẵn sàng hy sinh lợi ích cá nhân.",
        weaknesses: "Mơ mộng hão huyền, thiếu thực tế, hay mang gánh nặng của quá khứ, khó từ chối người khác.",
        lesson: "Học cách thực tế hóa các lý tưởng của mình; học cách buông bỏ những tổn thương cũ để nhẹ lòng bước tiếp."
    }
};

// ============================================================
// MODULE 2: Logic ý nghĩa số lần lặp lại (Mật độ năng lượng)
// ============================================================
const DENSITY_LOGIC = {
    0: {
        label: "Tần suất 0 lần (Số Thiếu)",
        desc: "Vùng năng lượng bị bỏ trống. Người này thiếu đi phản xạ tự nhiên của con số đó.",
        lesson: "Chủ động tạo môi trường thử thách để kích hoạt năng lượng thiếu này."
    },
    1: {
        label: "Tần suất 1 lần (Cân bằng)",
        desc: "Trạng thái lý tưởng. Năng lượng phát huy vừa đủ, lành mạnh và dễ kiểm soát.",
        lesson: "Duy trì và phát huy một cách tự nhiên."
    },
    2: {
        label: "Tần suất 2 lần (Nhấn mạnh)",
        desc: "Năng lượng được nhân đôi lực đẩy. Thể hiện năng khiếu rõ rệt.",
        lesson: "Bắt đầu cần sự tỉnh thức để không bị hành động quá đà hoặc lạm dụng."
    },
    3: {
        label: "Tần suất 3 lần trở lên (Quá tải / Đảo cực)",
        desc: "Năng lượng phóng đại quá mức (bùng nổ tiêu cực) hoặc bị khóa chặt lại khiến biểu hiện ngược lại hoàn toàn (ức chế ngược).",
        lesson: "Cần rèn luyện khả năng tự kiểm soát cảm xúc, hạ cái tôi, thiền định để cân bằng."
    }
};

// ============================================================
// MODULE 4: Ý nghĩa các 'Ốc đảo cô đơn' (Isolated Numbers)
// ============================================================
const ISOLATED_OASES = {
    1: {
        title: "Ốc đảo Số 1 (Trống ô số 2, 4, 5)",
        desc: "Người này cực kỳ khó diễn đạt thế giới nội tâm ra bên ngoài. Họ giữ mọi tâm sự bên trong dẫn đến việc người khác thấy họ khó hiểu, lạnh lùng.",
        lesson: "Học cách viết nhật ký, chia sẻ cảm xúc từ những điều nhỏ nhất, học các bộ môn nghệ thuật để giải phóng năng lượng ức chế."
    },
    3: {
        title: "Ốc đảo Số 3 (Trống ô số 2, 5, 6)",
        desc: "Trí tưởng tượng và tư duy rất nhạy bén nhưng bị 'treo lơ lửng'. Hay nghĩ ra ý tưởng hay nhưng không biết cách hiện thực hóa hoặc không có ai phối hợp để làm cùng.",
        lesson: "Rèn luyện kỹ năng lập kế hoạch thực tế, chủ động tìm kiếm đồng đội có tính kỷ luật (như người số 4 hoặc số 8) để kéo ý tưởng xuống đất."
    },
    7: {
        title: "Ốc đảo Số 7 (Trống ô số 4, 5, 8)",
        desc: "Vòng lặp bài học thương đau. Người này dễ vấp ngã cùng một kiểu lỗi (ví dụ: cho vay tiền mất góc, yêu nhầm người) nhưng rất chậm rút ra bài học kinh nghiệm, hay trách móc số phận.",
        lesson: "Phải tập thói quen viết 'Post-mortem' (đánh giá sau biến cố) cho cuộc đời mình. Nhìn nhận mọi thất bại dưới góc nhìn khoa học và nhân quả để chấm dứt vòng lặp."
    },
    9: {
        title: "Ốc đảo Số 9 (Trống ô số 5, 6, 8)",
        desc: "Ôm giữ hoài bão, ước mơ vĩ đại cho nhân loại hoặc gia đình nhưng không có công cụ thực tế để thực hiện. Dễ sinh tâm lý bất mãn, u sầu, nhìn đời bằng lăng kính tiêu cực.",
        lesson: "Chia nhỏ mục tiêu vĩ đại thành các hành động tử tế mỗi ngày (ví dụ: nhặt rác bảo vệ môi trường, giúp đỡ 1 người vô gia cư) thay vì chỉ nghĩ về những điều xa xôi."
    }
};

// ============================================================
// MODULE 11: Ý nghĩa 9 Chỉ số Thách thức (The Challenges)
// Lưu ý: Chỉ số thách thức chạy từ 0 đến 8. Số 0 là trường hợp đặc biệt.
// ============================================================
const CHALLENGE_INFO = {
    0: {
        title: "Thách thức của \"Sự Lựa Chọn\" hoặc \"Không có gì\"",
        desc: "Người này không gặp một rào cản cụ thể nào từ bên ngoài, nhưng lại phải đối mặt với thử thách lớn nhất: Tự do ý chí. Họ dễ bị mông lung, không biết mình muốn gì hoặc có xu hướng buông xuôi vì cuộc sống quá bình lặng.",
        lesson: "Phải tự đặt ra mục tiêu và kỷ luật cho bản thân mà không đợi hoàn cảnh ép buộc; học cách tự chịu trách nhiệm với mọi quyết định của cuộc đời."
    },
    1: {
        title: "Áp lực về sự \"Tự Chủ & Khẳng Định\"",
        desc: "Người này dễ bị rơi vào hai thái cực: Hoặc là quá nhút nhát, để người khác dắt mũi, thao túng; hoặc là quá độc đoán, hung hăng, ích kỷ để che giấu sự tự ti bên trong.",
        lesson: "Học cách đứng trên đôi chân của mình, dũng cảm nói lên quan điểm cá nhân nhưng không chà đạp lên cái tôi của người khác."
    },
    2: {
        title: "Thử thách về \"Cảm Xúc & Sự Nhạy Cảm\"",
        desc: "Dễ bị tổn thương bởi lời nói của người xung quanh, hay suy diễn (overthinking), sợ bị từ chối nên thường nhẫn nhịn quá mức hoặc né tránh xung đột một cách tiêu cực.",
        lesson: "Học cách quản trị cảm xúc, thiết lập ranh giới cá nhân rõ ràng; hiểu rằng hòa bình không đồng nghĩa với việc cam chịu."
    },
    3: {
        title: "Rào cản về \"Biểu Đạt & Ngôn Từ\"",
        desc: "Thách thức liên quan đến việc giao tiếp. Người này có thể rất sợ nói trước đám đông, giữ mọi thứ trong lòng; hoặc ngược lại, nói năng thiếu kiểm soát, hay chỉ trích, buôn chuyện gây tổn thương (khẩu nghiệp).",
        lesson: "Học cách sử dụng ngôn từ một cách xây dựng, chân thành; rèn luyện khả năng diễn đạt suy nghĩ một cách mạch lạc."
    },
    4: {
        title: "Thử thách về \"Kỷ Luật & Tính Thực Tế\"",
        desc: "Xu hướng lười biếng, trì trệ, vô tổ chức, làm việc không có kế hoạch dẫn đến việc bỏ dở giữa chừng. Một số trường hợp ngược lại thì quá bảo thủ, sợ rủi ro, không dám thay đổi.",
        lesson: "Rèn luyện tính kiên trì, tỉ mỉ, học cách lập kế hoạch chi tiết từ những việc nhỏ nhất và tuân thủ nó nghiêm túc."
    },
    5: {
        title: "Áp lực từ \"Sự Thay Đổi & Cám Dỗ\"",
        desc: "Thường xuyên cảm thấy bồn chồn, đứng núi này trông núi nọ, cả thèm chóng chán trong công việc và tình cảm. Dễ bị cuốn vào các thú vui ngắn hạn hoặc lối sống buông thả.",
        lesson: "Học cách cam kết dài hạn; hiểu rằng sự tự do đích thực chỉ có được khi bản thân kiểm soát được các ham muốn tức thời."
    },
    6: {
        title: "Gánh nặng về \"Trách Nhiệm & Áp Đặt\"",
        desc: "Dễ rơi vào cảnh ôm đồm việc của người khác, hy sinh quên mình rồi sinh lòng oán hận khi không được ghi nhận. Hoặc có xu hướng kiểm soát, áp đặt người thân dưới danh nghĩa \"muốn tốt cho họ\".",
        lesson: "Học cách yêu thương thông thái và buông bỏ kỳ vọng; để người xung quanh tự chịu trách nhiệm với bài học cuộc đời của họ."
    },
    7: {
        title: "Thử thách về \"Niềm Tin & Sự Thức Tỉnh\"",
        desc: "Hay hoài nghi quá mức, không tin tưởng vào bất kỳ ai, tự cô lập bản thân trong thế giới riêng. Họ thường phải trải qua một vài mất mát lớn (về tiền bạc hoặc tình cảm) thì mới chịu thay đổi góc nhìn về cuộc sống.",
        lesson: "Học cách mở lòng, phát triển trí tuệ sâu sắc thay vì chỉ nhìn bề nổi; chấp nhận những điều không thể giải thích bằng logic thuần túy."
    },
    8: {
        title: "Áp lực từ \"Vật Chất & Quyền Lực\"",
        desc: "Thử thách lớn về tài chính. Người này có thể liên tục gặp khó khăn về tiền bạc, hoặc ngược lại, quá thực dụng, tham lam, đánh đổi mọi thứ để lấy danh vọng và quyền lực.",
        lesson: "Học cách cân bằng giữa vật chất và tinh thần; hiểu sâu sắc về luật nhân quả trong kinh doanh và tiền bạc."
    }
};

// ============================================================
// MODULE 12: Ý nghĩa Chỉ số Trưởng thành (Maturity Numbers)
// Bản dịch năng lượng trỗi dậy mạnh mẽ sau tuổi 35
// ============================================================
const MATURITY_INFO = {
    1: {
        title: "Trưởng thành 1: Cái Tôi Độc Lập & Lãnh Đạo Chín Muồi",
        desc: "Giai đoạn trung vận của bạn sẽ là lúc cái tôi độc lập và năng lực lãnh đạo đạt độ chín. Bạn có xu hướng tự đứng ra làm chủ, khẳng định vị thế và không còn muốn dựa dẫm vào ai."
    },
    2: {
        title: "Trưởng thành 2: Bình Yên & Kết Nối Hậu Vận",
        desc: "Càng về hậu vận, cuộc sống của bạn càng chậm lại, hướng về sự bình yên, kết nối. Bạn trở thành chỗ dựa tinh thần, nhà ngoại giao hoặc người hòa giải có uy tín cao trong cộng đồng."
    },
    3: {
        title: "Trưởng thành 3: Sáng Tạo & Truyền Cảm Hứng",
        desc: "Tuổi trung niên của bạn sẽ ngập tràn năng lượng sáng tạo, giao lưu và chia sẻ. Bạn có xu hướng viết lách, giảng dạy, diễn thuyết hoặc tham gia các hoạt động nghệ thuật để truyền cảm hứng."
    },
    4: {
        title: "Trưởng thành 4: Ổn Định & Kỷ Luật Cao",
        desc: "Sau 35 tuổi, bạn sẽ thu mình vào sự ổn định, thực tế và kỷ luật cao. Đây là giai đoạn bạn gặt hái tài sản vững chắc (đất đai, nhà cửa) và trở thành chuyên gia gạo cội trong lĩnh vực của mình."
    },
    5: {
        title: "Trưởng thành 5: Tự Do & Đổi Mới Trẻ Trung",
        desc: "Cuộc sống giai đoạn sau của bạn không hề nhàm chán mà đầy ắp những chuyến đi, sự đổi mới và tự do. Bạn có xu hướng thay đổi tư duy, thích nghi với các công nghệ hoặc lối sống mới một cách trẻ trung."
    },
    6: {
        title: "Trưởng thành 6: Tổ Ấm & Phụng Sự",
        desc: "Trọng tâm cuộc đời bạn lúc này dồn trọn vẹn vào tổ ấm, gia đình và sự phụng sự xã hội. Bạn tìm thấy niềm hạnh phúc lớn nhất khi được chăm sóc, nuôi dưỡng và che chở cho những người xung quanh."
    },
    7: {
        title: "Trưởng thành 7: Nhà Tư Tưởng & Thầy Tâm Linh",
        desc: "Đây là lúc bạn trở thành một nhà tư tưởng, triết gia hoặc người thầy tâm linh đúng nghĩa. Bạn dành nhiều thời gian để thiền định, tự học, đào sâu tri thức và không còn mặn mà với những cuộc tranh giành danh lợi."
    },
    8: {
        title: "Trưởng thành 8: Cơ Nghiệp & Uy Quyền Bùng Nổ",
        desc: "Giai đoạn bùng nổ mạnh mẽ nhất về mặt cơ nghiệp, tài chính và danh tiếng. Bạn có tư duy điều hành sắc bén, quản lý tài sản lớn và khẳng định được uy quyền thực tế của mình."
    },
    9: {
        title: "Trưởng thành 9: Lý Tưởng Đại Đồng",
        desc: "Tâm thức của bạn mở rộng hướng về lý tưởng đại đồng. Bạn không còn sống cho riêng mình mà cống hiến phần lớn thời gian, tiền bạc cho các dự án nhân đạo, từ thiện hoặc nâng cao giáo dục cộng đồng."
    },
    11: {
        title: "Trưởng thành 11: Vua Thức Tỉnh Muộn — Thay Đổi Nhận Thức Tâm Linh",
        desc: "Năng lượng Vua thức tỉnh muộn. Bạn bị thúc đẩy gánh vác trọng trách mang tầm vĩ mô: Thay đổi nhận thức tâm linh của số đông."
    },
    22: {
        title: "Trưởng thành 22: Vua Thức Tỉnh Muộn — Xây Dựng Di Sản Khổng Lồ",
        desc: "Năng lượng Vua thức tỉnh muộn. Bạn bị thúc đẩy gánh vác trọng trách mang tầm vĩ mô: Xây dựng các tổ chức/hệ thống di sản khổng lồ."
    },
    33: {
        title: "Trưởng thành 33: Vua Thức Tỉnh Muộn — Biểu Tượng Chữa Lành Xã Hội",
        desc: "Năng lượng Vua thức tỉnh muộn. Bạn bị thúc đẩy gánh vác trọng trách mang tầm vĩ mô: Trở thành biểu tượng truyền cảm hứng chữa lành cho xã hội."
    }
};

// ============================================================
// MODULE 13: Ý nghĩa Chỉ số Tư duy Lý trí (Rational Thought)
// Cách thức bộ não phản tích thông tin và giải quyết khủng hoảng
// ============================================================
const RATIONAL_THOUGHT_INFO = {
    1: {
        title: "Tư duy lý trí 1: Quyết Đoán & Độc Lập",
        desc: "Giải quyết vấn đề bằng sự quyết đoán, tốc độ và độc lập. Khi gặp sự cố, họ lập tức tự mình tìm lối thoát riêng, không thích chờ đợi hay dựa dẫm vào ý kiến tập thể."
    },
    2: {
        title: "Tư duy lý trí 2: Trực Giác & Hòa Hợp",
        desc: "Phân tích vấn đề dựa trên góc nhìn trực giác và sự hòa hợp. Họ có xu hướng lắng nghe tất cả các bên, thương lượng, dĩ hòa vi quý và tìm giải pháp đôi bên cùng có lợi."
    },
    3: {
        title: "Tư duy lý trí 3: Sáng Tạo & Linh Hoạt Ngôn Từ",
        desc: "Tư duy bằng sự sáng tạo và linh hoạt của ngôn từ. Khi gặp ngõ cụt, họ thường nghĩ ra những giải pháp đột phá, độc lạ mà người khác không ngờ tới; giải quyết khủng hoảng bằng sự lạc quan."
    },
    4: {
        title: "Tư duy lý trí 4: Logic & Quy Trình",
        desc: "Bộ não phân tích cực kỳ logic, thực tế và có quy trình. Họ chỉ tin vào số liệu, bằng chứng thực tế và sẽ giải quyết vấn đề một cách an toàn, có trình tự rõ ràng, không mạo hiểm."
    },
    5: {
        title: "Tư duy lý trí 5: Ứng Biến Siêu Tốc",
        desc: "Ứng biến siêu tốc trong khủng hoảng. Bản chất linh hoạt giúp họ không bị hoảng loạn khi kế hoạch đổ vỡ; họ sẵn sàng lật ngược ván cờ và áp dụng ngay một phương án mới tinh chưa từng có tiền lệ."
    },
    6: {
        title: "Tư duy lý trí 6: An Toàn Con Người Trước Tiên",
        desc: "Khi suy nghĩ giải pháp, điều đầu tiên họ cân nhắc là sự an toàn và quyền lợi của con người (người thân, nhân viên, đồng đội). Họ giải quyết vấn đề bằng sự bao dung và tình cảm."
    },
    7: {
        title: "Tư duy lý trí 7: Đào Sâu Gốc Rễ",
        desc: "Đào sâu bản chất cho đến tận gốc rễ của vấn đề. Họ hoài nghi mọi thứ và sẽ không hành động cho đến khi tự mình nghiên cứu, tìm ra nguyên nhân cốt lõi tại sao sự việc lại xảy ra như vậy."
    },
    8: {
        title: "Tư duy lý trí 8: Định Hướng Kết Quả & Hiệu Suất",
        desc: "Tư duy định hướng kết quả và hiệu suất vật chất. Họ nhìn nhận khủng hoảng dưới góc độ thiệt hại tài chính và sẽ chọn giải pháp nào tối ưu hóa chi phí, mang lại giá trị thực tế cao nhất."
    },
    9: {
        title: "Tư duy lý trí 9: Vĩ Mô & Toàn Cảnh",
        desc: "Tư duy vĩ mô và nhìn toàn cảnh. Họ không giải quyết phần ngọn mà luôn hướng tới những giải pháp mang tính lâu dài, bền vững, có lợi cho số đông thay vì ích kỷ cá nhân."
    }
};

function getModuleEntry(map, num) {
    if (map[num]) return map[num];
    if (num > 9 && ![11, 22, 33].includes(num)) {
        return map[reduceNumber(num, false)] || null;
    }
    return null;
}

function getChallengeInfo(val) {
    return CHALLENGE_INFO[val] || null;
}

function getMaturityInfo(val) {
    return getModuleEntry(MATURITY_INFO, val);
}

function getRationalThoughtInfo(val) {
    return getModuleEntry(RATIONAL_THOUGHT_INFO, val);
}

// Accent remover
function stripAccents(str) {
    if (!str) return "";
    let normalized = str.toUpperCase();

    // Replace Đ first
    normalized = normalized.replace(/Đ/g, 'D');

    // Replace combining marks and special accents
    for (let accent in ACCENTS_MAP) {
        let regex = new RegExp(accent, 'g');
        normalized = normalized.replace(regex, ACCENTS_MAP[accent]);
    }

    // Fallback normalization
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Clean string (keep characters and spaces)
    return normalized.replace(/[^A-Z\s]/g, '').trim();
}

// Letter classification for word (vowel/consonant)
function classifyWordLetters(word) {
    let result = [];
    const wordLen = word.length;
    const baseVowels = ['A', 'E', 'I', 'O', 'U'];
    
    // Check if other vowels exist in the word (excluding Y)
    const hasOtherVowels = word.split('').some(c => baseVowels.includes(c));

    for (let i = 0; i < wordLen; i++) {
        const char = word[i];
        if (!PYTHAGOREAN_MAP[char]) continue;

        if (baseVowels.includes(char)) {
            result.push({ char: char, type: 'vowel' });
        } else if (char === 'Y') {
            // Case 1: Y is vowel when no other vowels (A, E, I, O, U) exist in the word (e.g. Ý, LY, MY, VY)
            let isYVowel = false;
            if (!hasOtherVowels) {
                isYVowel = true;
            } else {
                // Case 2: U and Y are adjacent AND there are no other vowels except U (e.g. THỦY -> U & Y adjacent, only U)
                const prevChar = i > 0 ? word[i-1] : '';
                const nextChar = i < wordLen - 1 ? word[i+1] : '';
                const adjacentToU = (prevChar === 'U' || nextChar === 'U');
                
                const hasVowelsOtherThanU = word.split('').some(c => ['A', 'E', 'I', 'O'].includes(c));
                
                if (adjacentToU && !hasVowelsOtherThanU) {
                    isYVowel = true;
                }
            }
            
            if (isYVowel) {
                result.push({ char: 'Y', type: 'vowel' });
            } else {
                result.push({ char: 'Y', type: 'consonant' });
            }
        } else {
            result.push({ char: char, type: 'consonant' });
        }
    }
    return result;
}


// Pythagorean reduction
function reduceNumber(num, keepMaster = true) {
    while (num > 9) {
        if (keepMaster && [11, 22, 33].includes(num)) {
            return num;
        }
        num = String(num).split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    return num;
}

// Checks for Karmic Debt in raw sums (13, 14, 16, 19)
const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];
const defIsKarmicDebt = (num) => KARMIC_DEBT_NUMBERS.includes(num);

// 2-Step reduction that intercepts intermediate Karmic Debt sums
// Returns { value, karmicDebt } where karmicDebt is the raw sum if it was 13/14/16/19
function reduceWithKarmicCheck(rawSum, keepMaster = true) {
    let debts = [];
    let current = rawSum;

    // Intercept at each reduction step
    while (current > 9 && !([11, 22, 33].includes(current) && keepMaster)) {
        if (KARMIC_DEBT_NUMBERS.includes(current)) {
            debts.push(current);
        }
        current = current.toString().split('').reduce((s, d) => s + parseInt(d), 0);
    }
    // Final check on the reduced number too
    if (KARMIC_DEBT_NUMBERS.includes(current)) {
        debts.push(current);
    }
    return { value: current, karmicDebts: [...new Set(debts)] };
}

// ============================================================
// Life Path Compatibility Table (correct from numerology data)
// ============================================================
const LIFE_PATH_COMPAT = {
    1: { happy: [1, 5, 7], challenge: [2, 4, 6] },
    2: { happy: [2, 4, 8], challenge: [1, 5, 7] },
    3: { happy: [3, 6, 9], challenge: [4, 7, 8] },
    4: { happy: [2, 4, 8], challenge: [1, 3, 5, 9] },
    5: { happy: [1, 5, 7], challenge: [2, 4, 6] },
    6: { happy: [3, 6, 9], challenge: [1, 5, 7] },
    7: { happy: [1, 5, 7], challenge: [2, 3, 6, 8] },
    8: { happy: [2, 4, 8], challenge: [3, 7, 9] },
    9: { happy: [3, 6, 9], challenge: [4, 8] },
    11: { happy: [2, 4, 8], challenge: [1, 5, 7] },
    22: { happy: [4, 2, 8], challenge: [1, 3, 9] },
    33: { happy: [3, 6, 9], challenge: [1, 5, 7] }
};


// Core Rule Engine Implementation in JS
const RuleEngine = {
    calculateLifePath(dobStr) {
        const parts = dobStr.split('-');
        if (parts.length !== 3) return { lifePath: 0, rawSum: 0, hasDebt: false, karmicDebts: [] };

        const yearVal = parts[0].split('').reduce((s, d) => s + parseInt(d), 0);
        const monthVal = parts[1].split('').reduce((s, d) => s + parseInt(d), 0);
        const dayVal = parts[2].split('').reduce((s, d) => s + parseInt(d), 0);

        // Reduce each component (keepMaster=false for inputs per spec)
        const redYear = reduceNumber(yearVal, false);
        const redMonth = reduceNumber(monthVal, false);
        const redDay = reduceNumber(dayVal, false);

        // STEP 1: Compute total of reduced components
        const total = redYear + redMonth + redDay;

        // STEP 2: Intercept karmic debt BEFORE final reduction
        const lpResult = reduceWithKarmicCheck(total, true);
        const lp1 = lpResult.value;
        const lpDebts = lpResult.karmicDebts;

        // Method 2 (Sum all digits of date) - for reference
        const cleanDob = dobStr.replace(/-/g, '');
        const allDigitsSum = cleanDob.split('').reduce((s, d) => s + parseInt(d), 0);
        const lp2 = reduceNumber(allDigitsSum, true);

        return {
            lifePath: lp1,
            lifePathMethod1: lp1,
            lifePathMethod2: lp2,
            rawSum: total,
            allDigitsSum: allDigitsSum,
            hasMaster: [11, 22, 33].includes(lp1) || [11, 22, 33].includes(lp2),
            hasDebt: lpDebts.length > 0,
            karmicDebts: lpDebts  // e.g. [13] means 13/4 karmic debt on Life Path
        };
    },

    calculateNameNumbers(fullName) {
        const normalized = stripAccents(fullName);
        const words = normalized.split(/\s+/);

        let expressionSum = 0;
        let soulSum = 0;
        let personalitySum = 0;

        words.forEach(word => {
            const classified = classifyWordLetters(word);
            classified.forEach(item => {
                const val = PYTHAGOREAN_MAP[item.char];
                expressionSum += val;
                if (item.type === 'vowel') {
                    soulSum += val;
                } else {
                    personalitySum += val;
                }
            });
        });

        // STEP 2: Intercept karmic debt at ALL intermediate sums during reduction
        // This catches e.g. sum=58 → 5+8=13 → detected as 13/4 karmic debt
        const exprResult = reduceWithKarmicCheck(expressionSum, true);
        const soulResult = reduceWithKarmicCheck(soulSum, true);
        const persResult = reduceWithKarmicCheck(personalitySum, true);

        const allDebts = [...new Set([
            ...exprResult.karmicDebts,
            ...soulResult.karmicDebts,
            ...persResult.karmicDebts
        ])];

        return {
            expression: exprResult.value,
            soulUrge: soulResult.value,
            personality: persResult.value,
            expressionRaw: expressionSum,
            soulRaw: soulSum,
            personalityRaw: personalitySum,
            hasDebt: allDebts.length > 0,
            karmicDebts: allDebts,           // e.g. [13, 16] — which debts triggered
            exprKarmicDebts: exprResult.karmicDebts,
            soulKarmicDebts: soulResult.karmicDebts
        };
    },

    calculateAttitude(dobStr) {
        // CORRECT: Sum each digit individually (VD: 17/6 = 1+7+6 = 14 → 5)
        const parts = dobStr.split('-');
        const monthDigitsSum = parts[1].split('').reduce((s, d) => s + parseInt(d), 0);
        const dayDigitsSum = parts[2].split('').reduce((s, d) => s + parseInt(d), 0);
        return reduceNumber(monthDigitsSum + dayDigitsSum, false);
    },

    calculateRationalThought(dobStr, expression) {
        // RationalThought = Reduce(rawDay + Expression) — always fully reduce to 1-9
        const parts = dobStr.split('-');
        const rawDay = parseInt(parts[2], 10);
        if (isNaN(rawDay)) return 0;
        return reduceNumber(rawDay + (expression || 0), false);
    },

    calculateDayOfBirth(dobStr) {
        const parts = dobStr.split('-');
        const rawDay = parseInt(parts[2], 10);

        // POSITION 1: Intercept karmic debt directly on raw day (13,14,16,19)
        const dayKarmic = KARMIC_DEBT_NUMBERS.includes(rawDay) ? [rawDay] : [];

        // Sum digits of day (e.g. day=17 → 1+7=8), keep master 11,22
        const dayDigitsSum = parts[2].split('').reduce((s, d) => s + parseInt(d), 0);
        const reduced = reduceNumber(dayDigitsSum, true);

        return {
            birthday: reduced,
            rawDay: rawDay,
            karmicDebts: dayKarmic  // e.g. [13] if born on 13th
        };
    },

    calculatePersonalMetrics(dobStr) {
        const parts = dobStr.split('-');
        const monthVal = parseInt(parts[1]);
        const dayVal = parseInt(parts[2]);

        // Use real current date instead of hardcoded values
        const today = new Date();
        const targetYear = today.getFullYear();
        const targetMonth = today.getMonth() + 1;
        const targetDay = today.getDate();

        // Personal Year
        const targetYearSum = String(targetYear).split('').reduce((s, d) => s + parseInt(d), 0);
        const py = reduceNumber(monthVal + dayVal + targetYearSum, false);

        // Personal Month
        const pm = reduceNumber(py + targetMonth, false);

        // Personal Day
        const pd = reduceNumber(pm + targetDay, false);

        return {
            personalYear: py,
            personalMonth: pm,
            personalDay: pd,
            targetYear, targetMonth, targetDay
        };
    },

    calculateBirthGrid(dobStr, fullName) {
        const cleanDob = dobStr.replace(/-/g, '');
        const dobDigits = cleanDob.split('').map(Number).filter(d => d !== 0);

        const normalized = stripAccents(fullName);
        const nameDigits = normalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);

        const dobGrid = Array(10).fill(0);
        const totalGrid = Array(10).fill(0);

        dobDigits.forEach(d => {
            dobGrid[d]++;
            totalGrid[d]++;
        });

        nameDigits.forEach(d => {
            totalGrid[d]++;
        });

        // Arrows list
        const activeArrows = [];
        const emptyArrows = [];

        const lines = {
            "1-2-3": [1, 2, 3],
            "4-5-6": [4, 5, 6],
            "7-8-9": [7, 8, 9],
            "1-4-7": [1, 4, 7],
            "2-5-8": [2, 5, 8],
            "3-6-9": [3, 6, 9],
            "1-5-9": [1, 5, 9],
            "3-5-7": [3, 5, 7]
        };

        const activeArrowInfo = {
            "1-2-3": { name: "Mũi Tên Kế Hoạch", desc: "Tổ chức tốt, có trình tự, tư duy logic. Thách thức: Thường chỉ giỏi lập kế hoạch, dễ bị trì trệ ở khâu hành động thực tế." },
            "4-5-6": { name: "Mũi Tên Ý Chí", desc: "Kiên cường, gan dạ, có khả năng vượt qua nghịch cảnh rất cao. Thách thức: Đôi khi quá liều lĩnh hoặc tự tin thái quá vào bản thân." },
            "7-8-9": { name: "Mũi Tên Hoạt Động", desc: "Đã làm là làm đến cùng, không bao giờ bỏ cuộc. Thách thức: Dễ trở thành bảo thủ, cố chấp (cố đấm ăn xôi)." },
            "1-4-7": { name: "Mũi Tên Thể Chất", desc: "Thực tế, giỏi xoay sở, thích tự mình trải nghiệm qua hành động. Thách thức: Khá bướng bỉnh, khó tin lời người khác nếu chưa tự mình nếm trải." },
            "2-5-8": { name: "Mũi Tên Tinh Thần", desc: "Trực giác mạnh mẽ, cân bằng cảm xúc tốt, có sức hút tự nhiên. Thách thức: Dễ bị cảm xúc chi phối nếu không có mục tiêu thực tế." },
            "3-6-9": { name: "Mũi Tên Trí Tuệ", desc: "Tư duy nhạy bén, trí nhớ tốt, lý tưởng sống lớn. Thách thức: Dễ bị căng thẳng thần kinh, suy nghĩ quá nhiều (overthinking)." },
            "1-5-9": { name: "Mũi Tên Tâm Linh", desc: "Có đức tin tự nhiên sâu sắc, trực giác tâm linh mạnh mẽ." },
            "3-5-7": { name: "Mũi Tên Nhạy Bén", desc: "Tiếp thu bài học cuộc sống cực nhanh, có duyên với các bộ môn huyền học, tâm lý." }
        };

        const emptyArrowInfo = {
            "3-6-9": { name: "Mũi Tên Trí Nhớ Ngắn Hạn", desc: "Khó tập trung dài hạn, dễ quên các chi tiết nhỏ. Giải pháp: Nhắc nhở người dùng ghi chép công việc ra giấy hoặc sử dụng ứng dụng quản lý." },
            "2-5-8": { name: "Mũi Tên Nhạy Cảm / Tổn Thương", desc: "Dễ cảm thấy bị cô lập, tủi thân, hay tự tạo vỏ bọc phòng thủ. Giải pháp: Học cách kiểm soát kỳ vọng vào người khác." },
            "1-4-7": { name: "Mũi Tên Thụ Động", desc: "Hay do dự, thiếu thực tế, biết cơ hội đến nhưng chậm bắt lấy. Giải pháp: Tập hành động ngay trong 5 giây đầu tiên." },
            "7-8-9": { name: "Mũi Tên Thất Vọng", desc: "Hay đặt kỳ vọng quá cao vào người khác để rồi tự chuốc lấy thất vọng. Giải pháp: Học cách chấp nhận sự không hoàn hảo." }
        };

        for (let key in lines) {
            let cells = lines[key];
            let hasAll = cells.every(c => dobGrid[c] > 0);
            let hasNone = cells.every(c => dobGrid[c] === 0);
            if (hasAll) {
                const info = activeArrowInfo[key];
                if (info) activeArrows.push({ code: key, name: info.name, desc: info.desc });
            } else if (hasNone) {
                const info = emptyArrowInfo[key];
                if (info) emptyArrows.push({ code: key, name: info.name, desc: info.desc, isEmpty: true });
            }
        }

        // Separate name grid for visualization
        const nameGrid = Array(10).fill(0);
        nameDigits.forEach(d => { nameGrid[d]++; });

        return {
            dobGrid: dobGrid,
            nameGrid: nameGrid,
            totalGrid: totalGrid,
            activeArrows: activeArrows,
            emptyArrows: emptyArrows
        };
    },

    calculateBodyMindSoul(dobStr, fullName) {
        const cleanDob = dobStr.replace(/-/g, '');
        const dobDigits = cleanDob.split('').map(Number).filter(d => d !== 0);

        const normalized = stripAccents(fullName);
        const nameDigits = normalized.replace(/\s+/g, '').split('').map(c => PYTHAGOREAN_MAP[c]).filter(Boolean);

        const allDigits = dobDigits.concat(nameDigits);
        const total = allDigits.length;
        if (total === 0) return { body: 33.3, soul: 33.3, mind: 33.3 };

        const bodyCount = allDigits.filter(d => [1, 4, 7].includes(d)).length;
        const soulCount = allDigits.filter(d => [2, 5, 8].includes(d)).length;
        const mindCount = allDigits.filter(d => [3, 6, 9].includes(d)).length;

        return {
            body: Math.round((bodyCount / total) * 100 * 10) / 10,
            soul: Math.round((soulCount / total) * 100 * 10) / 10,
            mind: Math.round((mindCount / total) * 100 * 10) / 10
        };
    },

    calculateNameDetails(fullName) {
        const normalized = stripAccents(fullName);
        const words = normalized.split(/\s+/);
        if (words.length === 0 || words[0] === "") {
            return { cornerstone: '', capstone: '', firstVowel: '', balance: 0, hiddenPassion: [], karmicLessons: [] };
        }

        const firstName = words[words.length - 1];
        const cornerstone = firstName[0] || '';
        const capstone = firstName[firstName.length - 1] || '';

        const classifiedFirst = classifyWordLetters(firstName);
        let firstVowel = '';
        for (let i = 0; i < classifiedFirst.length; i++) {
            if (classifiedFirst[i].type === 'vowel') {
                firstVowel = classifiedFirst[i].char;
                break;
            }
        }

        // Balance Number
        let initialsSum = 0;
        words.forEach(w => {
            if (w[0] && PYTHAGOREAN_MAP[w[0]]) {
                initialsSum += PYTHAGOREAN_MAP[w[0]];
            }
        });
        const balance = reduceNumber(initialsSum, false);

        // Hidden passion & karmic lessons
        const counts = Array(10).fill(0);
        words.forEach(w => {
            w.split('').forEach(char => {
                if (PYTHAGOREAN_MAP[char]) {
                    counts[PYTHAGOREAN_MAP[char]]++;
                }
            });
        });

        const maxFreq = Math.max(...counts.slice(1));
        const hiddenPassion = [];
        const karmicLessons = [];

        for (let i = 1; i <= 9; i++) {
            if (counts[i] === maxFreq && counts[i] > 0) {
                hiddenPassion.push(i);
            }
            if (counts[i] === 0) {
                karmicLessons.push(i);
            }
        }

        return {
            cornerstone,
            capstone,
            firstVowel,
            balance,
            hiddenPassion,
            karmicLessons
        };
    },

    calculateCyclesPinnacles(dobStr, lp) {
        const parts = dobStr.split('-');
        const monthVal = reduceNumber(parseInt(parts[1]), false);
        const dayVal = reduceNumber(parseInt(parts[2]), false);
        const yearSum = parts[0].split('').reduce((s, d) => s + parseInt(d), 0);
        const yearVal = reduceNumber(yearSum, false);

        const p1 = reduceNumber(monthVal + dayVal, true);
        const p2 = reduceNumber(dayVal + yearVal, true);
        const p3 = reduceNumber(p1 + p2, true);
        const p4 = reduceNumber(monthVal + yearVal, true);

        const lpReduced = reduceNumber(lp, false);
        const age1 = 36 - lpReduced;
        const age2 = age1 + 9;
        const age3 = age2 + 9;

        const c1 = Math.abs(monthVal - dayVal);
        const c2 = Math.abs(dayVal - yearVal);
        const c3 = Math.abs(c1 - c2);
        const c4 = Math.abs(monthVal - yearVal);

        return {
            cycles: { first: monthVal, second: dayVal, third: yearVal },
            pinnacles: [
                { num: 1, val: p1, age: age1 },
                { num: 2, val: p2, age: age2 },
                { num: 3, val: p3, age: age3 },
                { num: 4, val: p4, age: age3 + "+" }
            ],
            challenges: [
                { num: 1, val: c1 },
                { num: 2, val: c2 },
                { num: 3, val: c3 },
                { num: 4, val: c4 }
            ]
        };
    },
    calculateMaturityNumber(lifePath, expression) {
        return reduceNumber(lifePath + expression, true);
    }
};

// Knowledge base: Number meanings and traits
const NUMBER_MEANINGS = {
    1:  { vi: 'Khởi đầu & Lãnh đạo',       en: 'Leadership',       traits: ['Độc lập', 'Tiên phong', 'Quyết đoán'],    color: '#f87171' },
    2:  { vi: 'Hợp tác & Cân bằng',         en: 'Cooperation',      traits: ['Ngoại giao', 'Nhạy cảm', 'Kiên nhẫn'],    color: '#fb923c' },
    3:  { vi: 'Sáng tạo & Biểu đạt',        en: 'Creativity',       traits: ['Lạc quan', 'Giao tiếp', 'Nghệ thuật'],    color: '#fbbf24' },
    4:  { vi: 'Kỷ luật & Xây dựng',         en: 'Stability',        traits: ['Thực tế', 'Chăm chỉ', 'Đáng tin'],       color: '#34d399' },
    5:  { vi: 'Tự do & Phiêu lưu',          en: 'Freedom',          traits: ['Năng động', 'Linh hoạt', 'Tò mò'],        color: '#22d3ee' },
    6:  { vi: 'Trách nhiệm & Yêu thương',   en: 'Nurturing',        traits: ['Quan tâm', 'Hài hòa', 'Gia đình'],        color: '#60a5fa' },
    7:  { vi: 'Tri thức & Tâm linh',        en: 'Introspection',    traits: ['Phân tích', 'Trực giác', 'Sâu sắc'],      color: '#a78bfa' },
    8:  { vi: 'Quyền lực & Thịnh vượng',    en: 'Ambition',         traits: ['Tham vọng', 'Kinh doanh', 'Hiệu quả'],    color: '#f472b6' },
    9:  { vi: 'Nhân đạo & Hoàn thiện',      en: 'Humanitarianism',  traits: ['Rộng lượng', 'Tha thứ', 'Lý tưởng'],     color: '#94a3b8' },
    11: { vi: 'Master: Trực giác Cao',      en: 'Master Intuition', traits: ['Nhạy cảm', 'Truyền cảm hứng', 'Tâm linh'], color: '#c084fc' },
    22: { vi: 'Master: Kiến trúc sư Vĩ đại',en: 'Master Builder',   traits: ['Thực hiện giấc mơ', 'Lãnh đạo', 'Di sản'], color: '#f59e0b' },
    33: { vi: 'Master: Thầy Tâm linh',      en: 'Master Teacher',   traits: ['Chữa lành', 'Hướng dẫn', 'Tình yêu lớn'], color: '#10b981' },
};
let activeChildData = null;

// Tab Routing
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const tabName = this.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const targetTab = document.getElementById('tab-' + tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Trigger specific layouts on render
        if (activeChildData) {
            if (tabName === 'identity') {
                renderIdentityTabCharts();
            } else if (tabName === 'timeline') {
                renderPinnaclePyramid();
                renderLifeTimelineCheckpoint();
            } else if (tabName === 'compatibility') {
                renderFamilyNetworkGraph();
            }
        }
    });
});

// Theme Toggle + UI Motion Engine
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    const htmlEl = document.documentElement;
    const isDark = theme === 'dark';
    htmlEl.classList.toggle('dark', isDark);
    htmlEl.classList.toggle('light', !isDark);
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}

function restoreThemePreference() {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('tsh-theme');
    } catch (err) {
        savedTheme = null;
    }
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
}

function primePremiumMotion() {
    document.querySelectorAll('.glass-card, .bento-card, .naming-card').forEach((el, index) => {
        el.style.setProperty('--stagger', `${Math.min(index * 45, 380)}ms`);
    });
    document.body.classList.add('design-ready');
}

function animateNumericValue(el, targetValue, duration = 650) {
    if (!el || Number.isNaN(targetValue)) return;
    const start = performance.now();
    const startValue = 0;

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(startValue + (targetValue - startValue) * eased);
        el.innerText = value;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function animateDashboardCounters() {
    const ids = [
        'val-life-path', 'val-expression', 'val-soul-urge', 'val-personality',
        'val-day-of-birth', 'val-attitude', 'val-personal-year',
        'val-personal-month', 'val-personal-day'
    ];
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const target = parseInt(el.innerText, 10);
        if (Number.isNaN(target)) return;
        animateNumericValue(el, target);
    });
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
        localStorage.setItem('tsh-theme', nextTheme);
    } catch (err) {
        // Ignore storage limitations in restricted environments.
    }

    // Refresh visual items
    if (activeChildData) {
        renderIdentityTabCharts();
        renderPinnaclePyramid();
        renderFamilyNetworkGraph();
        renderCoreWheelChart();
    }
});

// Core Calculate Action
function calculateNumerology() {
    const lastName = document.getElementById('lastName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const homeName = document.getElementById('homeName').value.trim();

    const fatherName = document.getElementById('fatherName').value.trim();
    const fatherDob = document.getElementById('fatherDob').value;
    const motherName = document.getElementById('motherName').value.trim();
    const motherDob = document.getElementById('motherDob').value;

    if (!lastName || !dob) {
        alert("Vui lòng nhập họ và ngày sinh của bé!");
        return;
    }

    const fullName = `${lastName} ${middleName} ${firstName}`.replace(/\s+/g, ' ').trim();

    // Core engine values
    const lpObj = RuleEngine.calculateLifePath(dob);
    const nameNumbers = RuleEngine.calculateNameNumbers(fullName);
    const attitude = RuleEngine.calculateAttitude(dob);
    const dobObj = RuleEngine.calculateDayOfBirth(dob);   // now returns { birthday, rawDay, karmicDebts }
    const personal = RuleEngine.calculatePersonalMetrics(dob);
    const maturity = RuleEngine.calculateMaturityNumber(lpObj.lifePath, nameNumbers.expression);
    const rationalThought = RuleEngine.calculateRationalThought(dob, firstName ? nameNumbers.expression : 0);

    const gridData = RuleEngine.calculateBirthGrid(dob, fullName);
    const bmsRatio = RuleEngine.calculateBodyMindSoul(dob, fullName);
    const nameDetails = RuleEngine.calculateNameDetails(fullName);
    const timeline = RuleEngine.calculateCyclesPinnacles(dob, lpObj.lifePath);

    // Merge all 4 positions of Karmic Debt detection into one unified list
    const allKarmicDebts = [...new Set([
        ...(lpObj.karmicDebts || []),           // Position 2: Life Path
        ...(dobObj.karmicDebts || []),           // Position 1: Birthday Number
        ...(firstName ? (nameNumbers.exprKarmicDebts || []) : []),  // Position 3: Expression
        ...(firstName ? (nameNumbers.soulKarmicDebts || []) : [])   // Position 4: Soul Urge
    ])];

    activeChildData = {
        firstName, middleName, lastName, dob, gender, homeName, fullName,
        lp: lpObj.lifePath, lpRaw: lpObj.rawSum,
        lpHasMaster: lpObj.hasMaster,
        lpHasDebt: lpObj.hasDebt,
        lpKarmicDebts: lpObj.karmicDebts || [],       // e.g. [13] = LP is 13/4
        expression: firstName ? nameNumbers.expression : 0,
        expressionRaw: firstName ? nameNumbers.expressionRaw : 0,
        soulUrge: firstName ? nameNumbers.soulUrge : 0,
        soulRaw: firstName ? nameNumbers.soulRaw : 0,
        personality: firstName ? nameNumbers.personality : 0,
        personalityRaw: firstName ? nameNumbers.personalityRaw : 0,
        nameKarmicDebts: firstName ? (nameNumbers.karmicDebts || []) : [],
        attitude,
        birthday: dobObj.birthday,               // numeric value (was dobNum)
        birthdayRaw: dobObj.rawDay,
        birthdayKarmicDebts: dobObj.karmicDebts || [],  // e.g. [14] if born on 14th
        allKarmicDebts,                          // unified list for report display
        maturity: firstName ? maturity : 0,
        rationalThought,
        personalYear: personal.personalYear,
        personalMonth: personal.personalMonth,
        personalDay: personal.personalDay,
        gridData,
        bmsRatio,
        nameDetails,
        timeline,
        parents: {
            fatherName, fatherDob, motherName, motherDob
        }
    };


    // Render Dashboard (TAB 0)
    updateDashboardUI();
    renderCoreWheelChart();

    // Check compatibility available and draw TAB 3
    updateCompatibilityUI();

    // Auto populate suggestion header values
    const namingFamilyEl = document.getElementById('naming-family-name');
    if (namingFamilyEl) namingFamilyEl.innerText = lastName;
    const compareFamilyEl = document.getElementById('compare-family-name');
    if (compareFamilyEl) compareFamilyEl.innerText = lastName;

    // Show/hide blank name warning panel on grid
    const blankWarningPanel = document.getElementById('blank-name-warning-panel');
    if (blankWarningPanel) {
        blankWarningPanel.style.display = firstName ? 'none' : 'block';
    }

    // Auto-generate home names based on empty digits
    updateHomeNamesUI(nameDetails ? nameDetails.karmicLessons : []);
    renderHomeNameEnergy();
    updateCompareQuickInsight();

    
    // Generate AI Report
    generateAIReport();

    // If firstName is empty, automatically compute AI suggested names based on missing numbers
    if (!firstName) {
        setTimeout(() => {
            // Auto switch to Naming tab or generate suggestions there
            generateAINames();
        }, 100);
    }

    // Switch to active tab view
    document.querySelector('[data-tab="dashboard"]').click();
}

function applySuggestedName(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        document.getElementById('firstName').value = parts[0];
        document.getElementById('middleName').value = '';
    } else {
        document.getElementById('firstName').value = parts[parts.length - 1];
        document.getElementById('middleName').value = parts.slice(0, parts.length - 1).join(' ');
    }
    // Recalculate
    calculateNumerology();
}

// Update Dashboard View UI
function updateDashboardUI() {
    const data = activeChildData;

    document.getElementById('val-life-path').innerText = data.lp;
    document.getElementById('val-expression').innerText = data.expression;
    document.getElementById('val-soul-urge').innerText = data.soulUrge;
    document.getElementById('val-personality').innerText = data.personality;
    document.getElementById('val-day-of-birth').innerText = data.birthday;
    document.getElementById('val-attitude').innerText = data.attitude;
    document.getElementById('val-personal-year').innerText = data.personalYear;
    document.getElementById('val-personal-month').innerText = data.personalMonth;
    document.getElementById('val-personal-day').innerText = data.personalDay;

    // Progress values (capped at 9/10/33/22)
    const lpVal = reduceNumber(data.lp, false);
    document.getElementById('val-life-path-bar').style.width = (lpVal / 9) * 100 + '%';
    document.getElementById('val-expression-bar').style.width = (reduceNumber(data.expression, false) / 9) * 100 + '%';
    document.getElementById('val-soul-urge-bar').style.width = (reduceNumber(data.soulUrge, false) / 9) * 100 + '%';
    document.getElementById('val-personality-bar').style.width = (reduceNumber(data.personality, false) / 9) * 100 + '%';
    document.getElementById('val-day-of-birth-bar').style.width = (reduceNumber(data.birthday, false) / 9) * 100 + '%';
    document.getElementById('val-attitude-bar').style.width = (data.attitude / 9) * 100 + '%';
    document.getElementById('val-personal-year-bar').style.width = (data.personalYear / 9) * 100 + '%';

    // Descriptions text mappings
    const lpDetails = getLifePathMetadata(data.lp);
    document.getElementById('val-life-path-title').innerText = `Đường Đời ${data.lp}: ${lpDetails.title}`;
    document.getElementById('val-life-path-desc').innerText = lpDetails.desc;

    document.getElementById('val-expression-title').innerText = getExpressionTitle(data.expression);
    document.getElementById('val-soul-urge-title').innerText = getSoulUrgeTitle(data.soulUrge);
    document.getElementById('val-personality-title').innerText = getPersonalityTitle(data.personality);
    document.getElementById('val-day-of-birth-title').innerText = getBirthdayTitle(data.birthday);
    document.getElementById('val-attitude-title').innerText = getAttitudeTitle(data.attitude);

    document.getElementById('val-personal-month-desc').innerText = getPersonalMonthDesc(data.personalMonth);
    document.getElementById('val-personal-day-desc').innerText = getPersonalDayDesc(data.personalDay);

    // Subtle count-up motion reinforces score hierarchy without being distracting.
    animateDashboardCounters();

    // New: Karmic Debt Warnings
    updateKarmicDebtDisplay();
    // New: Life Path Compatibility
    updateCompatibilityLPDisplay();
}

// Show Karmic Debt warnings — uses pre-calculated allKarmicDebts from activeChildData
function updateKarmicDebtDisplay() {
    const c = activeChildData;
    const container = document.getElementById('karmic-debt-display');
    if (!container) return;

    // Use the unified list already calculated in calculateNumerology()
    const allDebts = c.allKarmicDebts || [];

    // Also build position labels for each debt
    function getDebtPositions(debtNum) {
        const positions = [];
        if ((c.birthdayKarmicDebts || []).includes(debtNum)) positions.push('Ngày Sinh');
        if ((c.lpKarmicDebts || []).includes(debtNum))       positions.push('Đường Đời');
        if ((c.nameKarmicDebts || []).includes(debtNum))     positions.push('Sứ Mệnh / Linh Hồn');
        return positions.length ? positions.join(' · ') : 'Đã phát hiện';
    }

    if (allDebts.length === 0) {
        container.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.2rem;"></i>
                <p class="text-sm">Không tìm thấy Nợ Nghiệp trong hồ sơ này. Năng lượng được xem là khởi đầu trong sáng.</p>
            </div>`;
    } else {
        container.innerHTML = allDebts.map(debtNum => {
            const d = KARMIC_DEBT_INFO[debtNum];
            if (!d) return '';
            const positions = getDebtPositions(debtNum);
            return `
            <div class="karmic-debt-card">
                <span class="karmic-debt-icon">⚠️</span>
                <div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
                        <strong>${d.title}</strong>
                        <span style="font-size:0.7rem; background:rgba(249,115,22,0.15); color:#f97316; padding:2px 7px; border-radius:10px;">📍 ${positions}</span>
                    </div>
                    <p class="text-sm" style="margin-top:4px;">${d.desc}</p>
                    <p class="lesson-text">📖 Bài học: ${d.lesson}</p>
                </div>
            </div>`;
        }).join('');
    }
}


// Show Life Path Compatibility Grid
function updateCompatibilityLPDisplay() {
    const lp = activeChildData.lp;
    const container = document.getElementById('compat-lp-display');
    if (!container) return;

    const compat = LIFE_PATH_COMPAT[lp] || LIFE_PATH_COMPAT[reduceNumber(lp, false)];
    if (!compat) {
        container.innerHTML = `<p class="text-sm" style="color: var(--text-muted);">Không tìm thấy dữ liệu tương hợp.</p>`;
        return;
    }

    const allNums = [1,2,3,4,5,6,7,8,9];
    container.innerHTML = `
        <p class="text-sm" style="margin-bottom: 12px; color: var(--text-muted);">
            Đường đời <strong style="color: var(--primary)">${lp}</strong> — 
            <span style="color: #10b981;">🟢 Hạnh phúc: ${compat.happy.join(', ')}</span> | 
            <span style="color: #ef4444;">🔴 Thách thức: ${compat.challenge.join(', ')}</span>
        </p>
        <div class="compat-lp-table">
            ${allNums.map(n => {
                const isHappy = compat.happy.includes(n);
                const isChallenge = compat.challenge.includes(n);
                const cardClass = isHappy ? 'is-happy' : isChallenge ? 'is-challenge' : '';
                const icon = isHappy ? '💚' : isChallenge ? '⚠️' : '⬜';
                const label = isHappy ? 'Tương hợp' : isChallenge ? 'Thách thức' : 'Trung lập';
                return `
                    <div class="compat-lp-card ${cardClass}">
                        <span class="lp-num">${icon} ${n}</span>
                        <span>${label}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function updateIdentityInsights() {
    if (!activeChildData) return;

    const grid = activeChildData.gridData.totalGrid || [];
    const missingNums = [];
    const strongNums = [];
    for (let i = 1; i <= 9; i++) {
        const count = grid[i] || 0;
        if (count === 0) missingNums.push(i);
        if (count >= 2) strongNums.push(`${i}x${count}`);
    }

    const bms = activeChildData.bmsRatio || { body: 33, soul: 33, mind: 34 };
    const spread = Math.max(bms.body, bms.soul, bms.mind) - Math.min(bms.body, bms.soul, bms.mind);
    let balanceLabel = 'Lệch rõ ràng';
    if (spread <= 12) balanceLabel = 'Cân bằng cao';
    else if (spread <= 22) balanceLabel = 'Khá cân bằng';

    const strongArrow = activeChildData.gridData.activeArrows[0]?.name || 'Chưa có mũi tên mạnh';

    const missingEl = document.getElementById('identity-missing-main');
    const arrowEl = document.getElementById('identity-arrow-main');
    const balanceEl = document.getElementById('identity-balance-main');

    if (missingEl) {
        missingEl.innerText = missingNums.length ? `Thiếu: ${missingNums.join(', ')}` : 'Đầy đủ 1-9';
    }
    if (arrowEl) {
        arrowEl.innerText = strongArrow;
    }
    if (balanceEl) {
        balanceEl.innerText = `${balanceLabel} (${100 - Math.min(40, spread * 2)}%)`;
    }

    if (!missingNums.length && !activeChildData.gridData.activeArrows.length && strongNums.length && arrowEl) {
        arrowEl.innerText = `Cụm số mạnh: ${strongNums.slice(0, 2).join(' | ')}`;
    }
}

function updateTimelineInsights() {
    if (!activeChildData || !activeChildData.timeline) return;
    const pin = activeChildData.timeline.pinnacles;
    const chal = activeChildData.timeline.challenges;
    if (!pin || !chal || !pin.length || !chal.length) return;

    const hardest = [...chal]
        .map((item, idx) => ({ ...item, idx: idx + 1 }))
        .sort((a, b) => b.val - a.val)[0];

    const focusEl = document.getElementById('timeline-focus-main');
    const ageEl = document.getElementById('timeline-age-main');
    const challengeEl = document.getElementById('timeline-challenge-main');

    if (focusEl) focusEl.innerText = `Đỉnh 1: Số ${pin[0].val}`;
    if (ageEl) ageEl.innerText = `${pin[0].age} | ${pin[1].age} | ${pin[2].age}`;
    if (challengeEl) {
        const info = getChallengeInfo(hardest.val);
        challengeEl.innerText = info
            ? `${info.title.split(':')[0]} (giai đoạn ${hardest.idx})`
            : `Thử thách ${hardest.val} (giai đoạn ${hardest.idx})`;
    }
}

function updateCompatibilityQuickInsight(score, harmonyCount, riskCount) {
    const scoreEl = document.getElementById('compat-quick-score');
    const positiveEl = document.getElementById('compat-quick-positive');
    const riskEl = document.getElementById('compat-quick-risk');

    if (typeof score !== 'number') {
        if (scoreEl) scoreEl.innerText = 'Cần bổ sung dữ liệu';
        if (positiveEl) positiveEl.innerText = 'Chưa đánh giá';
        if (riskEl) riskEl.innerText = 'Chưa đánh giá';
        return;
    }

    if (scoreEl) scoreEl.innerText = `${score}/100`;
    if (positiveEl) positiveEl.innerText = `${harmonyCount} điểm hợp`;
    if (riskEl) riskEl.innerText = `${riskCount} điểm cần lưu ý`;
}

function updateCompareQuickInsight(results) {
    const gapEl = document.getElementById('compare-gap-main');
    const fillEl = document.getElementById('compare-fill-main');
    const confidenceEl = document.getElementById('compare-confidence-main');

    if (!results || results.length < 2) {
        if (gapEl) gapEl.innerText = 'Cần tối thiểu 2 tên';
        if (fillEl) fillEl.innerText = 'Chưa có dữ liệu';
        if (confidenceEl) confidenceEl.innerText = 'Chưa có dữ liệu';
        return;
    }

    const sortedByScore = [...results].sort((a, b) => b.score - a.score);
    const sortedByFill = [...results].sort((a, b) => b.filled - a.filled);
    const gap = sortedByScore[0].score - sortedByScore[1].score;

    let confidence = 'Cần cân nhắc thêm';
    if (gap >= 8) confidence = 'Rất rõ ràng';
    else if (gap >= 4) confidence = 'Khá rõ ràng';

    if (gapEl) gapEl.innerText = `${gap} điểm`;
    if (fillEl) fillEl.innerText = `${sortedByFill[0].name} (bù ${sortedByFill[0].filled})`;
    if (confidenceEl) confidenceEl.innerText = confidence;
}

// 1. Draw corporate-style Wheel Chart (Core Rings)
function renderCoreWheelChart() {
    const svg = document.getElementById('coreWheelChart');
    if (!svg) return;
    svg.innerHTML = '';

    const lpVal = activeChildData.lp || 0;
    const expVal = activeChildData.expression || 0;
    const soulVal = activeChildData.soulUrge || 0;
    const perVal = activeChildData.personality || 0;

    const lpLabel = document.getElementById('wheel-val-lp');
    const expLabel = document.getElementById('wheel-val-exp');
    const soulLabel = document.getElementById('wheel-val-soul');
    const perLabel = document.getElementById('wheel-val-per');

    if (lpLabel) lpLabel.innerText = lpVal || '-';
    if (expLabel) expLabel.innerText = expVal || '-';
    if (soulLabel) soulLabel.innerText = soulVal || '-';
    if (perLabel) perLabel.innerText = perVal || '-';

    const getRatio = (val) => {
        if (!val) return 0;
        if ([11, 22, 33].includes(val)) return 1.0;
        return Math.min(1.0, val / 9);
    };

    const cx = 50;
    const cy = 50;
    const rings = [
        { r: 40, val: lpVal, ratio: getRatio(lpVal), color: "var(--color-lp)" },
        { r: 32, val: expVal, ratio: getRatio(expVal), color: "var(--color-exp)" },
        { r: 24, val: soulVal, ratio: getRatio(soulVal), color: "var(--color-soul)" },
        { r: 16, val: perVal, ratio: getRatio(perVal), color: "var(--color-per)" }
    ];

    rings.forEach((ring, idx) => {
        // Draw background track
        const bgTrack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        bgTrack.setAttribute("cx", cx);
        bgTrack.setAttribute("cy", cy);
        bgTrack.setAttribute("r", ring.r);
        bgTrack.setAttribute("class", "core-wheel-bg");
        svg.appendChild(bgTrack);

        if (ring.val > 0) {
            // Draw progress circle
            const circ = 2 * Math.PI * ring.r;
            const progress = ring.ratio * circ;

            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pathEl.setAttribute("cx", cx);
            pathEl.setAttribute("cy", cy);
            pathEl.setAttribute("r", ring.r);
            pathEl.setAttribute("class", "core-wheel-ring");
            pathEl.setAttribute("stroke", ring.color);
            pathEl.setAttribute("stroke-width", "4.5");
            
            // Initial state for animation
            pathEl.setAttribute("stroke-dasharray", `${circ} ${circ}`);
            pathEl.setAttribute("stroke-dashoffset", circ);
            pathEl.setAttribute("transform", "rotate(-90 50 50)");
            svg.appendChild(pathEl);

            // Trigger animation
            setTimeout(() => {
                pathEl.setAttribute("stroke-dashoffset", circ - progress);
            }, 100 + (idx * 150));
        }
    });

    // Draw text in center
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", cx);
    textEl.setAttribute("y", cy + 3);
    textEl.setAttribute("class", "wheel-center-text");
    const nameText = activeChildData.firstName ? activeChildData.firstName.substring(0, 3).toUpperCase() : "BÉ";
    textEl.textContent = nameText;
    svg.appendChild(textEl);
}

// 2. Render Identity tab visuals: Pie, Heatmap, Bar, Golden Triangle, Grid Overlay
function renderIdentityTabCharts() {
    const data = activeChildData;

    // A. Thân Tâm Trí Sliders (Horizontal Bars)
    const tttContainer = document.getElementById('tttSliders');
    tttContainer.innerHTML = '';
    const bms = data.bmsRatio;
    const slides = [
        { label: "Trí — Logic & Ý tưởng",       icon: "🧠", percent: bms.mind, themeClass: "ttt-theme-tri" },
        { label: "Tâm — Cảm xúc & Trực giác",  icon: "💚", percent: bms.soul, themeClass: "ttt-theme-tam" },
        { label: "Thân — Thể chất & Kỹ năng", icon: "💪", percent: bms.body, themeClass: "ttt-theme-than" }
    ];

    slides.forEach((slide, idx) => {
        const slideEl = document.createElement('div');
        slideEl.className = `ttt-slide-item ${slide.themeClass}`;
        
        slideEl.innerHTML = `
            <div class="ttt-slide-header">
                <span>${slide.icon} ${slide.label}</span>
                <span class="ttt-slide-pct">${slide.percent}%</span>
            </div>
            <div class="ttt-slide-track">
                <div class="ttt-slide-fill" id="ttt-fill-${idx}"></div>
            </div>
        `;
        tttContainer.appendChild(slideEl);

        // Animate fill width
        setTimeout(() => {
            const fillEl = document.getElementById(`ttt-fill-${idx}`);
            if (fillEl) fillEl.style.width = `${slide.percent}%`;
        }, 100 + (idx * 200));
    });

    // B. Heatmap 3x3 Generation
    const heatmap = document.getElementById('energyHeatmap');
    if (heatmap) {
        heatmap.innerHTML = '';
        const gridVal = data.gridData.totalGrid;
        const heatmapMapOrder = [3, 6, 9, 2, 5, 8, 1, 4, 7];

        heatmapMapOrder.forEach(num => {
            const count = gridVal[num] || 0;
            let heatClass = "";
            let axisTheme = "";

            if ([1, 4, 7].includes(num)) axisTheme = "theme-than";
            else if ([2, 5, 8].includes(num)) axisTheme = "theme-tam";
            else if ([3, 6, 9].includes(num)) axisTheme = "theme-tri";

            const axisLabel = [1,4,7].includes(num) ? 'Thân' : [2,5,8].includes(num) ? 'Tâm' : 'Trí';
            
            if (count === 0) {
                heatClass = `is-missing missing-number ${axisTheme}`;
            } else if (count === 1) {
                heatClass = `is-weak ${axisTheme}`;
            } else if (count === 2) {
                heatClass = `is-medium ${axisTheme}`;
            } else {
                heatClass = `is-strong ${axisTheme} overload-number`;
            }

            heatmap.innerHTML += `
                <div class="heatmap-cell ${heatClass}" data-count="${count}" title="Số ${num} — ${axisLabel}: xuất hiện ${count} lần${count === 0 ? ' (thiếu)' : ''}">
                    ${num}
                </div>
            `;
        });
    }

    // C. SVG Bar Chart
    const barContainer = document.getElementById('frequencyBarChart');
    if (barContainer) {
        barContainer.innerHTML = `
            <svg class="frequency-bar-svg" viewBox="0 0 180 80">
                <defs>
                    <linearGradient id="freqBarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--sky-blue)" />
                        <stop offset="100%" stop-color="var(--primary-blue)" />
                    </linearGradient>
                </defs>
                <g id="barsGroup"></g>
            </svg>
        `;
        const barsGroup = document.getElementById('barsGroup');
        if (barsGroup) {
            const gridVal = data.gridData.totalGrid;
            for (let i = 1; i <= 9; i++) {
                const count = gridVal[i] || 0;
                let barHeight = count * 15;
                let fill = "url(#freqBarGradient)";
                let barClass = "chart-bar";
                let labelClass = "bar-label";
                let valClass = "bar-val";

                if (count === 0) {
                    barHeight = 3; // Placeholder height for missing bar
                    fill = "var(--color-missing)";
                    barClass += " missing-number";
                    labelClass += " missing-number";
                    valClass += " missing-number";
                } else if (count >= 3) {
                    fill = "var(--color-overload)";
                    barClass += " overload-number";
                    labelClass += " overload-number";
                    valClass += " overload-number";
                }

                const x = 12 + (i - 1) * 18;
                const y = 60 - barHeight;

                // draw rect
                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", x);
                rect.setAttribute("y", y);
                rect.setAttribute("width", "12");
                rect.setAttribute("height", barHeight);
                rect.setAttribute("fill", fill);
                rect.setAttribute("class", barClass);
                if (count === 0) {
                    rect.setAttribute("stroke", "var(--color-missing)");
                    rect.setAttribute("stroke-dasharray", "2,1");
                }
                barsGroup.appendChild(rect);

                // draw count text or warning icon
                const valTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
                valTxt.setAttribute("x", x + 6);
                valTxt.setAttribute("y", y - 3);
                valTxt.setAttribute("class", valClass);
                valTxt.textContent = count === 0 ? "⚠" : count;
                barsGroup.appendChild(valTxt);

                // draw number label
                const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
                lbl.setAttribute("x", x + 6);
                lbl.setAttribute("y", "72");
                lbl.setAttribute("class", labelClass);
                lbl.textContent = `Số ${i}`;
                barsGroup.appendChild(lbl);
            }
        }
    }

    // D. 3x3 Pythagoras Grid for DOB & Name (Separated)
    const dobGrid = data.gridData.dobGrid;
    const nameGrid = data.gridData.nameGrid;

    // 1. Draw DOB Grid
    for (let i = 1; i <= 9; i++) {
        const cellCountEl = document.getElementById(`dobcount-${i}`);
        if (cellCountEl) {
            cellCountEl.innerHTML = '';
            const count = dobGrid[i] || 0;
            for (let j = 0; j < count; j++) {
                cellCountEl.innerHTML += `<span class="color-dot dob-dot"></span>`;
            }
        }

        const cellEl = document.getElementById(`dobcell-${i}`);
        if (cellEl) {
            cellEl.classList.remove('is-missing', 'is-strong', 'has-number');
            cellEl.style = "";
            if (dobGrid[i] > 0) {
                cellEl.classList.add('has-number');
                if (dobGrid[i] >= 3) cellEl.classList.add('is-strong');
            } else {
                cellEl.classList.add('is-missing');
            }
        }
    }

    // 2. Draw Name Grid
    for (let i = 1; i <= 9; i++) {
        const cellCountEl = document.getElementById(`namecount-${i}`);
        if (cellCountEl) {
            cellCountEl.innerHTML = '';
            const count = nameGrid[i] || 0;
            for (let j = 0; j < count; j++) {
                cellCountEl.innerHTML += `<span class="color-dot name-dot"></span>`;
            }
        }

        const cellEl = document.getElementById(`namecell-${i}`);
        if (cellEl) {
            cellEl.classList.remove('is-missing', 'is-strong', 'has-number');
            cellEl.style = "";
            if (nameGrid[i] > 0) {
                cellEl.classList.add('has-number');
                if (nameGrid[i] >= 3) cellEl.classList.add('is-strong');
            } else {
                cellEl.classList.add('is-missing');
            }
        }
    }

    // Vector lines overlay coordinates mapping in 240x240 container
    const coords = {
        1: { x: 37, y: 203 },
        2: { x: 37, y: 120 },
        3: { x: 37, y: 37 },
        4: { x: 120, y: 203 },
        5: { x: 120, y: 120 },
        6: { x: 120, y: 37 },
        7: { x: 203, y: 203 },
        8: { x: 203, y: 120 },
        9: { x: 203, y: 37 }
    };

    const lines = {
        "1-2-3": [1, 3],
        "4-5-6": [4, 6],
        "7-8-9": [7, 9],
        "1-4-7": [1, 7],
        "2-5-8": [2, 8],
        "3-6-9": [3, 9],
        "1-5-9": [1, 9],
        "3-5-7": [3, 7]
    };

    // Draw DOB Arrows
    const dobOverlay = document.getElementById('dobArrowsOverlay');
    if (dobOverlay) {
        dobOverlay.innerHTML = '';
        dobOverlay.setAttribute('viewBox', '0 0 240 240');

        data.gridData.activeArrows.forEach(arr => {
            const endpoints = lines[arr.code];
            if (endpoints) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", coords[endpoints[0]].x);
                line.setAttribute("y1", coords[endpoints[0]].y);
                line.setAttribute("x2", coords[endpoints[1]].x);
                line.setAttribute("y2", coords[endpoints[1]].y);
                line.setAttribute("class", "arrow-line-active");
                dobOverlay.appendChild(line);
            }
        });

        data.gridData.emptyArrows.forEach(arr => {
            const endpoints = lines[arr.code];
            if (endpoints) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", coords[endpoints[0]].x);
                line.setAttribute("y1", coords[endpoints[0]].y);
                line.setAttribute("x2", coords[endpoints[1]].x);
                line.setAttribute("y2", coords[endpoints[1]].y);
                line.setAttribute("class", "arrow-line-missing");
                dobOverlay.appendChild(line);
            }
        });
    }

    // Draw Name Arrows (Name grid doesn't have standard birth arrows, but we can draw highlight connections)
    const nameOverlay = document.getElementById('nameArrowsOverlay');
    if (nameOverlay) {
        nameOverlay.innerHTML = '';
        nameOverlay.setAttribute('viewBox', '0 0 240 240');

        // Draw connections for name numbers that exist
        for (let key in lines) {
            let cells = lines[key];
            let hasAll = cells.every(c => nameGrid[c] > 0);
            if (hasAll) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", coords[cells[0]].x);
                line.setAttribute("y1", coords[cells[0]].y);
                line.setAttribute("x2", coords[cells[1]].x);
                line.setAttribute("y2", coords[cells[1]].y);
                line.setAttribute("class", "arrow-line-active");
                line.setAttribute("style", "stroke: var(--pastel-pink);");
                nameOverlay.appendChild(line);
            }
        }
    }

    // E. Update active arrows list
    const arrowsList = document.getElementById('arrows-list');
    arrowsList.innerHTML = '';
    if (data.gridData.activeArrows.length === 0 && data.gridData.emptyArrows.length === 0) {
        arrowsList.innerHTML = '<p class="text-sm">Không có mũi tên sức mạnh đặc biệt nào từ ngày sinh gốc.</p>';
    } else {
        data.gridData.activeArrows.forEach(a => {
            arrowsList.innerHTML += `
                <div class="arrow-badge arrow-active-badge">
                    <span class="arrow-indicator arrow-active-dot"></span>
                    <div>
                        <strong>${a.name}</strong>
                        <p class="text-sm arrow-desc">${a.desc || 'Ưu thế tự nhiên xuất sắc.'}</p>
                    </div>
                </div>
            `;
        });
        data.gridData.emptyArrows.forEach(a => {
            arrowsList.innerHTML += `
                <div class="arrow-badge arrow-empty-badge">
                    <span class="arrow-indicator arrow-empty-dot"></span>
                    <div>
                        <strong>${a.name} (Cảnh báo trống)</strong>
                        <p class="text-sm arrow-desc">${a.desc || 'Khía cạnh cần rèn luyện.'}</p>
                    </div>
                </div>
            `;
        });
    }

    // H. Render MODULE 1, 2, 4, 11, 12, 13 sub-tab contents
    renderDetailedSubTabContents();

    // F. Golden Triangle Svg
    renderGoldenTriangle();

    // G. 8 Intelligences
    drawIntelligencesRadar();
    renderParentingSuggestions();
    updateIdentityInsights();
}

// Render sub-tabs content
function renderDetailedSubTabContents() {
    const data = activeChildData;
    if (!data) return;

    // 1. Core meanings panel (MODULE 1)
    const coreContainer = document.getElementById('details-core-meanings-container');
    if (coreContainer) {
        const coreNumbers = [
            { label: "Số Đường Đời (Life Path)", val: data.lp },
            { label: "Số Sứ Mệnh (Expression)", val: data.expression, hide: !data.firstName },
            { label: "Số Linh Hồn (Soul Urge)", val: data.soulUrge, hide: !data.firstName },
            { label: "Số Nhân Cách (Personality)", val: data.personality, hide: !data.firstName },
            { label: "Số Ngày Sinh (Birthday)", val: data.birthday },
            { label: "Số Thái Độ (Attitude)", val: data.attitude }
        ];

        let html = '';
        coreNumbers.forEach(n => {
            if (n.hide) return;
            const reducedVal = n.val > 9 && ![11, 22, 33].includes(n.val) ? reduceNumber(n.val, false) : n.val;
            const details = NUMEROLOGY_DETAILS[reducedVal] || NUMEROLOGY_DETAILS[reduceNumber(reducedVal, false)];
            if (details) {
                html += `
                    <div class="glass-card" style="margin-bottom:12px; border-left: 4px solid var(--primary);">
                        <h4 style="color:var(--primary); margin-bottom:5px;">${n.label}: Số ${n.val}</h4>
                        <strong style="font-size:0.95rem;">${details.title}</strong>
                        <p class="text-xs text-muted" style="margin-top:4px;"><strong>Tổng quan:</strong> ${details.overview}</p>
                        <p class="text-xs" style="margin-top:4px; color:#10b981;"><strong>Điểm mạnh:</strong> ${details.strengths}</p>
                        <p class="text-xs" style="margin-top:4px; color:#ef4444;"><strong>Điểm yếu:</strong> ${details.weaknesses}</p>
                        <p class="text-xs" style="margin-top:6px; font-style:italic; background:rgba(255,255,255,0.03); padding:6px; border-radius:4px;"><strong>Bài học:</strong> ${details.lesson}</p>
                    </div>
                `;
            }
        });
        coreContainer.innerHTML = html || '<p class="text-sm">Chưa có chỉ số cốt lõi.</p>';
    }

    // 2. Density logic panel (MODULE 2)
    const densityContainer = document.getElementById('details-density-logic-container');
    if (densityContainer) {
        const totalGrid = data.gridData.totalGrid;
        let html = '';
        for (let i = 1; i <= 9; i++) {
            const count = totalGrid[i] || 0;
            const logic = DENSITY_LOGIC[count >= 3 ? 3 : count];
            if (logic) {
                const borderClr = count === 0 ? 'rgba(239,68,68,0.3)' : count === 1 ? 'rgba(16,185,129,0.3)' : 'rgba(110,198,255,0.3)';
                html += `
                    <div class="glass-card" style="margin-bottom:8px; border-left: 4px solid ${borderClr};">
                        <strong style="font-size:0.9rem; color:var(--primary-blue);">Chữ số ${i} xuất hiện ${count} lần</strong>
                        <p class="text-xs text-muted" style="margin-top:4px;"><strong>Mật độ:</strong> ${logic.label} - ${logic.desc}</p>
                        <p class="text-xs" style="margin-top:4px; font-style:italic;"><strong>Lời khuyên:</strong> ${logic.lesson}</p>
                    </div>
                `;
            }
        }
        densityContainer.innerHTML = html;
    }

    // 3. Isolated Oases panel (MODULE 4)
    const oasisContainer = document.getElementById('details-isolated-oases-container');
    if (oasisContainer) {
        const dobGrid = data.gridData.dobGrid;
        const foundOases = [];

        // Oasis 1: cell 1 has number, cells 2, 4, 5 are empty
        if ((dobGrid[1] || 0) > 0 && (dobGrid[2] || 0) === 0 && (dobGrid[4] || 0) === 0 && (dobGrid[5] || 0) === 0) {
            foundOases.push({ num: 1, ...ISOLATED_OASES[1] });
        }
        // Oasis 3: cell 3 has number, cells 2, 5, 6 are empty
        if ((dobGrid[3] || 0) > 0 && (dobGrid[2] || 0) === 0 && (dobGrid[5] || 0) === 0 && (dobGrid[6] || 0) === 0) {
            foundOases.push({ num: 3, ...ISOLATED_OASES[3] });
        }
        // Oasis 7: cell 7 has number, cells 4, 5, 8 are empty
        if ((dobGrid[7] || 0) > 0 && (dobGrid[4] || 0) === 0 && (dobGrid[5] || 0) === 0 && (dobGrid[8] || 0) === 0) {
            foundOases.push({ num: 7, ...ISOLATED_OASES[7] });
        }
        // Oasis 9: cell 9 has number, cells 5, 6, 8 are empty
        if ((dobGrid[9] || 0) > 0 && (dobGrid[5] || 0) === 0 && (dobGrid[6] || 0) === 0 && (dobGrid[8] || 0) === 0) {
            foundOases.push({ num: 9, ...ISOLATED_OASES[9] });
        }

        if (foundOases.length === 0) {
            oasisContainer.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px; padding:12px; background:rgba(16,185,129,0.07); border-radius:8px; border:1px solid rgba(16,185,129,0.25);">
                    <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.2rem;"></i>
                    <p class="text-sm">Biểu đồ của bé hoàn toàn cân bằng, các con số liên kết chặt chẽ và không tạo thành ốc đảo cô đơn nào.</p>
                </div>
            `;
        } else {
            oasisContainer.innerHTML = foundOases.map(o => `
                <div class="karmic-debt-card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2);">
                    <span style="font-size:1.8rem;">🏝️</span>
                    <div>
                        <strong>${o.title}</strong>
                        <p class="text-sm" style="margin-top:4px;">${o.desc}</p>
                        <p class="lesson-text" style="color:#ef4444;">📖 Khuyến nghị rèn luyện: ${o.lesson}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // 4. Challenges panel (MODULE 11)
    const challengeContainer = document.getElementById('details-challenges-container');
    if (challengeContainer && data.timeline && data.timeline.challenges) {
        const pin = data.timeline.pinnacles;
        challengeContainer.innerHTML = data.timeline.challenges.map((ch, idx) => {
            const info = getChallengeInfo(ch.val);
            const ageLabel = pin && pin[idx] ? `Giai đoạn ${idx + 1} (Tuổi: ${pin[idx].age})` : `Giai đoạn ${idx + 1}`;
            if (!info) {
                return `<p class="text-sm text-muted">Thách thức số ${ch.val} — chưa có luận giải.</p>`;
            }
            return `
                <div class="glass-card" style="margin-bottom:12px; border-left: 4px solid #f97316;">
                    <h4 style="color:#f97316; margin-bottom:5px;">${ageLabel} — Thách thức số ${ch.val}</h4>
                    <strong style="font-size:0.95rem;">${info.title}</strong>
                    <p class="text-xs text-muted" style="margin-top:4px;"><strong>Ý nghĩa:</strong> ${info.desc}</p>
                    <p class="text-xs" style="margin-top:6px; font-style:italic; background:rgba(249,115,22,0.06); padding:6px; border-radius:4px;"><strong>Bài học rèn luyện:</strong> ${info.lesson}</p>
                </div>
            `;
        }).join('');
    }

    // 5. Maturity panel (MODULE 12)
    const maturityContainer = document.getElementById('details-maturity-container');
    if (maturityContainer) {
        if (!data.firstName || !data.maturity) {
            maturityContainer.innerHTML = `
                <p class="text-sm text-muted">Cần nhập tên khai sinh để tính chỉ số Trưởng thành (Đường Đời + Sứ Mệnh).</p>
            `;
        } else {
            const info = getMaturityInfo(data.maturity);
            if (info) {
                maturityContainer.innerHTML = `
                    <div class="glass-card" style="border-left: 4px solid var(--pastel-purple);">
                        <h4 style="color:var(--pastel-purple); margin-bottom:5px;">Chỉ số Trưởng Thành: Số ${data.maturity}</h4>
                        <strong style="font-size:0.95rem;">${info.title}</strong>
                        <p class="text-xs text-muted" style="margin-top:8px; line-height:1.6;">${info.desc}</p>
                        <p class="text-xs" style="margin-top:8px; font-style:italic; background:rgba(139,92,246,0.06); padding:8px; border-radius:4px;">
                            <strong>Lưu ý:</strong> Năng lượng trưởng thành trỗi dậy mạnh mẽ sau tuổi 35, khi bản dịch năng lượng từ Đường Đời (${data.lp}) và Sứ Mệnh (${data.expression}) hòa hợp.
                        </p>
                    </div>
                `;
            } else {
                maturityContainer.innerHTML = `<p class="text-sm text-muted">Chưa có luận giải cho số trưởng thành ${data.maturity}.</p>`;
            }
        }
    }

    // 6. Rational Thought panel (MODULE 13)
    const rationalContainer = document.getElementById('details-rational-thought-container');
    if (rationalContainer) {
        const info = getRationalThoughtInfo(data.rationalThought);
        if (info && data.rationalThought) {
            const parts = data.dob ? data.dob.split('-') : [];
            const rawDay = parts.length > 2 ? parseInt(parts[2], 10) : '?';
            rationalContainer.innerHTML = `
                <div class="glass-card" style="border-left: 4px solid var(--primary-blue);">
                    <h4 style="color:var(--primary-blue); margin-bottom:5px;">🧠 Chỉ số Tư Duy Lý Trí: Số ${data.rationalThought}</h4>
                    <strong style="font-size:0.95rem;">${info.title}</strong>
                    <p class="text-xs text-muted" style="margin-top:8px; line-height:1.6;">${info.desc}</p>
                    <p class="text-xs" style="margin-top:8px; font-style:italic; background:rgba(11,94,215,0.05); padding:8px; border-radius:4px;">
                        <strong>Công thức:</strong> Ngày sinh gốc (${rawDay}) + Chỉ số Sứ Mệnh (${data.expression || 0}) = ${rawDay + (data.expression || 0)} → Rút gọn về <strong>${data.rationalThought}</strong>.<br>
                        Chỉ số này mô tả cách bộ não phản ứng khi phân tích thông tin và giải quyết khủng hoảng.
                    </p>
                </div>
            `;
        } else if (!data.firstName || !data.expression) {
            rationalContainer.innerHTML = `<p class="text-sm text-muted">Cần nhập tên khai sinh để tính Tư Duy Lý Trí (Ngày sinh + Sứ Mệnh).</p>`;
        } else {
            rationalContainer.innerHTML = `<p class="text-sm text-muted">Chưa có luận giải cho tư duy lý trí số ${data.rationalThought}.</p>`;
        }
    }
}

// Switch sub-tabs under Bản Thể tab
function switchDetailsSubTab(tabName) {
    document.querySelectorAll('.details-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${tabName}`);
    });
    document.querySelectorAll('.details-tab-panel').forEach(panel => {
        panel.style.display = panel.id === `panel-${tabName}` ? 'block' : 'none';
    });
}

// Draw Golden Triangle (Tam Giác Vàng)
// Top = Đường Đời, Bottom-Left = Linh Hồn, Bottom-Right = Sứ Mệnh
function renderGoldenTriangle() {
    const svg = document.getElementById('goldenTriangleSvg');
    svg.innerHTML = '';

    const lp = activeChildData.lp;
    const exp = activeChildData.expression;
    const soul = activeChildData.soulUrge;
    const hasExp = exp && exp !== 0; // Only show if name data available

    // viewBox is 100x100 so these are percentage coordinates
    const TOP = { x: 50, y: 10 };     // Đường Đời - TOP
    const LEFT = { x: 10, y: 85 };    // Linh Hồn - BOTTOM LEFT
    const RIGHT = { x: 90, y: 85 };   // Sứ Mệnh - BOTTOM RIGHT

    // Gradient defs
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    grad.setAttribute("id", "triGrad"); grad.setAttribute("x1", "0"); grad.setAttribute("y1", "0"); grad.setAttribute("x2", "1"); grad.setAttribute("y2", "1");
    const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s1.setAttribute("offset", "0%"); s1.setAttribute("stop-color", "rgba(37,99,235,0.1)");
    const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s2.setAttribute("offset", "100%"); s2.setAttribute("stop-color", "rgba(30,58,138,0.05)");
    grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad);
    svg.appendChild(defs);

    // Draw filled polygon
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", `${TOP.x},${TOP.y} ${LEFT.x},${LEFT.y} ${RIGHT.x},${RIGHT.y}`);
    poly.setAttribute("fill", "url(#triGrad)");
    poly.setAttribute("stroke", "rgba(37,99,235,0.3)");
    poly.setAttribute("stroke-width", "1.5");
    svg.appendChild(poly);

    // Draw midpoint labels on each edge
    const drawEdgeLabel = (x1, y1, x2, y2, label) => {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.setAttribute("x", mx); t.setAttribute("y", my);
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("class", "triangle-edge-lbl");
        t.textContent = label;
        svg.appendChild(t);
    };

    drawEdgeLabel(TOP.x, TOP.y, LEFT.x, LEFT.y, "Tâm lý nội tâm");
    drawEdgeLabel(TOP.x, TOP.y, RIGHT.x, RIGHT.y, "Biểu hiện ra ngoài");
    drawEdgeLabel(LEFT.x, LEFT.y, RIGHT.x, RIGHT.y, "Cơ sở năng lượng");

    // Draw each vertex node
    const nodes = [
        { pos: TOP,   val: lp,  label: "ĐƯỜNG ĐỜI", color: "#1E3A8A" },
        { pos: LEFT,  val: soul, label: "LINH HỒN",  color: "#2563EB" },
        { pos: RIGHT, val: hasExp ? exp : '?', label: "SỨ MỆNH", color: "#60A5FA" }
    ];

    nodes.forEach(n => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

        // Glow circle background
        const glowCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glowCircle.setAttribute("cx", n.pos.x); glowCircle.setAttribute("cy", n.pos.y);
        glowCircle.setAttribute("r", "9");
        glowCircle.setAttribute("fill", n.color); glowCircle.setAttribute("opacity", "0.2");
        g.appendChild(glowCircle);

        // Main circle
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", n.pos.x); circle.setAttribute("cy", n.pos.y); circle.setAttribute("r", "6.5");
        circle.setAttribute("fill", n.color); circle.setAttribute("stroke", "rgba(255,255,255,0.5)");
        circle.setAttribute("stroke-width", "1"); circle.setAttribute("class", "triangle-node");
        g.appendChild(circle);

        // Number
        const textVal = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textVal.setAttribute("x", n.pos.x); textVal.setAttribute("y", n.pos.y + 1.5);
        textVal.setAttribute("class", "triangle-lbl-node");
        textVal.textContent = n.val;
        g.appendChild(textVal);

        // Label - position smart
        const ly = n.pos.y < 50 ? n.pos.y - 10 : n.pos.y + 13;
        const textName = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textName.setAttribute("x", n.pos.x); textName.setAttribute("y", ly);
        textName.setAttribute("class", "triangle-lbl-desc");
        textName.setAttribute("fill", n.color);
        textName.textContent = n.label;
        g.appendChild(textName);

        svg.appendChild(g);
    });
}


// 3. Render Vận trình: Pinnacles Pyramid & Horizontal timeline
function renderPinnaclePyramid() {
    const svg = document.getElementById('pinnaclesPyramidSvg');
    if (!svg) return;
    svg.innerHTML = '';

    // Add gradient definition for pyramid edges
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    grad.setAttribute("id", "pyramidGrad"); grad.setAttribute("x1","0%"); grad.setAttribute("y1","100%"); grad.setAttribute("x2","0%"); grad.setAttribute("y2","0%");
    const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop"); s1.setAttribute("offset","0%"); s1.setAttribute("stop-color","#93C5FD"); s1.setAttribute("stop-opacity","0.5");
    const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop"); s2.setAttribute("offset","100%"); s2.setAttribute("stop-color","#1E3A8A"); s2.setAttribute("stop-opacity","1");
    grad.appendChild(s1); grad.appendChild(s2);
    defs.appendChild(grad);
    svg.appendChild(defs);

    const pin = activeChildData.timeline.pinnacles;
    const chal = activeChildData.timeline.challenges;
    const cycles = activeChildData.timeline.cycles;

    const coords = {
        month: { x: 15, y: 88, val: cycles.first, label: "Tháng sinh" },
        day: { x: 55, y: 88, val: cycles.second, label: "Ngày sinh" },
        year: { x: 95, y: 88, val: cycles.third, label: "Năm sinh" },

        p1: { x: 35, y: 55, val: pin[0].val, age: pin[0].age, label: "Đỉnh 1", chal: chal[0].val },
        p2: { x: 75, y: 55, val: pin[1].val, age: pin[1].age, label: "Đỉnh 2", chal: chal[1].val },
        p3: { x: 55, y: 25, val: pin[2].val, age: pin[2].age, label: "Đỉnh 3", chal: chal[2].val },
        p4: { x: 55, y: 5, val: pin[3].val, age: pin[3].age, label: "Đỉnh 4", chal: chal[3].val }
    };

    const drawLine = (x1, y1, x2, y2, isSub = false) => {
        const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l.setAttribute("x1", x1); l.setAttribute("y1", y1);
        l.setAttribute("x2", x2); l.setAttribute("y2", y2);
        l.setAttribute("class", isSub ? "pyramid-edge-sub" : "pyramid-edge");
        svg.appendChild(l);
        return l;
    };

    // Base to Tier 1
    const line_m_p1 = drawLine(coords.month.x, coords.month.y, coords.p1.x, coords.p1.y, true);
    const line_d_p1 = drawLine(coords.day.x, coords.day.y, coords.p1.x, coords.p1.y, true);
    const line_d_p2 = drawLine(coords.day.x, coords.day.y, coords.p2.x, coords.p2.y, true);
    const line_y_p2 = drawLine(coords.year.x, coords.year.y, coords.p2.x, coords.p2.y, true);

    // Main structural lines
    const line_p1_p3 = drawLine(coords.p1.x, coords.p1.y, coords.p3.x, coords.p3.y, false);
    const line_p2_p3 = drawLine(coords.p2.x, coords.p2.y, coords.p3.x, coords.p3.y, false);
    const line_p3_p4 = drawLine(coords.p3.x, coords.p3.y, coords.p4.x, coords.p4.y, false);

    const line_m_p4 = drawLine(coords.month.x, coords.month.y, coords.p4.x, coords.p4.y, false);
    const line_y_p4 = drawLine(coords.year.x, coords.year.y, coords.p4.x, coords.p4.y, false);
    const line_base = drawLine(coords.month.x, coords.month.y, coords.year.x, coords.year.y, false);

    // Node coords and slopes map
    const peakSlopes = {
        p1: [line_m_p1, line_d_p1],
        p2: [line_d_p2, line_y_p2],
        p3: [line_p1_p3, line_p2_p3],
        p4: [line_m_p4, line_y_p4]
    };

    let selectedPeakKey = 'p1';

    const highlightPeak = (k) => {
        svg.querySelectorAll('.pyramid-node-circle').forEach(c => c.classList.remove('pyramid-node-active'));
        svg.querySelectorAll('.pyramid-node-pulse').forEach(c => c.classList.remove('pyramid-node-active-pulse'));
        svg.querySelectorAll('.pyramid-edge, .pyramid-edge-sub').forEach(l => l.classList.remove('pyramid-edge-active'));

        if (!k) return;

        const nodeEl = svg.querySelector(`.node-${k}`);
        const pulseEl = svg.querySelector(`.pulse-${k}`);
        if (nodeEl) nodeEl.classList.add('pyramid-node-active');
        if (pulseEl) pulseEl.classList.add('pyramid-node-active-pulse');

        const slopes = peakSlopes[k];
        if (slopes) {
            slopes.forEach(line => {
                if (line) line.classList.add('pyramid-edge-active');
            });
        }
    };

    // Draw vertex interactive nodes
    const nodeKeys = ["p1", "p2", "p3", "p4"];
    nodeKeys.forEach((key, idx) => {
        const n = coords[key];
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

        // Glow circle background (pulse effect)
        const glowCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glowCircle.setAttribute("cx", n.x);
        glowCircle.setAttribute("cy", n.y);
        glowCircle.setAttribute("r", "8");
        glowCircle.setAttribute("class", `pyramid-node-pulse pulse-${key}`);
        group.appendChild(glowCircle);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", n.x);
        circle.setAttribute("cy", n.y);
        circle.setAttribute("r", "5.5");
        circle.setAttribute("class", `pyramid-node-circle node-${key}`);
        
        // Interactive events
        circle.addEventListener('click', () => {
            selectedPeakKey = key;
            highlightPeak(key);

            const chInfo = getChallengeInfo(n.chal);
            const titleEl = document.getElementById('pyramid-exp-title');
            const bodyEl = document.getElementById('pyramid-exp-body');
            
            if (titleEl) titleEl.innerText = `Đỉnh Cao Giai Đoạn ${idx + 1} (Tuổi: ${n.age}) - Số ${n.val}`;
            if (bodyEl) {
                bodyEl.innerHTML = `
                    <p><strong>Cơ hội:</strong> Năng lượng hỗ trợ phát triển các cơ hội thuộc số <strong>${n.val}</strong>.</p>
                    <p class="margin-top-sm"><strong>Thử thách số ${n.chal}:</strong> ${chInfo ? chInfo.title : getChallengeAdvice(n.chal)}</p>
                    ${chInfo ? `<p class="text-sm text-muted margin-top-sm"><strong>Ý nghĩa:</strong> ${chInfo.desc}</p>
                    <p class="text-sm margin-top-sm" style="font-style:italic;"><strong>Bài học rèn luyện:</strong> ${chInfo.lesson}</p>` : ''}
                `;
            }
        });

        circle.addEventListener('mouseover', () => {
            highlightPeak(key);
        });

        circle.addEventListener('mouseout', () => {
            highlightPeak(selectedPeakKey);
        });

        group.appendChild(circle);

        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", n.x);
        txt.setAttribute("y", n.y + 1.5);
        txt.setAttribute("class", "pyramid-lbl");
        txt.textContent = n.val;
        group.appendChild(txt);

        // Subtitle labels
        const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sub.setAttribute("x", n.x + 8);
        sub.setAttribute("y", n.y + 1);
        sub.setAttribute("class", "pyramid-lbl-desc");
        sub.style.textAnchor = "start";
        sub.textContent = `${n.label} (${n.age})`;
        group.appendChild(sub);

        svg.appendChild(group);
    });

    // Draw base values
    const baseKeys = ["month", "day", "year"];
    baseKeys.forEach(key => {
        const n = coords[key];
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", n.x);
        txt.setAttribute("y", n.y);
        txt.setAttribute("class", "pyramid-lbl");
        txt.textContent = n.val;
        svg.appendChild(txt);

        const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sub.setAttribute("x", n.x);
        sub.setAttribute("y", n.y + 4);
        sub.setAttribute("class", "pyramid-lbl-desc");
        sub.textContent = n.label;
        svg.appendChild(sub);
    });

    // Auto-select first peak on load
    setTimeout(() => {
        const defaultNode = svg.querySelector('.node-p1');
        if (defaultNode) {
            defaultNode.dispatchEvent(new Event('click'));
        }
    }, 50);

    updateTimelineInsights();
}

// Horizontal Timeline checkpoints (TAB 2 bottom)
function renderLifeTimelineCheckpoint() {
    const data = activeChildData;
    const timelineContainer = document.getElementById('horizontalTimeline');
    timelineContainer.innerHTML = '';

    const pin = data.timeline.pinnacles;
    const chal = data.timeline.challenges;

    // Horizontal ages timeline bubbles (0, LP, Age 1, Age 2, Age 3, Hậu Vận)
    const checkpoints = [
        { age: 0, val: "Gốc", label: "Sinh ra", desc: "Nền tảng năng lượng số ngày sinh" },
        { age: pin[0].age, val: pin[0].val, label: "Chu kỳ 1", desc: `Đỉnh cao số ${pin[0].val}, Thử thách ${chal[0].val}` },
        { age: pin[1].age, val: pin[1].val, label: "Chu kỳ 2", desc: `Đỉnh cao số ${pin[1].val}, Thử thách ${chal[1].val}` },
        { age: pin[2].age, val: pin[2].val, label: "Chu kỳ 3", desc: `Đỉnh cao số ${pin[2].val}, Thử thách ${chal[2].val}` },
        { age: "Hậu vận", val: pin[3].val, label: "Chu kỳ 4", desc: `Đỉnh cao số ${pin[3].val}, Thử thách ${chal[3].val}` }
    ];

    checkpoints.forEach(chk => {
        timelineContainer.innerHTML += `
            <div class="timeline-checkpoint">
                <div class="timeline-bubble" data-tooltip="${chk.desc}">
                    <span>${chk.age}</span>
                    <span class="chk-val font-serif">${chk.val}</span>
                </div>
                <div class="timeline-checkpoint-lbl">${chk.label}</div>
            </div>
        `;
    });

    updateTimelineInsights();
}

// 4. Family Relationship Network Graph (TAB 3)
function renderFamilyNetworkGraph() {
    const svg = document.getElementById('familyNetworkGraph');
    if (!svg) return;
    svg.innerHTML = '';
    if (!activeChildData || (!activeChildData.parents.fatherName && !activeChildData.parents.motherName)) return;

    const childLp = activeChildData.lp;
    const fatherName = activeChildData.parents.fatherName;
    const fatherDob = activeChildData.parents.fatherDob;
    const motherName = activeChildData.parents.motherName;
    const motherDob = activeChildData.parents.motherDob;

    const fNode = { x: 20, y: 35, name: "Bố", active: !!fatherName && !!fatherDob };
    const mNode = { x: 80, y: 35, name: "Mẹ", active: !!motherName && !!motherDob };
    const cNode = { x: 50, y: 70, name: activeChildData.firstName || "Con" };

    const friendlyGroups = [
        [1, 5, 7],
        [2, 4, 8, 11, 22],
        [3, 6, 9, 33]
    ];

    function areFriendly(n1, n2) {
        const reduceNumber = (num, keepMaster = false) => {
            if (!num) return 0;
            if (keepMaster && [11, 22, 33].includes(num)) return num;
            while (num > 9) {
                if (keepMaster && [11, 22, 33].includes(num)) return num;
                num = String(num).split('').reduce((s, d) => s + parseInt(d), 0);
            }
            return num;
        };
        n1 = reduceNumber(n1, false);
        n2 = reduceNumber(n2, false);
        if (n1 === n2) return true;
        for (let g of friendlyGroups) {
            if (g.includes(n1) && g.includes(n2)) return true;
        }
        return false;
    }

    // Draw links
    const drawLinkLine = (n1, n2, score, friendly) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", n1.x); line.setAttribute("y1", n1.y);
        line.setAttribute("x2", n2.x); line.setAttribute("y2", n2.y);
        line.setAttribute("class", `family-link ${friendly ? 'family-link-harmony' : 'family-link-friction'}`);
        svg.appendChild(line);

        // draw score text in middle
        const tx = (n1.x + n2.x) / 2;
        const ty = (n1.y + n2.y) / 2 - 4;
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", tx); txt.setAttribute("y", ty);
        txt.setAttribute("class", "family-link-value");
        txt.textContent = `Hợp: ${score}/100`;
        svg.appendChild(txt);

        // If conflicting (friction), draw a warning icon at the midpoint
        if (!friendly) {
            const mx = (n1.x + n2.x) / 2;
            const my = (n1.y + n2.y) / 2;
            
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            
            const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circ.setAttribute("cx", mx);
            circ.setAttribute("cy", my);
            circ.setAttribute("r", "2.5");
            circ.setAttribute("class", "family-warn-circle");
            g.appendChild(circ);

            const warnTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
            warnTxt.setAttribute("x", mx);
            warnTxt.setAttribute("y", my + 0.8);
            warnTxt.setAttribute("class", "family-warn-text");
            warnTxt.textContent = "!";
            g.appendChild(warnTxt);
            
            svg.appendChild(g);
        }
    };

    // Calculate scores and draw links
    if (fNode.active) {
        const pLpObj = RuleEngine.calculateLifePath(fatherDob);
        const pNames = RuleEngine.calculateNameNumbers(fatherName);
        
        let score = 70;
        const friendly = areFriendly(childLp, pLpObj.lifePath);
        if (friendly) score += 15; else score -= 10;
        if (areFriendly(activeChildData.soulUrge, pNames.soulUrge)) score += 15;
        score = Math.min(100, score);
        
        drawLinkLine(fNode, cNode, score, friendly);
    }
    
    if (mNode.active) {
        const pLpObj = RuleEngine.calculateLifePath(motherDob);
        const pNames = RuleEngine.calculateNameNumbers(motherName);
        
        let score = 70;
        const friendly = areFriendly(childLp, pLpObj.lifePath);
        if (friendly) score += 15; else score -= 10;
        if (areFriendly(activeChildData.soulUrge, pNames.soulUrge)) score += 15;
        score = Math.min(100, score);
        
        drawLinkLine(mNode, cNode, score, friendly);
    }

    // Draw nodes
    const drawNodeGroup = (n, isMain) => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", n.x); circ.setAttribute("cy", n.y);
        circ.setAttribute("r", isMain ? "11" : "8");
        circ.setAttribute("class", isMain ? "family-node-main" : "family-node-sub");
        group.appendChild(circ);

        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", n.x); txt.setAttribute("y", n.y + 1.5);
        txt.setAttribute("class", "family-node-lbl");
        txt.style.fill = isMain ? "#fff" : "var(--text-main)";
        txt.textContent = n.name;
        group.appendChild(txt);

        svg.appendChild(group);
    };

    if (fNode.active) drawNodeGroup(fNode, false);
    if (mNode.active) drawNodeGroup(mNode, false);
    drawNodeGroup(cNode, true);
}

// 5. AI Suggested Names Card Generator with Score Breakdown (TAB 4)
function generateAINames(genderFilter) {
    if (!activeChildData) {
        alert("Vui lòng nhập dữ liệu gốc và bấm Phân tích trước!");
        return;
    }

    // Update filter button UI
    if (genderFilter !== undefined) {
        document.querySelectorAll('.naming-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.gf === genderFilter);
        });
    }

    const container = document.getElementById('aiNameCardsContainer');
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 24px;"><i class="fa-solid fa-spinner fa-spin" style="color: var(--primary); font-size: 2rem;"></i><br><br>AI đang tính toán các tổ hợp tên tối ưu để lấp đầy số khuyết của bé...</div>';

    const wish = document.getElementById('namingWish').value;
    const totalCount = parseInt(document.getElementById('namingTotal').value);
    const activeGenderFilter = genderFilter ?? (document.querySelector('.naming-filter-btn.active')?.dataset.gf ?? 'all');

    setTimeout(() => {
        container.innerHTML = '';

        const gender = activeChildData.gender;

        // Filter syllables by child gender + user override filter
        const effectiveGender = activeGenderFilter !== 'all' ? activeGenderFilter : gender;
        const filteredSyllables = VIETNAMESE_SYLLABLES.filter(s => {
            if (effectiveGender === "Nam") return s.gender === "Nam" || s.gender === "Unisex";
            else if (effectiveGender === "Nữ") return s.gender === "Nữ" || s.gender === "Unisex";
            return true;
        });

        // Generate combinations (Middle Name + First Name)
        const candidates = [];
        const seen = new Set();
        for (let i = 0; i < filteredSyllables.length; i++) {
            const middle = filteredSyllables[i];
            for (let j = 0; j < filteredSyllables.length; j++) {
                const first = filteredSyllables[j];
                if (middle.syllable === first.syllable) continue;
                if (first.is_middle) continue;
                const key = `${middle.syllable}|${first.syllable}`;
                if (seen.has(key)) continue;
                seen.add(key);
                candidates.push({ middle, first });
            }
        }

        // Score all candidates
        const results = candidates.map(cand => scoreNameCombination(cand.middle, cand.first, wish));

        // Sort by score descending
        results.sort((a, b) => b.score - a.score);

        // Render Cards with 100-point breakdown
        results.slice(0, totalCount).forEach((r, idx) => {
            const scoreColor = r.score >= 88 ? 'var(--pastel-green)' :
                               r.score >= 72 ? 'var(--pastel-yellow)' :
                               r.score >= 55 ? 'var(--pastel-orange)' : 'var(--pastel-pink)';
            const scoreLabel = r.score >= 88 ? '🏆 Xuất sắc' :
                               r.score >= 72 ? '⭐ Tốt' :
                               r.score >= 55 ? '✓ Khá' : 'Cơ bản';

            const bd = r.breakdown || {};
            const breakdownRows = [
                { label: 'Số học tương hợp', val: bd.numerologyMatch || 0, max: 35 },
                { label: 'Bù số thiếu', val: bd.missingCompensation || 0, max: 30 },
                { label: 'Ý nghĩa', val: bd.meaning || 0, max: 20 },
                { label: 'Ngũ hành gia đình', val: bd.parentCompat || 0, max: 10 },
                { label: 'Âm thanh', val: bd.pronunciation || 0, max: 5 },
            ];

            const breakdownHTML = breakdownRows.map(row => {
                const pct = Math.round((row.val / row.max) * 100);
                const color = pct >= 80 ? 'var(--pastel-green)' : pct >= 50 ? 'var(--pastel-blue)' : 'var(--pastel-orange)';
                return `
                <div class="breakdown-row">
                    <span class="breakdown-label">${row.label}</span>
                    <div class="breakdown-track">
                        <div class="breakdown-fill" style="width: ${pct}%; background: ${color};"></div>
                    </div>
                    <span class="breakdown-pts">${row.val}/${row.max}</span>
                </div>`;
            }).join('');

            const reasonsHTML = (r.reasons || []).slice(0, 3).map(rr => {
                const isWarning = rr.includes('⚠');
                return `<span class="reason-tag ${isWarning ? 'reason-warn' : 'reason-good'}">${rr}</span>`;
            }).join('');

            const cardEl = document.createElement('div');
            cardEl.className = 'naming-card-v2';
            cardEl.innerHTML = `
                <div class="nc2-rank">#${idx + 1}</div>
                <div class="nc2-header">
                    <div class="nc2-name">${activeChildData.lastName} ${r.name}</div>
                    <div class="nc2-badges">
                        <span class="badge badge-element">${r.wuxing}</span>
                        ${r.hasMaster ? '<span class="badge badge-master">Master</span>' : ''}
                        ${r.hasDebt ? '<span class="badge badge-debt">Karmic</span>' : ''}
                    </div>
                </div>

                <div class="nc2-score-row">
                    <div class="nc2-score-circle" style="border-color: ${scoreColor};">
                        <span class="nc2-score-num" style="color: ${scoreColor};">${r.score}</span>
                        <span class="nc2-score-label">${scoreLabel}</span>
                    </div>
                    <div class="nc2-numbers">
                        <div class="nc2-num-item"><span class="nc2-num-val">${r.expression}</span><span class="nc2-num-lbl">Sứ mệnh</span></div>
                        <div class="nc2-num-item"><span class="nc2-num-val">${r.soul}</span><span class="nc2-num-lbl">Linh hồn</span></div>
                        <div class="nc2-num-item"><span class="nc2-num-val">${r.filledNumbers.length}</span><span class="nc2-num-lbl">Bù số</span></div>
                    </div>
                </div>

                <div class="nc2-meaning">${r.meaning}</div>

                <div class="nc2-breakdown">
                    <div class="nc2-breakdown-title">Chi tiết điểm (100 điểm)</div>
                    ${breakdownHTML}
                </div>

                <div class="nc2-reasons">${reasonsHTML}</div>

                <div class="nc2-filled-nums">
                    ${r.filledNumbers.length > 0
                        ? r.filledNumbers.map(n => `<span class="filled-num-badge">Bổ sung số ${n}</span>`).join('')
                        : '<span style="color: var(--text-muted); font-size: 11px;">Không bổ sung số mới</span>'}
                </div>

                <div class="nc2-actions" style="display: flex; gap: 8px; margin-top: 12px; width: 100%;">
                    <button class="btn-secondary nc2-btn" style="flex: 1;" onclick="selectNameForCompare('${r.name}')">
                        <i class="fa-solid fa-code-compare"></i> So sánh
                    </button>
                    <button class="btn-primary nc2-btn" style="flex: 1; background: var(--primary); border: none;" onclick="applySuggestedName('${r.name}')">
                        <i class="fa-solid fa-check"></i> Áp dụng
                    </button>
                </div>
            `;
            container.appendChild(cardEl);
        });

        // Show count
        const countEl = document.createElement('div');
        countEl.style.cssText = 'grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 12px; padding: 8px 0;';
        countEl.textContent = `Hiển thị ${Math.min(totalCount, results.length)} tên tốt nhất trong ${results.length} tổ hợp được phân tích`;
        container.appendChild(countEl);

    }, 800);
}


function selectNameForCompare(name) {
    const input1 = document.getElementById('compareName1');
    const input2 = document.getElementById('compareName2');
    const input3 = document.getElementById('compareName3');
    const input4 = document.getElementById('compareName4');
    const input5 = document.getElementById('compareName5');

    if (input1.value === "" || input1.value === "Minh Anh") { input1.value = name; }
    else if (input2.value === "" || input2.value === "Khánh Vy") { input2.value = name; }
    else if (input3.value === "" || input3.value === "Gia Bảo") { input3.value = name; }
    else if (input4.value === "" || input4.value === "Bình An") { input4.value = name; }
    else { input5.value = name; }

    alert(`Đã thêm tên "${name}" vào danh sách so sánh!`);
    document.querySelector('[data-tab="compare"]').click();
}

// 6. Compare names with comparison matrix and bar chart
function compareNames() {
    if (!activeChildData) {
        alert("Vui lòng thực hiện tính toán thông tin bé trước!");
        return;
    }

    const inputs = [
        document.getElementById('compareName1').value.trim(),
        document.getElementById('compareName2').value.trim(),
        document.getElementById('compareName3').value.trim(),
        document.getElementById('compareName4').value.trim(),
        document.getElementById('compareName5').value.trim()
    ].filter(v => v !== "");

    if (inputs.length < 2) {
        alert("Vui lòng nhập tối thiểu 2 tên để bắt đầu đối chiếu!");
        return;
    }

    const wish = document.getElementById('namingWish').value;

    const results = inputs.map(name => {
        const parsed = evaluateCustomName(name);
        const scored = scoreNameCombination(parsed.middle, parsed.first, wish);

        return {
            name: name,
            score: scored.score,
            expression: scored.expression,
            soul: scored.soul,
            personality: scored.personality,
            filled: scored.filledCount,
            meaning: scored.breakdown ? scored.breakdown.meaning : 0,
            lpAlign: scored.breakdown ? scored.breakdown.numerologyMatch : 0,
            sound: scored.breakdown ? scored.breakdown.pronunciation : 0,
            rarity: scored.breakdown ? scored.breakdown.popularity : 0,
            wuxing: scored.wuxing,
            meaningText: scored.meaning
        };
    });

    // Sort
    const sortedResults = [...results].sort((a, b) => b.score - a.score);

    // Draw Bar Chart Comparison in SVG
    const barChartContainer = document.getElementById('compareBarChartContainer');
    barChartContainer.innerHTML = '';

    const svgWidth = 220;
    const svgHeight = 100;
    const barWidth = 25;
    const gap = 12;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    svg.style.width = "100%";
    svg.style.height = "150px";

    results.forEach((res, idx) => {
        const x = gap + idx * (barWidth + gap);
        const h = (res.score / 100) * 65;
        const y = 80 - h;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", h);
        rect.setAttribute("fill", res.name === sortedResults[0].name ? "var(--pastel-green)" : "var(--pastel-blue)");
        rect.setAttribute("rx", "3");
        svg.appendChild(rect);

        // score text
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", x + barWidth / 2);
        txt.setAttribute("y", y - 2);
        txt.setAttribute("class", "bar-val");
        txt.textContent = res.score;
        svg.appendChild(txt);

        // name label
        const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lbl.setAttribute("x", x + barWidth / 2);
        lbl.setAttribute("y", 92);
        lbl.setAttribute("class", "bar-label");
        lbl.textContent = res.name.substring(0, 7);
        svg.appendChild(lbl);
    });
    barChartContainer.appendChild(svg);

    // Fill Scorecard
    document.getElementById('compWinnerName').innerText = sortedResults[0].name;
    document.getElementById('compWinnerScore').innerText = `${sortedResults[0].score}/100`;
    document.getElementById('compare-winner-text').innerHTML = `Kết luận đối chiếu: Cái tên <strong>"${activeChildData.lastName} ${sortedResults[0].name}"</strong> (Mệnh ${sortedResults[0].wuxing}) là lựa chọn tối ưu nhất với <strong>${sortedResults[0].score} điểm</strong>, giúp bù đắp <strong>${sortedResults[0].filled}</strong> chỉ số khuyết trong biểu đồ và tương thích sâu với bố mẹ. <br/><span class="text-xs text-muted" style="display:block; margin-top: 5px;">${sortedResults[0].meaningText}</span>`;

    // Fill table matrix
    const matrixBody = document.getElementById('compare-matrix-body');
    matrixBody.innerHTML = '';

    // Set headers
    document.getElementById('comp-h-1').innerText = results[0].name;
    document.getElementById('comp-h-2').innerText = results[1].name;

    document.getElementById('comp-h-3').style.display = results[2] ? 'table-cell' : 'none';
    if (results[2]) document.getElementById('comp-h-3').innerText = results[2].name;

    document.getElementById('comp-h-4').style.display = results[3] ? 'table-cell' : 'none';
    if (results[3]) document.getElementById('comp-h-4').innerText = results[3].name;

    document.getElementById('comp-h-5').style.display = results[4] ? 'table-cell' : 'none';
    if (results[4]) document.getElementById('comp-h-5').innerText = results[4].name;

    const categories = [
        { label: "Ý nghĩa Hán Việt (Max 25đ)", key: "meaning" },
        { label: "Tương hợp Thần số học (Max 35đ)", key: "lpAlign" },
        { label: "Bù đắp biểu đồ ngày sinh (Max 20đ)", key: "filled", multiplier: 6 },
        { label: "Dễ phát âm, hài hòa thanh điệu (Max 10đ)", key: "sound" },
        { label: "Độ độc đáo, ít trùng lặp (Max 10đ)", key: "rarity" },
        { label: "Ngũ Hành (Mệnh)", key: "wuxing", isRaw: true },
        { label: "Số Sứ Mệnh (Expression)", key: "expression", isValue: true },
        { label: "Số Linh Hồn (Soul Urge)", key: "soul", isValue: true },
        { label: "Tổng Điểm", key: "score", isScore: true }
    ];

    categories.forEach(cat => {
        let rowHtml = `<tr><td><strong>${cat.label}</strong></td>`;
        results.forEach(res => {
            let val = "";
            if (cat.isValue) val = `<span class="font-serif" style="font-weight:600;">${res[cat.key]}</span>`;
            else if (cat.isScore) val = `<span class="text-pastel-green" style="font-weight:700;">${res[cat.key]}/100</span>`;
            else if (cat.multiplier) val = `${Math.min(20, 5 + res[cat.key] * cat.multiplier)}đ (bù ${res[cat.key]} số)`;
            else if (cat.isRaw) val = `<span class="badge badge-purple">${res[cat.key]}</span>`;
            else val = `${res[cat.key]}đ`;
            rowHtml += `<td>${val}</td>`;
        });
        rowHtml += `</tr>`;
        matrixBody.innerHTML += rowHtml;
    });

    document.getElementById('comparisonChartsSection').style.display = 'block';
    updateCompareQuickInsight(results);
}

// 8 Intelligences Radar Calculations
function getIntelligenceScores(data) {
    const grid = data.gridData.totalGrid;
    const scores = {
        linguistic: 5 + (grid[3] || 0) + (grid[6] || 0),
        logical: 5 + (grid[1] || 0) + (grid[4] || 0) + (grid[7] || 0),
        musical: 6 + (grid[6] || 0) + (grid[2] || 0),
        bodily: 5 + (grid[5] || 0) + (grid[4] || 0),
        spatial: 6 + (grid[9] || 0) + (grid[3] || 0),
        interpersonal: 5 + (grid[2] || 0) + (grid[8] || 0),
        intrapersonal: 6 + (grid[7] || 0) + (data.lp === 11 || data.lp === 7 ? 2 : 0),
        naturalist: 5 + (grid[8] || 0) + (grid[5] || 0)
    };
    for (let key in scores) {
        scores[key] = Math.max(4, Math.min(10, scores[key]));
    }
    return scores;
}

// Draw 8 Intelligences Radar
function drawIntelligencesRadar() {
    const radar = document.getElementById('intelligenceRadar');
    radar.innerHTML = '';

    const scores = getIntelligenceScores(activeChildData);
    const labels = [
        { key: 'linguistic', name: 'Ngôn ngữ' },
        { key: 'logical', name: 'Logic-Toán' },
        { key: 'musical', name: 'Âm nhạc' },
        { key: 'bodily', name: 'Vận động' },
        { key: 'spatial', name: 'Không gian' },
        { key: 'interpersonal', name: 'Giao tiếp' },
        { key: 'intrapersonal', name: 'Nội tâm' },
        { key: 'naturalist', name: 'Thiên nhiên' }
    ];

    const cx = 50;
    const cy = 50;
    const r = 30;
    const count = labels.length;

    // Draw Grid Levels
    for (let level = 1; level <= 4; level++) {
        const radius = (r / 4) * level;
        const polyPoints = [];
        for (let i = 0; i < count; i++) {
            const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
            polyPoints.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
        }
        const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poly.setAttribute("points", polyPoints.join(' '));
        poly.setAttribute("class", "radar-grid");
        radar.appendChild(poly);
    }

    // Draw Axes & Labels
    const valuePoints = [];
    labels.forEach((label, idx) => {
        const angle = (idx * 2 * Math.PI) / count - Math.PI / 2;
        const ax = cx + r * Math.cos(angle);
        const ay = cy + r * Math.sin(angle);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", cx); line.setAttribute("y1", cy);
        line.setAttribute("x2", ax); line.setAttribute("y2", ay);
        line.setAttribute("class", "radar-axis");
        radar.appendChild(line);

        const score = scores[label.key];
        const valRadius = (r / 10) * score;
        valuePoints.push(`${cx + valRadius * Math.cos(angle)},${cy + valRadius * Math.sin(angle)}`);

        // Labels
        const cosVal = Math.cos(angle);
        const lx = cx + (r + (Math.abs(cosVal) < 0.15 ? 5 : 7)) * cosVal;
        const ly = cy + (r + 7) * Math.sin(angle) + 1.5;
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", lx); text.setAttribute("y", ly);
        text.setAttribute("class", "radar-label");
        
        // Dynamically align text labels to avoid overlapping with grid lines
        if (cosVal > 0.15) {
            text.setAttribute("text-anchor", "start");
        } else if (cosVal < -0.15) {
            text.setAttribute("text-anchor", "end");
        } else {
            text.setAttribute("text-anchor", "middle");
        }
        
        text.textContent = label.name;
        radar.appendChild(text);
    });

    // Draw Radar polygon
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", valuePoints.join(' '));
    poly.setAttribute("class", "radar-area");
    radar.appendChild(poly);

    const topContainer = document.getElementById('radarTopStrengths');
    if (topContainer) {
        const topStrengths = [...labels]
            .map(label => ({ label: label.name, score: scores[label.key] }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        topContainer.innerHTML = topStrengths
            .map(item => `<span class="score-pill">${item.label}: ${item.score}/10</span>`)
            .join('');
    }
}

// Parenting logic matches
function renderParentingSuggestions() {
    const data = activeChildData;
    const container = document.getElementById('parenting-tags-container');
    container.innerHTML = '';

    let tags = [];
    let detailText = "";

    if ([1, 4, 7, 8].includes(data.lp)) {
        tags = ["STEM / Khoa học", "Thể thao rèn luyện", "Montessori"];
        detailText = "Bé sở hữu chỉ số thực tế và tư duy độc lập cao. Phù hợp nhất với phương pháp **Montessori** để kích thích tính tự lập và các môn học thực nghiệm khoa học **STEM**.";
    } else if ([3, 5, 9].includes(data.lp)) {
        tags = ["Nghệ thuật sáng tác", "Học qua trải nghiệm", "Reggio Emilia"];
        detailText = "Bé có khả năng sáng tạo và khao khát tự do thể hiện bản thân lớn. Hãy áp dụng tinh thần **Reggio Emilia**, khuyến khích con vẽ, kể chuyện và tự khám phá thiên nhiên.";
    } else { // 2, 6, 11, 22, 33
        tags = ["Học qua âm nhạc", "VAK (Hình ảnh & Âm thanh)", "Kết nối cảm xúc"];
        detailText = "Bé vô cùng nhạy cảm và giàu tình thương. Phương pháp giáo dục lấy tình yêu thương và sự tương tác kết nối gia đình làm gốc, kết hợp với các bài học âm điệu sẽ mang lại kết quả tối ưu.";
    }

    tags.forEach(tag => {
        container.innerHTML += `<span class="tag tag-purple">${tag}</span>`;
    });

    document.getElementById('parenting-detail-text').innerHTML = detailText;
}

// Predefined descriptions mapping
function getLifePathMetadata(lp) {
    const list = {
        1: { title: "Người Dẫn Đường Độc Lập", desc: "Con sở hữu ý chí tự lập cực kỳ mạnh mẽ từ nhỏ. Thích tự mình khám phá, dẫn đầu cuộc chơi và có xu hướng tự lập cao. Cần được tôn trọng quyết định riêng của mình." },
        2: { title: "Sứ Giả Hòa Bình Đồng Cảm", desc: "Con vô cùng nhạy bén trước cảm xúc người khác. Thích sự ôn hòa, yêu chuộng hòa bình và thích chia sẻ đồ chơi với bạn bè. Bé có trực giác tâm lý và khả năng ngoại giao xuất sắc." },
        3: { title: "Nhà Sáng Tạo Đầy Nhiệt Huyết", desc: "Con là đóa hoa rực rỡ, thích ca hát, vẽ tranh và biểu đạt suy nghĩ bằng lời nói linh hoạt. Bé có năng lực ngôn ngữ vượt trội và óc hài hước bẩm sinh." },
        4: { title: "Người Kiến Thiết Thực Tế", desc: "Con thích sự ngăn nắp, kỷ luật và an toàn. Con học hỏi qua những trải nghiệm thực tế trực quan. Bé rất đáng tin cậy, tỉ mỉ và có khả năng sắp xếp đồ chơi khoa học từ bé." },
        5: { title: "Nhà Thám Hiểm Tự Do", desc: "Con là người năng động, tò mò và ưa thích phiêu lưu mạo hiểm. Bé không thích sự gò bó, thích được chạy nhảy ngoài thiên nhiên và tiếp thu bài học cực nhanh qua trải nghiệm thực tế." },
        6: { title: "Người Chăm Sóc Nhân Ái", desc: "Con sở hữu tình yêu thương bao la và tinh thần trách nhiệm gia đình cao. Bé thích dọn dẹp, giúp đỡ mẹ chăm sóc thú cưng hoặc các em nhỏ. Nghệ thuật và hội họa là những người bạn thân thiết của bé." },
        7: { title: "Nhà Triết Học Tò Mò", desc: "Con thích tự đặt ra những câu hỏi 'Tại sao' đầy triết lý. Bé có đời sống nội tâm độc lập, thích chiêm nghiệm thế giới một mình và có khả năng nghiên cứu học thuật vượt trội từ sớm." },
        8: { title: "Nhà Lãnh Đạo Bản Lĩnh", desc: "Con sở hữu bản lĩnh kiên cường, tính độc lập mạnh mẽ và khao khát tự chủ tài chính hoặc tổ chức cuộc chơi. Cần rèn luyện tính kiên nhẫn và lòng vị tha cho bé từ sớm." },
        9: { title: "Nhà Nhân Ái Vĩ Đại", desc: "Con có lý tưởng nhân văn sâu rộng, giàu lòng trắc ẩn trước nỗi đau của động vật hay người nghèo. Bé có xu hướng gánh vác trách nhiệm xã hội lớn khi lớn lên." },
        11: { title: "Người Truyền Cảm Hứng Trực Giác", desc: "Con mang năng lượng kép của số 2 nâng cao, sở hữu trực giác nhạy bén, khả năng tâm linh sâu sắc và sức mạnh truyền cảm hứng kỳ diệu cho cộng đồng xung quanh." },
        22: { title: "Người Kiến Tạo Vĩ Đại", desc: "Con sở hữu năng lượng của người thiết lập những công trình đồ sộ. Bé có óc thực tế siêu việt của số 4 kết hợp tầm nhìn lớn của số 22, có tiềm năng kiến tạo tương lai rộng mở." },
        33: { title: "Người Thầy Chữa Lành Nhân Từ", desc: "Mang năng lượng tình thương cao nhất của số 6 nhân đôi. Con là điểm tựa tinh thần ấm áp cho mọi người xung quanh, thích xoa dịu vết thương của bạn bè, thú cưng bằng sự nhân từ bẩm sinh." }
    };
    return list[lp] || { title: "Năng lượng bí ẩn", desc: "Con sở hữu một tâm hồn đặc biệt giàu năng lực tự nhiên." };
}

function getExpressionTitle(num) {
    const list = {
        1: "Thể hiện bản thân tự chủ, độc lập",
        2: "Khả năng lắng nghe & hòa giải",
        3: "Tư duy sáng tạo & hoạt ngôn",
        4: "Xây dựng nền tảng vững vàng",
        5: "Khao khát thay đổi & phiêu lưu",
        6: "Trách nhiệm gia đình & tình thương",
        7: "Nghiên cứu khoa học & triết lý",
        8: "Khả năng quản lý & làm chủ",
        9: "Hoạt động cộng đồng & chia sẻ",
        11: "Định hướng tâm linh & trực giác",
        22: "Tầm nhìn kiến tạo tầm cỡ lớn",
        33: "Yêu thương vô điều kiện"
    };
    return list[num] || "Chỉ số sứ mệnh năng động";
}

function getSoulUrgeTitle(num) {
    const list = {
        1: "Khao khát độc lập, dẫn đầu",
        2: "Thèm muốn sự kết nối ấm áp",
        3: "Khao khát biểu đạt nghệ thuật",
        4: "Mong ước an toàn, rõ ràng",
        5: "Khao khát khám phá thế giới tự do",
        6: "Khao khát chăm sóc tổ ấm gia đình",
        7: "Mong mỏi tìm kiếm sự chân lý",
        8: "Khao khát tự chủ bản thân",
        9: "Khao khát cống hiến cho đời",
        11: "Khát khao chia sẻ tâm hồn trực giác",
        22: "Khao khát xây dựng giá trị bền vững",
        33: "Khao khát làm chỗ dựa tình thương lớn"
    };
    return list[num] || "Mong ước thầm kín đặc biệt";
}

function getPersonalityTitle(num) {
    const list = {
        1: "Vẻ ngoài tự tin, có phong thái lãnh đạo",
        2: "Dịu dàng, nhã nhặn, dễ thương cảm mến",
        3: "Hoạt ngôn, nhanh nhẹn, vui tươi dí dỏ",
        4: "Nghiêm túc, ngăn nắp, đáng tin cậy",
        5: "Năng động, cuốn hút, ưa thay đổi mới lạ",
        6: "Ấm áp, chăm chút, quan tâm mọi người",
        7: "Khép kín, bí ẩn, ham học hỏi độc lập",
        8: "Đĩnh đạc, bản lĩnh, mạnh mẽ cương trực",
        9: "Thân thiện, bao dung, luôn sẵn sàng giúp đỡ"
    };
    return list[num] || "Cá tính bên ngoài thân thiện";
}

function getBirthdayTitle(num) {
    const list = {
        1: "Năng lực quyết đoán tự lập sớm",
        2: "Nhạy cảm, trực giác tinh tế",
        3: "Khả năng truyền đạt lời nói xuất sắc",
        4: "Tính cẩn trọng tỉ mỉ cao",
        5: "Sức hút đổi mới sáng tạo",
        6: "Năng lực mỹ thuật phong phú",
        7: "Thích tự học qua sách vở",
        8: "Óc tổ chức thực tế nhạy bén",
        9: "Tấm lòng nhân ái rộng mở",
        11: "Trực giác siêu nhạy bén bẩm sinh",
        22: "Tư duy quy mô lớn từ nhỏ"
    };
    return list[num] || "Món quà bẩm sinh cát tường";
}

function getAttitudeTitle(num) {
    const list = {
        1: "Bản lĩnh đối diện thử thách tự lập",
        2: "Tiếp cận mềm mỏng, tránh tranh cãi",
        3: "Phản ứng vui vẻ, lan tỏa tiếng cười",
        4: "Cần thời gian xem xét phân tích kỹ",
        5: "Tò mò tìm kiếm giải pháp đột phá",
        6: "Lo lắng bảo bọc những người xung quanh",
        7: "Tự mình tìm tòi, thích yên tĩnh một mình",
        8: "Giữ phong thái tự tin vững vàng",
        9: "Bao dung, cởi mở tiếp nhận đổi mới"
    };
    return list[num] || "Thái độ phản ứng tự nhiên";
}

function getPersonalMonthDesc(num) {
    const list = {
        1: "Tháng của khởi đầu mới, dự án học tập mới.",
        2: "Tháng của lắng nghe, kết nối tình bạn chan hòa.",
        3: "Tháng của bộc lộ tài năng ngôn ngữ, vẽ tranh nghệ thuật.",
        4: "Tháng của củng cố thói quen ngăn nắp, kỷ luật.",
        5: "Tháng của dã ngoại khám phá, vận động ngoài trời.",
        6: "Tháng của gia đình gắn kết, bồi đắp lòng nhân từ.",
        7: "Tháng của đọc sách, suy ngẫm sâu nội tâm tự lập.",
        8: "Tháng của rèn luyện tính độc lập, tự làm việc cá nhân.",
        9: "Tháng của chia sẻ yêu thương, quyên góp giúp đỡ bạn bè."
    };
    return list[num] || "Thời kỳ tích lũy năng lượng.";
}

function getPersonalDayDesc(num) {
    const list = {
        1: "Ngày lý tưởng để tự giải quyết bài tập cá nhân.",
        2: "Ngày của chia sẻ tình cảm ấm áp ôn hòa.",
        3: "Ngày của ca hát vẽ tranh tươi vui nhộn nhịp.",
        4: "Ngày của dọn dẹp phòng ngủ ngăn nắp gọn gàng.",
        5: "Ngày của vui chơi chạy nhảy học hỏi tự do.",
        6: "Ngày giúp đỡ mẹ nấu cơm, chăm sóc gia đình.",
        7: "Ngày yên tĩnh đọc cuốn sách mới bổ ích.",
        8: "Ngày thể hiện bản lĩnh kiên định làm chủ.",
        9: "Ngày của sự bao dung chia sẻ cởi mở."
    };
    return list[num] || "Ngày bình an cát tường.";
}

function getPersonalYearDesc(num) {
    const list = {
        1: "Năm số 1 (Gieo hạt, Khởi đầu mới): Thời điểm vàng để mở ra dự án mới, thay đổi công việc, bứt phá giới hạn. Áp lực cao nhưng phần thưởng lớn.",
        2: "Năm số 2 (Nuôi dưỡng, Kết nối): Tốc độ chậm lại. Tập trung vào ngoại giao, xây dựng mối quan hệ, lắng nghe trực giác và chăm sóc sức khỏe tinh thần.",
        3: "Năm số 3 (Mở rộng, Học hỏi): Năm của sự sáng tạo, học thêm kỹ năng mới, giao lưu xã hội và thể hiện bản thân. Cẩn trọng khẩu nghiệp.",
        4: "Năm số 4 (Củng cố, Quản trị): Năm của sự chậm rãi, kỷ luật, dọn dẹp hệ thống, mua sắm bất động sản hoặc tích lũy tài sản. Tránh đầu tư mạo hiểm.",
        5: "Năm số 5 (Đột phá, Tự do): Năm của sự dịch chuyển (du lịch, đổi chỗ ở), nhiều cơ hội bất ngờ xuất hiện. Cần giữ chân trên mặt đất để không sa ngã.",
        6: "Năm số 6 (Trách nhiệm, Gia đình): Tâm điểm dồn vào mái ấm, người thân, cống hiến cho cộng đồng. Sáng tạo nghệ thuật thăng hoa.",
        7: "Năm số 7 (Trải nghiệm, Học sâu): Năm đáy chu kỳ (năm trũng). Thường gặp thử thách để quay vào bên trong thiền định, học tập, nghiên cứu. Hạn chế mở rộng kinh doanh lớn.",
        8: "Năm số 8 (Thu hoạch, Tài chính): Năm của sự bùng nổ về mặt vật chất, tiền bạc, cơ hội thăng tiến nếu các năm trước đã gieo hạt tốt. Sức mạnh nhân quả thực thi rõ nhất.",
        9: "Năm số 9 (Buông bỏ, Hoàn thành): Kết thúc chu kỳ cũ. Khép lại những mối quan hệ độc hại, tha thứ, dọn dẹp quá khứ để chuẩn bị cho một hạt giống mới ở năm số 1 tiếp theo."
    };
    return list[num] || "Giai đoạn tích lũy vận hành năng lượng mới.";
}

function getChallengeAdvice(val) {
    const info = getChallengeInfo(val);
    if (info) return info.lesson;
    return "Giữ vững tinh thần cởi mở học hỏi.";
}

// Family compatibility UI (TAB 3)
function getFengShuiElement(dobStr) {
    if (!dobStr) return { element: "Không rõ", detail: "Chưa rõ", color: "var(--text-muted)" };
    const parts = dobStr.split('-');
    const year = parseInt(parts[0]);
    if (isNaN(year)) return { element: "Không rõ", detail: "Chưa rõ", color: "var(--text-muted)" };

    const yearElements = {
        1970: { element: "Kim", detail: "Thoa Xuyến Kim", color: "#e6c229" },
        1971: { element: "Kim", detail: "Thoa Xuyến Kim", color: "#e6c229" },
        1972: { element: "Mộc", detail: "Tang Đố Mộc", color: "#2ec4b6" },
        1973: { element: "Mộc", detail: "Tang Đố Mộc", color: "#2ec4b6" },
        1974: { element: "Thủy", detail: "Đại Khê Thủy", color: "#0077b6" },
        1975: { element: "Thủy", detail: "Đại Khê Thủy", color: "#0077b6" },
        1976: { element: "Thổ", detail: "Sa Trung Thổ", color: "#b5838d" },
        1977: { element: "Thổ", detail: "Sa Trung Thổ", color: "#b5838d" },
        1978: { element: "Hỏa", detail: "Thiên Thượng Hỏa", color: "#e63946" },
        1979: { element: "Hỏa", detail: "Thiên Thượng Hỏa", color: "#e63946" },
        1980: { element: "Mộc", detail: "Thạch Lựu Mộc", color: "#2ec4b6" },
        1981: { element: "Mộc", detail: "Thạch Lựu Mộc", color: "#2ec4b6" },
        1982: { element: "Thủy", detail: "Đại Hải Thủy", color: "#0077b6" },
        1983: { element: "Thủy", detail: "Đại Hải Thủy", color: "#0077b6" },
        1984: { element: "Kim", detail: "Hải Trung Kim", color: "#e6c229" },
        1985: { element: "Kim", detail: "Hải Trung Kim", color: "#e6c229" },
        1986: { element: "Hỏa", detail: "Lư Trung Hỏa", color: "#e63946" },
        1987: { element: "Hỏa", detail: "Lư Trung Hỏa", color: "#e63946" },
        1988: { element: "Mộc", detail: "Đại Lâm Mộc", color: "#2ec4b6" },
        1989: { element: "Mộc", detail: "Đại Lâm Mộc", color: "#2ec4b6" },
        1990: { element: "Thổ", detail: "Lộ Bàng Thổ", color: "#b5838d" },
        1991: { element: "Thổ", detail: "Lộ Bàng Thổ", color: "#b5838d" },
        1992: { element: "Kim", detail: "Kiếm Phong Kim", color: "#e6c229" },
        1993: { element: "Kim", detail: "Kiếm Phong Kim", color: "#e6c229" },
        1994: { element: "Hỏa", detail: "Sơn Đầu Hỏa", color: "#e63946" },
        1995: { element: "Hỏa", detail: "Sơn Đầu Hỏa", color: "#e63946" },
        1996: { element: "Thủy", detail: "Giản Hạ Thủy", color: "#0077b6" },
        1997: { element: "Thủy", detail: "Giản Hạ Thủy", color: "#0077b6" },
        1998: { element: "Thổ", detail: "Thành Đầu Thổ", color: "#b5838d" },
        1999: { element: "Thổ", detail: "Thành Đầu Thổ", color: "#b5838d" },
        2000: { element: "Kim", detail: "Bạch Lạp Kim", color: "#e6c229" },
        2001: { element: "Kim", detail: "Bạch Lạp Kim", color: "#e6c229" },
        2002: { element: "Mộc", detail: "Dương Liễu Mộc", color: "#2ec4b6" },
        2003: { element: "Mộc", detail: "Dương Liễu Mộc", color: "#2ec4b6" },
        2004: { element: "Thủy", detail: "Tuyền Trung Thủy", color: "#0077b6" },
        2005: { element: "Thủy", detail: "Tuyền Trung Thủy", color: "#0077b6" },
        2006: { element: "Thổ", detail: "Ốc Thượng Thổ", color: "#b5838d" },
        2007: { element: "Thổ", detail: "Ốc Thượng Thổ", color: "#b5838d" },
        2008: { element: "Hỏa", detail: "Tích Lịch Hỏa", color: "#e63946" },
        2009: { element: "Hỏa", detail: "Tích Lịch Hỏa", color: "#e63946" },
        2010: { element: "Mộc", detail: "Tùng Bách Mộc", color: "#2ec4b6" },
        2011: { element: "Mộc", detail: "Tùng Bách Mộc", color: "#2ec4b6" },
        2012: { element: "Thủy", detail: "Trường Lưu Thủy", color: "#0077b6" },
        2013: { element: "Thủy", detail: "Trường Lưu Thủy", color: "#0077b6" },
        2014: { element: "Kim", detail: "Sa Trung Kim", color: "#e6c229" },
        2015: { element: "Kim", detail: "Sa Trung Kim", color: "#e6c229" },
        2016: { element: "Hỏa", detail: "Sơn Hạ Hỏa", color: "#e63946" },
        2017: { element: "Hỏa", detail: "Sơn Hạ Hỏa", color: "#e63946" },
        2018: { element: "Mộc", detail: "Bình Địa Mộc", color: "#2ec4b6" },
        2019: { element: "Mộc", detail: "Bình Địa Mộc", color: "#2ec4b6" },
        2020: { element: "Thổ", detail: "Bích Thượng Thổ", color: "#b5838d" },
        2021: { element: "Thổ", detail: "Bích Thượng Thổ", color: "#b5838d" },
        2022: { element: "Kim", detail: "Kim Bạch Kim", color: "#e6c229" },
        2023: { element: "Kim", detail: "Kim Bạch Kim", color: "#e6c229" },
        2024: { element: "Hỏa", detail: "Phú Đăng Hỏa", color: "#e63946" },
        2025: { element: "Hỏa", detail: "Phú Đăng Hỏa", color: "#e63946" },
        2026: { element: "Thủy", detail: "Thiên Hà Thủy", color: "#0077b6" },
        2027: { element: "Thủy", detail: "Thiên Hà Thủy", color: "#0077b6" },
        2028: { element: "Thổ", detail: "Đại Trạch Thổ", color: "#b5838d" },
        2029: { element: "Thổ", detail: "Đại Trạch Thổ", color: "#b5838d" },
        2030: { element: "Kim", detail: "Thoa Xuyến Kim", color: "#e6c229" }
    };
    return yearElements[year] || { element: "Thổ", detail: "Lộ Bàng Thổ", color: "#b5838d" };
}

function getNguHanhCompatibility(conEl, phuHuynhEl) {
    const sinh = { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" };
    const khac = { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" };

    if (sinh[phuHuynhEl] === conEl) {
        return { type: "Sinh", label: "Tương Sinh (Bố/Mẹ trợ sinh Con - Rất tốt)", desc: "Mệnh ngũ hành của bố/mẹ nuôi dưỡng bản mệnh bé, tạo phúc lành và bệ đỡ tốt." };
    }
    if (sinh[conEl] === phuHuynhEl) {
        return { type: "Sinh", label: "Tương Sinh (Con trợ sinh Bố/Mẹ - Tốt)", desc: "Bé sinh ra mang lại may mắn, vượng phát và sự hanh thông tài lộc cho bố mẹ." };
    }
    if (khac[phuHuynhEl] === conEl) {
        return { type: "Khắc", label: "Tương Khắc (Bố/Mẹ khắc Con - Hơi áp lực)", desc: "Cha mẹ cần kiềm chế tính nóng giận, giáo dục ôn hòa và thấu hiểu góc nhìn riêng của bé." };
    }
    if (khac[conEl] === phuHuynhEl) {
        return { type: "Khắc", label: "Tương Khắc (Con khắc Bố/Mẹ - Cần kiên nhẫn)", desc: "Bé bướng bỉnh dễ cãi lại. Cha mẹ nên làm bạn cùng con thay vì áp chế thô bạo." };
    }
    return { type: "Hòa", label: "Bình Hòa (Hòa hợp tự nhiên)", desc: "Bản mệnh tương hòa tự nhiên, quan hệ gia đình hòa thuận ổn định." };
}

function updateCompatibilityUI() {
    const data = activeChildData;
    const availableSection = document.getElementById('compatibility-available-section');
    const missingSection = document.getElementById('compatibility-missing-section');

    const fatherName = data.parents.fatherName;
    const fatherDob = data.parents.fatherDob;
    const motherName = data.parents.motherName;
    const motherDob = data.parents.motherDob;

    if ((!fatherName || !fatherDob) && (!motherName || !motherDob)) {
        availableSection.style.display = 'none';
        missingSection.style.display = 'block';
        updateCompatibilityQuickInsight();
        return;
    }

    availableSection.style.display = 'block';
    missingSection.style.display = 'none';

    let parentsCount = 0;
    let totalScore = 0;

    const harmonyList = document.getElementById('compat-harmony-list');
    const conflictList = document.getElementById('compat-conflict-list');
    harmonyList.innerHTML = '';
    conflictList.innerHTML = '';

    const friendlyGroups = [
        [1, 5, 7],
        [2, 4, 8, 11, 22],
        [3, 6, 9, 33]
    ];

    function areFriendly(n1, n2) {
        n1 = reduceNumber(n1, false);
        n2 = reduceNumber(n2, false);
        if (n1 === n2) return true;
        for (let g of friendlyGroups) {
            if (g.includes(n1) && g.includes(n2)) return true;
        }
        return false;
    }

    const childFS = getFengShuiElement(data.dob);

    let cardsHtml = '';
    let analysisText = '';

    // Card for child
    cardsHtml += `
        <div class="glass-card text-center" style="border-top: 4px solid ${childFS.color};">
            <span style="font-size:1.8rem;">👶</span>
            <h4 style="margin-top:6px;">Con: ${data.firstName || 'Bé'}</h4>
            <p class="text-sm">Mệnh Niên: <strong style="color:${childFS.color};">${childFS.element} (${childFS.detail})</strong></p>
        </div>
    `;

    if (fatherName && fatherDob) {
        parentsCount++;
        const pLpObj = RuleEngine.calculateLifePath(fatherDob);
        const pNames = RuleEngine.calculateNameNumbers(fatherName);

        let score = 70;
        if (areFriendly(data.lp, pLpObj.lifePath)) {
            score += 15;
            harmonyList.innerHTML += `<li>Đường đời của con (${data.lp}) và Bố (${pLpObj.lifePath}) cùng nhóm tương hợp. Bố và bé có chung nhiều quan điểm sống và phong cách định hướng.</li>`;
        } else {
            score -= 10;
            conflictList.innerHTML += `<li>Đường đời khác biệt giữa con (${data.lp}) và Bố (${pLpObj.lifePath}). Bố nên lắng nghe cá tính riêng của con, kiên nhẫn hơn thay vì áp đặt phong cách của mình.</li>`;
        }

        if (areFriendly(data.soulUrge, pNames.soulUrge)) {
            score += 15;
            harmonyList.innerHTML += `<li>Linh hồn con (${data.soulUrge}) hòa nhịp sâu sắc với khát khao của Bố (${pNames.soulUrge}). Bố rất dễ hiểu tâm sự thầm kín của con.</li>`;
        }
        totalScore += score;

        // Feng Shui for Father
        const fatherFS = getFengShuiElement(fatherDob);
        const compat = getNguHanhCompatibility(childFS.element, fatherFS.element);
        cardsHtml += `
            <div class="glass-card text-center" style="border-top: 4px solid ${fatherFS.color};">
                <span style="font-size:1.8rem;">👨</span>
                <h4 style="margin-top:6px;">Bố: ${fatherName}</h4>
                <p class="text-sm">Mệnh Niên: <strong style="color:${fatherFS.color};">${fatherFS.element} (${fatherFS.detail})</strong></p>
                <span class="badge ${compat.type === 'Sinh' ? 'bg-success' : compat.type === 'Khắc' ? 'bg-danger' : 'bg-secondary'}" style="font-size:0.75rem; margin-top:8px; display:inline-block;">${compat.label}</span>
            </div>
        `;
        analysisText += `<p><strong>Tương quan phong thủy với Bố:</strong> ${compat.desc}</p>`;
    }

    if (motherName && motherDob) {
        parentsCount++;
        const pLpObj = RuleEngine.calculateLifePath(motherDob);
        const pNames = RuleEngine.calculateNameNumbers(motherName);

        let score = 70;
        if (areFriendly(data.lp, pLpObj.lifePath)) {
            score += 15;
            harmonyList.innerHTML += `<li>Mẹ (${pLpObj.lifePath}) và con (${data.lp}) nằm trong trục số hỗ tương. Mẹ là chỗ dựa tinh thần xuất sắc cho hướng đi của con.</li>`;
        } else {
            score -= 10;
            conflictList.innerHTML += `<li>Đường đời của con (${data.lp}) và Mẹ (${pLpObj.lifePath}) lệch pha. Mẹ cần tránh can thiệp quá sâu vào cách con xử lý cảm xúc riêng.</li>`;
        }

        if (areFriendly(data.soulUrge, pNames.soulUrge)) {
            score += 15;
            harmonyList.innerHTML += `<li>Linh hồn con (${data.soulUrge}) tương hợp mạnh mẽ với Mẹ (${pNames.soulUrge}). Con tìm thấy sự êm ấm tuyệt đối khi tâm sự với Mẹ.</li>`;
        }
        totalScore += score;

        // Feng Shui for Mother
        const motherFS = getFengShuiElement(motherDob);
        const compat = getNguHanhCompatibility(childFS.element, motherFS.element);
        cardsHtml += `
            <div class="glass-card text-center" style="border-top: 4px solid ${motherFS.color};">
                <span style="font-size:1.8rem;">👩</span>
                <h4 style="margin-top:6px;">Mẹ: ${motherName}</h4>
                <p class="text-sm">Mệnh Niên: <strong style="color:${motherFS.color};">${motherFS.element} (${motherFS.detail})</strong></p>
                <span class="badge ${compat.type === 'Sinh' ? 'bg-success' : compat.type === 'Khắc' ? 'bg-danger' : 'bg-secondary'}" style="font-size:0.75rem; margin-top:8px; display:inline-block;">${compat.label}</span>
            </div>
        `;
        analysisText += `<p style="margin-top:6px;"><strong>Tương quan phong thủy với Mẹ:</strong> ${compat.desc}</p>`;
    }

    // Populate Feng Shui layout
    document.getElementById('compat-fengshui-cards').innerHTML = cardsHtml;
    document.getElementById('compat-fengshui-analysis-content').innerHTML = analysisText;

    const finalScore = Math.min(100, Math.round(totalScore / parentsCount));

    document.getElementById('compat-score').innerText = finalScore;
    document.getElementById('compat-progress-bar').style.width = finalScore + '%';

    let levelTitle = "Mức độ: Hòa hợp Trung bình";
    let introText = "Năng lượng gia đình tương tác ổn định. Một số mặt tính cách khác biệt đòi hỏi cha mẹ kiên trì lắng nghe nhu cầu của bé.";
    if (finalScore >= 85) {
        levelTitle = "Mức độ: Rất Tương Thích & Gắn Kết";
        introText = "Năng lượng kết nối gia đình đạt chỉ số tuyệt vời. Bé dễ dàng cảm nhận sự ấm áp và sẵn sàng hợp tác khi được cha mẹ định hướng giáo dục đúng đắn.";
    } else if (finalScore < 70) {
        levelTitle = "Mức độ: Cần Nhiều Thấu Hiểu";
        introText = "Có những khoảng cách vô hình về cách tư duy và lối sống. Hãy kiên trì học hỏi các bài học về sự nhẫn nại, tôn trọng thế giới nội tâm của nhau.";
    }

    document.getElementById('compat-level-title').innerText = levelTitle;
    document.getElementById('compat-intro-text').innerText = introText;
    updateCompatibilityQuickInsight(finalScore, harmonyList.children.length, conflictList.children.length);
}

// Generate Home Names (TAB 4 bottom)
function updateHomeNamesUI(missingNumbers) {
    const listContainer = document.getElementById('home-names-suggestions');
    listContainer.innerHTML = '';

    const homeNamesMap = {
        1: ["Leo", "Tép", "Tôm", "Gạo"],
        2: ["Chit", "Miu", "Đậu", "Mun"],
        3: ["Bé Ngoan", "Nini", "Tẹt", "Sữa"],
        4: ["Mon", "Mimi", "Kiki", "Bơ"],
        5: ["Bin", "Ben", "Bon", "Nene"],
        6: ["Xu Xu", "Thỏ", "Gấu", "Kem"],
        7: ["Sam", "Sóc", "Cá", "Dứa"],
        8: ["Bim", "Nem", "Rio", "Ken"],
        9: ["Bo", "Sunny", "Jerry", "Mickey"]
    };

    let suggestions = [];
    if (!missingNumbers || missingNumbers.length === 0) {
        suggestions = ["Bin", "Bo", "Ben", "Mon", "Miu"];
    } else {
        missingNumbers.slice(0, 3).forEach(num => {
            const list = homeNamesMap[num] || [];
            suggestions = suggestions.concat(list);
        });
    }

    suggestions = [...new Set(suggestions)].slice(0, 8);
    suggestions.forEach(name => {
        const nameVal = RuleEngine.calculateNameNumbers(name).expression;
        listContainer.innerHTML += `
            <div class="home-name-item">
                ${name}
                <span class="home-name-num" style="display:block; font-size:0.7rem; font-weight:normal; color:var(--text-muted); margin-top:2px;">Sứ Mệnh: ${nameVal}</span>
            </div>
        `;
    });
}

// Render Home Name Energy Analysis (MODULE - Tên ở nhà / Biệt danh)
function renderHomeNameEnergy() {
    if (!activeChildData) return;
    const section = document.getElementById('home-name-energy-section');
    const content = document.getElementById('home-name-energy-content');
    if (!section || !content) return;

    const homeName = activeChildData.homeName;
    if (!homeName) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';

    // Calculate the Expression number for the home name
    const homeNameNums = RuleEngine.calculateNameNumbers(homeName);
    const homeExp = homeNameNums.expression;
    const homeExpRaw = homeNameNums.expressionRaw;

    // Get meaning for the home name expression
    const expInfo = NUMEROLOGY_DETAILS[homeExp] || NUMEROLOGY_DETAILS[reduceNumber(homeExp, false)];
    const numMeaning = NUMBER_MEANINGS[homeExp] || NUMBER_MEANINGS[reduceNumber(homeExp, false)];

    // Build master number badge
    const isMaster = [11, 22, 33].includes(homeExp);
    const masterBadge = isMaster ? `<span style="background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-size:0.7rem; padding:2px 6px; border-radius:10px; margin-left:6px;">✨ Master</span>` : '';

    content.innerHTML = `
        <div style="display:grid; grid-template-columns: auto 1fr; gap:16px; align-items:start; margin-bottom:16px;">
            <div style="text-align:center; background:rgba(139,92,246,0.1); border-radius:12px; padding:16px 20px; min-width:80px;">
                <div style="font-size:2.2rem; font-weight:800; color:var(--pastel-purple); line-height:1;">${homeExp}</div>
                <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">Năng lượng</div>
                ${isMaster ? `<div style="font-size:0.65rem; color:#f59e0b; margin-top:3px;">★ Master ${homeExp}</div>` : ''}
            </div>
            <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                    <span style="font-size:1rem; font-weight:700; color:var(--text-primary);">Tên ở nhà: <em style="color:var(--pastel-purple);">"${homeName}"</em></span>
                    ${masterBadge}
                </div>
                <p class="text-xs text-muted" style="line-height:1.5;">
                    Quy đổi: <strong>${stripAccents(homeName)}</strong> → Tổng giá trị: <strong>${homeExpRaw}</strong> → Rút gọn: <strong>${homeExp}</strong>
                </p>
                ${numMeaning ? `<p class="text-xs" style="margin-top:6px; color:${numMeaning.color};">${numMeaning.vi} — ${numMeaning.traits.join(' · ')}</p>` : ''}
            </div>
        </div>

        ${expInfo ? `
        <div style="background:rgba(139,92,246,0.05); border-radius:8px; padding:12px; margin-bottom:12px;">
            <p class="text-xs text-muted" style="line-height:1.6;"><strong>🔮 Biểu hiện khi ở nhà:</strong> ${expInfo.overview}</p>
            ${expInfo.strengths ? `<p class="text-xs" style="margin-top:6px; color:#34d399;"><strong>✅ Điểm mạnh:</strong> ${expInfo.strengths}</p>` : ''}
            ${expInfo.weaknesses ? `<p class="text-xs" style="margin-top:4px; color:#f87171;"><strong>⚠️ Cần chú ý:</strong> ${expInfo.weaknesses}</p>` : ''}
        </div>
        ` : ''}

        <div style="background:rgba(139,92,246,0.08); border-radius:8px; padding:10px;">
            <p class="text-xs" style="line-height:1.6; font-style:italic;">
                <strong>💡 Gợi ý cho cha mẹ:</strong>
                Khi bé nghe tên <em>"${homeName}"</em> được gọi liên tục, bé sẽ tiếp nhận năng lượng của số <strong>${homeExp}</strong>.
                ${activeChildData.firstName ? `So sánh với tên khai sinh (Sứ Mệnh số <strong>${activeChildData.expression}</strong>), tên ở nhà ${homeExp === activeChildData.expression ? 'củng cố thêm' : 'bổ sung'} một luồng năng lượng ${homeExp === activeChildData.expression ? 'cùng tần số' : 'phụ'} trong môi trường gia đình.` : ''}
            </p>
        </div>
    `;
}


function generateAIReport() {
    if (!activeChildData) return;
    
    // Ensure all visual charts are rendered in the DOM before we clone them
    renderIdentityTabCharts();
    renderPinnaclePyramid();
    
    document.getElementById('aiReportPlaceholder').style.display = 'none';
    document.getElementById('aiReportContent').style.display = 'block';
    
    const c = activeChildData;
    const nameStr = `${c.lastName} ${c.middleName} ${c.firstName}`.trim();
    document.getElementById('report-child-name').innerText = nameStr;
    document.getElementById('report-child-meta').innerText = `Ngày sinh: ${c.dob} | Giới tính: ${c.gender}`;
    
    // 1. Core Numbers
    document.getElementById('report-core-numbers').innerHTML = `
        <div class="report-stat"><div class="report-stat-val">${c.lp}</div><div class="report-stat-lbl">Đường Đời</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.expression || '-'}</div><div class="report-stat-lbl">Sứ Mệnh</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.soulUrge || '-'}</div><div class="report-stat-lbl">Linh Hồn</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.personality || '-'}</div><div class="report-stat-lbl">Nhân Cách</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.birthday}</div><div class="report-stat-lbl">Ngày Sinh</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.attitude}</div><div class="report-stat-lbl">Thái Độ</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.maturity || '-'}</div><div class="report-stat-lbl">Trưởng Thành</div></div>
        <div class="report-stat"><div class="report-stat-val">${c.rationalThought || '-'}</div><div class="report-stat-lbl">Tư Duy Lý Trí</div></div>
    `;
    
    // 2. Life Path
    document.getElementById('report-life-path-analysis').innerHTML = `
        <p><strong>Năng lượng chủ đạo (Số ${c.lp}):</strong> ${getLifePathMetadata(c.lp).desc}</p>
        <p>Đường đời đại diện cho bài học lớn nhất mà bé sẽ học. Số ${c.lp} mang năng lượng đặc trưng cần được khai phá qua thời gian.</p>
    `;
    
    // 3. Clone Thân Tâm Trí sliders
    const originalSliders = document.getElementById('tttSliders');
    const reportSliders = document.getElementById('report-ttt-sliders');
    if (originalSliders && reportSliders) {
        reportSliders.innerHTML = originalSliders.innerHTML;
    }
    
    // 4. Draw separated DOB and Name grids in Report
    const dobGridReport = document.getElementById('report-dob-grid');
    const dobOverlayReport = document.getElementById('report-dob-overlay');
    if (dobGridReport && dobOverlayReport) {
        let gridHTML = '';
        [3, 6, 9, 2, 5, 8, 1, 4, 7].forEach(num => {
            const count = c.gridData.dobGrid[num] || 0;
            const content = count > 0 ? `<span class="cell-num">${num}</span><span class="cell-count" style="color:var(--primary); font-weight:bold;">${'•'.repeat(count)}</span>` : `<span class="cell-num" style="opacity:0.2">${num}</span>`;
            gridHTML += `<div class="pitago-cell ${count > 0 ? 'has-number' : ''}" style="${count > 0 ? 'border-color:var(--primary);' : ''}">${content}</div>`;
        });
        dobGridReport.innerHTML = gridHTML;
        
        const originalDobOverlay = document.getElementById('dobArrowsOverlay');
        if (originalDobOverlay) {
            dobOverlayReport.innerHTML = originalDobOverlay.innerHTML;
        }
    }

    const nameGridReport = document.getElementById('report-name-grid');
    const nameOverlayReport = document.getElementById('report-name-overlay');
    if (nameGridReport && nameOverlayReport) {
        let gridHTML = '';
        [3, 6, 9, 2, 5, 8, 1, 4, 7].forEach(num => {
            const count = c.gridData.nameGrid[num] || 0;
            const content = count > 0 ? `<span class="cell-num">${num}</span><span class="cell-count" style="color:var(--accent-pink); font-weight:bold;">${'•'.repeat(count)}</span>` : `<span class="cell-num" style="opacity:0.2">${num}</span>`;
            gridHTML += `<div class="pitago-cell ${count > 0 ? 'has-number' : ''}" style="${count > 0 ? 'border-color:var(--accent-pink);' : ''}">${content}</div>`;
        });
        nameGridReport.innerHTML = gridHTML;
        
        const originalNameOverlay = document.getElementById('nameArrowsOverlay');
        if (originalNameOverlay) {
            nameOverlayReport.innerHTML = originalNameOverlay.innerHTML;
        }
    }
    
    // Missing Numbers Text
    const missing = c.gridData.emptyArrows.map(a => a.name).join(', ') || 'Không có';
    const missingNums = [];
    for (let i = 1; i <= 9; i++) { if (!c.gridData.totalGrid[i]) missingNums.push(i); }
    document.getElementById('report-missing-numbers').innerHTML = `
        <p><strong>Số khuyết tổng hợp:</strong> ${missingNums.length > 0 ? missingNums.join(', ') : 'Không có'}</p>
        <p><strong>Mũi tên trống từ ngày sinh:</strong> ${missing}</p>
    `;
    
    // 5. Clone Pyramid
    const pyramidContainer = document.getElementById('report-pyramid-container');
    const originalPyramidSvg = document.getElementById('pinnaclesPyramidSvg');
    if (pyramidContainer && originalPyramidSvg) {
        pyramidContainer.innerHTML = '';
        const clonedSvg = originalPyramidSvg.cloneNode(true);
        const lines = clonedSvg.querySelectorAll('.pyramid-edge-sub, .pyramid-edge-main, .pyramid-edge-draw');
        lines.forEach(l => {
            l.style.animation = 'none';
            l.style.strokeDashoffset = '0';
        });
        const layers = clonedSvg.querySelectorAll('.pyramid-layer');
        layers.forEach(l => {
            l.style.opacity = '1';
        });
        pyramidContainer.appendChild(clonedSvg);
    }
    
    // Pinnacles List
    if (c.timeline && c.timeline.pinnacles) {
        document.getElementById('report-pinnacles').innerHTML = c.timeline.pinnacles.map((p, i) => {
            const chVal = c.timeline.challenges[i].val;
            const chInfo = getChallengeInfo(chVal);
            return `
            <div class="report-pinnacle-card" style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid rgba(255,255,255,0.1);">
                <div><strong>Đỉnh ${p.num} (Tuổi ${p.age})</strong> - Số ${p.val}</div>
                <div class="text-sm">Thử thách ${chVal}${chInfo ? `: ${chInfo.title.split(':')[0]}` : ''}</div>
            </div>
        `;
        }).join('');
    }

    const maturityInfo = c.maturity ? getMaturityInfo(c.maturity) : null;
    const rationalInfo = c.rationalThought ? getRationalThoughtInfo(c.rationalThought) : null;
    const maturityRationalHtml = `
        ${maturityInfo ? `<p class="margin-top-md"><strong>Chỉ số Trưởng Thành (${c.maturity}):</strong> ${maturityInfo.desc}</p>` : ''}
        ${rationalInfo ? `<p class="margin-top-sm"><strong>Chỉ số Tư Duy Lý Trí (${c.rationalThought}):</strong> ${rationalInfo.desc}</p>` : ''}
    `;
    
    document.getElementById('report-personal-year').innerHTML = `
        <p><strong>Năm cá nhân hiện tại:</strong> Số ${c.personalYear}</p>
        <p class="text-sm">${getPersonalYearDesc(c.personalYear)}</p>
        ${maturityRationalHtml}
    `;

    // 6. Expert Conflict Check (Module 7 & Phối hợp chỉ số)
    const conflictSection = document.getElementById('report-expert-conflict-section');
    const conflictContent = document.getElementById('report-expert-conflict-content');
    if (conflictSection && conflictContent) {
        let conflictsHtml = '';
        let hasConflict = false;

        // Check Soul Urge vs Life Path
        if (c.soulUrge === 7 && (c.lp === 3 || c.lp === 5)) {
            hasConflict = true;
            conflictsHtml += `
                <div class="karmic-debt-card" style="background: rgba(239, 68, 68, 0.04); border-color: rgba(239, 68, 68, 0.15); margin-bottom: 12px;">
                    <strong>⚠️ Mâu thuẫn Linh Hồn 7 vs Đường Đời ${c.lp}</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">Bên trong (Linh hồn 7) khao khát một mình nghiên cứu, chiêm nghiệm triết lý sâu sắc, nhưng hoàn cảnh cuộc đời (Đường đời ${c.lp}) đòi hỏi con phải hướng ngoại, di chuyển liên tục, nói cười trước đám đông.</p>
                    <p style="margin-top: 6px; font-weight: bold; color: var(--primary);">🍀 Giải pháp chữa lành: Con cần được tôn trọng không gian riêng tư. Hãy tạo lập thói quen ngắt kết nối internet 1-2 tiếng mỗi ngày để sạc lại năng lượng bản thể.</p>
                </div>
            `;
        }
        if (c.soulUrge === 5 && (c.lp === 4 || c.lp === 22)) {
            hasConflict = true;
            conflictsHtml += `
                <div class="karmic-debt-card" style="background: rgba(239, 68, 68, 0.04); border-color: rgba(239, 68, 68, 0.15); margin-bottom: 12px;">
                    <strong>⚠️ Mâu thuẫn Linh Hồn 5 vs Đường Đời ${c.lp}</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">Bên trong khao khát tự do, bay nhảy sáng tạo không giới hạn, nhưng hoàn cảnh bắt buộc con phải làm việc dưới kỷ luật sắt, đóng khung, quy chuẩn chặt chẽ.</p>
                    <p style="margin-top: 6px; font-weight: bold; color: var(--primary);">🍀 Giải pháp chữa lành: Hãy giúp con tìm thấy sự tự do sáng tạo ngay trong khuôn khổ kỷ luật, lồng ghép các bài tập đổi mới phương pháp làm việc.</p>
                </div>
            `;
        }

        // Check Day of Birth vs Expression (Synergy)
        if (c.birthday === 7 && c.expression === 8) {
            hasConflict = true;
            conflictsHtml += `
                <div class="karmic-debt-card" style="background: rgba(16, 185, 129, 0.04); border-color: rgba(16, 185, 129, 0.15); margin-bottom: 12px;">
                    <strong>✨ Điểm Bổ Trợ Đặc Biệt: Ngày Sinh 7 & Sứ Mệnh 8</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">Con sở hữu năng lực tự học xuất sắc, khả năng đào sâu chuyên môn và trực giác kỹ thuật cực tốt (số 7) làm bệ phóng vững chắc để hiện thực hóa ước mơ xây dựng tài chính và cơ nghiệp lớn (số 8).</p>
                </div>
            `;
        }
        if (c.birthday === 3 && c.expression === 6) {
            hasConflict = true;
            conflictsHtml += `
                <div class="karmic-debt-card" style="background: rgba(16, 185, 129, 0.04); border-color: rgba(16, 185, 129, 0.15); margin-bottom: 12px;">
                    <strong>✨ Điểm Bổ Trợ Đặc Biệt: Ngày Sinh 3 & Sứ Mệnh 6</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">Con có biệt tài hoạt ngôn, lan tỏa năng lượng tích cực bằng lời nói (số 3). Hãy tận dụng tối đa thế mạnh này để thực hiện sứ mệnh kết nối, yêu thương và chữa lành gia đình/tổ chức (số 6).</p>
                </div>
            `;
        }

        // Year vs Karmic Debt combined check
        const debtObj = c.lpHasDebt || (c.nameDetails && c.nameDetails.karmicLessons && c.nameDetails.karmicLessons.length > 0);
        if (c.personalYear === 7 && debtObj) {
            hasConflict = true;
            conflictsHtml += `
                <div class="karmic-debt-card" style="background: rgba(255, 193, 7, 0.04); border-color: rgba(255, 193, 7, 0.15); margin-bottom: 12px;">
                    <strong>⚠️ Phối Hợp Dự Báo: Năm Cá Nhân 7 & Cảnh Báo Nợ Nghiệp</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">Năm nay con đang ở năm cá nhân số 7 (năm đáy trũng của sự chiêm nghiệm) kết hợp với các chỉ số nợ nghiệp đang hiện diện. Đây là thời kỳ tuyệt đối không nên mở rộng đầu tư tài chính liều lĩnh, hãy tập trung vào học tập nghiên cứu và quay vào thế giới nội tâm để tích lũy sức mạnh.</p>
                </div>
            `;
        }

        if (hasConflict) {
            conflictSection.style.display = 'block';
            conflictContent.innerHTML = conflictsHtml;
        } else {
            // General expert summary if no direct match
            conflictSection.style.display = 'block';
            conflictContent.innerHTML = `
                <div class="karmic-debt-card" style="background: rgba(110, 198, 255, 0.04); border-color: rgba(110, 198, 255, 0.15);">
                    <strong>💡 Đánh Giá Tổng Quan Từ Chuyên Gia</strong>
                    <p style="margin-top: 4px; font-size: 0.85rem;">Năng lượng bản thể của bé tương đối hài hòa. Con đường sự nghiệp học tập tương đối thẳng hướng. Cha mẹ nên bồi dưỡng các trục mũi tên còn thiếu thông qua đặt tên phù hợp và rèn luyện thói quen kỷ luật tự lập mỗi ngày.</p>
                </div>
            `;
        }
}
}

// Initial calculation on page load
window.addEventListener('DOMContentLoaded', () => {
    restoreThemePreference();
    primePremiumMotion();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
    calculateNumerology();
});
