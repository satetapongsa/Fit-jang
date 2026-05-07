export type MealCategory = 'all' | 'meat' | 'vegetarian' | 'vegan' | 'dairy';

export interface Meal {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    image: string;
    description: string;
    category: MealCategory;
}

export const MEAL_RECOMMENDATIONS: Meal[] = [
    {
        name: "Grilled Chicken Breast with Quinoa",
        calories: 450, protein: 42, fat: 10, carbs: 35,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
        description: "Lean protein powerhouse. Quinoa provides complex carbs for sustained energy.",
        category: 'meat'
    },
    {
        name: "Salmon Fillet with Steamed Broccoli",
        calories: 520, protein: 38, fat: 24, carbs: 8,
        image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800",
        description: "Rich in Omega-3 fatty acids for heart health and muscle inflammation reduction.",
        category: 'meat'
    },
    {
        name: "Lean Beef Stir-Fry",
        calories: 580, protein: 45, fat: 18, carbs: 42,
        image: "https://images.unsplash.com/photo-1512058560366-cd2427bb5871?w=800",
        description: "Iron-rich beef paired with colorful veggies for a complete micronutrient profile.",
        category: 'meat'
    },
    {
        name: "Greek Yogurt Bowl with Berries & Nuts",
        calories: 320, protein: 28, fat: 12, carbs: 22,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
        description: "Perfect post-workout snack. High in protein and antioxidants.",
        category: 'dairy'
    },
    {
        name: "Tempeh Buddha Bowl",
        calories: 480, protein: 32, fat: 16, carbs: 48,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Plant-based protein rich in fiber and essential nutrients.",
        category: 'vegan'
    },
    {
        name: "Egg White Omelette with Spinach",
        calories: 250, protein: 30, fat: 8, carbs: 5,
        image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800",
        description: "Low-calorie, high-protein breakfast to start your day right.",
        category: 'vegetarian'
    },
    {
        name: "Tuna Salad with Avocado",
        calories: 380, protein: 35, fat: 20, carbs: 12,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        description: "Quick and easy lunch packed with healthy fats and lean protein.",
        category: 'meat'
    },
    {
        name: "Grilled Turkey Burgers",
        calories: 420, protein: 34, fat: 12, carbs: 28,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
        description: "A leaner alternative to beef, great for muscle maintenance.",
        category: 'meat'
    },
    {
        name: "Chickpea and Chicken Salad",
        calories: 410, protein: 32, fat: 14, carbs: 30,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Fiber and protein combo that keeps you full for longer.",
        category: 'meat'
    },
    {
        name: "Cottage Cheese with Pineapple",
        calories: 210, protein: 25, fat: 4, carbs: 18,
        image: "https://images.unsplash.com/photo-1481931098730-318b6f976db0?w=800",
        description: "Refreshing snack with slow-digesting casein protein.",
        category: 'dairy'
    },
    {
        name: "Roasted Chickpeas with Spices",
        calories: 280, protein: 15, fat: 8, carbs: 32,
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800",
        description: "Crunchy, plant-based protein snack for any time of the day.",
        category: 'vegan'
    },
    {
        name: "Steak and Asparagus",
        calories: 550, protein: 48, fat: 28, carbs: 6,
        image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=800",
        description: "Classic bodybuilding meal for iron and high-quality protein.",
        category: 'meat'
    },
    {
        name: "Tofu Stir-Fry with Cashews",
        calories: 460, protein: 26, fat: 22, carbs: 38,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Delicious vegan protein source with healthy fats from nuts.",
        category: 'vegan'
    },
    {
        name: "Cod with Roasted Root Veggies",
        calories: 340, protein: 32, fat: 6, carbs: 35,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
        description: "Lean white fish paired with complex carbs for recovery.",
        category: 'meat'
    },
    {
        name: "Protein Pancakes with Blueberries",
        calories: 380, protein: 30, fat: 10, carbs: 40,
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
        description: "Guilt-free breakfast that tastes like a treat.",
        category: 'vegetarian'
    },
    {
        name: "Lentil Soup with Whole Grain Bread",
        calories: 420, protein: 24, fat: 8, carbs: 60,
        image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800",
        description: "Warm, comforting, and packed with plant-based protein and fiber.",
        category: 'vegan'
    },
    {
        name: "Shrimp Scampi with Zucchini Noodles",
        calories: 310, protein: 35, fat: 12, carbs: 10,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
        description: "Light, low-carb dinner with high-quality seafood protein.",
        category: 'meat'
    },
    {
        name: "Edamame and Seaweed Salad",
        calories: 240, protein: 18, fat: 10, carbs: 15,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Nutrient-dense snack or side dish with complete plant protein.",
        category: 'vegan'
    },
    {
        name: "Pork Tenderloin with Sweet Potato",
        calories: 490, protein: 38, fat: 14, carbs: 45,
        image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800",
        description: "Lean pork paired with vitamin-rich sweet potatoes.",
        category: 'meat'
    },
    {
        name: "Hummus and Raw Veggie Platter",
        calories: 280, protein: 12, fat: 15, carbs: 28,
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800",
        description: "Healthy fats and plant protein for a steady energy boost.",
        category: 'vegan'
    },
    {
        name: "Turkey Meatballs with Marinara",
        calories: 390, protein: 32, fat: 15, carbs: 20,
        image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800",
        description: "Protein-packed meatballs that pair great with whole wheat pasta.",
        category: 'meat'
    },
    {
        name: "Peanut Butter and Banana on Toast",
        calories: 350, protein: 12, fat: 18, carbs: 42,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
        description: "Energy-dense pre-workout snack with healthy fats and potassium.",
        category: 'vegan'
    },
    {
        name: "Seared Scallops with Cauliflower Puree",
        calories: 320, protein: 28, fat: 14, carbs: 12,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800",
        description: "Gourmet, high-protein meal that is low in calories.",
        category: 'meat'
    },
    {
        name: "Baked Chicken Thighs with Brussels Sprouts",
        calories: 480, protein: 35, fat: 22, carbs: 15,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800",
        description: "Juicy chicken thighs with nutrient-packed cruciferous veggies.",
        category: 'meat'
    },
    {
        name: "Egg Salad with Celery and Onions",
        calories: 290, protein: 18, fat: 20, carbs: 8,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
        description: "Classic high-protein snack, great in wraps or on crackers.",
        category: 'vegetarian'
    },
    {
        name: "Quinoa Salad with Black Beans and Corn",
        calories: 360, protein: 14, fat: 10, carbs: 55,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
        description: "Southwestern-style plant protein with plenty of fiber.",
        category: 'vegan'
    },
    {
        name: "Miso Glazed Sea Bass",
        calories: 380, protein: 30, fat: 18, carbs: 15,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
        description: "Flavorful and elegant seafood protein option.",
        category: 'meat'
    },
    {
        name: "Almond Crusted Chicken Strips",
        calories: 420, protein: 38, fat: 22, carbs: 12,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800",
        description: "A healthier, grain-free take on chicken tenders.",
        category: 'meat'
    },
    {
        name: "Lentil Pasta with Turkey Bolognese",
        calories: 460, protein: 42, fat: 12, carbs: 48,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
        description: "Double protein hit from lentils and lean turkey.",
        category: 'meat'
    },
    {
        name: "Venison Steak with Berry Reduction",
        calories: 410, protein: 45, fat: 10, carbs: 18,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        description: "Lean game meat that is incredibly high in iron and protein.",
        category: 'meat'
    },
    {
        name: "Chicken Teriyaki with Steamed Bok Choy",
        calories: 440, protein: 38, fat: 10, carbs: 45,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
        description: "Balanced meal with lean protein and fiber-rich greens.",
        category: 'meat'
    },
    {
        name: "Baked Salmon with Lemon and Dill",
        calories: 480, protein: 35, fat: 25, carbs: 5,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
        description: "Omega-3 powerhouse with minimal carbs.",
        category: 'meat'
    },
    {
        name: "Protein Shake with Almond Butter",
        calories: 280, protein: 25, fat: 15, carbs: 10,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800",
        description: "Fast-absorbing protein for immediate post-workout recovery.",
        category: 'dairy'
    },
    {
        name: "Broccoli and Cheddar Soup",
        calories: 320, protein: 18, fat: 22, carbs: 15,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
        description: "Comforting and nutrient-dense, great with a side of lean protein.",
        category: 'dairy'
    },
    {
        name: "Stuffed Bell Peppers with Ground Turkey",
        calories: 390, protein: 30, fat: 14, carbs: 32,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800",
        description: "Complete meal in one colorful package.",
        category: 'meat'
    }
];
