import React from 'react'
import '../../styles/Commentdisp.css'

function Commentsdisp({cmnt,index}) {
  return (
    <div className='commentcard' key={index}>
    <span className='cmntusr'>{cmnt.user} :</span><p className='cmntp'>{cmnt.comment}</p>
    </div>
  )
}

export default Commentsdisp