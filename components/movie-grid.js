import Grid from '@mui/material/Grid'
import MovieCard from '../components/movie-card.js'

const MovieGrid = ({ movies }) => {
  return (
    <Grid
      container
      sx={{ mt: 0 }}
      rowSpacing={9}
      columnSpacing={{ xs: 5, sm: 5, md: 5 }}
    >
      {movies.map((movie, index) => (
        <Grid item sx={{}} xs={12} sm={6} md={6} lg={4} key={index}>
          <MovieCard movieData={movie} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MovieGrid
