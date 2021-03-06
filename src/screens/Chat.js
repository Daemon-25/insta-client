import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import Navbar from '../components/Navbar';
import AuthenticationContext from '../contexts/auth/Auth.context';
import './Chat.css';

const Chat = () => {
    const { state } = useContext(AuthenticationContext)
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()
    const scrollRef = useRef()
    const currentUser = state.user._id;
    const userId = useParams().userId
    const host = "https://instagram-clone-backend25.herokuapp.com"

    const [msg, setMsg] = useState("");

    const sendChat = async (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            await handleSendMsg(msg);
            setMsg("");
        }
    };


    useEffect(() => {
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
        setMessages((messages) => [...messages, { fromSelf: true, message: msg }])
        await socket.current.emit("send-msg", {
            from: currentUser,
            to: userId,
            message: msg
        })

        const res = await axios.post(`${host}/addmsg`, {
            from: currentUser,
            to: userId,
            message: msg
        })
        console.log(res)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                console.log(msg)
                setMessages((messages) => [...messages, { fromSelf: false, message: msg }]);
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);

    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const listItems = messages.map((ary, id) => {
        if (ary.fromSelf === true) {
            return <div className="messageselfmain" key={id}>
                <div className="messageself">{ary.message}</div>
            </div>
        }
        else {
            return <div className="messagenotself" key={id}>{ary.message}</div>
        }
    }
    );

    return (
        <>
            <Navbar />

            <div className='message-main'>
                <div className="message-second">
                    <div className="messagehead">
                        <div className="dpimage">
                            <img className='dpimg' src="https://heavyng.com/wp-content/uploads/2019/11/Joker.jpg" alt="" />
                        </div>
                        <div className="headname">
                        Sagar Sehrawat
                        </div>
                    </div>
                    <div className="messagedisp">
                        {messages.map((ary, id) => {
                            if (ary.fromSelf === true) {
                                return <div className="messageselfmain" key={id}>
                                    <div className="messageself" ref={scrollRef}>{ary.message}</div>
                                </div>
                            }
                            else {
                                return <div className="messagenotself" key={id} ref={scrollRef}>{ary.message}</div>
                            }
                        }
                        )}
                    </div>
                    <div className="messagesend">
                        <form>
                            <input type="text" name="name" placeholder="Enter a message" className='messagetext' onChange={(e) => setMsg(e.target.value)} value={msg} />
                        </form>
                            <button onClick={sendChat} className="messagesendbtn">send</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Chat