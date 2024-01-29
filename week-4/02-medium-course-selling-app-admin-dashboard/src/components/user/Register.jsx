import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Card, TextField, Typography } from "@mui/material";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <div>
        <div style={{ paddingTop: 80, display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
                <h1>Register to the website</h1>
            </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>

            <Card style={{ width: 400, padding: 20 }}>
                <br />
                <TextField id="outlined-basic" fullWidth value={email} label="Email" onChange={e => setEmail(e.target.value)} variant="outlined" />
                <br />
                <br />
                <TextField id="outlined-basic" type="password" value={password} fullWidth label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} />
                <br />
                <br />
                <Button size="large" variant="contained" onClick={async () => {    
                    const res=await axios.post("http://localhost:3000/admin/signup",{
                        "username": email,
                        password
                    })
                    let data=res.data
                    localStorage.setItem('adminToken', data.token)
                    window.location="/"
                }} >register</Button>
                <br />
                <br />
                <Typography variant="subtitle1">
                    Already a user?<Link to={"/login"} >Login</Link>
                </Typography>
            </Card>
        </div>

    </div>
}

export default Register;