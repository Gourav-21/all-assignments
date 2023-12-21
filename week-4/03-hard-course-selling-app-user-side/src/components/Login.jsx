import React from 'react'
import { useState } from 'react';

export default function Login() {
  const [form,setForm]=useState({});

    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h1>Login to admin dashboard</h1>
      <br />
      Email - <input type={"text"} name="username" onChange={handleChange} />
      <br />
      Password - <input type={"password"} name='password' onChange={handleChange} />
      <br />
      <button onClick={()=>{
        fetch("http://localhost:3000/users/login",{
                    method:"POST",
                    headers:{
                      username:form.username,
                      password:form.password,
                    },
                }).then((res)=>res.json())
                .then((res)=>{
                    console.log(res)
                    localStorage.setItem("userToken",res.token)
                })
      }}>login</button>
    </div>
  )
}
