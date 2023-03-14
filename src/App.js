import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { Restaurants } from './components/Restaurants/Restaurants';
import { Footer } from './components/Footer/Footer';
import { AddRestaurant } from './components/AddRestaurant/AddRestaurant';

import { RestaurantProvider } from './contexts/RestaurantContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div >
      <AuthProvider>
        <Header />

        <RestaurantProvider>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/addRestaurant' element={<AddRestaurant />} />

          </Routes>
        </RestaurantProvider>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
