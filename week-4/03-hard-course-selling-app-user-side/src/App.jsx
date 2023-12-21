import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/Landing';
import AllCourses from './components/AllCourses';
import Login from './components/Login';
import Signup from './components/signup';
import CoursesPurchased from './components/CoursesPurchased';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/courses' element={<AllCourses/>} />
          <Route path='/courses/purchased' element={<CoursesPurchased/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
