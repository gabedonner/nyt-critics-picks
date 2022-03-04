import React, {useState} from 'react';
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';

const blah = 'blahblahblah'

const Counter = () => {

    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div className={styles.container}>
            <h2>Check out this counter</h2>
            <h4>The count is {count}</h4>
            {/*<button onClick={() => setCount(count + 1)}>
                Add
            </button>
            <button onClick={() => setCount(count - 1)}>
                Subtract
            </button> */}
            <Button 
                onClick={() => setCount(count + 1)} 
                variant="outlined"
                sx = {{
                    mx: 2,
                }}
                >
                Add
            </Button>
            <Button 
                onClick={() => setCount(count - 1)} 
                variant="outlined"
                sx = {{
                    mx: 2,
                }}
                >
                Subtract
            </Button>
            {/* <p>{blah}</p> */}
        </div>
    )
}

export default Counter