import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import UsingFetch from '../components/using-fetch.js'
import Box from '@mui/material/Box'
import ScrollToTop from '../components/scroll-to-top.js'
import AppBar from '../components/app-bar.js'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export default function Home() {
  return (
    <Container sx={{ mt: 5 }}>
      <Head>
        <title>NYT Critic&#39;s Picks</title>
        <meta name="description" content="All the movies NYT Critics like" />
        <link rel="icon" href="/critics-picks-favicon.png" />
      </Head>

      {/* <AppBar />
      <Offset /> */}

      <UsingFetch />
    </Container>
  )
}
