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
//https://medium.com/swlh/a-comprehensive-guide-to-load-more-button-and-infinite-scrolling-in-react-js-bd88edf74d5a

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

const UsingFetch = () => {

  //const url = "https://api.nytimes.com/svc/movies/v2/reviews/picks.json?query=&api-key=joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"
  const API_KEY = "joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [offsetNum, setOffsetNum] = useState(0)
  const [hasMore, setHasMore] = useState()

  const fetchData = () => {
    setLoading(true)
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${API_KEY}&offset=${offsetNum}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.results)
        setMovies([...movies, ...data.results])
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetNum])


  return (
    <section> 
      <Grid container sx={{mt: 6, border: "1px solid grey"}} spacing={0}> 
        {movies.map((movie, index) => (
          <Grid item sx={{border: "1px solid grey", '&:hover': {backgroundColor: "white"}}} xs={12} sm={6} md={4} lg={4} key={index}>
            <Link href={movie.link.url} sx={{display: 'block', px: 2, pb: 2, width: '100%', height: '100%'}} underline="hover" color="inherit" target="_blank" rel="noopener noreferrer">
                <h3>{movie.display_title === "" ? "[No title found]" : movie.display_title }</h3>
                <Image src={movie.multimedia === null ? "/vercel.svg" : movie.multimedia.src} alt="Critic's Pick" width={600} height={400} sx={{imageRendering: 'crisp-edges'}} />
                <Box sx={{pr: 5, pt: 2}}>
                  <i>{movie.summary_short}</i>
                  <p>{movie.publication_date}</p>
                  {/* <p>{index + 1}</p> */}
                  {/* <a href={movie.link.url}>link to article &#8594;</a> */}
                </Box>
              </Link>
          </Grid>
        ))}
      </Grid>
      <Box sx={{p: 5, textAlign: 'center'}}>
        <Button variant="contained" onClick={() => setOffsetNum(offsetNum + 20)}>{loading ? 'Loading...' : 'Load More'}</Button>
      </Box>
    </section>
  )
}

export default UsingFetch