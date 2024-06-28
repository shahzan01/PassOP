import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 w-full text-white flex flex-col justify-center items-center'>
      <div>
      <h1 className='text-4xl font-bold text-center'><span className='text-green-700 '>&lt;</span>
Pass
<span className='text-green-700 '>OP/&gt;</span></h1>
      </div>

      <div className='flex gap-1'>Created with  <img src="\icons\heart.png" width={25} alt="heart" /> by  <a href="https://github.com/shahzan01" target='_blank'> Shahzan</a></div>

    </div>
  )
}

export default Footer
