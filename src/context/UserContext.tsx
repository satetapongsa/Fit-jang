import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserProfile = {
    name: string;
    avatarUrl?: string; // Currently not used but field exists for future
    weight: number; // kg
    height: number; // cm
    age: number;
    gender: 'male' | 'female';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    workoutDays: number; // 1-7
    bodyFat?: number; // Optional
    sugarLevel?: number; // Optional
    waterGoal?: number; // ml, custom goal
    goal: 'general' | 'lose_weight' | 'build_muscle' | 'tone_legs' | 'lose_belly';
};

type UserContextType = {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
    calculateBMR: () => number;
    calculateBMI: () => { value: number; category: string };
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile | null>(() => {
        try {
            const saved = localStorage.getItem('fitjang_profile');
            console.log("Loading profile from storage:", saved);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Error parsing profile:", e);
            return null;
        }
    });

    useEffect(() => {
        if (profile) {
            localStorage.setItem('fitjang_profile', JSON.stringify(profile));
        }
    }, [profile]);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile(prev => prev ? { ...prev, ...updates } : null);
    };

    const calculateBMR = () => {
        if (!profile) return 0;
        const { weight, height, age, gender } = profile;
        // Mifflin-St Jeor Equation
        let bmr = 0;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Activity Multiplier
        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        return Math.round(bmr * multipliers[profile.activityLevel]);
    };

    const calculateBMI = () => {
        if (!profile) return { value: 0, category: 'Unknown' };
        const heightM = profile.height / 100;
        const bmi = Number((profile.weight / (heightM * heightM)).toFixed(1));

        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';

        return { value: bmi, category };
    };

    return (
        <UserContext.Provider value={{ profile, setProfile, updateProfile, calculateBMR, calculateBMI }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
