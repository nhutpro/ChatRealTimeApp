import React from 'react'
import "./ListMessage.scss"
import Message from '../message/message'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { renew } from '../../redux/message'
const ListMessage = ({socket,roomId,messageData}) => {
  const user = useSelector((state)=> state.user.current._id)
  // const message = useSelector(state=>state.message.current);
  const [message, setMessage] = useState([])
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const avatar = useSelector(state=>state.user.current.avatar);
  const [inputValue,setInputValue] = useState("")
  const handleSendMessage =(e)=>{
    e.preventDefault()
    

    socket.emit("cTsnewMessage",{
      room: roomId,
      user: user,
      message: inputValue
    })


        }

  return (
  
    
    <div className='listMessage'>
        <p>id room: {roomId}</p>
        <div className='message__list'>
           {messageData.length !==0? messageData.map((item,index)=><Message key={index} message={item.message}  me={item.user === user ? true: false }></Message>):<></>}
        </div>
        <div className='message__send'>
           <form>
           <input value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}></input>
           <button onClick={handleSendMessage}>send</button>
           </form>
        </div>
    </div>
  )
}

export default ListMessage