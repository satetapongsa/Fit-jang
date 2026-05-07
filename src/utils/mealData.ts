export type MealCategory = 'all' | 'meat' | 'vegetarian' | 'vegan' | 'dairy' | 'snack';

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
    // --- MEAT (20 ITEMS) ---
    { name: "Grilled Chicken Breast with Quinoa", calories: 450, protein: 42, fat: 10, carbs: 35, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800", description: "Lean protein powerhouse. Quinoa provides complex carbs.", category: 'meat' },
    { name: "Salmon Fillet with Steamed Broccoli", calories: 520, protein: 38, fat: 24, carbs: 8, image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800", description: "Rich in Omega-3 fatty acids for muscle recovery.", category: 'meat' },
    { name: "Lean Beef Stir-Fry", calories: 580, protein: 45, fat: 18, carbs: 42, image: "https://images.unsplash.com/photo-1512058560366-cd2427bb5871?w=800", description: "Iron-rich beef paired with colorful veggies.", category: 'meat' },
    { name: "Tuna Salad with Avocado", calories: 380, protein: 35, fat: 20, carbs: 12, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800", description: "Healthy fats and lean protein lunch.", category: 'meat' },
    { name: "Grilled Turkey Burgers", calories: 420, protein: 34, fat: 12, carbs: 28, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800", description: "A leaner alternative to beef burgers.", category: 'meat' },
    { name: "Baked Cod with Root Veggies", calories: 340, protein: 32, fat: 6, carbs: 35, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800", description: "Low-fat, high-protein white fish meal.", category: 'meat' },
    { name: "Shrimp Scampi with Zucchini Noodles", calories: 310, protein: 35, fat: 12, carbs: 10, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800", description: "Light, low-carb dinner with seafood.", category: 'meat' },
    { name: "Pork Tenderloin with Sweet Potato", calories: 490, protein: 38, fat: 14, carbs: 45, image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800", description: "Lean pork paired with complex carbs.", category: 'meat' },
    { name: "Turkey Meatballs with Marinara", calories: 390, protein: 32, fat: 15, carbs: 20, image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800", description: "Protein-packed meatballs for recovery.", category: 'meat' },
    { name: "Seared Scallops with Cauliflower", calories: 320, protein: 28, fat: 14, carbs: 12, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", description: "Gourmet, high-protein, low-calorie meal.", category: 'meat' },
    { name: "Baked Chicken Thighs", calories: 480, protein: 35, fat: 22, carbs: 15, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800", description: "Juicy chicken thighs with roasted sprouts.", category: 'meat' },
    { name: "Venison Steak", calories: 410, protein: 45, fat: 10, carbs: 18, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", description: "Lean game meat high in iron.", category: 'meat' },
    { name: "Chicken Teriyaki Bowl", calories: 440, protein: 38, fat: 10, carbs: 45, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800", description: "Balanced meal with lean protein.", category: 'meat' },
    { name: "Grilled Sea Bass", calories: 380, protein: 30, fat: 18, carbs: 15, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800", description: "Elegant seafood protein option.", category: 'meat' },
    { name: "Almond Crusted Chicken", calories: 420, protein: 38, fat: 22, carbs: 12, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800", description: "Grain-free, high-protein chicken strips.", category: 'meat' },
    { name: "Stuffed Bell Peppers (Turkey)", calories: 390, protein: 30, fat: 14, carbs: 32, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800", description: "Colorful turkey-stuffed peppers.", category: 'meat' },
    { name: "Bison Burger (No Bun)", calories: 350, protein: 40, fat: 12, carbs: 5, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800", description: "Ultra-lean red meat option.", category: 'meat' },
    { name: "Lemon Garlic Tilapia", calories: 280, protein: 35, fat: 6, carbs: 8, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800", description: "Fast, easy, lean white fish.", category: 'meat' },
    { name: "Chicken and White Bean Chili", calories: 410, protein: 34, fat: 10, carbs: 40, image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800", description: "Hearty protein-rich soup.", category: 'meat' },
    { name: "Grilled Lamb Chops", calories: 520, protein: 36, fat: 30, carbs: 2, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", description: "Flavorful protein with healthy fats.", category: 'meat' },

    // --- VEGETARIAN (20 ITEMS) ---
    { name: "Egg White Omelette", calories: 250, protein: 30, fat: 8, carbs: 5, image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800", description: "High-protein vegetarian breakfast.", category: 'vegetarian' },
    { name: "Protein Pancakes", calories: 380, protein: 30, fat: 10, carbs: 40, image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800", description: "Oat-based protein breakfast.", category: 'vegetarian' },
    { name: "Egg Salad with Celery", calories: 290, protein: 18, fat: 20, carbs: 8, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800", description: "Classic egg-based protein snack.", category: 'vegetarian' },
    { name: "Halloumi Salad", calories: 450, protein: 22, fat: 30, carbs: 15, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Grilled cheese salad with greens.", category: 'vegetarian' },
    { name: "Quinoa and Egg Bowl", calories: 410, protein: 20, fat: 15, carbs: 45, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Complete protein from quinoa and eggs.", category: 'vegetarian' },
    { name: "Paneer Tikka", calories: 380, protein: 25, fat: 22, carbs: 12, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800", description: "Grilled cottage cheese with spices.", category: 'vegetarian' },
    { name: "Shakshuka", calories: 320, protein: 18, fat: 18, carbs: 20, image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800", description: "Poached eggs in tomato sauce.", category: 'vegetarian' },
    { name: "Vegetarian Burrito Bowl", calories: 480, protein: 18, fat: 16, carbs: 65, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Beans, rice, and cheese power bowl.", category: 'vegetarian' },
    { name: "Lentil Pasta (Cheese)", calories: 420, protein: 28, fat: 12, carbs: 50, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800", description: "High-protein pasta with parm.", category: 'vegetarian' },
    { name: "Greek Salad with Extra Feta", calories: 350, protein: 12, fat: 25, carbs: 15, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Refreshing veggie-heavy salad.", category: 'vegetarian' },
    { name: "Mushroom and Spinach Frittata", calories: 280, protein: 22, fat: 18, carbs: 10, image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800", description: "Bake egg dish with veggies.", category: 'vegetarian' },
    { name: "Tofu and Egg Scramble", calories: 310, protein: 25, fat: 16, carbs: 8, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Double protein vegetarian scramble.", category: 'vegetarian' },
    { name: "Vegetarian Chili", calories: 380, protein: 20, fat: 10, carbs: 55, image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800", description: "Bean-based hearty chili.", category: 'vegetarian' },
    { name: "Caprese Salad with Avocado", calories: 320, protein: 12, fat: 26, carbs: 10, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Fresh mozz and healthy fats.", category: 'vegetarian' },
    { name: "Whole Wheat Pasta with Pesto", calories: 450, protein: 15, fat: 22, carbs: 55, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800", description: "Nut-based fats and complex carbs.", category: 'vegetarian' },
    { name: "Baked Sweet Potato with Beans", calories: 390, protein: 16, fat: 8, carbs: 65, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Satiating high-fiber meal.", category: 'vegetarian' },
    { name: "Cauliflower Steaks with Tahini", calories: 280, protein: 10, fat: 18, carbs: 25, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Low-carb roasted veggie meal.", category: 'vegetarian' },
    { name: "Zucchini Fritters", calories: 260, protein: 14, fat: 14, carbs: 20, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Crispy veggie-based protein.", category: 'vegetarian' },
    { name: "Ricotta and Spinach Stuffed Shells", calories: 420, protein: 22, fat: 18, carbs: 45, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800", description: "High-protein cheese pasta.", category: 'vegetarian' },
    { name: "Egg and Cheese Breakfast Sandwich", calories: 380, protein: 20, fat: 18, carbs: 35, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Classic high-protein breakfast.", category: 'vegetarian' },

    // --- VEGAN (20 ITEMS) ---
    { name: "Tempeh Buddha Bowl", calories: 480, protein: 32, fat: 16, carbs: 48, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Plant-based protein powerhouse.", category: 'vegan' },
    { name: "Tofu Stir-Fry with Cashews", calories: 460, protein: 26, fat: 22, carbs: 38, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "High-protein vegan dinner.", category: 'vegan' },
    { name: "Lentil Soup", calories: 420, protein: 24, fat: 8, carbs: 60, image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800", description: "Fiber and protein-rich comfort soup.", category: 'vegan' },
    { name: "Chickpea Salad", calories: 360, protein: 14, fat: 10, carbs: 55, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Refreshing plant-protein salad.", category: 'vegan' },
    { name: "Hummus Platter", calories: 280, protein: 12, fat: 15, carbs: 28, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800", description: "Healthy fats and plant protein.", category: 'vegan' },
    { name: "Peanut Butter Banana Toast", calories: 350, protein: 12, fat: 18, carbs: 42, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Quick vegan energy snack.", category: 'vegan' },
    { name: "Seitan 'Steak' with Kale", calories: 420, protein: 45, fat: 8, carbs: 30, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Highest protein vegan option.", category: 'vegan' },
    { name: "Black Bean Tacos", calories: 380, protein: 18, fat: 14, carbs: 50, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Fiber-rich vegan protein dinner.", category: 'vegan' },
    { name: "Edamame Bowl", calories: 240, protein: 18, fat: 10, carbs: 15, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Complete plant protein snack.", category: 'vegan' },
    { name: "Roasted Chickpeas", calories: 280, protein: 15, fat: 8, carbs: 32, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800", description: "Crunchy high-protein snack.", category: 'vegan' },
    { name: "Quinoa and Black Bean Stew", calories: 410, protein: 20, fat: 12, carbs: 55, image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800", description: "Filling vegan protein stew.", category: 'vegan' },
    { name: "Tofu Scramble with Turmeric", calories: 290, protein: 24, fat: 16, carbs: 10, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Vegan alternative to scrambled eggs.", category: 'vegan' },
    { name: "Falafel Wrap", calories: 480, protein: 18, fat: 22, carbs: 55, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Plant protein from chickpeas.", category: 'vegan' },
    { name: "Chia Seed Pudding", calories: 320, protein: 10, fat: 18, carbs: 25, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", description: "Omega-3 rich vegan snack.", category: 'vegan' },
    { name: "Red Lentil Curry (Dal)", calories: 440, protein: 22, fat: 12, carbs: 65, image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800", description: "Iron-rich vegan protein meal.", category: 'vegan' },
    { name: "Vegan Protein Smoothie", calories: 310, protein: 25, fat: 8, carbs: 35, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800", description: "Fast vegan muscle recovery.", category: 'vegan' },
    { name: "Roasted Vegetables with Tahini", calories: 340, protein: 12, fat: 22, carbs: 28, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Healthy fats and micronutrients.", category: 'vegan' },
    { name: "Miso Ramen with Extra Tofu", calories: 460, protein: 24, fat: 14, carbs: 60, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Satisfying vegan noodle soup.", category: 'vegan' },
    { name: "Sweet Potato and Chickpea Curry", calories: 490, protein: 18, fat: 16, carbs: 70, image: "https://images.unsplash.com/photo-1547592115-f96746890d4c?w=800", description: "Vitamin A and protein power.", category: 'vegan' },
    { name: "Smashed Avocado and Bean Toast", calories: 380, protein: 14, fat: 20, carbs: 45, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Healthy fat and fiber breakfast.", category: 'vegan' },

    // --- DAIRY (20 ITEMS) ---
    { name: "Greek Yogurt Bowl", calories: 320, protein: 28, fat: 12, carbs: 22, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", description: "High-protein dairy snack.", category: 'dairy' },
    { name: "Cottage Cheese with Fruit", calories: 210, protein: 25, fat: 4, carbs: 18, image: "https://images.unsplash.com/photo-1481931098730-318b6f976db0?w=800", description: "Slow-digesting casein protein.", category: 'dairy' },
    { name: "Protein Shake (Whey)", calories: 280, protein: 25, fat: 15, carbs: 10, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800", description: "Fast-absorbing whey protein.", category: 'dairy' },
    { name: "Broccoli and Cheddar Soup", calories: 320, protein: 18, fat: 22, carbs: 15, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800", description: "Calcium-rich veggie soup.", category: 'dairy' },
    { name: "Cheese and Apple Slices", calories: 240, protein: 12, fat: 18, carbs: 15, image: "https://images.unsplash.com/photo-1481931098730-318b6f976db0?w=800", description: "Quick protein and fiber snack.", category: 'dairy' },
    { name: "Kefir Smoothie", calories: 290, protein: 16, fat: 8, carbs: 40, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800", description: "Probiotic and protein-rich drink.", category: 'dairy' },
    { name: "Mozzarella and Tomato Plate", calories: 310, protein: 18, fat: 24, carbs: 6, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Simple, high-protein dairy.", category: 'dairy' },
    { name: "Quark with Berries", calories: 180, protein: 22, fat: 2, carbs: 12, image: "https://images.unsplash.com/photo-1481931098730-318b6f976db0?w=800", description: "Ultra-lean high protein dairy.", category: 'dairy' },
    { name: "Milk and Whey Post-Workout", calories: 350, protein: 35, fat: 10, carbs: 30, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800", description: "Optimal recovery drink.", category: 'dairy' },
    { name: "Skyr Yogurt with Almonds", calories: 340, protein: 32, fat: 14, carbs: 18, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", description: "Thick Icelandic protein yogurt.", category: 'dairy' },
    { name: "Cottage Cheese on Rye", calories: 280, protein: 20, fat: 6, carbs: 35, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Satiating dairy breakfast.", category: 'dairy' },
    { name: "Cheese Omelette", calories: 410, protein: 28, fat: 32, carbs: 4, image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800", description: "High-fat, high-protein dairy.", category: 'dairy' },
    { name: "Ricotta with Honey and Nuts", calories: 380, protein: 16, fat: 28, carbs: 20, image: "https://images.unsplash.com/photo-1481931098730-318b6f976db0?w=800", description: "Sweet and creamy protein snack.", category: 'dairy' },
    { name: "Greek Yogurt Tzatziki with Pita", calories: 360, protein: 18, fat: 12, carbs: 45, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800", description: "High-protein Mediterranean snack.", category: 'dairy' },
    { name: "String Cheese and Turkey Roll", calories: 260, protein: 24, fat: 14, carbs: 2, image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800", description: "The ultimate keto dairy snack.", category: 'dairy' },
    { name: "Feta and Spinach Muffins", calories: 320, protein: 15, fat: 20, carbs: 18, image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800", description: "Savory dairy-based breakfast.", category: 'dairy' },
    { name: "Paneer and Green Pea Curry", calories: 480, protein: 24, fat: 30, carbs: 35, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800", description: "Traditional dairy-based protein.", category: 'dairy' },
    { name: "Baked Brie with Walnuts", calories: 510, protein: 18, fat: 45, carbs: 12, image: "https://images.unsplash.com/photo-1481931098730-318b6f976db0?w=800", description: "Indulgent high-fat dairy protein.", category: 'dairy' },
    { name: "Greek Yogurt and Peanut Butter", calories: 380, protein: 30, fat: 20, carbs: 22, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", description: "Thick and creamy protein bomb.", category: 'dairy' },
    { name: "Grilled Cheese (High Protein Bread)", calories: 450, protein: 26, fat: 24, carbs: 30, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Comforting dairy protein meal.", category: 'dairy' },

    // --- SNACK (20 ITEMS) ---
    { name: "Rice Cakes with Almond Butter", calories: 220, protein: 8, fat: 14, carbs: 18, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Light and crunchy clean snack.", category: 'snack' },
    { name: "Energy Balls (Oat and Date)", calories: 280, protein: 10, fat: 12, carbs: 35, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800", description: "Natural sugar energy boost.", category: 'snack' },
    { name: "Baked Apple with Cinnamon", calories: 150, protein: 2, fat: 1, carbs: 38, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800", description: "Sweet and fiber-rich clean treat.", category: 'snack' },
    { name: "Trail Mix (Raw Nuts/Seeds)", calories: 350, protein: 14, fat: 28, carbs: 15, image: "https://images.unsplash.com/photo-1511548539487-43b53e5af207?w=800", description: "Portable high-fat energy snack.", category: 'snack' },
    { name: "Frozen Grapes", calories: 100, protein: 1, fat: 0, carbs: 25, image: "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?w=800", description: "Refreshing low-calorie sweet snack.", category: 'snack' },
    { name: "Beef Jerky (Lean)", calories: 180, protein: 25, fat: 4, carbs: 8, image: "https://images.unsplash.com/photo-1512058560366-cd2427bb5871?w=800", description: "Classic high-protein meat snack.", category: 'snack' },
    { name: "Hard Boiled Egg", calories: 75, protein: 7, fat: 5, carbs: 1, image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800", description: "The perfect quick protein snack.", category: 'snack' },
    { name: "Carrot Sticks and Hummus", calories: 180, protein: 6, fat: 10, carbs: 18, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800", description: "Crunchy and fiber-rich veggie snack.", category: 'snack' },
    { name: "Dark Chocolate and Almonds", calories: 310, protein: 8, fat: 24, carbs: 18, image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800", description: "Antioxidant-rich clean indulgence.", category: 'snack' },
    { name: "Celery with Peanut Butter", calories: 240, protein: 10, fat: 18, carbs: 12, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", description: "Fiber and healthy fat combo.", category: 'snack' },
    { name: "Pumpkin Seeds (Pepitas)", calories: 210, protein: 12, fat: 16, carbs: 8, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800", description: "Zinc-rich plant protein snack.", category: 'snack' },
    { name: "Greek Yogurt and Honey", calories: 250, protein: 22, fat: 8, carbs: 25, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", description: "Creamy and sweet protein snack.", category: 'snack' },
    { name: "Roasted Seaweed Snacks", calories: 50, protein: 2, fat: 4, carbs: 2, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Ultra-low calorie salty snack.", category: 'snack' },
    { name: "Popcorn (Air Popped)", calories: 120, protein: 4, fat: 1, carbs: 25, image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800", description: "Whole grain, high-fiber snack.", category: 'snack' },
    { name: "Turkey Roll-ups with Avocado", calories: 220, protein: 22, fat: 12, carbs: 5, image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800", description: "Low-carb high-protein roll-ups.", category: 'snack' },
    { name: "Baked Sweet Potato Fries", calories: 280, protein: 4, fat: 8, carbs: 45, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Healthier take on French fries.", category: 'snack' },
    { name: "Handful of Pistachios", calories: 160, protein: 6, fat: 13, carbs: 8, image: "https://images.unsplash.com/photo-1511548539487-43b53e5af207?w=800", description: "Lower calorie nut option.", category: 'snack' },
    { name: "Banana with Almonds", calories: 220, protein: 6, fat: 12, carbs: 28, image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800", description: "Potassium and healthy fat boost.", category: 'snack' },
    { name: "Edamame in the Pod", calories: 140, protein: 12, fat: 6, carbs: 12, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "Fun to eat plant protein.", category: 'snack' },
    { name: "Clean Protein Bar (Homemade)", calories: 280, protein: 20, fat: 12, carbs: 25, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", description: "No added sugar protein boost.", category: 'snack' }
];
