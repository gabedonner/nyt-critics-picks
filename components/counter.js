import React, {useState} from 'react';
import styles from '../styles/Home.module.css'


const blah = 'blahblahblah'

const Counter = () => {

    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div className={styles.container}>
            <h2>Check out this counter</h2>
            <h4>The count is {count}</h4>
            <button onClick={() => setCount(count + 1)}>
                Add
            </button>
            <button onClick={() => setCount(count - 1)}>
                Subtract
            </button>
            {/* <p>{blah}</p> */}
        </div>
    )
}

export default Counter