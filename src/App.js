import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';

function App() {
  return (
    <div >

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
      </Routes>


    </div>
  );
}

export default App;
