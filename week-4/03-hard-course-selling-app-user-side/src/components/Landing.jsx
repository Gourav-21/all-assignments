import React, { useEffect, useState } from 'react'

export default function Landing() {
    const [login, setLogin] = useState(false);
    
    useEffect(()=>{
        fetch("http://localhost:3000/users/courses", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("userToken")
            }
          }).then((res) => res.json())
            .then((res) => {
              console.log(res)
              setLogin(true)
            })
    },[])

    return (
        <div>
            <h1>Welcome to course selling website!</h1>
            {login ? (
            <button onClick={() => {localStorage.removeItem("userToken")}} > logout</button>
            ) :
            <>
                <a href="/register">Register</a>
                <br />
                <a href="/login">Login</a>
                <br />
            </>
        }
        </div>
    )
}
