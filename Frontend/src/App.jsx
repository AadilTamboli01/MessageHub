import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './Pages/ChatPage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { useAuthStore } from './Store/useAuthStore'
import PageLoader from './Components/PageLoader.jsx'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  // const navigate = useNavigate();

  const { isCheckingAuth, checkAuth, authUser } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])


  console.log(authUser)
  if (isCheckingAuth) {
    return <PageLoader />
  }
  return (
    <div className='min-h-screen bg-slate-900 relative flex item-center justify-center overflow-hidden'>

      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>

        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
