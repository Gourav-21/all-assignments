import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AppBar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(res => res.json())
      .then((data) => {
        if (data) {
          setEmail(data)
        }
      })
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant='h6'>Coursera</Typography>
      <div style={{ display: 'flex' }}>
        {email ? (
          <>
            {email}
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
