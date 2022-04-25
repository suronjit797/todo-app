import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Header from './Components/Header/Header';
import Home from './Pages/Home/Home'
import Todo from './Pages/Todo/Todo'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container my-3">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
