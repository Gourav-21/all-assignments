import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { flushSync } from 'react-dom';
import { BASE_URL } from "../config";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/courses/`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("adminToken")
            }
        }).then((res) => {
            setCourses(res.data);
        })
    }, [])
    return <div>
        <Typography style={{marginLeft:10}}  variant="h4"> Courses</Typography>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(c => {
                return (
                    <CourseCard key={c.id} course={c}/>
                )
            })}
        </div>
    </div>
}

export function CourseCard(prop) {
    const navigate=useNavigate();
    const viewNavigate = (newRoute) => {
        if (!document.startViewTransition) {
          return navigate(newRoute);
        } else {
          return document.startViewTransition(() => {
            flushSync(() => {
                navigate(newRoute);
            });
          });
        }
      };

    return (
        <Card  variant="outlined" className="body" onClick={()=>viewNavigate("../courses/"+prop.course._id)} style={{viewTransitionName:`card-${prop.course._id}`, margin: 10}} key={prop.course.id} sx={{ width: 300 }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={prop.course.imageLink}
                        />
                        <CardContent>
                            <Typography style={{viewTransitionName:`heading-${prop.course._id}`}} gutterBottom variant="h5" component="div">
                                {prop.course.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                ${prop.course.price}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {prop.course.description}
                            </Typography>
                        </CardContent>
                    </Card>
    )
}

export default ShowCourses;