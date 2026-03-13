import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import SeatLayout from './pages/SeatLayout.jsx';
import Favorite from './pages/Favorite.jsx';
import { Toaster } from 'react-hot-toast';
import Layout from './admin/Layout.jsx';
import Dashboard from './admin/Dashboard.jsx';
import AddShows from './admin/AddShows.jsx';
import ListShows from './admin/ListShows.jsx';
import ListBookings from './admin/ListBookings.jsx';
import { useAppContext } from './context/AppContext.jsx';
import { SignIn } from '@clerk/clerk-react';

const App = () => {

const isAdminRoute = useLocation().pathname.startsWith('/admin');

const {user} = useAppContext()

  return (
    <>
    <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />

        <Route path='/admin/*' element={user ?<Layout/> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )} >
        <Route index element={<Dashboard />} />
        <Route path='add-shows' element={<AddShows />} />
        <Route path='list-shows' element={<ListShows />} />
        <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App
