import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const navigate=useNavigate();
    const useremail=useRecoilValue(userEmailState)
    const userLoading=useRecoilValue(isUserLoading)
  return (
    <div>
      <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6}>
            <div style={{marginTop:100}}>
            <Typography variant="h2">Coursera Admin</Typography>
            <Typography variant="h5">A place to learn, earn and grow</Typography>
            {!userLoading && !useremail &&
            <div style={{marginTop:10}}>
                <Button variant="contained" onClick={() => navigate("/signup")}>
                Sign up
                </Button>
                <Button style={{marginLeft:10}} variant="contained" onClick={() => navigate("/login")}>
                Sign in
                </Button>
            </div>}
            </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <img src={"https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"} width={500} height={400} alt={"course-image"}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
