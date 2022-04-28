import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import MovieCard from '../components/movie-card.js'
import useInfiniteScroll from './infinite-scroll'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'




// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Input from "@mui/material/Input"
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import Box from '@mui/material/Box'



//https://stackoverflow.com/questions/12278587/webkit-text-flickers-when-using-css-transform-scale
//prevent text flickering on hover scaling

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

// Web Dev Simplified Video on Infinite Scrolling
// https://www.youtube.com/watch?v=NZKUirTtxcg

const UsingFetch = () => {

  //const url = "https://api.nytimes.com/svc/movies/v2/reviews/picks.json?query=&api-key=joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"
  const API_KEY = "joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [offsetNum, setOffsetNum] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [previousQuery, setPreviousQuery] = useState('')

  const fetchData = async() => {
    setLoading(true)
    const response = await fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${API_KEY}&offset=${offsetNum}&query=${searchQuery}`)
    const data = await response.json()

    console.log(data)
    console.log(data.results)
    console.log("offset and search: " + offsetNum + "" + searchQuery)
    //reduce pagination to 12 items rather than default 20
    setHasMore(data.has_more)
    console.log(data.has_more)
    console.log(hasMore)
    let slicedMovies = data.results.slice(0, 12)

    if (query === previousQuery) {
      setMovies([...movies, ...slicedMovies])
    } else {
      setMovies(slicedMovies)
    }

    setPreviousQuery(query)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    //how many renders are happening?
    console.log("render")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetNum, searchQuery])

  const loadMore = (offsetNum) => {
    setOffsetNum(offsetNum + 12)
  }

  const loadSearch = (query) =>  {
    setSearchQuery(query)
    setOffsetNum(0)
  }

  // const [lastElementRef] = useInfiniteScroll(
  //   hasMore ? loadMore : () => {},
  //   loading
  // );

  return (
    <section className={styles.mainSection}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid #DFDFDF', pb: 4}}>
        <Box>
          <Link href={"."} underline="none" sx={{color: '#666', fontSize: [18, 24], fontWeight: 700}}><i>NYT Critic&#39;s Picks</i></Link>
        </Box>
        
        <Box
          component="form"
          sx={{ borderRadius: 1, border: '1px solid #DFDFDF', p: '1px 2px', display: 'flex', alignItems: 'center', width: [150, 300, 400] }}
        >
          <TextField
            variant="standard"
            sx={{ ml: 1, flex: 1, pt: 0 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search', disableUnderline: 'true' }}
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyPress={(e) => {
              console.log(`Pressed keyCode ${e.key}`);
              if (e.key === 'Enter') {
                e.preventDefault()
                loadSearch(query)
              }
            }}          
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => loadSearch(query)}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box> 

      

      {/* <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid #DFDFDF', pb: 4}}>
        <Box>
          <Link href={"."} underline="none" sx={{color: '#666', fontSize: 20, fontWeight: 700}}><i>NYT Critic&#39;s Picks</i></Link>
        </Box>
        <Box sx={{mt: .5}}>
          <input 
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button
            type="button"
            onClick={() =>
              loadSearch(query)
            }
          >
            Search
          </button>
        </Box>
      </Box>  */}

      <Grid container sx={{mt: 0 }} rowSpacing={9} columnSpacing={{ xs: 5, sm: 5, md: 5 }}> 
        {movies.map((movie, index) => (
          <Grid item sx={{ }} xs={12} sm={6} md={4} lg={4} key={index}>
            <MovieCard movieData={movie}/>
          </Grid>
        ))}
      </Grid>

      {hasMore ?
        <Box sx={{mt: 5, p: 5, textAlign: 'center'}}>
          <Button variant="contained" onClick={() => loadMore(offsetNum)}>{loading ? 'Loading...' : 'Load More'}</Button>
        </Box> :
        <Box sx={{mt: 3, p: 5, textAlign: 'center'}}>
          <p>end of results</p> 
        </Box>  
      }

    </section>
  )
}

export default UsingFetch