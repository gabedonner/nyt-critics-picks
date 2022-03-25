import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'

///reviews/search.json?query=big&opening-date=1980-01-01:1990-01-01
//API KEY joZEGXraTg5TwCzoVbILHCL6F0e2C9vG

//how to do a "load more" button w/ api call
//https://www.cluemediator.com/load-more-pagination-in-react

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

const url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"

const UsingFetch = () => {
  const [movies, setMovies] = useState([])

  const fetchData = () => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.results)
        setMovies(data.results)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const movieList = movies.map((movieItem, index) => <p key={index}>{movieItem.display_title}</p>);

  return (
    <section>
      <div>{movieList}</div>
      {/*<p>{JSON.stringify(movies)}</p>*/}    
    </section>
  )
}

export default UsingFetch


//https://www.codingdeft.com/posts/react-fetch-data-api/#fetching-data-in-react-using-async-await

/* const UsingFetch = () => {
  const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsingFetch */