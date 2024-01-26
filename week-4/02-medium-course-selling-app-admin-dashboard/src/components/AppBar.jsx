import { Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AppBar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
      axios.get("http://localhost:3000/admin/me",{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken")
        }
      }).then((res)=>{
        setEmail(res.data)
      })
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between',padding:5 }}>
      <Typography variant='h5'fontWeight={600}>Coursera</Typography>
      <div style={{ display: 'flex' }}>
        {email ? (
          <>
            <Button onClick={() => navigate('/addcourse')}>ADD COURSES</Button>
            <Button onClick={() => navigate('/courses')} >COURSES</Button>
            <Button variant="contained" onClick={() => {
              localStorage.removeItem("adminToken");
              setEmail(null)
            }}>logout</Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={() => navigate('/signup')}> Sign up</Button>
            <Button variant="contained" onClick={() => navigate('/login')} >Sign in</Button>
          </>
        )}
      </div>
    </div>
  )
}
