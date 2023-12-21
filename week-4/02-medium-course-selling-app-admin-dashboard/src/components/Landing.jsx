import React, { useEffect, useState } from "react";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    
    return <div>
        <h1>Welcome to course selling website!</h1>
        {/* {login ? (
            <button onClick={() => {localStorage.removeItem("adminToken")}} > logout</button>
            ) :
            <>
                <a href="/signup">Register</a>
                <br />
                <a href="/login">Login</a>
                <br />
            </>
        } */}
    </div>
}

export default Landing;