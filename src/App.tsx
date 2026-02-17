import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Tracker from './pages/Tracker';
import FoodDiary from './pages/FoodDiary';
import './calendar-custom.css';

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProfileSetup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/food-diary" element={<FoodDiary />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </DataProvider>
    </UserProvider>
  );
}

export default App;
