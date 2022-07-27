import React from 'react'
import { useState } from 'react'
import "./ListFriend.scss"
const ListFriend = () => {
    const [inputValue, setInputValue] = useState("")
  return (
    <div className='listFriend'>
            <div className='search'>
                <div className='search__input'>
                <input value={inputValue} onChange = {(e)=>{setInputValue(e.target.value)}}  placeholder="Search Friend"></input>
                </div>
               
            </div>
            <div className='friend__list'>
                <div className='friend__item'>
                    <div className='friend__avatar'>
                        <img src='http://localhost:3001/avartarDefault.jpg' alt="avatar"></img>
                    </div>
                    <p>name</p>
                </div>
            </div>
    </div>
  )
}

export default ListFriend