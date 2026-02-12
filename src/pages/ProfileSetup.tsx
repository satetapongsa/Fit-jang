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
        goal: profile?.goal || 'general',
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
            goal: formData.goal as any,
        });
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background pb-20">
            <Card className="w-full max-w-lg space-y-6 animate-fade-in border-primary/20 bg-surface/50 backdrop-blur-sm">
                <div className="text-center space-y-2">
                    <div className="mx-auto w-20 h-20 bg-surfaceHighlight rounded-full flex items-center justify-center mb-4">
                        <UserCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Your Profile
                    </h1>
                    <p className="text-text-muted">Customize your plan with smart metrics.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Name (Display Name)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="space-y-2">
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

                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">
                            Workout Frequency: {formData.workoutDays} Days/Week
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

                    <Button type="submit" className="w-full text-lg font-semibold" size="lg">
                        Save Profile
                    </Button>
                </form>
            </Card>
        </div>
    );
}
