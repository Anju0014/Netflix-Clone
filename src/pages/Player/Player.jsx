import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {
  const navigate=useNavigate();
  const {id}=useParams();


  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    type:""

  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2NhMzM1NzI3NjgzYzdiYTQyYjU0YjcyYThmZWQ0NyIsIm5iZiI6MTczNTU1NDU4OC4xNjgsInN1YiI6IjY3NzI3NjFjNzdlMmI2ZDQ3ODkyOWE2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PUUKi1ODBrqC5EswlVIZ43qQpu74w3BxWSBqzP0cCZA'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])
 
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe> 
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player