import { Button, Card ,CardContent,CardMedia,TextField, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function Course() {
  const param = useParams();
  const setCourse=useSetRecoilState(coursesState);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    fetch("http://localhost:3000/admin/courses/" + param.courseId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(res => res.json())
      .then((data) => {
        console.log(data)
        setCourse(data)
      })
  }, [])

  return <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
    {/* <h1>Create Course Page</h1> */}
    <CourseCard ></CourseCard>
    <UpdateCard />
    
  </div>
}


function CourseCard() {
  const navigate=useNavigate();
  const course=useRecoilValue(coursesState)
  return (
      <Card onClick={()=>navigate("/courses/"+course.id)} style={{ margin: 10}} key={course.id} sx={{ width: 300 }}>
          <CardMedia
              sx={{ height: 200 }}
              image={course.imageLink}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  {course.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                  ${course.price}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                  {course.description}
              </Typography>
          </CardContent>
      </Card>
  )
}


function UpdateCard(){
  // const [form, setForm] = React.useState({ published: true });
  const[form,setForm]=useRecoilState(coursesState);
  // const setForm=useSetRecoilState(coursesState);

  function handleform(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form)
  }

  return(
    <Card style={{ width: 400, padding: 20 }}>

      <TextField value={form.title} fullWidth id="outlined-basic" label="Title" name="title" variant="outlined" onChange={handleform} />
      <br />
      <br />
      <TextField value={form.description} fullWidth id="outlined-basic" label="description" name="description" variant="outlined" onChange={handleform} />
      <br />
      <br />
      <TextField value={form.price} fullWidth id="outlined-basic" label="price" name="price" variant="outlined" onChange={handleform} />
      <br />
      <br />
      <TextField value={form.imageLink} fullWidth id="outlined-basic" label="imageLink" name="imageLink" variant="outlined" onChange={handleform} />
      <br />
      <br />

      <Button variant="contained" onClick={() => {
        const token = localStorage.getItem("adminToken")
        fetch("http://localhost:3000/admin/courses/" + form.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(form),
        }).then((res) => res.json())
          .then((data) => {
            alert("course updated")
            console.log(data)
          })
            // setCourse(form)
      }}>update Course</Button>
    </Card>
  )
}

const coursesState = atom({
  key: 'coursesState', 
  default: '', 
});