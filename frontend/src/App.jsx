import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateSecret from './pages/CreateSecret'
import MySecrets from './pages/MySecrets'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import ChangePassword from './pages/ChangePassword'
import ShareText from './pages/ShareText'
import ReceiveText from './pages/ReceiveText'
import ViewSecret from './pages/ViewSecret'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/s/:token" element={<ViewSecret />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create-secret" element={<CreateSecret />} />
          <Route path="my-secrets" element={<MySecrets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<UpdateProfile />} />
          <Route path="profile/change-password" element={<ChangePassword />} />
          <Route path="share-text" element={<ShareText />} />
          <Route path="receive-text" element={<ReceiveText />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
