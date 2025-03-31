import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'

axios.defaults.baseURL = 'http://localhost:4000';


function App() {
  return (<>
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  </>
  )
}

export default App
