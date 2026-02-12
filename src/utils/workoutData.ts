import type { Plan, DailyWorkout, Exercise } from './types';

// Helper to create exercises
const createExercise = (name: string, sets: number, reps: string): Exercise => ({ name, sets, reps });

// --- THAI TRANSLATIONS MAP ---
// Basic mapping for common exercises
const THAI_NAMES: Record<string, string> = {
    // Basic
    'Squats': 'สควอท (Squats)',
    'Bodyweight Squats': 'ลุกนั่งตัวเปล่า (Bodyweight Squats)',
    'Goblet Squats': 'สควอทถือดัมเบล (Goblet Squats)',
    'Push-ups': 'วิดพื้น (Push-ups)',
    'Dumbbell Rows': 'ดึงข้อดัมเบล (Dumbbell Rows)',
    'Stationary Lunges': 'ย่อเข่าอยู่กับที่ (Lunges)',
    'Plank': 'แพลงก์ (Plank)',
    'Bench Press': 'ดันอกแนวนอน (Bench Press)',
    'Rows': 'ดึงข้อ (Rows)',
    'Deadlifts': 'ท่าเดดลิฟท์ (Deadlifts)',
    'Overhead Press': 'ดันไหล่เหนือศีรษะ (Overhead Press)',
    'Pull-ups': 'ดึงข้อ (Pull-ups)',
    'Pull-ups/Lat Pulldown': 'ดึงข้อ หรือ ดึงสายเคเบิล (Pull-ups/Lat Pulldown)',
    'Bent Over Rows': 'ก้มตัวดึงบาร์เบล (Bent Over Rows)',
    'Lunges': 'เดินย่อเข่า (Lunges)',
    'Incline Dumbbell Press': 'ดันอกเบาะเอียง (Incline Press)',
    'Face Pulls': 'ดึงเชือกเข้าหาหน้า (Face Pulls)',
    'Barbell Row': 'ดึงบาร์เบลเข้าหาตัว (Barbell Row)',
    'Romanian Deadlifts': 'โรมาเนียน เดดลิฟท์ (RDL)',
    'Calf Raises': 'เขย่งเน้นน่อง (Calf Raises)',
    'Lat Pulldown': 'ดึงสายเคเบิลลง (Lat Pulldown)',
    'Lateral Raises': 'กางแขนด้านข้าง (Lateral Raises)',
    'Leg Press': 'ดันขาด้วยเครื่อง (Leg Press)',
    'Leg Curls': 'พับขาด้านหลัง (Leg Curls)',
    'Cable Flyes': 'เคเบิล ไฟล (Cable Flyes)',
    'Tricep Pushdowns': 'กดแขนหลัง (Tricep Pushdowns)',
    'Barbell Curls': 'ยกบาร์เบลหน้าแขน (Barbell Curls)',
    'Hammer Curls': 'ยกดัมเบลแนวตั้ง (Hammer Curls)',
    'OHP': 'ดันไหล่ (OHP)',
    'Tricep Dips': 'ดิปหลังแขน (Tricep Dips)',
    'RDLs': 'โรมาเนียน เดดลิฟท์ (RDL)',
    'Incline DB Press': 'ดันอกเบาะเอียง (Incline Press)',
    'Skullcrushers': 'นอนดันบาร์เหนือหัว (Skullcrushers)',
    'Cable Rows': 'ดึงสายเคเบิลนั่ง (Cable Rows)',
    'Front Squats': 'สควอทบาร์ด้านหน้า (Front Squats)',
    'Front Squats/Leg Press': 'สควอทด้านหน้า หรือ เลกเพรส',
    'Sprint Intervals': 'วิ่งสลับเดินเร็ว (Sprint Intervals)',
    'Burpees': 'พุ่งหลัง (Burpees)',
    'DB Press': 'ดันดัมเบล (DB Press)',
    'Dips': 'ดิป (Dips)',
    'Yoga Flow': 'โยคะยืดเหยียด (Yoga)',
    'Light Jog': 'จ็อกกิ้งเบาๆ (Light Jog)',
    'Deadlift': 'เดดลิฟท์ (Deadlift)',
    'Kettlebell Swings': 'แกว่งตุ้มน้ำหนัก (Kettlebell Swings)',
    'Box Jumps': 'กระโดดขึ้นกล่อง (Box Jumps)',
    'Stretching': 'ยืดเหยียดร่างกาย (Stretching)',
    'Dead Bugs': 'ท่าแมลงตาย (Dead Bugs)',
    'Bird Dog': 'ท่าเบิร์ดด็อก (Bird Dog)',
    'Leg Raises': 'นอนยกขา (Leg Raises)',
    'Mountain Climbers': 'ท่าปีนเขา (Mountain Climbers)',
    'Russian Twists': 'บิดตัวรัสเซีย (Russian Twists)',
    'Glute Bridges': 'ยกสะโพก (Glute Bridges)',
    'Donkey Kicks': 'ท่าเตะขาหลัง (Donkey Kicks)',
    'Sumo Squats': 'ซูโม่สควอท (Sumo Squats)',
    'Bicycle Crunches': 'จักรยานอากาศ (Bicycle Crunches)',
    'Sit-ups': 'ลุกนั่ง (Sit-ups)',
    'Jumping Jacks': 'กระโดดตบ (Jumping Jacks)',
};

const getThaiName = (engName: string) => THAI_NAMES[engName] || engName;

// Smart Adjustment Logic
const createSmartExercise = (baseExercise: Exercise, bmiCategory: string, goal: string): Exercise => {
    let { name, sets, reps } = baseExercise;
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

    return { name: displayName, sets, reps };
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
