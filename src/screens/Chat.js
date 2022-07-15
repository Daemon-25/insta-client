import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import Navbar from '../components/Navbar';
import AuthenticationContext from '../contexts/auth/Auth.context';

const Chat = () => {
    const { state } = useContext(AuthenticationContext)
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()
    const scrollRef = useRef()
    const currentUser = state.user._id;
    const userId = useParams().userId
    const host = "http://localhost:3001"
    

    const [msg, setMsg] = useState("");

    const sendChat = async (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            await handleSendMsg(msg);
            setMsg("");
        }
    };
    

    useEffect( () => {
        const func = async () => {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser);
            const response = await axios.post(`${host}/getmsg`, {
                from: currentUser,
                to: userId
            })
            console.log(response)
            setMessages(response.data)
        }
        func()
    }, []);

    const handleSendMsg = async (msg) => {
        setMessages((messages) => [...messages, {fromSelf : true, message : msg}])
        await socket.current.emit("send-msg", {
            from: currentUser,
            to: userId,
            message: msg
        })

        await axios.post(`${host}/addmsg`, {
            from: currentUser,
            to: userId,
            message: msg
        })
        console.log(messages)
    }

    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            console.log(msg)
            setMessages((messages) => [...messages, {fromSelf : false, message : msg}]);
          });
        }
      }, []);
    
      useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
        
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);




    return (
        <>
            <Navbar />
            <div>
                <div className="chat-messages">
                    {
                    messages.map((msg, id) => {
                        return (
                            <div key={id} ref={scrollRef}>
                                
                                    <div className="content ">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            
                        );
                    })
                }
                </div>
                <form className="input-container" >
                    <input
                        type="text"
                        placeholder="type your message here"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                    />
                    <button type="submit" onClick={sendChat}>
Send
                    </button>
                </form>
            </div>
        </>
    )
}

export default Chat