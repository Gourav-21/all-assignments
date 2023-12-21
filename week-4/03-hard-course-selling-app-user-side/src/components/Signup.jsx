import React from 'react'
import { useState } from 'react'

export default function Signup() {
    const [form,setForm]=useState({});

    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <h1>Register to the website</h1>
            <input placeholder='email' type='text' name='username' onChange={handleChange} />
            <input placeholder='password' type='password' name='password' onChange={handleChange}/>
            <button onClick={()=>{
                fetch("http://localhost:3000/users/signup",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(form)
                }).then((res)=>res.json())
                .then((res)=>{
                    console.log(res)
                    localStorage.setItem("userToken",res.token)
                })
            }}>SignUp</button>
        </div>
    )
}
