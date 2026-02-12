import type { Plan, DailyWorkout, Exercise } from './types';

// Image Base URL (using yuhonas/free-exercise-db as source)
const IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

// --- THAI TRANSLATIONS MAP ---
// --- THAI TRANSLATIONS MAP ---
const THAI_NAMES: Record<string, string> = {
    // Basic & Bodyweight
    'Squats': 'สควอท (Squats)',
    'Squat': 'สควอท (Squat)',
    'Bodyweight Squats': 'ลุกนั่งตัวเปล่า (Bodyweight Squats)',
    'Goblet Squats': 'สควอทถือดัมเบล (Goblet Squats)',
    'Sumo Squats': 'ซูโม่สควอท (Sumo Squats)',
    'Push-ups': 'วิดพื้น (Push-ups)',
    'Lunges': 'เดินย่อเข่า (Lunges)',
    'Stationary Lunges': 'ย่อเข่าอยู่กับที่ (Lunges)',
    'Plank': 'แพลงก์ (Plank)',
    'Pull-ups': 'ดึงข้อ (Pull-ups)',
    'Chin-ups': 'ดึงข้อหงายมือ (Chin-ups)',
    'Dips': 'ดิป (Dips)',
    'Tricep Dips': 'ดิปหลังแขน (Tricep Dips)',
    'Burpees': 'เบอร์พี (Burpees)',
    'Mountain Climbers': 'ปีนเขา (Mountain Climbers)',
    'Jumping Jacks': 'กระโดดตบ (Jumping Jacks)',
    'Sit-ups': 'ซิทอัพ (Sit-ups)',
    'Crunch': 'ครันช์ (Crunch)',
    'Bicycle Crunches': 'จักรยานอากาศ (Bicycle Crunches)',
    'Leg Raises': 'นอนยกขา (Leg Raises)',
    'Russian Twists': 'บิดตัวรัสเซีย (Russian Twists)',
    'Glute Bridges': 'ยกสะโพก (Glute Bridges)',
    'Donkey Kicks': 'เตะขาหลัง (Donkey Kicks)',
    'Bird Dog': 'เบิร์ดด็อก (Bird Dog)',
    'Dead Bugs': 'เดดบั๊ก (Dead Bugs)',
    'Superman': 'ซูเปอร์แมน (Superman)',

    // Weights (Barbell/Dumbbell/Machine)
    'Bench Press': 'ดันอก (Bench Press)',
    'Bench': 'ดันอก (Bench Press)',
    'Dumbbell Rows': 'ดึงข้อดัมเบล (Dumbbell Rows)',
    'Rows': 'ดึงข้อ (Rows)',
    'Row': 'ดึงข้อ (Row)',
    'Bent Over Rows': 'ก้มตัวดึงบาร์เบล (Bent Over Rows)',
    'Barbell Row': 'ก้มตัวดึงบาร์เบล (Barbell Row)',
    'Barbell Rows': 'ก้มตัวดึงบาร์เบล (Barbell Rows)',
    'Deadlifts': 'เดดลิฟท์ (Deadlifts)',
    'Deadlift': 'เดดลิฟท์ (Deadlift)',
    'Romanian Deadlifts': 'โรมาเนียน เดดลิฟท์ (RDL)',
    'RDLs': 'โรมาเนียน เดดลิฟท์ (RDL)',
    'Overhead Press': 'ดันไหล่ (Overhead Press)',
    'OHP': 'ดันไหล่ (OHP)',
    'Lat Pulldown': 'ดึงสายเคเบิลลง (Lat Pulldown)',
    'Lat Pulldowns': 'ดึงสายเคเบิลลง (Lat Pulldowns)',
    'Pull-ups/Lat Pulldown': 'ดึงข้อหรือดึงสายเคเบิล',
    'Face Pulls': 'ดึงเชือกเข้าหาหน้า (Face Pulls)',
    'Lateral Raises': 'กางแขนด้านข้าง (Lateral Raises)',
    'Front Raises': 'ยกแขนด้านหน้า (Front Raises)',
    'Rear Delt Fly': 'กางแขนด้านหลัง (Rear Delt Fly)',
    'Leg Press': 'ดันขา (Leg Press)',
    'Leg Curls': 'พับขา (Leg Curls)',
    'Leg Extensions': 'เตะขา (Leg Extensions)',
    'Calf Raises': 'เขย่งน่อง (Calf Raises)',
    'Cable Flyes': 'เคเบิลฟลาย (Cable Flyes)',
    'Chest Fly': 'เชสต์ฟลาย (Chest Fly)',
    'Tricep Pushdowns': 'กดแขนหลัง (Tricep Pushdowns)',
    'Skullcrushers': 'นอนดันคานงอศอก (Skullcrushers)',
    'Bicep Curls': 'ยกดัมเบลหน้าแขน (Bicep Curls)',
    'Barbell Curls': 'ยกบาร์เบลหน้าแขน (Barbell Curls)',
    'Hammer Curls': 'ยกดัมเบลแบบค้อน (Hammer Curls)',
    'Incline Dumbbell Press': 'ดันอกเบาะเอียง (Incline DB Press)',
    'Incline DB Press': 'ดันอกเบาะเอียง (Incline DB Press)',
    'DB Press': 'ดันดัมเบล (DB Press)',
    'Cable Rows': 'ดึงเคเบิลนั่ง (Cable Rows)',
    'Front Squats': 'สควอทบาร์หน้า (Front Squats)',
    'Front Squats/Leg Press': 'สควอทบาร์หน้าหรือดันขา',
    'Kettlebell Swings': 'แกว่งเคตเทิลเบล (KB Swings)',
    'Box Jumps': 'กระโดดขึ้นกล่อง (Box Jumps)',

    // Cardio / Yoga / Active
    'Sprint Intervals': 'วิ่งสปีดสลับเดิน (Sprint Intervals)',
    'Light Jog': 'วิ่งเหยาะๆ (Light Jog)',
    'Yoga Flow': 'โยคะ (Yoga Flow)',
    'Stretching': 'ยืดเหยียด (Stretching)',
};

// Descriptions Map (Thai)
const EXERCISE_DESCRIPTIONS: Record<string, string> = {
    // Generic
    'Generic': 'ทำท่าตามรูปภาพ รักษาฟอร์มให้ถูกต้อง โฟกัสที่กล้ามเนื้อเป้าหมาย หายใจเข้าออกอย่างสม่ำเสมอ',

    // Legs
    'Squats': 'ยืนกางขาเท่าไหล่ ย่อตัวลงเหมือนนั่งเก้าอี้ น้ำหนักลงส้นเท้า หลังตรง ตามองตรง ดันตัวขึ้นเกร็งก้น',
    'Squat': 'ยืนกางขาเท่าไหล่ ย่อตัวลงเหมือนนั่งเก้าอี้ น้ำหนักลงส้นเท้า หลังตรง ดันตัวขึ้น',
    'Bodyweight Squats': 'ยืนกางขาเท่าไหล่ มือประสานอก ย่อตัวลงจนต้นขาขนานพื้น แล้วยืนขึ้น',
    'Goblet Squats': 'ถือดัมเบลชิดอก ย่อตัวลงศอกอยู่ด้านในเข่า หลังตรง ยืนขึ้น',
    'Sumo Squats': 'ยืนกางขากว้างกว่าไหล่ ปลายเท้าชี้ออก ย่อตัวลง หลังตรง ให้ความรู้สึกตึงที่ขาหนีบ',
    'Front Squats': 'วางบาร์เบลบนไหล่หน้า ศอกชี้ขึ้น ย่อตัวลงตัวตรงที่สุดเท่าที่ทำได้',
    'Front Squats/Leg Press': 'เลือกทำท่า Front Squat หรือ Leg Press ตามอุปกรณ์ที่มี',
    'Lunges': 'ก้าวขาไปข้างหน้า ย่อตัวลงจนเข่าหลังเกือบแตะพื้น ตัวตรง ดันกลับท่าเริ่มต้น ทำสลับข้าง',
    'Stationary Lunges': 'ยืนก้าวขาค้างไว้ ย่อตัวขึ้นลงโดยไม่ขยับเท้า',
    'Leg Press': 'นั่งบนเครื่อง วางเท้ากว้างเท่าไหล่ ดันน้ำหนักออกแต่ไม่ต้องล็อคเข่า ค่อยๆ ผ่อนกลับ',
    'Leg Extensions': 'นั่งบนเครื่อง สอดเท้าใต้เบาะ เตะขาขึ้นจนเหยียดตรง เกร็งหน้าขา',
    'Leg Curls': 'นอนคว่ำหรือนั่ง ส้นเท้าเกี่ยวเบาะ พับขาเข้ามาหาก้น เกร็งต้นขาด้านหลัง',
    'Calf Raises': 'ยืนปลายเท้าบนแท่น เขย่งส้นเท้าขึ้นสุด ค้างไว้ 1 วินาที แล้วลดลงช้าๆ',
    'Glute Bridges': 'นอนหงายชันเข่า ยกสะโพกขึ้นจนตัวเป็นเส้นตรง เกร็งก้น ค้างไว้เล็กน้อย',
    'Donkey Kicks': 'คุกเข่า มือกวางพื้น เตะขาไปด้านหลังและดันขึ้นบน เกร็งก้น',
    'Romanian Deadlifts': 'ยืนถือบาร์หรือดัมเบล พับสะโพกไปด้านหลัง ก้มตัวลงหลังตรง เข่างอเล็กน้อย รู้สึกตึงขาหลัง แล้วดึงกลับ',
    'RDLs': 'ยืนถือบาร์ พับก้นไปด้านหลัง ก้มตัวลงหลังตรง ให้รู้สึกตึงต้นขาหลัง',

    // Chest
    'Push-ups': 'นอนคว่ำ มือวางกว้างกว่าไหล่เล็กน้อย ดันตัวขึ้น ลำตัวเป็นเส้นตรง ลดตัวลงจนอกเกือบติดพื้น',
    'Bench Press': 'นอนราบ ตาอยู่ใต้บาร์ จับบาร์กว้างกว่าไหล่ ยกบาร์ออก ลดบาร์ลงมาที่กลางอก ดันขึ้น',
    'Bench': 'นอนราบ ตาอยู่ใต้บาร์ จับบาร์กว้างกว่าไหล่ ยกบาร์ออก ลดบาร์ลงมาที่กลางอก ดันขึ้น',
    'Incline Dumbbell Press': 'นอนเบาะเอียง 30-45 องศา ดันดัมเบลขึ้นตรงๆ ลดลงมาช้าๆ',
    'Incline DB Press': 'นอนเบาะเอียง ดันดัมเบลขึ้นเหนืออก ลดลงให้ศอกทำมุม 45 องศา',
    'Cable Flyes': 'ยืนตรงกลางเคเบิล ดึงมือมาประกบกันด้านหน้า บีบอก แล้วผ่อนกลับช้าๆ',
    'Dips': 'จับบาร์คู่ ยืดแขนตึง พับศอกลดตัวลง โน้มตัวมาข้างหน้าเล็กน้อย แล้วดันขึ้น',
    'DB Press': 'นอนราบ ดันดัมเบลขึ้นตรงๆ จากระดับอก',
    'Chest Fly': 'นอนราบ ถือดัมเบล กางแขนออกเหมือนกอดต้นไม้ แล้วหุบเข้าหากัน',

    // Back
    'Pull-ups': 'จับบาร์กว้างกว่าไหล่ ดึงตัวขึ้นจนคางพ้นบาร์ บีบหลัง ลดตัวลงสุดแขน',
    'Chin-ups': 'จับบาร์หงายมือ ดึงตัวขึ้นจนคางพ้นบาร์ เน้นหลังและหน้าแขน',
    'Lat Pulldown': 'นั่งล็อคขา จับบาร์กว้าง แอ่นอก ดึงบาร์ลงมาที่หน้าอก บีบสะบัก',
    'Lat Pulldowns': 'นั่งล็อคขา จับบาร์กว้าง แอ่นอก ดึงบาร์ลงมาที่หน้าอก บีบสะบัก',
    'Pull-ups/Lat Pulldown': 'เลือกทำท่า Pull-ups หรือ Lat Pulldown ตามความแข็งแรง',
    'Rows': 'โน้มตัวไปข้างหน้า ดึงน้ำหนักเข้าหาเอว บีบหลัง',
    'Row': 'โน้มตัวไปข้างหน้า ดึงน้ำหนักเข้าหาเอว บีบหลัง',
    'Bent Over Rows': 'ยืนแยกขา ก้มตัวหลังตรง ดึงบาร์เข้าหาช่วงท้อง บีบสะบัก',
    'Barbell Rows': 'ก้มตัวหลังขนานพื้น ดึงบาร์เบลเข้าหาท้องน้อย',
    'Barbell Row': 'ก้มตัวหลังขนานพื้น ดึงบาร์เบลเข้าหาท้องน้อย',
    'Dumbbell Rows': 'มือวางบนม้านั่ง ดึงดัมเบลขึ้นมาข้างเอว ศอกแนบเลาตัว',
    'Cable Rows': 'นั่งดึงเคเบิลเข้าหาท้อง ยืดหลังตรง บีบสะบักตอนดึงเข้า',
    'Deadlifts': 'ยืนชิดบาร์ ย่อตัวจับบาร์ แขนตึง ดันขาถีบพื้น ยืดตัวขึ้นพร้อมดันสะโพก',
    'Deadlift': 'ยืนชิดบาร์ ย่อตัวจับบาร์ แขนตึง ดันขาถีบพื้น ยืดตัวขึ้นพร้อมดันสะโพก',
    'Face Pulls': 'ดึงเชือกเข้าหาหน้าผาก กางศอกออก บีบไหล่หลัง',
    'Bird Dog': 'คุกเข่าเข่าและมือ ยกแขนซ้ายขาขวาเหยียดตรง สลับข้าง',
    'Superman': 'นอนคว่ำ ยกแขนและขาขึ้นพร้อมกัน เกร็งหลัง',

    // Shoulders
    'Overhead Press': 'ยืนหรือนั่ง ดันบาร์จากระดับไหปลาร้าขึ้นเหนือศีรษะ เก็บศอก',
    'OHP': 'ยืนเกร็งท้อง ดันบาร์ขึ้นเหนือศีรษะจนแขนตึง',
    'Lateral Raises': 'ยืนถือดัมเบล ยกแขนกางออกข้างลำตัว สูงระดับไหล่',
    'Front Raises': 'ยืนถือดัมเบล ยกแขนขึ้นด้านหน้า สูงระดับสายตา',
    'Rear Delt Fly': 'ก้มตัว กางแขนออกด้านข้าง เน้นไหล่หลัง',

    // Arms
    'Bicep Curls': 'ยืนถือดัมเบล ล็อคศอก พับแขนยกดัมเบลขึ้นบีบหน้าแขน',
    'Barbell Curls': 'ถือบาร์เบล พับแขนยกขึ้น ห้ามโยกตัว',
    'Hammer Curls': 'ถือดัมเบลหันฝ่ามือเข้าหากัน พับแขนขึ้น',
    'Tricep Pushdowns': 'ยืนจับบาร์เคเบิล ศอกแนบตัว กดแขนลงจนตึง',
    'Skullcrushers': 'นอนราบ ยกบาร์ขึ้น พับศอกพาน้ำหนักมาที่หน้าผาก แล้วดันกลับ',
    'Tricep Dips': 'ใช้ม้านั่งหรือบาร์ วางมือด้านหลัง ย่อตัวลงโดยงอศอก แล้วดันขึ้น',

    // Core
    'Plank': 'นอนคว่ำ ศอกวางพื้น เกร็งตัวให้ตรง ห้ามก้นโด่งหรือหลังแอ่น',
    'Sit-ups': 'นอนหงาย ชันเข่า ยกตัวขึ้นนั่ง',
    'Crunch': 'นอนหงาย ยกไหล่ขึ้นพ้นพื้น เกร็งท้อง',
    'Bicycle Crunches': 'นอนหงาย มือแตะหู บิดตัวเอาศอกแตะเข่าฝั่งตรงข้าม',
    'Russian Twists': 'นั่งยกขา เอนตัวหลัง บิดตัวซ้ายขวา',
    'Leg Raises': 'นอนราบ ยกขาคู่ขึ้นตั้งฉาก ค่อยๆ ลดลงห้ามส้นเท้าแตะพื้น',
    'Mountain Climbers': 'ท่าเตรียมวิดพื้น ดึงเข่าเข้าหาอกสลับซ้ายขวาเร็วๆ',
    'Dead Bugs': 'นอนหงาย แขนขาชี้ฟ้า ลดแขนซ้ายขาขวาลงใกล้พื้น สลับด้าน',

    // Cardio/Other
    'Burpees': 'ยืน -> ย่อเอามือแตะพื้น -> ดีดขาไปหลัง -> วิดพื้น -> ดีดขากลับ -> กระโดด',
    'Jumping Jacks': 'กระโดดตบ',
    'Box Jumps': 'ยืนหน้ากล่อง ย่อตัวแล้วกระโดดขึ้นไปยืนบนกล่อง',
    'Kettlebell Swings': 'ยืนกางขา เหวี่ยงเคตเทิลเบลลอดขา ดันสะโพกส่งแรงเหวี่ยงขึ้นระดับอก',
    'Sprint Intervals': 'วิ่งเร็วที่สุดเท่าที่ทำได้สลับกับเดินพัก',
    'Light Jog': 'วิ่งเหยาะๆ สบายๆ',
    'Yoga Flow': 'เคลื่อนไหวท่าโยคะต่อเนื่อง เน้นลมหายใจและการยืดเหยียด',
    'Stretching': 'ยืดเหยียดกล้ามเนื้อส่วนต่างๆ ค้างไว้ 15-30 วินาที',
};

const EXERCISE_IMAGE_MAP: Record<string, string> = {
    // Basic Bodyweight
    'Squats': 'Bodyweight_Squat',
    'Squat': 'Bodyweight_Squat',
    'Bodyweight Squats': 'Bodyweight_Squat',
    'Goblet Squats': 'Goblet_Squat_with_dumbell',
    'Sumo Squats': 'Sumo_Squat',
    'Push-ups': 'Push_Up',
    'Lunges': 'Bodyweight_Lunge',
    'Stationary Lunges': 'Bodyweight_Lunge',
    'Plank': 'Plank',
    'Pull-ups': 'Pull_Up',
    'Chin-ups': 'Chin_Up',
    'Dips': 'Chest_Dip',
    'Tricep Dips': 'Bench_Dip',
    'Burpees': 'Burpee',
    'Mountain Climbers': 'Mountain_Climber',
    'Jumping Jacks': 'Jumping_Jack',
    'Sit-ups': 'Sit_Up',
    'Crunch': 'Crunch',
    'Bicycle Crunches': 'Air_Bike',
    'Leg Raises': 'Leg_Raise',
    'Russian Twists': 'Russian_Twist',
    'Glute Bridges': 'Glute_Bridge',
    'Dead Bugs': 'Dead_Bug',
    'Bird Dog': 'Bird_Dog',
    'Donkey Kicks': 'Glute_Kickback',
    'Superman': 'Superman',

    // Weights / Gym
    'Bench Press': 'Barbell_Bench_Press_-_Medium_Grip',
    'Bench': 'Barbell_Bench_Press_-_Medium_Grip',
    'Dumbbell Rows': 'Dumbbell_Bent_Over_Row',
    'Rows': 'Barbell_Bent_Over_Row',
    'Row': 'Barbell_Bent_Over_Row',
    'Bent Over Rows': 'Barbell_Bent_Over_Row',
    'Barbell Row': 'Barbell_Bent_Over_Row',
    'Barbell Rows': 'Barbell_Bent_Over_Row',
    'Deadlifts': 'Barbell_Deadlift',
    'Deadlift': 'Barbell_Deadlift',
    'Romanian Deadlifts': 'Romanian_Deadlift_from_Deficit',
    'RDLs': 'Romanian_Deadlift_from_Deficit',
    'Overhead Press': 'Barbell_Shoulder_Press',
    'OHP': 'Barbell_Shoulder_Press',
    'Lat Pulldown': 'Front_Lat_Pulldown',
    'Lat Pulldowns': 'Front_Lat_Pulldown',
    'Pull-ups/Lat Pulldown': 'Front_Lat_Pulldown',
    'Face Pulls': 'Face_Pull',
    'Lateral Raises': 'Side_Lateral_Raise',
    'Front Raises': 'Dumbbell_Front_Raise',
    'Rear Delt Fly': 'Dumbbell_Rear_Lateral_Raise',
    'Leg Press': 'Leg_Press',
    'Leg Curls': 'Lying_Leg_Curl',
    'Leg Extensions': 'Leg_Extension',
    'Calf Raises': 'Standing_Calf_Raise',
    'Cable Flyes': 'Cable_Crossover',
    'Chest Fly': 'Dumbbell_Fly',
    'Tricep Pushdowns': 'Pushdown',
    'Barbell Curls': 'Barbell_Curl',
    'Bicep Curls': 'Dumbbell_Bicep_Curl',
    'Hammer Curls': 'Hammer_Curl',
    'Incline Dumbbell Press': 'Incline_Dumbbell_Press',
    'Incline DB Press': 'Incline_Dumbbell_Press',
    'DB Press': 'Dumbbell_Bench_Press',
    'Skullcrushers': 'Barbell_Lying_Triceps_Extension',
    'Cable Rows': 'Seated_Cable_Row',
    'Front Squats': 'Front_Squat',
    'Front Squats/Leg Press': 'Front_Squat',
    'Kettlebell Swings': 'Kettlebell_Swing',
    'Box Jumps': 'Box_Jump',

    // Cardio / Stretch / Yoga
    'Yoga Flow': 'Yoga_Ra_Jao_Sun_Salutation',
    'Stretching': 'Adductor_Stretching',
    'Sprint Intervals': 'Run',
    'Light Jog': 'Jogging',
};

const getThaiName = (engName: string) => THAI_NAMES[engName] || engName;
const getDescription = (name: string) => EXERCISE_DESCRIPTIONS[name] || EXERCISE_DESCRIPTIONS['Generic'];

// Helper to create exercises with image
const createExercise = (name: string, sets: number, reps: string): Exercise => {
    // Try exact match or direct name
    let imgPath = EXERCISE_IMAGE_MAP[name] || name.replace(/ /g, '_');

    // Handle generic cardio/yoga that might not have exact 0.jpg folder
    // Smart fallback if mapped to something specific unique

    return {
        name,
        sets,
        reps,
        image: `${IMG_BASE}/${imgPath}/0.jpg`,
        description: getDescription(name)
    };
};

// Smart Adjustment Logic
const createSmartExercise = (baseExercise: Exercise, bmiCategory: string, goal: string): Exercise => {
    let { name, sets, reps, image, description } = baseExercise;
    // Add Thai Name context
    let displayName = getThaiName(name);

    if (goal === 'lose_belly') {
        // High reps, core focus, metabolic conditioning
        if (name.includes('Squat') || name.includes('Lunges')) {
            reps = "15-20"; // Burn more
        }
        // If it's a rest period-heavy lift, maybe suggest supersets (logic simplified here to reps)
        if (reps === "5" || reps === "6-8") reps = "12";
    } else if (goal === 'tone_legs') {
        if (name.includes('Squat') || name.includes('Lunge') || name.includes('Deadlift')) {
            sets += 1; // More volume for legs
            reps = "12-15"; // Toning range
        }
    } else if (goal === 'build_muscle') {
        if (sets < 4 && !name.includes('Plank')) sets = 4;
        reps = "8-12"; // Hypertrophy sweet spot
    }

    // BMI adjustments still apply as safety/load modifiers
    if (bmiCategory === 'Obese' || bmiCategory === 'Overweight') {
        if (name.includes("Squat") || name.includes("Deadlift")) {
            sets = Math.max(3, sets);
        }
    }

    return { name: displayName, sets, reps, image, description };
};

// --- PLAN TEMPLATES ---

const PLANS: Record<number, Plan> = {
    1: {
        name: "Sunday Reset (รีเซ็ตวันอาทิตย์)",
        description: "โปรแกรมวันเดียว เน้นขยับร่างกายทุกส่วน (Full Body)",
        schedule: [
            {
                day: 0, type: "Full Body Intensity (ร่างกายทุกส่วน)",
                exercises: [
                    createExercise("Goblet Squats", 4, "15"),
                    createExercise("Push-ups", 4, "Failure"),
                    createExercise("Dumbbell Rows", 4, "12"),
                    createExercise("Lunges", 3, "20 total"),
                    createExercise("Plank", 3, "60s")
                ]
            }
        ]
    },
    2: {
        name: "Weekend Warrior (นักรบสุดสัปดาห์)",
        description: "2 วันเน้นๆ เก็บครบทุกส่วน Maintain กล้ามเนื้อ",
        schedule: [
            {
                day: 6, type: "Full Body A (ร่างกายทุกส่วน A)",
                exercises: [
                    createExercise("Squats", 3, "10"),
                    createExercise("Bench Press", 3, "10"),
                    createExercise("Rows", 3, "12"),
                ]
            },
            {
                day: 0, type: "Full Body B (ร่างกายทุกส่วน B)",
                exercises: [
                    createExercise("Deadlifts", 3, "8"),
                    createExercise("Overhead Press", 3, "10"),
                    createExercise("Pull-ups", 3, "Failure"),
                ]
            }
        ]
    },
    3: {
        name: "Classic Full Body (คลาสสิค 3 วัน)",
        description: "จันทร์-พุธ-ศุกร์ สูตรมาตรฐานสากลเพื่อหุ่นดี",
        schedule: [
            {
                day: 1, type: "Full Body A (ร่างกายทุกส่วน A)",
                exercises: [
                    createExercise("Squats", 3, "8-10"),
                    createExercise("Bench Press", 3, "8-10"),
                    createExercise("Bent Over Rows", 3, "10-12"),
                    createExercise("Plank", 3, "45s")
                ]
            },
            {
                day: 3, type: "Full Body B (ร่างกายทุกส่วน B)",
                exercises: [
                    createExercise("Deadlifts", 3, "6-8"),
                    createExercise("Overhead Press", 3, "8-10"),
                    createExercise("Pull-ups/Lat Pulldown", 3, "10-12"),
                    createExercise("Leg Raises", 3, "15")
                ]
            },
            {
                day: 5, type: "Full Body C (ร่างกายทุกส่วน C)",
                exercises: [
                    createExercise("Lunges", 3, "12/leg"),
                    createExercise("Incline Dumbbell Press", 3, "10-12"),
                    createExercise("Face Pulls", 3, "15"),
                    createExercise("Russian Twists", 3, "20")
                ]
            }
        ]
    },
    4: {
        name: "Upper / Lower Split (บน/ล่าง)",
        description: "แบ่งเล่น ช่วงบน และ ช่วงล่าง อย่างละ 2 วัน",
        schedule: [
            {
                day: 1, type: "Upper Power (ช่วงบน เน้นพละกำลัง)",
                exercises: [
                    createExercise("Bench Press", 4, "6-8"),
                    createExercise("Barbell Row", 4, "6-8"),
                    createExercise("Overhead Press", 3, "8-10"),
                ]
            },
            {
                day: 2, type: "Lower Power (ช่วงล่าง เน้นพละกำลัง)",
                exercises: [
                    createExercise("Squats", 4, "6-8"),
                    createExercise("Romanian Deadlifts", 3, "8-10"),
                    createExercise("Calf Raises", 4, "15"),
                    createExercise("Plank", 3, "60s")
                ]
            },
            {
                day: 4, type: "Upper Hypertrophy (ช่วงบน เน้นกล้ามเนื้อ)",
                exercises: [
                    createExercise("Incline Dumbbell Press", 3, "10-12"),
                    createExercise("Lat Pulldown", 3, "10-12"),
                    createExercise("Lateral Raises", 3, "15"),
                ]
            },
            {
                day: 5, type: "Lower Hypertrophy (ช่วงล่าง เน้นกล้ามเนื้อ)",
                exercises: [
                    createExercise("Leg Press", 3, "10-12"),
                    createExercise("Leg Curls", 3, "12-15"),
                    createExercise("Lunges", 3, "12/leg"),
                ]
            }
        ]
    },
    5: {
        name: "Bro Split (แยกส่วนเล่น)",
        description: "วันละส่วน จันทร์ถึงศุกร์ พักเสาร์อาทิตย์",
        schedule: [
            { day: 1, type: "Chest (อก)", exercises: [createExercise("Bench Press", 4, "8-10"), createExercise("Incline Dumbbell Press", 3, "10-12"), createExercise("Cable Flyes", 3, "15")] },
            { day: 2, type: "Back (หลัง)", exercises: [createExercise("Deadlift", 3, "5-8"), createExercise("Pull-ups", 3, "Failure"), createExercise("Barbell Rows", 3, "8-10")] },
            { day: 3, type: "Shoulders (ไหล่)", exercises: [createExercise("Overhead Press", 4, "8-10"), createExercise("Lateral Raises", 4, "15-20"), createExercise("Face Pulls", 3, "15")] },
            { day: 4, type: "Legs (ขา)", exercises: [createExercise("Squats", 4, "8-10"), createExercise("Leg Press", 3, "12"), createExercise("Leg Extensions", 3, "15")] },
            { day: 5, type: "Arms (แขน)", exercises: [createExercise("Barbell Curls", 3, "10-12"), createExercise("Tricep Pushdowns", 3, "12-15"), createExercise("Hammer Curls", 3, "12")] },
        ]
    },
    6: {
        name: "Push/Pull/Legs x2",
        description: "โปรแกรมเข้มข้น 6 วันต่อสัปดาห์ สำหรับคนจริง",
        schedule: [
            { day: 1, type: "Push A (อก/ไหล่/หลังแขน)", exercises: [createExercise("Bench Press", 4, "8"), createExercise("OHP", 3, "10"), createExercise("Tricep Dips", 3, "12")] },
            { day: 2, type: "Pull A (หลัง/หน้าแขน)", exercises: [createExercise("Barbell Rows", 4, "8"), createExercise("Pull-ups", 3, "Max"), createExercise("Bicep Curls", 3, "12")] },
            { day: 3, type: "Legs A (ขา/น่อง)", exercises: [createExercise("Squats", 4, "8"), createExercise("RDLs", 3, "10"), createExercise("Calf Raises", 4, "15")] },
            { day: 4, type: "Push B (อก/ไหล่/หลังแขน)", exercises: [createExercise("Incline DB Press", 3, "10"), createExercise("Lateral Raises", 4, "15"), createExercise("Skullcrushers", 3, "12")] },
            { day: 5, type: "Pull B (หลัง/หน้าแขน)", exercises: [createExercise("Lat Pulldowns", 3, "10"), createExercise("Cable Rows", 3, "12"), createExercise("Hammer Curls", 3, "12")] },
            { day: 6, type: "Legs B (ขา/น่อง)", exercises: [createExercise("Front Squats/Leg Press", 3, "10"), createExercise("Leg Curls", 3, "12"), createExercise("Lunges", 3, "12")] },
        ]
    },
    7: {
        name: "Hybrid Athlete (สายผสมผสาน)",
        description: "ขยับทุกวัน เวท เบิร์น ยืดเหยียด ไม่ซ้ำซาก",
        schedule: [
            { day: 1, type: "Full Body Strength (เวททั่วร่าง)", exercises: [createExercise("Squat", 3, "5"), createExercise("Bench", 3, "5"), createExercise("Row", 3, "8")] },
            { day: 2, type: "Cardio / HIIT (เบิร์นไขมัน)", exercises: [createExercise("Sprint Intervals", 10, "30s on/30s off"), createExercise("Burpees", 3, "15")] },
            { day: 3, type: "Upper Body Hypertrophy (กล้ามเนื้อช่วงบน)", exercises: [createExercise("DB Press", 3, "10"), createExercise("Pull-ups", 3, "10"), createExercise("Dips", 3, "12")] },
            { day: 4, type: "Active Recovery (ฟื้นฟู)", exercises: [createExercise("Yoga Flow", 1, "30 min"), createExercise("Light Jog", 1, "20 min")] },
            { day: 5, type: "Lower Body Focus (กล้ามเนื้อช่วงล่าง)", exercises: [createExercise("Deadlift", 3, "5"), createExercise("Lunges", 3, "12"), createExercise("Plank", 3, "60s")] },
            { day: 6, type: "Metcon (ความอึด)", exercises: [createExercise("Kettlebell Swings", 4, "20"), createExercise("Box Jumps", 4, "15"), createExercise("Push-ups", 4, "20")] },
            { day: 0, type: "Mobility & Core (แกนกลาง & ยืดเหยียด)", exercises: [createExercise("Stretching", 1, "20 min"), createExercise("Dead Bugs", 3, "12"), createExercise("Bird Dog", 3, "10")] },
        ]
    }
};

// Specialized Add-ons
const BELLY_FAT_ADDON = [createExercise("Mountain Climbers", 3, "30s"), createExercise("Plank", 3, "45s")];
const LEGS_TONE_ADDON = [createExercise("Glute Bridges", 3, "15"), createExercise("Donkey Kicks", 3, "15")];

export const generateSmartPlan = (days: number, bmiCategory: string, goal: string = 'general'): Plan => {
    // Default to 3 days if invalid
    const cleanDays = Math.max(1, Math.min(7, days || 3));

    // Get base template
    let basePlan = PLANS[cleanDays] || PLANS[3];

    // Modify schedule
    const smartSchedule = basePlan.schedule.map(day => {
        let exercises = day.exercises.map(ex => createSmartExercise(ex, bmiCategory, goal));

        // Add goal-specific finishers
        if (goal === 'lose_belly' && !day.type.includes('Recovery') && !day.type.includes('Yoga')) {
            exercises = [...exercises, ...BELLY_FAT_ADDON.map(ex => createSmartExercise(ex, bmiCategory, goal))];
        } else if (goal === 'tone_legs' && (day.type.includes('Lower') || day.type.includes('Legs') || day.type.includes('Full Body'))) {
            exercises = [...exercises, ...LEGS_TONE_ADDON.map(ex => createSmartExercise(ex, bmiCategory, goal))];
        }

        return { ...day, exercises };
    });

    return {
        ...basePlan,
        schedule: smartSchedule
    };
};

export const getDailyWorkout = (plan: Plan, date: Date): DailyWorkout | undefined => {
    const dayIndex = date.getDay(); // 0 = Sunday
    return plan.schedule.find(s => s.day === dayIndex);
};
