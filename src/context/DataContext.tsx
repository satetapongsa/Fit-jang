import React, { createContext, useContext, useState, useEffect } from 'react';

export type Meal = {
    id: string;
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    sugar?: number;
    fat?: number;
    time: string;
};

export type DailyData = {
    date: string; // YYYY-MM-DD
    waterIntake: number; // glasses (250ml)
    sleepDuration: number; // hours
    sleepStart?: string; // HH:mm
    sleepEnd?: string;   // HH:mm
    meals: Meal[];
    workoutCompleted: boolean;
    completedExercises: number[];
    weight?: number;
    bodyFat?: number;
    steps?: number;
};

type DataContextType = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    getDataForDate: (date: Date) => DailyData;
    addMeal: (date: Date, meal: Omit<Meal, 'id'>) => void;
    removeMeal: (date: Date, id: string) => void;
    updateWater: (date: Date, amount: number) => void;
    updateSleep: (date: Date, hours: number, start?: string, end?: string) => void;
    clearSleep: (date: Date) => void;
    toggleWorkoutComplete: (date: Date) => void;
    toggleExerciseComplete: (date: Date, index: number, totalExercises: number) => void;
    updateBodyMetrics: (date: Date, weight?: number, bodyFat?: number) => void;
    updateSteps: (date: Date, steps: number) => void;
    customFoods: Meal[];
    addCustomFood: (food: Omit<Meal, 'id'>) => void;
    removeCustomFood: (id: string) => void;
    updateCustomFood: (id: string, updates: Partial<Meal>) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [dailyData, setDailyData] = useState<Record<string, DailyData>>(() => {
        try {
            const saved = localStorage.getItem('fitjang_data');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.error("Failed to load data", e);
            return {};
        }
    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        localStorage.setItem('fitjang_data', JSON.stringify(dailyData));
    }, [dailyData]);

    const getDateKey = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDataForDate = (date: Date) => {
        const key = getDateKey(date);
        return dailyData[key] || {
            date: key,
            waterIntake: 0,
            sleepDuration: 0,
            meals: [],
            workoutCompleted: false,
            completedExercises: [],
            steps: 0,
        };
    };

    const updateDateData = (date: Date, updater: (data: DailyData) => DailyData) => {
        const key = getDateKey(date);
        setDailyData(prev => {
            const current = prev[key] || {
                date: key,
                waterIntake: 0,
                sleepDuration: 0,
                meals: [],
                workoutCompleted: false,
                completedExercises: [],
                steps: 0,
            };
            return { ...prev, [key]: updater(current) };
        });
    };

    const addMeal = (date: Date, meal: Omit<Meal, 'id'>) => {
        updateDateData(date, data => ({
            ...data,
            meals: [...data.meals, { ...meal, id: Math.random().toString(36).substr(2, 9) }],
        }));
    };

    const removeMeal = (date: Date, id: string) => {
        updateDateData(date, data => ({
            ...data,
            meals: data.meals.filter(m => m.id !== id),
        }));
    };

    const updateWater = (date: Date, delta: number) => {
        updateDateData(date, data => ({
            ...data,
            waterIntake: Math.max(0, data.waterIntake + delta),
        }));
    };

    const updateSleep = (date: Date, hours: number, start?: string, end?: string) => {
        updateDateData(date, data => ({
            ...data,
            sleepDuration: hours,
            sleepStart: start ?? data.sleepStart,
            sleepEnd: end ?? data.sleepEnd,
        }));
    };

    const toggleWorkoutComplete = (date: Date) => {
        updateDateData(date, data => ({
            ...data,
            workoutCompleted: !data.workoutCompleted,
        }));
    };

    const toggleExerciseComplete = (date: Date, index: number, totalExercises: number) => {
        updateDateData(date, data => {
            const currentCompleted = data.completedExercises || [];
            const isCompleted = currentCompleted.includes(index);

            let newCompleted;
            if (isCompleted) {
                newCompleted = currentCompleted.filter(i => i !== index);
            } else {
                newCompleted = [...currentCompleted, index];
            }

            const allDone = newCompleted.length === totalExercises && totalExercises > 0;

            return {
                ...data,
                completedExercises: newCompleted,
                workoutCompleted: allDone ? true : (isCompleted ? false : data.workoutCompleted)
            };
        });
    };

    const updateBodyMetrics = (date: Date, weight?: number, bodyFat?: number) => {
        updateDateData(date, data => ({
            ...data,
            weight: weight !== undefined ? weight : data.weight,
            bodyFat: bodyFat !== undefined ? bodyFat : data.bodyFat,
        }));
    };

    const updateSteps = (date: Date, steps: number) => {
        updateDateData(date, data => ({
            ...data,
            steps: steps,
        }));
    };

    // Custom Foods Logic
    const [customFoods, setCustomFoods] = useState<Meal[]>(() => {
        try {
            const saved = localStorage.getItem('fitjang_custom_foods');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to load custom foods", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('fitjang_custom_foods', JSON.stringify(customFoods));
    }, [customFoods]);

    const addCustomFood = (food: Omit<Meal, 'id'>) => {
        const newFood = { ...food, id: Math.random().toString(36).substr(2, 9) };
        setCustomFoods(prev => [newFood, ...prev]);
    };

    const removeCustomFood = (id: string) => {
        setCustomFoods(prev => prev.filter(f => f.id !== id));
    };

    const updateCustomFood = (id: string, updates: Partial<Meal>) => {
        setCustomFoods(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    return (
        <DataContext.Provider value={{
            selectedDate,
            setSelectedDate,
            getDataForDate,
            addMeal,
            removeMeal,
            updateWater,
            updateSleep,
            clearSleep: (date: Date) => updateDateData(date, data => ({ ...data, sleepDuration: 0, sleepStart: undefined, sleepEnd: undefined })),
            toggleWorkoutComplete,
            toggleExerciseComplete,
            updateBodyMetrics,
            updateSteps,
            customFoods,
            addCustomFood,
            removeCustomFood,
            updateCustomFood
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
