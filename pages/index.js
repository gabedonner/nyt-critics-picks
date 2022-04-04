import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import UsingFetch from '../components/using-fetch.js'
import LoadMore from '../components/load-more'

///reviews/search.json?query=big&opening-date=1980-01-01:1990-01-01
//API KEY joZEGXraTg5TwCzoVbILHCL6F0e2C9vG


export default function Home() {
  //const url = "https://api.adviceslip.com/advice";
  
  //async fetch
  /* useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []); */

  return (
    <div className={styles.container}>
      <Head>
        <title>NYT Critic&#39;s Picks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          NYT Critic&#39;s Picks
        </h1>
        <p className={styles.description}>
          The best movies, according to the New York Times
        </p>
        
        <UsingFetch />
        {/* <LoadMore /> */}

      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
        <p>Footer</p>
      </footer>
    </div>
  )
}
