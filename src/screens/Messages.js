import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthenticationContext from '../contexts/auth/Auth.context';
import "./Messages.css"

const Messages = () => {
  const { state } = useContext(AuthenticationContext)
  const navigate = useNavigate()
  const members = []
  const host = "http://localhost:3000/"

  state.user.Followers.map((e) => {
    const x = {
      id : e.FollowerId,
      name : e.FollowerName
    }
    members.push(x);
  })
  state.user.Following.map((e) => {
    const x = {
      id : e.FollowingId,
      name : e.FollowingName
    }
    members.push(x);
  })

  const listItems = members.map((e) =>  
        <div className="namedesi" onClick={(e) => navigate(`/messages/${e.id}`)}>
            {e.name}
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