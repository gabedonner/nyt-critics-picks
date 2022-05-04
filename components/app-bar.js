import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Link from '@mui/material/Link'
import Image from 'next/image'
import Box from '@mui/material/Box'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.035),
  },
  marginLeft: 0,
  //width: ['100%'],
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

// const SearchIconWrapperButton = styled(IconButton)(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const HideAppBar = ({ props, loadSearch }) => {
  const [query, setQuery] = useState('')

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          color="background"
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid #DFDFDF',
            py: 1.25,
            px: '2vw',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              NYT Critic&#39;s Picks
            </Typography> */}
            <Link
              href={'.'}
              underline="none"
              noWrap
              sx={{
                //color: '#666',
                color: '#666',
                fontSize: [18],
                fontWeight: 700,
                flexGrow: 'auto',
                display: { xs: 'block', sm: 'block' },
              }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  position: 'absolute',
                  bottom: [4, 9],
                }}
              >
                <Image
                  src={'/critics-picks-favicon.png'}
                  alt={'link to home'}
                  width={35}
                  height={35}
                  // sx={{ imageRendering: 'crisp-edges' }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  pl: 1,
                  ml: 5,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                NYT Critic&#39;s Picks
              </Typography>
            </Link>
            <Search>
              <IconButton
                onClick={() => loadSearch(query)}
                sx={{
                  padding: 1,
                  height: '100%',
                  zIndex: 1000,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon />
              </IconButton>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={(e) => {
                  //   console.log(`Pressed keyCode ${e.key}`)
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    loadSearch(query)
                  }
                }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  )
}

export default HideAppBar
