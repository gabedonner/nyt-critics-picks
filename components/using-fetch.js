import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'


///reviews/search.json?query=big&opening-date=1980-01-01:1990-01-01
//API KEY joZEGXraTg5TwCzoVbILHCL6F0e2C9vG

//how to do a "load more" button w/ api call
//https://www.cluemediator.com/load-more-pagination-in-react

//how to spread props
//https://youtu.be/b0IZo2Aho9Y?t=412

//for example:

/* const data = {
  id: 23,
  name: 'Jeff',
  age: 19,
}

return (
  <User {...data} />
) */


// const API_KEY = "joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"
// `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${API_KEY}&offset=${offsetNum}&order=${movieOrder}&query=${query}`


const url = "https://api.nytimes.com/svc/movies/v2/reviews/picks.json?query=&api-key=joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"

const UsingFetch = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.results)
        setMovies(data.results)
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <section> 
      <Grid container sx={{mt: 3, border: "1px solid grey"}} spacing={0}> 

        {movies.map((movie, index) => (
          <Grid item sx ={{border: "1px solid grey", '&:hover': {backgroundColor: "white"}}} xs={6} md={4} key={index}>
            <Link href={movie.link.url} sx={{display: 'block', p: 2, width: '100%', height: '100%'}} underline="hover" color="inherit" target="_blank" rel="noopener">
                <Typography><h3>{movie.display_title === "" ? "[No title]" : movie.display_title }</h3></Typography>
                <Image src={movie.multimedia === null ? "/vercel.svg" : movie.multimedia.src} alt="Critic's Pick" width={300} height={200} />
                <Box sx={{pr: 5, pt: 2}}>
                  <i>{movie.summary_short}</i>
                  <p>{movie.publication_date}</p>
                  {/* <a href={movie.link.url}>link to article &#8594;</a> */}
                </Box>
              </Link>
          </Grid>
        ))}

      </Grid>
      
      <Box sx={{p: 5, textAlign: 'center'}}>
        <Button variant="contained">load more</Button>
      </Box>
      
    </section>
  )
}

export default UsingFetch


//https://www.codingdeft.com/posts/react-fetch-data-api/#fetching-data-in-react-using-async-await

/* const UsingFetch = () => {
  const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsingFetch */