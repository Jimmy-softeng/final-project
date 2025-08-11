import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import AuthPage from './pages/AuthPage'; // login/register
import CustomerDashboard from './pages/customer/CustomerDashboard';
import StorekeeperDashboard from './pages/storekeeper/StorekeeperDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import SuperadminDashboard from './pages/superadmin/SuperadminDashboard';

import './App.css';

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/storekeeper/*" element={<StorekeeperDashboard />} />
        <Route path="/dashboard/manager/*" element={<ManagerDashboard />} />
        <Route path="/dashboard/superadmin/*" element={<SuperadminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
