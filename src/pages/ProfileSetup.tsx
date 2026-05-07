import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { UserCircle } from 'lucide-react';

export default function ProfileSetup() {
    const navigate = useNavigate();
    const { profile, setProfile } = useUser();

    // Initialize with existing profile or defaults
    const [formData, setFormData] = useState({
        name: profile?.name || '',
        weight: profile?.weight?.toString() || '',
        height: profile?.height?.toString() || '',
        age: profile?.age?.toString() || '',
        gender: profile?.gender || 'male',
        activityLevel: profile?.activityLevel || 'moderate',
        workoutDays: profile?.workoutDays?.toString() || '3',
        bodyFat: profile?.bodyFat?.toString() || '',
        sugarLevel: profile?.sugarLevel?.toString() || '',
        waterGoal: profile?.waterGoal?.toString() || '3000',
        calorieGoal: profile?.calorieGoal?.toString() || '2500',
        goal: profile?.goal || 'general',
        mbti: profile?.mbti || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProfile({
            name: formData.name,
            weight: Number(formData.weight),
            height: Number(formData.height),
            age: Number(formData.age),
            gender: formData.gender as 'male' | 'female',
            activityLevel: formData.activityLevel as any,
            workoutDays: Number(formData.workoutDays),
            bodyFat: formData.bodyFat ? Number(formData.bodyFat) : undefined,
            sugarLevel: formData.sugarLevel ? Number(formData.sugarLevel) : undefined,
            waterGoal: Number(formData.waterGoal),
            calorieGoal: Number(formData.calorieGoal),
            goal: formData.goal as any,
            mbti: formData.mbti,
        });
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background pb-20 lg:p-10">
            <Card className="w-full max-w-4xl space-y-8 animate-fade-in border-primary/20 bg-surface/50 backdrop-blur-sm p-6 lg:p-12 rounded-[32px]">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                        <UserCircle className="w-14 h-14 text-primary" />
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Personal Profile
                    </h1>
                    <p className="text-text-muted lg:text-lg">Customize your smart fitness plan based on your metrics.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2">
                        <Input
                            label="Name (Display Name)"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <Input
                        label="Weight (kg)"
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        required
                    />
                    <Input
                        label="Height (cm)"
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        required
                    />

                    <Input
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Gender</label>
                        <select
                            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-text-muted">Primary Goal</label>
                        <select
                            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
                        >
                            <option value="general">General Fitness (สุขภาพโดยรวม)</option>
                            <option value="lose_weight">Lose Weight (ลดน้ำหนัก)</option>
                            <option value="build_muscle">Build Muscle (สร้างกล้ามเนื้อ)</option>
                            <option value="lose_belly">Lose Belly Fat (ลดพุง)</option>
                            <option value="tone_legs">Tone Legs / Glutes (ลดขา / ปั้นก้น)</option>
                        </select>
                    </div>

                    <Input
                        label="Body Fat % (Optional)"
                        type="number"
                        value={formData.bodyFat}
                        onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                        placeholder="15"
                    />
                    <Input
                        label="Blood Sugar (Optional)"
                        type="number"
                        value={formData.sugarLevel}
                        onChange={(e) => setFormData({ ...formData, sugarLevel: e.target.value })}
                        placeholder="mg/dL"
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">MBTI Personality Type</label>
                        <select
                            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.mbti}
                            onChange={(e) => setFormData({ ...formData, mbti: e.target.value })}
                        >
                            <option value="">Select MBTI</option>
                            {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'].map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Daily Water Goal (ml)</label>
                        <Input
                            type="number"
                            value={formData.waterGoal}
                            onChange={(e) => setFormData({ ...formData, waterGoal: e.target.value })}
                            placeholder="3000"
                        />
                    </div>

                    <Input
                        label="Daily Calorie Goal (kcal)"
                        type="number"
                        value={formData.calorieGoal}
                        onChange={(e) => setFormData({ ...formData, calorieGoal: e.target.value })}
                        placeholder="2500"
                    />

                    <div className="md:col-span-2 space-y-4 pt-4 border-t border-white/5">
                        <label className="text-sm font-medium text-text-muted flex justify-between">
                            <span>Workout Frequency</span>
                            <span className="text-primary font-bold">{formData.workoutDays} Days/Week</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="7"
                            className="w-full h-2 bg-surfaceHighlight rounded-lg appearance-none cursor-pointer accent-primary"
                            value={formData.workoutDays}
                            onChange={(e) => setFormData({ ...formData, workoutDays: e.target.value })}
                        />
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <Button type="submit" className="w-full text-lg font-bold h-14 rounded-2xl" size="lg">
                            Save Profile & Update Plan
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
