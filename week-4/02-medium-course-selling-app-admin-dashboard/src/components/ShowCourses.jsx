import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => res.json())
            .then((data) => {
                // console.log(data);
                setCourses(data)
            })
    }, [])

    return <div>
        <h1>Create Course Page</h1>
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
    return (
        <Card onClick={()=>navigate("/courses/"+prop.course.id)} style={{ margin: 10}} key={prop.course.id} sx={{ width: 300 }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={prop.course.imageLink}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
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