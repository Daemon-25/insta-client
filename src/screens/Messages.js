import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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

  console.log(members[0].id)

  const listItems = members.map((e) =>  
  
        <div className="namedesi">
            <Link to={`/messages/${e.id}`}>{e.name}</Link>
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