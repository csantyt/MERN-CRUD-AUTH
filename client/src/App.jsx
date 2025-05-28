import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import './index.css';
import TaskPage from './pages/TaskPage';

import ProtectedRoute from './pages/ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import Navbar from './components/NavBar';



function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>

                <Route path='/tasks' element={<TaskPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}



export default App;
