import React, { createContext, useContext, useState, useEffect } from 'react';

export type Meal = {
    id: string;
    name: string;
    calories: number;
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
};

type DataContextType = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    getDataForDate: (date: Date) => DailyData;
    addMeal: (date: Date, meal: Omit<Meal, 'id'>) => void;
    removeMeal: (date: Date, id: string) => void;
    updateWater: (date: Date, amount: number) => void;
    updateSleep: (date: Date, hours: number, start?: string, end?: string) => void;
    toggleWorkoutComplete: (date: Date) => void;
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

    const getDateKey = (date: Date) => date.toISOString().split('T')[0];

    const getDataForDate = (date: Date) => {
        const key = getDateKey(date);
        return dailyData[key] || {
            date: key,
            waterIntake: 0,
            sleepDuration: 0,
            meals: [],
            workoutCompleted: false,
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

    return (
        <DataContext.Provider value={{
            selectedDate,
            setSelectedDate,
            getDataForDate,
            addMeal,
            removeMeal,
            updateWater,
            updateSleep,
            toggleWorkoutComplete
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
