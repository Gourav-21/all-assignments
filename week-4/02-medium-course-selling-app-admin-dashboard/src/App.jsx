import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import AppBar from './components/AppBar';
import Course from './components/Course';
import './App.css';
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from 'react';
import axios from 'axios';
import { userState } from './store/atoms/user';
import { BASE_URL } from './config';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <RecoilRoot>
            <Router>
                <div style={{  width: "100vw", height: "100vh" }}>
                    <AppBar />
                    <InitUser />
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

function InitUser(){
    const setUser = useSetRecoilState(userState)
    useEffect(() => {
        axios.get(`${BASE_URL }/admin/me`,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken")
          }
        }).then((res)=>{
            if(res.data){
                setUser({
                    isLoading: false,
                    userEmail:res.data
                })
            }else{
                setUser({
                    isLoading: false,
                    userEmail:null
                })
            }
        }).catch((err)=>{
            setUser({
                isLoading: false,
                userEmail:null
            })
        })

    }, [])

    return <></>
}

export default App;