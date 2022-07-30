import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { logout } from '../../redux/user';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import Header from '../../components/header/Header';
import ListFriend from '../../components/listfriend/ListFriend';
import ListMessage from '../../components/listmessage/ListMessage';
import "./Home.scss"
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';


const Home = () => {
    const accessToken = useSelector((state)=>state.user.current.accessToken)
    const [friend, setFriend] =useState([])
    const [openMessage, setOpenMessage] = useState(false)
    const [messageData, setMessageData] = useState([])
    const [roomId, setRoomId] = useState("");
    const socket = useRef()
    const handleOpenMessage = (roomid,message)=>{
      setRoomId(roomid);
      setOpenMessage(true);
      setMessageData(message)
    }

    // const socket = io.connect("http://localhost:3001", {
    //   extraHeaders: {
    //     Authorization: "Bearer "+ accessToken
    //   }});
    const handleCreateRoom = async (friendId,userId)=>{
    
      console.log("mang",friendId,userId)
      socket.current.emit("cTsjoinRoom",{
        users:[friendId,userId]
      })
     
      socket.current.on('sTcjoinRoom', async (data)=>{
        const message = await  axios.get(process.env.REACT_APP_SERVER_PATH+"message?roomId="+data.room._id, { headers: {"Authorization" : `Bearer ${accessToken}`} })
   
        handleOpenMessage(data.room._id,[...message.data])
      })}
    useEffect(()=>{
      socket.current = io.connect("http://localhost:3001", {
          extraHeaders: {
            Authorization: "Bearer "+ accessToken
          }});
     const callback = (payload)=>{
      console.log(payload.message)
      setMessageData((prev)=>[...prev, payload.message])
     }
      socket.current.on("sTcRoomMessage",callback)
    return(()=>{
      socket.current.disconnect();
    })
    },[])
    
  return (
    <div className='home'>
        <Header></Header>
        <div className='home__body'>
          <div className='home--listFriend'>
               <ListFriend data = {friend} handleCreateRoom={handleCreateRoom} ></ListFriend>
          </div>
          <div className='home--listMessage'>
            {
              openMessage&&<ListMessage roomId={roomId} socket={socket.current} messageData={messageData} ></ListMessage>
            }
            
          </div>
        </div>
    </div>

  )
}

export default Home