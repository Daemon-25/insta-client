import React from 'react'
import Navbar from '../components/Navbar';

const Messages = () => {
  const listItems = name.map((name) =>  
        <div className="namedesi" onClick={clickHandle}>
            {name}
        </div>
    );
  return (
    <>
    <Navbar />
    <div className="main_chat">
        <div className="people_names">
        {listItems}
        </div>

    </div>
    </>
  )
}

export default Messages