import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import AppBar from './components/AppBar';
import Course from './components/Course';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <RecoilRoot>
            <Router>
                <div style={{ backgroundColor: "#eeeeee", width: "100vw", height: "100vh" }}>
                    <AppBar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/addcourse" element={<CreateCourse />} />
                        <Route path="/courses" element={<ShowCourses />} />
                        <Route path="/courses/:courseId" element={<Course />} />
                    </Routes>
                </div>
            </Router>
        </RecoilRoot>
    );
}

export default App;