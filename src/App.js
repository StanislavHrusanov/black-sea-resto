import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { Restaurants } from './components/Restaurants/Restaurants';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div >

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/restaurants' element={<Restaurants />} />

      </Routes>
      <Footer />

    </div>
  );
}

export default App;
