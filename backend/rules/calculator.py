import unicodedata
from typing import List, Dict, Tuple, Set, Optional

# Letter mapping for Pythagorean numerology
PYTHAGOREAN_MAP = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
}

def strip_accents_vietnamese(text: str) -> str:
    """
    Normalizes Vietnamese string to standard ASCII capital letters.
    E.g. "Phan Minh Khuê Anh" -> "PHAN MINH KHUE ANH"
    """
    if not text:
        return ""
    # Convert 'Đ'/'đ' manually first
    text = text.replace('Đ', 'D').replace('đ', 'd')
    # Normalize unicode to separate characters from accents
    nfd_form = unicodedata.normalize('NFD', text)
    # Remove combining marks (Mn category)
    stripped = "".join(c for c in nfd_form if unicodedata.category(c) != 'Mn')
    # Return uppercase alphanumeric + space only
    clean = "".join(c.upper() for c in stripped if c.isalnum() or c.isspace())
    return clean

def is_vietnamese_vowel(char: str) -> bool:
    return char in ['A', 'E', 'I', 'O', 'U', 'Y']

def classify_letters(word: str) -> List[Tuple[str, str]]:
    """
    Chuẩn hóa thuật toán phân loại Nguyên âm / Phụ âm chuẩn tiếng Việt (Đặc biệt là chữ Y).
    """
    results = []
    # Xác định vị trí của tất cả các nguyên âm cứng trong từ
    hard_vowels_indices = [i for i, c in enumerate(word) if c in ['A', 'E', 'I', 'O', 'U']]
    
    for i, char in enumerate(word):
        if char not in PYTHAGOREAN_MAP:
            continue
        if char in ['A', 'E', 'I', 'O', 'U']:
            results.append((char, 'vowel'))
        elif char == 'Y':
            # Nếu trong từ đã có nguyên âm cứng khác (như NGUYEN, HUY, THUY) 
            # thì Y đóng vai trò là một phụ âm phối hợp hoặc bán nguyên âm âm cuối.
            if len(hard_vowels_indices) > 0:
                results.append((char, 'consonant'))
            else:
                results.append((char, 'vowel'))
        else:
            results.append((char, 'consonant'))
    return results


def reduce_number(num: int, keep_master: bool = True) -> int:
    """
    Reduces a number to a single digit (1-9) or preserves Master Numbers (11, 22, 33).
    """
    while num > 9:
        if keep_master and num in [11, 22, 33]:
            return num
        num = sum(int(digit) for digit in str(num))
    return num

def get_digits(num_str: str) -> List[int]:
    return [int(d) for d in num_str if d.isdigit()]

class NumerologyRuleEngine:
    @staticmethod
    def calculate_life_path(dob_str: str) -> Dict[str, any]:
        """
        Calculates Life Path from DOB string (YYYY-MM-DD).
        Method 1: Reduce Month, Day, Year separately first, then sum and reduce, preserving master numbers.
        Method 2: Sum all individual digits of the DOB, then reduce, preserving master numbers.
        """
        parts = dob_str.split('-')
        if len(parts) != 3:
            raise ValueError("DOB must be in YYYY-MM-DD format")
        
        year_str, month_str, day_str = parts[0], parts[1], parts[2]
        
        # Method 1
        year_val = sum(int(d) for d in year_str)
        month_val = sum(int(d) for d in month_str)
        day_val = sum(int(d) for d in day_str)
        
        red_year = reduce_number(year_val, keep_master=True)
        red_month = reduce_number(month_val, keep_master=True)
        red_day = reduce_number(day_val, keep_master=True)
        
        total_sum_1 = red_year + red_month + red_day
        lp1 = reduce_number(total_sum_1, keep_master=True)
        
        # Method 2
        all_digits_sum = sum(int(d) for d in dob_str.replace('-', ''))
        lp2 = reduce_number(all_digits_sum, keep_master=True)
        
        return {
            "life_path": lp1, # Default to Method 1 for backward compatibility
            "life_path_method_1": lp1,
            "life_path_method_2": lp2,
            "raw_sum": total_sum_1,
            "all_digits_sum": all_digits_sum,
            "has_master": lp1 in [11, 22, 33] or lp2 in [11, 22, 33]
        }


    @staticmethod
    def calculate_day_of_birth(dob_str: str) -> int:
        """
        Birthday number: reduce Day part of DOB. E.g. Day 17 -> 1+7 = 8. Preserves 11, 22.
        """
        parts = dob_str.split('-')
        day_val = int(parts[2])
        return reduce_number(day_val, keep_master=True)

    @staticmethod
    def calculate_attitude(dob_str: str) -> int:
        """
        Attitude number: reduce (Day + Month).
        """
        parts = dob_str.split('-')
        month_val = int(parts[1])
        day_val = int(parts[2])
        return reduce_number(month_val + day_val, keep_master=False)

    @staticmethod
    def calculate_name_numbers(full_name: str) -> Dict[str, int]:
        """
        Calculates Expression, Soul Urge, and Personality numbers.
        Expression: sum of all letters.
        Soul Urge: sum of vowels.
        Personality: sum of consonants.
        """
        normalized_name = strip_accents_vietnamese(full_name)
        words = normalized_name.split()
        
        expression_sum = 0
        soul_sum = 0
        personality_sum = 0
        
        for word in words:
            classified = classify_letters(word)
            for char, category in classified:
                val = PYTHAGOREAN_MAP[char]
                expression_sum += val
                if category == 'vowel':
                    soul_sum += val
                else:
                    personality_sum += val
                    
        return {
            "expression": reduce_number(expression_sum, keep_master=True),
            "soul_urge": reduce_number(soul_sum, keep_master=True),
            "personality": reduce_number(personality_sum, keep_master=True),
            "expression_raw": expression_sum,
            "soul_raw": soul_sum,
            "personality_raw": personality_sum
        }

    @staticmethod
    def calculate_minor_indicators(full_name: str) -> Dict[str, any]:
        """
        Calculates:
        - Cornerstone: first letter of first name.
        - Capstone: last letter of first name.
        - First Vowel: first vowel of first name.
        - Balance Number: initials of first, middle, last name.
        - Hidden Passion: number(s) appearing most frequently in full name.
        - Karmic Lessons: numbers missing in full name.
        """
        normalized = strip_accents_vietnamese(full_name)
        words = normalized.split()
        if not words:
            return {}
            
        # First name details
        first_name = words[-1]
        cornerstone = first_name[0]
        capstone = first_name[-1]
        
        classified_first = classify_letters(first_name)
        first_vowel = ""
        for char, cat in classified_first:
            if cat == 'vowel':
                first_vowel = char
                break
                
        # Balance Number: initials sum
        initials_sum = sum(PYTHAGOREAN_MAP[word[0]] for word in words if word[0] in PYTHAGOREAN_MAP)
        balance_num = reduce_number(initials_sum, keep_master=False)
        
        # Letter frequency for Hidden Passion
        letter_counts = {i: 0 for i in range(1, 10)}
        all_vals = []
        for word in words:
            for char in word:
                if char in PYTHAGOREAN_MAP:
                    val = PYTHAGOREAN_MAP[char]
                    letter_counts[val] += 1
                    all_vals.append(val)
                    
        max_freq = max(letter_counts.values()) if letter_counts else 0
        hidden_passions = [num for num, count in letter_counts.items() if count == max_freq and count > 0]
        karmic_lessons = [num for num, count in letter_counts.items() if count == 0]
        
        return {
            "cornerstone": cornerstone,
            "capstone": capstone,
            "first_vowel": first_vowel,
            "balance_number": balance_num,
            "hidden_passions": hidden_passions,
            "karmic_lessons": karmic_lessons,
            "letter_counts": letter_counts
        }

    @staticmethod
    def calculate_birth_grid_and_arrows(dob_str: str, full_name: str) -> Dict[str, any]:
        """
        Generates the Pythagorean 3x3 birth grid based on DOB digits + name letters.
        Calculates active arrows of strength and empty arrows of weakness.
        """
        # Count DOB digits
        dob_clean = dob_str.replace('-', '')
        dob_digits = [int(d) for d in dob_clean if d.isdigit() and d != '0']
        
        # Name digits
        normalized = strip_accents_vietnamese(full_name)
        name_digits = []
        for char in normalized:
            if char in PYTHAGOREAN_MAP:
                name_digits.append(PYTHAGOREAN_MAP[char])
                
        grid_dob_only = {i: 0 for i in range(1, 10)}
        for d in dob_digits:
            grid_dob_only[d] += 1
            
        grid_total = {i: 0 for i in range(1, 10)}
        for d in dob_digits + name_digits:
            grid_total[d] += 1

        arrows_config = {
            "1-2-3": "Planning (Kế hoạch)",
            "4-5-6": "Willpower (Ý chí)",
            "7-8-9": "Activity (Hoạt động)",
            "1-4-7": "Practicality (Thực tế)",
            "2-5-8": "Emotional Balance (Cân bằng cảm xúc)",
            "3-6-9": "Intellect (Trí tuệ)",
            "1-5-9": "Determination (Quyết tâm)",
            "3-5-7": "Spiritual Depth (Tâm linh/Nhân ái)"
        }
        
        lines = {
            "1-2-3": [1, 2, 3],
            "4-5-6": [4, 5, 6],
            "7-8-9": [7, 8, 9],
            "1-4-7": [1, 4, 7],
            "2-5-8": [2, 5, 8],
            "3-6-9": [3, 6, 9],
            "1-5-9": [1, 5, 9],
            "3-5-7": [3, 5, 7]
        }
        
        active_arrows = []
        empty_arrows = []
        
        for name, cells in lines.items():
            has_all = all(grid_dob_only[c] > 0 for c in cells)
            has_none = all(grid_dob_only[c] == 0 for c in cells)
            if has_all:
                active_arrows.append({"code": name, "name": arrows_config[name]})
            elif has_none:
                empty_arrows.append({"code": name, "name": f"Trống {arrows_config[name]}"})
                
        return {
            "dob_grid": grid_dob_only,
            "total_grid": grid_total,
            "active_arrows": active_arrows,
            "empty_arrows": empty_arrows
        }

    @staticmethod
    def calculate_body_mind_soul(dob_str: str, full_name: str) -> Dict[str, float]:
        """
        Calculates ratio of Thân (1-4-7), Tâm (2-5-8), Trí (3-6-9) from all digits (DOB + Name).
        """
        dob_clean = dob_str.replace('-', '')
        dob_digits = [int(d) for d in dob_clean if d.isdigit() and d != '0']
        
        normalized = strip_accents_vietnamese(full_name)
        name_digits = [PYTHAGOREAN_MAP[c] for c in normalized if c in PYTHAGOREAN_MAP]
        
        all_digits = dob_digits + name_digits
        total = len(all_digits)
        if total == 0:
            return {"body": 33.3, "mind": 33.3, "soul": 33.3}
            
        body_count = sum(1 for d in all_digits if d in [1, 4, 7])
        soul_count = sum(1 for d in all_digits if d in [2, 5, 8])
        mind_count = sum(1 for d in all_digits if d in [3, 6, 9])
        
        return {
            "body": round((body_count / total) * 100, 1),
            "soul": round((soul_count / total) * 100, 1),
            "mind": round((mind_count / total) * 100, 1)
        }

    @staticmethod
    def calculate_cycles_and_pinnacles(dob_str: str, life_path: int) -> Dict[str, any]:
        """
        Calculates 3 Life Cycles, 4 Pinnacles & Age checkpoints, and 4 Challenges.
        """
        parts = dob_str.split('-')
        month = reduce_number(int(parts[1]), keep_master=False)
        day = reduce_number(int(parts[2]), keep_master=False)
        year = reduce_number(sum(int(d) for d in parts[0]), keep_master=False)
        
        p1 = reduce_number(month + day, keep_master=True)
        p2 = reduce_number(day + year, keep_master=True)
        p3 = reduce_number(p1 + p2, keep_master=True)
        p4 = reduce_number(month + year, keep_master=True)
        
        lp_reduced = reduce_number(life_path, keep_master=False)
        age1 = 36 - lp_reduced
        age2 = age1 + 9
        age3 = age2 + 9
        
        c1 = abs(month - day)
        c2 = abs(day - year)
        c3 = abs(c1 - c2)
        c4 = abs(month - year)
        
        return {
            "cycles": {
                "first": month,
                "second": day,
                "third": year
            },
            "pinnacles": [
                {"number": 1, "value": p1, "end_age": age1},
                {"number": 2, "value": p2, "end_age": age2},
                {"number": 3, "value": p3, "end_age": age3},
                {"number": 4, "value": p4, "start_age": age3}
            ],
            "challenges": [
                {"number": 1, "value": c1},
                {"number": 2, "value": c2},
                {"number": 3, "value": c3},
                {"number": 4, "value": c4}
            ]
        }

    @staticmethod
    def calculate_personal_metrics(dob_str: str, target_date_str: str) -> Dict[str, int]:
        """
        Calculates Personal Year, Personal Month, Personal Day.
        """
        parts_dob = dob_str.split('-')
        dob_month = int(parts_dob[1])
        dob_day = int(parts_dob[2])
        
        parts_target = target_date_str.split('-')
        target_year = int(parts_target[0])
        target_month = int(parts_target[1])
        target_day = int(parts_target[2])
        
        py_sum = dob_month + dob_day + sum(int(d) for d in str(target_year))
        py = reduce_number(py_sum, keep_master=False)
        
        pm = reduce_number(py + target_month, keep_master=False)
        pd = reduce_number(pm + target_day, keep_master=False)
        
        return {
            "personal_year": py,
            "personal_month": pm,
            "personal_day": pd
        }

    @staticmethod
    def get_parent_compatibility(child_dob: str, child_name: str,
                                 father_dob: Optional[str], father_name: Optional[str],
                                 mother_dob: Optional[str], mother_name: Optional[str]) -> Dict[str, any]:
        """
        Compares child numerology against parents.
        """
        child_lp = NumerologyRuleEngine.calculate_life_path(child_dob)["life_path"]
        child_name_num = NumerologyRuleEngine.calculate_name_numbers(child_name)
        child_soul = child_name_num["soul_urge"]
        
        parents_data = []
        if father_dob and father_name:
            father_lp = NumerologyRuleEngine.calculate_life_path(father_dob)["life_path"]
            father_soul = NumerologyRuleEngine.calculate_name_numbers(father_name)["soul_urge"]
            parents_data.append(("Bố", father_lp, father_soul))
            
        if mother_dob and mother_name:
            mother_lp = NumerologyRuleEngine.calculate_life_path(mother_dob)["life_path"]
            mother_soul = NumerologyRuleEngine.calculate_name_numbers(mother_name)["soul_urge"]
            parents_data.append(("Mẹ", mother_lp, mother_soul))
            
        if not parents_data:
            return {"available": False}
            
        scores = []
        harmony_points = []
        conflict_points = []
        
        friendly_groups = [
            {1, 5, 7},
            {2, 4, 8, 11, 22},
            {3, 6, 9, 33}
        ]
        
        def are_friendly(n1, n2):
            if n1 == n2:
                return True
            for g in friendly_groups:
                if n1 in g and n2 in g:
                    return True
            return False
            
        for role, p_lp, p_soul in parents_data:
            p_score = 70
            if are_friendly(child_lp, p_lp):
                p_score += 15
                harmony_points.append(f"Chỉ số Đường đời của con ({child_lp}) và {role} ({p_lp}) nằm trong nhóm tương hợp, dễ chia sẻ lý tưởng sống.")
            else:
                p_score -= 10
                conflict_points.append(f"Đường đời của con ({child_lp}) khác nhóm tương hợp với {role} ({p_lp}), cần thấu hiểu phong cách ứng xử của nhau.")
                
            if are_friendly(child_soul, p_soul):
                p_score += 15
                harmony_points.append(f"Nhu cầu Linh hồn của con ({child_soul}) đồng điệu sâu sắc với khát khao nội tâm của {role} ({p_soul}).")
            else:
                p_score -= 5
                
            p_score = max(50, min(100, p_score))
            scores.append(p_score)
            
        final_score = int(sum(scores) / len(scores))
        
        return {
            "available": True,
            "compatibility_score": final_score,
            "harmony_points": harmony_points,
            "conflict_points": conflict_points
        }

class FengShuiEngine:
    @staticmethod
    def get_element_by_year(year: int) -> str:
        """
        Quy đổi năm sinh sang Can Chi và Mệnh Ngũ Hành theo Lục Thập Hoa Giáp.
        """
        can_names = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"]
        chi_names = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"]
        
        can_name = can_names[year % 10]
        chi_name = chi_names[year % 12]
        
        # Can weight values
        can_weights = {
            "Giáp": 1, "Ất": 1,
            "Bính": 2, "Đinh": 2,
            "Mậu": 3, "Kỷ": 3,
            "Canh": 4, "Tân": 4,
            "Nhâm": 5, "Quý": 5
        }
        # Chi weight values
        chi_weights = {
            "Tý": 0, "Sửu": 0, "Ngọ": 0, "Mùi": 0,
            "Dần": 1, "Mão": 1, "Thân": 1, "Dậu": 1,
            "Thìn": 2, "Tỵ": 2, "Tuất": 2, "Hợi": 2
        }
        
        w_can = can_weights.get(can_name, 0)
        w_chi = chi_weights.get(chi_name, 0)
        total = w_can + w_chi
        if total > 5:
            total -= 5
            
        elements = {
            1: "Kim",
            2: "Thủy",
            3: "Hỏa",
            4: "Thổ",
            5: "Mộc"
        }
        return elements.get(total, "Thổ")

    @staticmethod
    def get_element_of_name(name_str: str) -> str:
        """
        Xác định Ngũ hành của Tên gọi tiếng Việt dựa trên danh mục chuẩn hoặc quy luật âm thanh.
        """
        name_elements = {
            # Mộc
            "KHOI": "Mộc", "LAM": "Mộc", "VY": "Mộc", "QUYNH": "Mộc", "CHI": "Mộc", "TUNG": "Mộc", "NHAN": "Mộc", "BACH": "Mộc",
            # Thủy
            "HAI": "Thủy", "GIANG": "Thủy", "AN": "Thủy", "VAN": "Thủy", "YEN": "Thủy", "HA": "Thủy", "THUY": "Thủy", "DUONG": "Thủy", "MINH": "Thủy",
            # Hỏa
            "ANH": "Hỏa", "THU": "Hỏa", "PHAT": "Hỏa", "KIET": "Hỏa", "HOANG": "Hỏa", "NAM": "Hỏa", "BAO": "Hỏa", "TRIET": "Hỏa",
            # Thổ
            "SON": "Thổ", "DUY": "Thổ", "TUONG": "Thổ", "PHUOC": "Thổ", "LAM": "Thổ", "PHONG": "Thổ", "CHAU": "Thổ",
            # Kim
            "KHANH": "Kim", "BINH": "Kim", "TRANG": "Kim", "TRAM": "Kim", "XUAN": "Kim", "KIM": "Kim", "NGAN": "Kim"
        }
        clean_name = strip_accents_vietnamese(name_str)
        parts = clean_name.split()
        last_word = parts[-1] if parts else ""
        return name_elements.get(last_word, "Thổ")

# Vietnamese Name Syllables Database
VIETNAMESE_SYLLABLES = [
    {"syllable": "An", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Bình an, yên ổn, cuộc sống thái bình.", "score": 25, "sound": 9, "rarity": 4},
    {"syllable": "Anh", "gender": "Unisex", "wuxing": "Hỏa", "meaning": "Tinh anh, thông minh, kiệt xuất.", "score": 25, "sound": 9, "rarity": 3},
    {"syllable": "Bách", "gender": "Nam", "wuxing": "Mộc", "meaning": "Vững chãi, trường tồn như cây tùng bách.", "score": 24, "sound": 8, "rarity": 5},
    {"syllable": "Bảo", "gender": "Unisex", "wuxing": "Hỏa", "meaning": "Bảo vật quý giá, trân quý.", "score": 25, "sound": 9, "rarity": 4},
    {"syllable": "Bình", "gender": "Unisex", "wuxing": "Kim", "meaning": "Thanh bình, ôn hòa, êm ả.", "score": 24, "sound": 8, "rarity": 3},
    {"syllable": "Cát", "gender": "Unisex", "wuxing": "Thổ", "meaning": "Cát tường, may mắn, tốt lành.", "score": 24, "sound": 8, "rarity": 5},
    {"syllable": "Chi", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Cành cỏ thơm thanh nhã, quý phái.", "score": 23, "sound": 9, "rarity": 4},
    {"syllable": "Châu", "gender": "Unisex", "wuxing": "Thổ", "meaning": "Viên ngọc lấp lánh, quý giá.", "score": 23, "sound": 9, "rarity": 5},
    {"syllable": "Cường", "gender": "Nam", "wuxing": "Mộc", "meaning": "Mạnh mẽ, kiên cường, lực lưỡng.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Duy", "gender": "Nam", "wuxing": "Thổ", "meaning": "Duy trì đức độ, tư duy nhạy bén.", "score": 24, "sound": 9, "rarity": 4},
    {"syllable": "Dũng", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Dũng cảm, can đảm, chí khí.", "score": 24, "sound": 8, "rarity": 4},
    {"syllable": "Dương", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Ánh dương rực rỡ hoặc biển cả rộng lớn.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Đạt", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Thành đạt, hoàn thành chí hướng.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Đức", "gender": "Nam", "wuxing": "Thổ", "meaning": "Đạo đức, đức độ, tâm lành.", "score": 24, "sound": 8, "rarity": 3, "is_middle": True},
    {"syllable": "Gia", "gender": "Unisex", "wuxing": "Kim", "meaning": "Gia đình ấm áp, hưng thịnh.", "score": 24, "sound": 9, "rarity": 4, "is_middle": True},
    {"syllable": "Giang", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Dòng sông dài chảy êm đềm.", "score": 23, "sound": 9, "rarity": 4},
    {"syllable": "Hà", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Dòng sông êm đềm, thanh bình.", "score": 23, "sound": 9, "rarity": 4},
    {"syllable": "Hải", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Biển cả bao la, khoáng đạt.", "score": 24, "sound": 8, "rarity": 3},
    {"syllable": "Hạnh", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Đức hạnh, hạnh phúc tròn đầy.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Hiếu", "gender": "Nam", "wuxing": "Thủy", "meaning": "Hiếu thảo, nhân đức, kính trên nhường dưới.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Hoàng", "gender": "Unisex", "wuxing": "Hỏa", "meaning": "Huy hoàng, rực rỡ, quý phái.", "score": 24, "sound": 9, "rarity": 3},
    {"syllable": "Huy", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Ánh sáng rực rỡ, huy hoàng, tốt đẹp.", "score": 24, "sound": 9, "rarity": 3},
    {"syllable": "Hùng", "gender": "Nam", "wuxing": "Thủy", "meaning": "Hùng dũng, mạnh mẽ, chí lớn.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Hương", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Hương thơm dịu dàng thanh tao.", "score": 22, "sound": 8, "rarity": 4},
    {"syllable": "Hữu", "gender": "Nam", "wuxing": "Thủy", "meaning": "Hữu ích, sở hữu tài đức.", "score": 23, "sound": 8, "rarity": 3, "is_middle": True},
    {"syllable": "Khánh", "gender": "Unisex", "wuxing": "Kim", "meaning": "Niềm vui, hạnh phúc, đức hạnh tràn đầy.", "score": 24, "sound": 10, "rarity": 4},
    {"syllable": "Khoa", "gender": "Nam", "wuxing": "Thủy", "meaning": "Khoa học, học vấn cao, đỗ đạt.", "score": 24, "sound": 9, "rarity": 4},
    {"syllable": "Khôi", "gender": "Nam", "wuxing": "Mộc", "meaning": "Khôi ngô tuấn tú, thông minh nổi bật.", "score": 25, "sound": 9, "rarity": 4},
    {"syllable": "Khuê", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Ngôi sao Khuê sáng ngời trí tuệ.", "score": 25, "sound": 10, "rarity": 5},
    {"syllable": "Kiệt", "gender": "Nam", "wuxing": "Mộc", "meaning": "Kiệt xuất, xuất chúng hơn người.", "score": 25, "sound": 9, "rarity": 3},
    {"syllable": "Lâm", "gender": "Unisex", "wuxing": "Mộc", "meaning": "Rừng cây tươi tốt, vững chãi.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Linh", "gender": "Unisex", "wuxing": "Hỏa", "meaning": "Linh hoạt, thông minh, kỳ diệu.", "score": 24, "sound": 10, "rarity": 3},
    {"syllable": "Long", "gender": "Nam", "wuxing": "Thủy", "meaning": "Rồng thiêng bay cao, mạnh mẽ, uy quyền.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Lộc", "gender": "Nam", "wuxing": "Mộc", "meaning": "Tài lộc, thịnh vượng, phước lành.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Mai", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Hoa mai nở rộ, tương lai tươi sáng.", "score": 23, "sound": 9, "rarity": 4},
    {"syllable": "Minh", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Anh minh, sáng suốt, trí tuệ lớn.", "score": 25, "sound": 9, "rarity": 3},
    {"syllable": "Nam", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Phương Nam vững chãi, mạnh mẽ.", "score": 24, "sound": 8, "rarity": 3},
    {"syllable": "Nghĩa", "gender": "Nam", "wuxing": "Kim", "meaning": "Trọng nghĩa tình, đạo lý sâu sắc.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Ngọc", "gender": "Unisex", "wuxing": "Thổ", "meaning": "Viên ngọc thanh cao, trân quý.", "score": 24, "sound": 9, "rarity": 3},
    {"syllable": "Nguyên", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Nguyên vẹn, rộng lớn bao la.", "score": 24, "sound": 9, "rarity": 4},
    {"syllable": "Nguyệt", "gender": "Nữ", "wuxing": "Kim", "meaning": "Vầng trăng dịu dàng, thanh khiết.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Nhân", "gender": "Unisex", "wuxing": "Mộc", "meaning": "Nhân hậu, hiền từ, đạo đức cao quý.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Nhật", "gender": "Unisex", "wuxing": "Hỏa", "meaning": "Mặt trời chiếu sáng rực rỡ, ấm áp.", "score": 24, "sound": 8, "rarity": 4},
    {"syllable": "Nhi", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Nhỏ nhắn, hoạt bát, dễ thương.", "score": 23, "sound": 9, "rarity": 4},
    {"syllable": "Như", "gender": "Nữ", "wuxing": "Kim", "meaning": "Như ý, dịu dàng, nết na.", "score": 23, "sound": 9, "rarity": 3, "is_middle": True},
    {"syllable": "Phong", "gender": "Nam", "wuxing": "Thổ", "meaning": "Ngọn gió phóng khoáng, tự do.", "score": 24, "sound": 8, "rarity": 4},
    {"syllable": "Phú", "gender": "Nam", "wuxing": "Thủy", "meaning": "Phú quý, giàu sang, tài năng phú bẩm.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Phúc", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Phước lành tốt đẹp, cát tường.", "score": 24, "sound": 8, "rarity": 3},
    {"syllable": "Phương", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Hướng đi đúng đắn, hương thơm dịu nhẹ.", "score": 23, "sound": 9, "rarity": 3},
    {"syllable": "Quân", "gender": "Nam", "wuxing": "Thủy", "meaning": "Chính trực, anh minh như bậc quân vương.", "score": 24, "sound": 9, "rarity": 4},
    {"syllable": "Quang", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Ánh sáng rực rỡ, tương lai sáng lạng.", "score": 23, "sound": 8, "rarity": 3},
    {"syllable": "Quốc", "gender": "Nam", "wuxing": "Thổ", "meaning": "Quốc gia đại sự, chí khí lớn.", "score": 24, "sound": 8, "rarity": 3},
    {"syllable": "Quỳnh", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Đóa hoa quỳnh thanh tao, quý phái.", "score": 22, "sound": 9, "rarity": 4},
    {"syllable": "Sơn", "gender": "Nam", "wuxing": "Thổ", "meaning": "Núi non vững chãi, kiên định vĩ đại.", "score": 24, "sound": 8, "rarity": 4},
    {"syllable": "Thảo", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Cỏ xanh tươi mát, hiếu thảo.", "score": 22, "sound": 9, "rarity": 4},
    {"syllable": "Thái", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Thái bình, an khang, thư thả.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Thanh", "gender": "Unisex", "wuxing": "Kim", "meaning": "Trong sáng, thanh tao, thanh lịch.", "score": 23, "sound": 9, "rarity": 3},
    {"syllable": "Thành", "gender": "Nam", "wuxing": "Kim", "meaning": "Thành công, chân thành, vững chãi.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Thiên", "gender": "Unisex", "wuxing": "Hỏa", "meaning": "Trời rộng bao la, ý chí lớn lao.", "score": 24, "sound": 9, "rarity": 4},
    {"syllable": "Thịnh", "gender": "Nam", "wuxing": "Hỏa", "meaning": "Hưng thịnh, phát đạt, sung túc.", "score": 24, "sound": 8, "rarity": 4},
    {"syllable": "Thị", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Truyền thống, dịu dàng, nết na.", "score": 15, "sound": 6, "rarity": 1, "is_middle": True},
    {"syllable": "Thu", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Mùa thu êm đềm, dịu dàng, trong trẻo.", "score": 22, "sound": 9, "rarity": 4},
    {"syllable": "Thư", "gender": "Nữ", "wuxing": "Hỏa", "meaning": "Thư thả, tâm hồn nho nhã, yêu văn học.", "score": 24, "sound": 9, "rarity": 5},
    {"syllable": "Thương", "gender": "Nữ", "wuxing": "Kim", "meaning": "Thương yêu, trắc ẩn, nhân ái.", "score": 22, "sound": 8, "rarity": 4},
    {"syllable": "Thủy", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Nước mát trong lành, uyển chuyển.", "score": 22, "sound": 9, "rarity": 4},
    {"syllable": "Tiến", "gender": "Nam", "wuxing": "Thủy", "meaning": "Tiến bước vươn lên, chí hướng rộng mở.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Trang", "gender": "Nữ", "wuxing": "Kim", "meaning": "Đoan trang, nghiêm túc, đài các.", "score": 23, "sound": 8, "rarity": 3},
    {"syllable": "Trọng", "gender": "Nam", "wuxing": "Thổ", "meaning": "Trọng nghĩa, cốt cách quý tộc.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Trung", "gender": "Nam", "wuxing": "Thổ", "meaning": "Trung thực, kiên định, đáng tin cậy.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Trúc", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Cây trúc thanh cao, kiên cường quân tử.", "score": 22, "sound": 9, "rarity": 4},
    {"syllable": "Tú", "gender": "Unisex", "wuxing": "Kim", "meaning": "Thanh tú, lấp lánh như sao trời.", "score": 24, "sound": 9, "rarity": 4},
    {"syllable": "Tuấn", "gender": "Nam", "wuxing": "Mộc", "meaning": "Tuấn tú, tài giỏi xuất chúng.", "score": 25, "sound": 9, "rarity": 3},
    {"syllable": "Tùng", "gender": "Nam", "wuxing": "Mộc", "meaning": "Cây tùng vững vàng trước phong ba.", "score": 23, "sound": 8, "rarity": 4},
    {"syllable": "Tường", "gender": "Unisex", "wuxing": "Thổ", "meaning": "Cát tường, thấu suốt mọi điều.", "score": 25, "sound": 9, "rarity": 4},
    {"syllable": "Uyên", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Uyên bác, duyên dáng, thông thái.", "score": 25, "sound": 9, "rarity": 5},
    {"syllable": "Văn", "gender": "Nam", "wuxing": "Thủy", "meaning": "Văn hóa, nho nhã, có học thức.", "score": 18, "sound": 7, "rarity": 1, "is_middle": True},
    {"syllable": "Vân", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Mây trắng tự do trôi trên trời cao.", "score": 22, "sound": 10, "rarity": 5},
    {"syllable": "Việt", "gender": "Nam", "wuxing": "Kim", "meaning": "Ưu việt, thông minh bản lĩnh.", "score": 24, "sound": 9, "rarity": 3},
    {"syllable": "Vy", "gender": "Nữ", "wuxing": "Mộc", "meaning": "Nhỏ nhắn đáng yêu, sinh khí tràn đầy.", "score": 23, "sound": 10, "rarity": 4},
    {"syllable": "Xuân", "gender": "Unisex", "wuxing": "Kim", "meaning": "Mùa xuân tươi mới, tràn ngập hy vọng.", "score": 23, "sound": 9, "rarity": 3},
    {"syllable": "Yên", "gender": "Unisex", "wuxing": "Thủy", "meaning": "Tĩnh lặng, bình yên, nhẹ nhàng.", "score": 23, "sound": 9, "rarity": 5},
    {"syllable": "Yến", "gender": "Nữ", "wuxing": "Thủy", "meaning": "Chim yến báo tin vui mùa xuân.", "score": 23, "sound": 9, "rarity": 5}
]

class AdvancedNumerologyEngine(NumerologyRuleEngine):
    @staticmethod
    def suggest_perfect_names(last_name: str, dob_str: str, father_year: int, mother_year: int, gender: str = "Unisex", wish: str = "Bình an & Nhân hậu", limit: int = 20) -> List[Dict[str, any]]:
        """
        Tự động chạy và kết hợp từ điển từ đơn (VIETNAMESE_SYLLABLES) để lấp đầy số khuyết của biểu đồ ngày sinh của trẻ,
        kích hoạt các mũi tên trống và tối ưu Ngũ hành gia đình.
        """
        lp_res = NumerologyRuleEngine.calculate_life_path(dob_str)
        child_lp = lp_res["life_path"]
        
        dob_clean = dob_str.replace('-', '')
        dob_digits = [int(d) for d in dob_clean if d.isdigit() and d != '0']
        
        normalized_last = strip_accents_vietnamese(last_name)
        last_digits = [PYTHAGOREAN_MAP[c] for c in normalized_last if c in PYTHAGOREAN_MAP]
        
        base_grid = {i: 0 for i in range(1, 10)}
        for d in dob_digits + last_digits:
            base_grid[d] += 1
            
        karmic_lessons = [num for num, count in base_grid.items() if count == 0]
        
        dob_only_grid = {i: 0 for i in range(1, 10)}
        for d in dob_digits:
            dob_only_grid[d] += 1
            
        lines = {
            "1-2-3": [1, 2, 3],
            "4-5-6": [4, 5, 6],
            "7-8-9": [7, 8, 9],
            "1-4-7": [1, 4, 7],
            "2-5-8": [2, 5, 8],
            "3-6-9": [3, 6, 9],
            "1-5-9": [1, 5, 9],
            "3-5-7": [3, 5, 7]
        }
        empty_arrows = []
        for code, cells in lines.items():
            if all(dob_only_grid[c] == 0 for c in cells):
                empty_arrows.append(code)
                
        child_year = int(dob_str.split('-')[0])
        child_element = FengShuiEngine.get_element_by_year(child_year)
        father_element = FengShuiEngine.get_element_by_year(father_year) if father_year else None
        mother_element = FengShuiEngine.get_element_by_year(mother_year) if mother_year else None
        
        filtered_syllables = []
        for s in VIETNAMESE_SYLLABLES:
            if gender == "Nam":
                if s["gender"] in ["Nam", "Unisex"]:
                    filtered_syllables.append(s)
            elif gender == "Nữ":
                if s["gender"] in ["Nữ", "Unisex"]:
                    filtered_syllables.append(s)
            else:
                filtered_syllables.append(s)
                
        suggestions = []
        for i in range(len(filtered_syllables)):
            middle = filtered_syllables[i]
            for j in range(len(filtered_syllables)):
                first = filtered_syllables[j]
                
                if middle["syllable"] == first["syllable"]:
                    continue
                if first.get("is_middle"):
                    continue
                    
                name_str = f"{middle['syllable']} {first['syllable']}"
                full_test_name = f"{last_name} {name_str}"
                
                name_nums = NumerologyRuleEngine.calculate_name_numbers(full_test_name)
                
                name_letters = strip_accents_vietnamese(name_str)
                name_vals = [PYTHAGOREAN_MAP[c] for c in name_letters if c in PYTHAGOREAN_MAP]
                
                filled_lessons = []
                for num in karmic_lessons:
                    if num in name_vals:
                        filled_lessons.append(num)
                        
                grid_fill_score = min(20, 5 + len(filled_lessons) * 6)
                
                arrow_bonus = 0
                for code in empty_arrows:
                    cells = lines[code]
                    for cell in cells:
                        if cell in name_vals:
                            arrow_bonus += 3
                arrow_bonus = min(10, arrow_bonus)
                
                friendly_groups = [{1, 5, 7}, {2, 4, 8, 11, 22}, {3, 6, 9, 33}]
                def are_friendly(n1, n2):
                    if n1 == n2:
                        return True
                    for g in friendly_groups:
                        if n1 in g and n2 in g:
                            return True
                    return False
                    
                lp_compat = 22
                if child_lp == name_nums["expression"]:
                    lp_compat = 35
                elif are_friendly(child_lp, name_nums["expression"]):
                    lp_compat = 32
                    
                meaning_score = round((middle["score"] + first["score"]) / 2)
                sound_score = round((middle["sound"] + first["sound"]) / 2)
                rarity_score = round((middle["rarity"] + first["rarity"]) / 2)
                
                wish_bonus = 0
                if wish == "Bình an & Nhân hậu" and name_nums["expression"] in [2, 6, 9]:
                    wish_bonus = 5
                elif wish == "Thông minh & Tài lộc" and name_nums["expression"] in [3, 5, 8]:
                    wish_bonus = 5
                elif wish == "Lãnh đạo & Thành công" and name_nums["expression"] in [1, 8, 22]:
                    wish_bonus = 5
                elif wish == "Sức khỏe & Tự do" and name_nums["expression"] in [4, 5, 7]:
                    wish_bonus = 5
                    
                name_element = first["wuxing"]
                relations = {
                    "Kim": "Thủy",
                    "Thủy": "Mộc",
                    "Mộc": "Hỏa",
                    "Hỏa": "Thổ",
                    "Thổ": "Kim"
                }
                
                fs_compat = 0
                if relations.get(child_element) == name_element or relations.get(name_element) == child_element:
                    fs_compat += 10
                elif name_element == child_element:
                    fs_compat += 5
                else:
                    fs_compat -= 5
                    
                parent_bonus = 0
                if father_element:
                    if relations.get(father_element) == name_element or relations.get(name_element) == father_element:
                        parent_bonus += 5
                if mother_element:
                    if relations.get(mother_element) == name_element or relations.get(name_element) == mother_element:
                        parent_bonus += 5
                parent_bonus = min(10, parent_bonus)
                fs_compat += parent_bonus
                fs_compat = max(-5, min(15, fs_compat))
                
                total_score = lp_compat + grid_fill_score + arrow_bonus + meaning_score + sound_score + rarity_score + wish_bonus + fs_compat
                total_score = max(40, min(100, int(total_score)))
                
                combined_meaning = f"Ghép từ đệm '{middle['syllable']}' ({middle['meaning'].rstrip('.')}) và tên chính '{first['syllable']}' ({first['meaning'].lower()})"
                
                suggestions.append({
                    "name": full_test_name,
                    "score": total_score,
                    "element": name_element,
                    "expression": name_nums["expression"],
                    "soul_urge": name_nums["soul_urge"],
                    "personality": name_nums["personality"],
                    "filled_numbers": filled_lessons,
                    "meaning": combined_meaning
                })
                
        suggestions.sort(key=lambda x: x["score"], reverse=True)
        return suggestions[:limit]


if __name__ == "__main__":
    print("=== VERIFYING ADVANCED PYTHAGOREAN & FENG SHUI RULES ===")
    
    dob = "2026-06-17"
    name = "Phan Minh Khuê Anh"
    
    c_element = FengShuiEngine.get_element_by_year(2026)
    f_element = FengShuiEngine.get_element_by_year(1992)
    m_element = FengShuiEngine.get_element_by_year(1994)
    print(f"Child Element (2026): {c_element}")
    print(f"Father Element (1992): {f_element}")
    print(f"Mother Element (1994): {m_element}")
    
    print("\nVerifying 'Y' classification for Vietnamese Names:")
    names_to_test = ["NGUYEN", "HUY", "VY", "Y"]
    for n in names_to_test:
        classified = classify_letters(n)
        vowels = [char for char, cat in classified if cat == "vowel"]
        consonants = [char for char, cat in classified if cat == "consonant"]
        print(f"Name '{n}': Vowels={vowels}, Consonants={consonants}")
        
    print("\nRunning Suggested Names Matrix:")
    suggs = AdvancedNumerologyEngine.suggest_perfect_names("Phan", dob, 1992, 1994, gender="Nữ", wish="Bình an & Nhân hậu", limit=5)
    for s in suggs:
        print(f"Name: {s['name']} | Score: {s['score']}/100 | Element: {s['element']} | Filled Empty Cells: {s['filled_numbers']}")


