import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function CoursesPurchased() {
    const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/purchasedCourses", {
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
