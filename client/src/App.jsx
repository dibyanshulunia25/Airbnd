import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/AccountPage'

axios.defaults.baseURL = 'http://localhost:4000';


function App() {
  return (<>
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<Account />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  </>
  )
}

export default App
