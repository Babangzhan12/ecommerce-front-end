import { Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import { ProtectedRoute } from './component/ProtectedROute';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/admin/dashboard' element={
        <ProtectedRoute>
          <DashboardAdminPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App;
