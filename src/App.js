import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';

function App() {
  return (
    <div >

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>


    </div>
  );
}

export default App;
