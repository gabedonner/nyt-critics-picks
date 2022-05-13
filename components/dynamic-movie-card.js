import React, { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
// import LinkIcon from '@mui/icons-material/Link'
import { motion, useAnimation } from 'framer-motion'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

//on stopPropagation and SyntheticEvent
//https://stackoverflow.com/questions/35914680/how-to-call-stoppropagation-in-reactjs

const MovieCard = ({ movieData }) => {
  const [tabIsOpen, setTabIsOpen] = useState(false)
  const cardAnimations = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
    tap: { scale: 0.98 },
  }

  const tabAnimations = {
    open: { y: -150 },
    closed: { y: 0 },
  }

  const toggleTabState = (e) => {
    setTabIsOpen((isOpen) => !isOpen)
    e.stopPropagation()
  }

  const cardTransition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }
  const tabTransition = { duration: 0.5, ease: [0.6, 0.01, -0.05, 0.9] }

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
      initial="hidden"
      transition={cardTransition}
      whileTap="tap"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Box
        sx={{
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;',
          height: 290,
          overflow: 'hidden',
          '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 25px 50px -12px;',
          },
        }}
      >
        <Link
          href={movieData.link.url}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            borderRadius: 2,
            transition: 'all .5s',
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;',
            height: 290,
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.4) 0px 25px 50px -12px;',
            },
          }}
          //underline="hover"
          underline="none"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={
              movieData.multimedia === null
                ? '/vercel.svg'
                : movieData.multimedia.src
            }
            alt={movieData.display_title}
            width={600}
            height={400}
          />

          <motion.div
            animate={tabIsOpen ? 'open' : 'closed'}
            variants={tabAnimations}
            transition={tabTransition}
          >
            <Box
              sx={{
                px: 2,
                pb: 10,
                bottom: 80,
                position: 'relative',
                backgroundColor: 'lightblue',
              }}
            >
              <IconButton
                onClick={(e) => toggleTabState(e)}
                sx={{
                  position: 'absolute',
                  right: 5,
                  zIndex: 999,
                }}
              >
                {tabIsOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              </IconButton>
              <Typography variant="h6" fontWeight="bold" sx={{ pt: 1.5 }}>
                {movieData.display_title === ''
                  ? '[No title found]'
                  : movieData.display_title}
              </Typography>
              <Typography sx={{ fontSize: 14, pb: 1.5 }}>
                {'' +
                  movieData.byline +
                  ' | ' +
                  publicationDateObject.toLocaleDateString(
                    'en-US',
                    dateOptions
                  )}
              </Typography>
              <Typography sx={{ fontSize: 16, pt: 2, fontStyle: 'normal' }}>
                {movieData.summary_short.length > 200
                  ? movieData.summary_short.substring(0, 200) + '...'
                  : '"' + movieData.summary_short + '"'}
              </Typography>
            </Box>
          </motion.div>
        </Link>
      </Box>
    </motion.div>
  )
}

export default MovieCard
