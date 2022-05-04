import Head from 'next/head'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AppBar from '../components/app-bar.js'
//import MovieGrid from '../components/movie-grid.js'
import Grid from '@mui/material/Grid'
import MovieCard from '../components/movie-card.js'

//lifting state:
//https://www.youtube.com/watch?v=rdwc4JmX_fU

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [offsetNum, setOffsetNum] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [previousQuery, setPreviousQuery] = useState('')

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${API_KEY}&offset=${offsetNum}&query=${searchQuery}`
    )
    const data = await response.json()

    console.log(data)
    console.log(data.results)
    console.log('offset and search: ' + offsetNum + ' ' + searchQuery)
    //reduce pagination to 12 items rather than default 20
    setHasMore(data.has_more)
    console.log('has more: ' + data.has_more)
    console.log('has more: ' + hasMore)
    let slicedMovies = data.results.slice(0, 18)

    if (searchQuery === previousQuery) {
      setMovies([...movies, ...slicedMovies])
    } else {
      window.scrollTo(0, 0)
      setMovies(slicedMovies)
    }

    setPreviousQuery(searchQuery)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    //how many renders are happening?
    console.log('render')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetNum, searchQuery])

  const loadMore = (offsetNum) => {
    setOffsetNum(offsetNum + 18)
  }

  const loadSearch = (query) => {
    setSearchQuery(query)
    setOffsetNum(0)
  }

  return (
    <Container sx={{ mt: 0, pb: 5 }}>
      <Head>
        <title>NYT Critic&#39;s Picks</title>
        <meta name="description" content="All the movies NYT Critics like" />
        <link rel="icon" href="/critics-picks-favicon.png" />
      </Head>

      <AppBar loadSearch={loadSearch} />

      {/* <MovieGrid movies={movies} /> */}

      <Grid
        container
        sx={{ mt: 0 }}
        rowSpacing={9}
        columnSpacing={{ xs: 5, sm: 5, md: 5 }}
      >
        {movies.map((movie, index) => (
          <Grid item sx={{}} xs={12} sm={6} md={4} lg={4} key={index}>
            <MovieCard movieData={movie} />
          </Grid>
        ))}
      </Grid>

      {hasMore ? (
        <Box sx={{ mt: 5, p: 5, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => loadMore(offsetNum)}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 3, p: 5, textAlign: 'center' }}>
          <p>end of results</p>
        </Box>
      )}
    </Container>
  )
}
