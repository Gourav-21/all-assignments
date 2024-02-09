import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../config";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [form, setForm] = React.useState({published: true});


    function handleform(e){
        setForm({...form,[e.target.name]:e.target.value});
    }

    return <div style={{ display: "flex", justifyContent: "center",minHeight:"80vh",alignItems:"center" }}>
        {/* <h1>Create Course Page</h1> */}
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
            
        <TextField fullWidth  id="outlined-basic" label="Title" name="title" variant="outlined" onChange={handleform} />
        <br/>
        <br/>
        <TextField fullWidth id="outlined-basic" label="description" name="description" variant="outlined" onChange={handleform} />
        <br/>
        <br/>
        <TextField fullWidth id="outlined-basic" label="price" name="price" variant="outlined" onChange={handleform} />
        <br/>
        <br/>
        <TextField fullWidth id="outlined-basic" label="imageLink" name="imageLink" variant="outlined" onChange={handleform} />
        <br/>
        <br/>

        <Button variant="contained" onClick={async () =>{
            const token=localStorage.getItem("adminToken")
            console.log(form)
            await axios.post(`${BASE_URL}/admin/courses`,form,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            alert("course added")
        }}>Create Course</Button>
        </Card>
    </div>
}
export default CreateCourse;