export type Exercise = {
    name: string;
    sets: number;
    reps: string;
    image?: string;
    description?: string;
};

export type DailyWorkout = {
    day: number; // 0-6, 0=Sunday
    type: string;
    exercises: Exercise[];
};

export type Plan = {
    name: string;
    description: string;
    schedule: DailyWorkout[];
};
