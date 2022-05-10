import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home'
import Profile from './profile';

const NoPage = () => (
  <div>
    <h2>PAGE NOT FOUND</h2>
  </div>
)

function App() {
  return (
    <>


    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Profile' element={<Profile/>}/>
    </Routes>
    </>
  );
}

export default App;
