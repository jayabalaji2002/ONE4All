import React from 'react'
import './NewsLetter.css'


const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <div>
        <input type="email" name="email" placeholder='Type ur Email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
