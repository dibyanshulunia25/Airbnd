import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesForm from './pages/PlacesForm'
import IndividualPage from './pages/IndividualPage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

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
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<IndividualPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  </>
  )
}

export default App
