import React from 'react'
import { useState } from 'react'
import "./ListFriend.scss"
const ListFriend = ({data}) => {
    console.log(data)
    const [inputValue, setInputValue] = useState("")
  return (
    data.length !==0 &&
    <div className='listFriend'>
            <div className='search'>
                <div className='search__input'>
                <input value={inputValue} onChange = {(e)=>{setInputValue(e.target.value)}}  placeholder="Search Friend"></input>
                </div>
               
            </div>
           {
            data.map((item,index)=> <div className='friend__list'>
            <div className='friend__item'>
                <div className='friend__avatar'>
                    <img src={item.users[0].avatar} alt="avatar"></img>
                </div>
                <p>{item.users[0].username}</p>
            </div>
        </div>)
           }
    </div>
  )
}

export default ListFriend