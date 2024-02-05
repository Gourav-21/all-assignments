import { Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isUserLoading } from '../store/selectors/isUserLoading';
import { userState } from '../store/atoms/user';
import { userEmailState } from '../store/selectors/userEmail';

export default function AppBar() {
  const navigate = useNavigate();
  const email = useRecoilValue(userEmailState)
  const isLoading = useRecoilValue(isUserLoading)
  const setEmail = useSetRecoilState(userState);

  if(isLoading){
    return <div>Loading...</div>
  }

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
              setEmail({
                isLoading:false,
                userEmail: null
              })
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
