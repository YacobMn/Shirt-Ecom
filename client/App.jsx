// This file handles the overall display and routing of the entire application; note that there were plans to add a background image to each page, but was put on hold for successfully deploying the MVP in a timely manner

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, ProtectedRoute, WorkoutForm, GoalForm, BMICalc } from './components';
import { HomePage, AuthPage, Logout, PrivatePage } from './pages/'
import 'bootstrap/dist/css/bootstrap.min.css';
//import weights from './img/weights.jpg';// 
export default function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <div className="container pt-5">
          {/* <div style={{
            backgroundImage: `url(${weights})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",
            width: '100vw', height: '100vh'
          }}>
          </div> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <PrivatePage />
              </ProtectedRoute>
            } />

            <Route path="/workoutform" element={
              <ProtectedRoute>
                <WorkoutForm />
              </ProtectedRoute>
            } />

            <Route path="/goalform" element={
              <ProtectedRoute>
                <GoalForm />
              </ProtectedRoute>
            } />

            <Route path="/calc" element={
              <ProtectedRoute>
                <BMICalc />
              </ProtectedRoute>
            } />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
