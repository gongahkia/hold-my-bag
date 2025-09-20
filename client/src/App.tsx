import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { setCredentials, setLoading } from './store/authSlice'
import { authAPI } from './services/api'

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'
import LoadingSpinner from './components/common/LoadingSpinner'

// Pages
import Home from './pages/Home'
import JoinGame from './pages/JoinGame'
import GameRoom from './pages/GameRoom'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading, token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        dispatch(setLoading(true))
        try {
          const result = await authAPI.validateToken(token)
          if (result.valid) {
            dispatch(setCredentials({ user: result.user, token }))
          }
        } catch (error) {
          console.error('Token validation failed:', error)
          localStorage.removeItem('token')
        } finally {
          dispatch(setLoading(false))
        }
      }
    }

    validateToken()
  }, [token, dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<JoinGame />} />
              <Route path="/room/:roomCode" element={<GameRoom />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
