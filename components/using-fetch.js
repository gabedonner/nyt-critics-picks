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
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastQuery, setLastQuery] = useState('')

  const fetchData = () => {
    setLoading(true)
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${API_KEY}&offset=${offsetNum}&query=${searchQuery}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.results)
        //reduce pagination to 12 items rather than default 20
        let slicedMovies = data.results.slice(0, 12)

        if (query === lastQuery) {
          setMovies([...movies, ...slicedMovies])
        } else {
          setOffsetNum(0)
          setMovies(slicedMovies)
        }

        // if (searchQuery === '') {
        //   setMovies([...movies, ...slicedMovies])
        // } else {
        //   setMovies([...slicedMovies])
        // }
        setLastQuery(query)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
    //how many renders are happening?
    console.log("render")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetNum, searchQuery])


  return (
    <section> 
      <Box>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button
          type="button"
          onClick={() =>
            setSearchQuery(query)
          }
        >
          Search
        </button>
      </Box>
      <Grid container sx={{mt: 3 }} spacing={4}> 
        {movies.map((movie, index) => (
          <Grid item sx={{ }} xs={12} sm={6} md={4} lg={3} key={index}>
            <Link href={movie.link.url} sx={{
              boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;", 
              //border: ".75px solid grey", 
              display: 'block', 
              width: '100%', 
              height: '100%', 
              transition: 'all .5s ease',
              '&:hover': {backgroundColor: "white"}}} 
              //underline="hover" 
              underline= "none"
              color="inherit" 
              target="_blank" rel="noopener noreferrer">
              <Image src={movie.multimedia === null ? "/vercel.svg" : movie.multimedia.src} alt={movie.display_title} width={600} height={400} sx={{imageRendering: 'crisp-edges'}} />
              <Box sx={{px: 2, pb: 4}}>
                <h3>{movie.display_title === "" ? "[No title found]" : movie.display_title }</h3>
                <i>{movie.summary_short}</i>
                {/* <p>{movie.publication_date}</p> */}
                {/* <p>{index + 1}</p> */}
                {/* <a href={movie.link.url}>link to article &#8594;</a> */}
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box sx={{p: 5, textAlign: 'center'}}>
        <Button variant="contained" onClick={() => setOffsetNum(offsetNum + 12)}>{loading ? 'Loading...' : 'Load More'}</Button>
      </Box>
    </section>
  )
}

export default UsingFetch