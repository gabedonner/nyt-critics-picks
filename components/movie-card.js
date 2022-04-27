import React from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'


const MovieCard = ({movieData}) => {

    return (
        <Link href={movieData.link.url} sx={{
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

            <Image src={movieData.multimedia === null ? "/vercel.svg" : movieData.multimedia.src} alt={movieData.display_title} width={600} height={400} sx={{imageRendering: 'crisp-edges'}} />
            <Box sx={{px: 2, pb: 2}}>
              <h3>{movieData.display_title === "" ? "[No title found]" : movieData.display_title }</h3>
              <i>{movieData.summary_short}</i>
              <p>{"- " + movieData.byline}</p>
              {/* <p>{movie.publication_date}</p> */}
              {/* <p>{index + 1}</p> */}
              {/* <a href={movie.link.url}>link to article &#8594;</a> */}
            </Box>
          </Link>
    )
}

export default MovieCard 