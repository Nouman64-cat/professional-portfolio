import React from 'react'

const Hashtag = ({ tag }) => {
  return (
    <div className='inline-flex py-2 px-4 bg-slate-900 rounded-full '>
        <p className='text-primary-lightGray font-poppins text-[12px]'>{tag}</p>
    </div>
  )
}

export default Hashtag