import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function AllCourses() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }).then((res) => res.json())
      .then((res) => {
        setCourse(res)
        console.log(res)
      })
  }, [])

  return (
    <div>
      {course.map((a) => (
        <div key={a.id}>
          <h2>{a.title}</h2>
          <p>{a.description}</p>
          <p>{a.price}</p>
        </div>
      ))}
    </div>
  )
}
