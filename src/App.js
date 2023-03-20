import styles from "./App.module.css";

import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { Restaurants } from './components/Restaurants/Restaurants';
import { Footer } from './components/Footer/Footer';
import { AddRestaurant } from './components/AddRestaurant/AddRestaurant';
import { Details } from './components/Details/Details';
import { Edit } from "./components/Edit/Edit";

import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <LoadingProvider>
          <Header />

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/restaurants/:restaurantId' element={<Details />} />
            <Route path='/restaurants/:restaurantId/edit' element={<Edit />} />
            <Route path='/addRestaurant' element={<AddRestaurant />} />

          </Routes>

          <div className={styles["footer-container"]}>
            <Footer />
          </div>
        </LoadingProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
