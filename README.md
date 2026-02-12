# Fitjang Web Application

## Setup Instructions

1.  **Install Dependencies**
    Run the following command to install all necessary libraries:
    ```bash
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm install react-router-dom lucide-react clsx tailwind-merge framer-motion date-fns react-calendar
    ```

2.  **Run Development Server**
    Start the app locally:
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    To create a production build:
    ```bash
    npm run build
    ```

## Features
- **Profile Setup**: Calculate BMR and set workout frequency.
- **Dashboard**: View daily calibration, hydration, sleep, and today's workout.
- **Schedule**: Interactive calendar showing workout days based on your frequency (1-7 days).
- **Tracker**: Log daily meals, water intake, and sleep.
- **Responsive Design**: Premium dark theme optimized for Mobile and Desktop.
