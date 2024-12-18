import React from 'react'

const NavBar = () => {
  return (
    <nav className="bg-slate-600 text-white">
   <div className='mycontainer  flex justify-between items-center px-4 h-15 py-5'>  

<div className='flex gap-5'>

<div className='logo font-bold sm:text-lg lg:text-2xl text-sm  '>

<span className='text-green-700 '>&lt;</span>
Pass
<span className='text-green-700 '>OP/&gt;</span>

</div>




</div>





<ul>
    <li className='flex gap-4  sm:text-lg lg:text-2xl text-sm '>
    
        <a href="" className='hover:font-bold'>Home</a>

        <a href="" className='hover:font-bold'>About</a>

        <a href="" className='hover:font-bold'>Contact</a>
    </li>
</ul>











</div>

    </nav>
  )
}

export default NavBar
