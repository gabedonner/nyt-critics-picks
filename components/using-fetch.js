import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'

///reviews/search.json?query=big&opening-date=1980-01-01:1990-01-01
//API KEY joZEGXraTg5TwCzoVbILHCL6F0e2C9vG

//https://www.codingdeft.com/posts/react-fetch-data-api/#fetching-data-in-react-using-async-await

const url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=joZEGXraTg5TwCzoVbILHCL6F0e2C9vG"

const UsingFetch = () => {
  const [movies, setMovies] = useState([])

  const fetchData = () => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setMovies(data.results)
        console.log(data.results)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const movieList = movies.map((movieItem, index) => <li key={index}>{movieItem.display_title}</li>);

  return (
    <div>
      <ul>{movieList}</ul>
      <p>{JSON.stringify(movies)}</p>
    </div>
  )
}

export default UsingFetch


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