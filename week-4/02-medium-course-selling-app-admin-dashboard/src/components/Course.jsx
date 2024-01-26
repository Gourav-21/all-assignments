import { Button, Card ,CardContent,CardMedia,Grid,TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function Course() {
  const param = useParams();
  const setCourse=useSetRecoilState(coursesState);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    axios.get("http://localhost:3000/admin/courses/" + param.courseId,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken")
      }
    }).then((res) => {
      console.log(res.data)
      setCourse(res.data)
    })
  }, [])
  console.log("Course")
  return (
    <>
      <GreyTopper />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} >
          <div style={{width:"100%",margin:10,display:"flex",justifyContent:"center"}}>
          <UpdateCard />

          </div>
        </Grid>
        <Grid item xs={12} md={4} >
          <CourseCard />
        </Grid>
      </Grid>
    </>
  );
}

function GreyTopper(){
  const course=useRecoilValue(coursesState)
  return(
    <div style={{background:"#212121",height:"250px",display:"flex",justifyContent:"center",placeItems:"center",zIndex:0,marginBottom:"-250px"}}>
       <Typography style={{color:"white"}} textAlign={'center'} variant='h4'>{course.title}</Typography>
    </div>
       
  )
}


function CourseCard() {
  const course=useRecoilValue(coursesState)

  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <Card style={{ margin: 10,borderRadius:20,marginTop:50,marginLeft:20}} key={course.id} sx={{ width: 300 }}>
          <CardMedia
              sx={{ height: 170 }}
              image={course.imageLink}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  {course.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                  Price
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                  ${course.price}
              </Typography>
          </CardContent>
      </Card>
    </div>
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
    <Card style={{ width: 400, padding: 20 , marginTop:170}}>

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

      <Button variant="contained" onClick={async () => {
        const res = await axios.put("http://localhost:3000/admin/courses/" + form._id, form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken")
          }
        })
        alert("course updated")
      }}>update Course</Button>
    </Card>
  )
}

const coursesState = atom({
  key: 'coursesState', 
  default: '', 
});