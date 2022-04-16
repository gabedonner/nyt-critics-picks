import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import LinkIcon from '@mui/icons-material/Link'

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
  

  const fetchData = () => {
    setLoading(true)
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${API_KEY}&offset=${offsetNum}&query=${searchQuery}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
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
      })
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

  return (
    <section className={styles.mainSection}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid #DFDFDF', pb: 4}}>
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
      </Box> 
      <Grid container sx={{mt: 0 }} rowSpacing={9} columnSpacing={{ xs: 5, sm: 5, md: 5 }}> 
        {movies.map((movie, index) => (
          <Grid item sx={{ }} xs={12} sm={6} md={4} lg={4} key={index}>
            <Link href={movie.link.url} sx={{
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px;", 
              //border: ".75px solid grey", 
              display: 'block', 
              width: '100%', 
              height: '100%', 
              borderRadius: 1,
              overflow: 'hidden',
              transition: 'all .5s',
              transitionTimingFunction: 'cubic-bezier(0.6, 0.01, -0.05, 0.9)',
              '&:hover': {
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.55) 0px 30px 90px;", 
                // transform: 'scale(1.01)'
                //transform: 'translate(0, -2px);'

              }}} 
              //underline="hover" 
              underline= "none"
              color="inherit" 
              target="_blank" rel="noopener noreferrer">

              <Image src={movie.multimedia === null ? "/vercel.svg" : movie.multimedia.src} alt={movie.display_title} width={600} height={400} sx={{imageRendering: 'crisp-edges'}} />
              <Box sx={{px: 2, pb: 2}}>
                <h3>{movie.display_title === "" ? "[No title found]" : movie.display_title }</h3>
                <i>{movie.summary_short}</i>
                <p>{"- " + movie.byline}</p>
                {/* <p>{movie.publication_date}</p> */}
                {/* <p>{index + 1}</p> */}
                {/* <a href={movie.link.url}>link to article &#8594;</a> */}
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      {hasMore ?
        <Box sx={{mt: 3, p: 5, textAlign: 'center'}}>
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