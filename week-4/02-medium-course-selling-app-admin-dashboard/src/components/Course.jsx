import { Button, Card ,CardContent,CardMedia,Grid,TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from '../store/atoms/course';
import { courseId, courseImageLink, coursePrice, courseTitle, isCourseLoading } from '../store/selectors/course';
import Loading from './Loading';
import { BASE_URL } from '../config';

export default function Course() {
  const param = useParams();
  const setCourse=useSetRecoilState(courseState);
  const isLoading=useRecoilValue(isCourseLoading)
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    axios.get(`${BASE_URL}/admin/courses/` + param.courseId,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken")
      }
    }).then((res) => {
      setCourse({
        isLoading:false,
        course:res.data
      })
    }).catch((err) => {
      setCourse({
        isLoading:false,
        course:null
      })
    })
  }, [])
  console.log("Course")
  
  if(isLoading){
    return <Loading />
  }

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
  const id=useRecoilValue(courseId)
  return(
    <div style={{background:"#212121",height:"250px",display:"flex",justifyContent:"center",placeItems:"center",zIndex:0,marginBottom:"-250px"}}>
       <Typography style={{ viewTransitionName:`heading-${id}`,color:"white"}} textAlign={'center'} variant='h4'> <Title /></Typography>
    </div>
       
  )
}

function Title() {
  const title = useRecoilValue(courseTitle);
  return (
    <>
      {title}
    </>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <Typography gutterBottom variant="h6" component="div">
      ${price}
    </Typography>
  );
}

function CourseCard() { 
  const imageLink=useRecoilValue(courseImageLink)
  const id=useRecoilValue(courseId)
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <Card style={{viewTransitionName:`card-${id}`, margin: 10,borderRadius:20,marginTop:50,marginLeft:20}} key={id} sx={{ width: 300 }}>
          <CardMedia
              sx={{ height: 170 }}
              image={imageLink}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  <Title />
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                  Price
              </Typography>
            <Price />
          </CardContent>
      </Card>
    </div>
  )
}


function UpdateCard(){
  const [course,setCourse] = useRecoilState(courseState);
  const [form, setForm] = useState(course.course);
  
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
        const res = await axios.put(`${BASE_URL}/admin/courses/` + form._id, form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken")
          }
        })
        setCourse({
          isLoading:false,
          course:form
        })
        alert("course updated")
      }}>update Course</Button>
    </Card>
  )
}
