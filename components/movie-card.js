import React, { useEffect } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import LaunchIcon from '@mui/icons-material/Launch'
import { motion, useAnimation } from 'framer-motion'

const MovieCard = ({ movieData }) => {
  //const [ref, inView] = useInView()
  //const controls = useAnimation()
  const cardAnimations = {
    hidden: { opacity: 0, y: 5, height: '100%' },
    visible: { opacity: 1, y: 0 },
    tap: { scale: 0.98 },
  }
  const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }

  const dateObject = new Date(movieData.opening_date)
  const publicationDateObject = new Date(
    movieData.publication_date.replace(/-/g, '/').replace(/T.+/, '')
  )
  const dateOptions = {
    //weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <motion.div
      variants={cardAnimations}
      // ref={ref}
      initial="hidden"
      //animate={controls}
      transition={transition}
      whileTap="tap"
      whileInView="visible"
      viewport={{ once: true, margin: '-75px' }}
    >
      <Link
        href={movieData.link.url}
        sx={{
          //boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px;',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;',
          //border: '.75px solid grey',
          display: 'block',
          width: '100%',
          height: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'all .5s',
          position: 'relative',
          //transitionTimingFunction: 'cubic-bezier(0.6, 0.01, -0.05, 0.9)',
          '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 25px 50px -12px;',
            //boxShadow: 'rgba(0, 0, 0, 0.55) 0px 30px 90px;',
            // transform: 'scale(1.01)'
            //transform: 'translate(0, -2px);'
          },
        }}
        //underline="hover"
        underline="none"
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LaunchIcon
          sx={{
            color: 'white',
            zIndex: '999',
            position: 'absolute',
            right: 12,
            top: 12,
            opacity: 0.5,
          }}
        />
        <Image
          src={
            movieData.multimedia === null
              ? '/no-image-found.png'
              : movieData.multimedia.src
          }
          alt={movieData.display_title}
          width={600}
          height={400}
          // sx={{ imageRendering: 'crisp-edges' }}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ pt: 1.5 }}>
            {movieData.display_title === ''
              ? '[No title found]'
              : movieData.display_title}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            {publicationDateObject.toLocaleDateString('en-US', dateOptions)}
          </Typography>
          <Typography sx={{ fontSize: 16, pt: 2, fontStyle: 'normal' }}>
            {movieData.summary_short.length > 200
              ? movieData.summary_short.substring(0, 200) + '...'
              : '"' + movieData.summary_short + '"'}
          </Typography>
          <Typography sx={{ pt: 2, pb: 2, fontWeight: 500 }}>
            {'- ' + movieData.byline}
          </Typography>
        </Box>
      </Link>
    </motion.div>
  )
}

export default MovieCard
