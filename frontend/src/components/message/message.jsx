import React from 'react'
import "./message.scss"
const Message = ({message, avatar,me}) => {
  return (
    <div className={me?'message__container me': 'message__container friend'}>
        <div className='message'>
        <p className='message__text'>
                {message}
        </p>
        <div className='message__avatar'>
            <img src={avatar} alt='avatar'> 
            </img>
        </div>
        </div>
       
    </div>
  )
}

export default Message