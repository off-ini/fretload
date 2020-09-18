import React, { useState } from 'react';

const Counter = () => {
    const [counter, setCounter] = useState(0);

    const handleMinous = () => {
        if(counter > 0)
        {
            setCounter(counter - 1);
        }      
    }

    const handleAdd = () => {
        setCounter(counter + 1)
    }

  return (
    <>
        <div>
            <button onClick={handleMinous} style={{margin:'20px', padding:'10px 16px', color:"white", backgroundColor:'red', border:'none'}}> - </button>
            <span>{counter}</span>
            <button onClick={handleAdd} style={{margin:'20px', padding:'10px 16px', color:"white", backgroundColor:'green', border:'none'}}> + </button>
        </div>
    </>
  );
}

export default Counter;
