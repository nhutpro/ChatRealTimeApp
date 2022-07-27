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

const Home = () => {
    const accessToken = useSelector((state)=>state.user.current.accessToken)
    const socket = io.connect("http://localhost:3001", {
        extraHeaders: {
          Authorization: "Bearer "+ accessToken
        }});
 
    useEffect(()=>{
      socket.on("getRoom",(data)=>{
        console.log(data)
      })
    },[socket])
  return (
    <div className='home'>
        <Header></Header>
        <div className='home__body'>
          <div className='listFriend'>
            <ListFriend></ListFriend>
          </div>
          <div className='listMessage'>
            <ListMessage></ListMessage>
          </div>
        </div>
    </div>

  )
}

export default Home