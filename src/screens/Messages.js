import React from 'react'
import { io } from "socket.io-client";
import Navbar from '../components/Navbar';

const Messages = () => {
  return (
    <>
    <Navbar />
    <div>Messages</div>
    </>
  )
}

export default Messages