/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref=useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site :"",username:"",password:""})
const [passwordArray, setPasswordArray] = useState([])

useEffect(() => {
  let passwords = localStorage.getItem("passwords") ;
  if(passwords){
  setPasswordArray(JSON.parse(passwords))
  
  }
  
},[])

  const showPassword = () => {
passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password"


   
 
  }
  const savePassword = () => {
    if(form.site.length!=0 && form.username.length!=0 && form.password.length!=0){
      let newArray = Array.isArray(passwordArray) ? [...passwordArray, {...form ,id:uuidv4()}] : [{...form ,id:uuidv4()}];
      setPasswordArray(newArray);
      localStorage.setItem('passwords', JSON.stringify(newArray));
      setform({site :"",username:"",password:""})
     
    }
    else{alert('Please fill all the fields')}
  
  
  
  }
  const deletePassword = (id) => {
    let confirm = window.confirm("Are you sure you want to delete this password?")
if(confirm)
{
  console.log("Deleting Password with id", id)
  setPasswordArray(passwordArray.filter(item=>item.id!=id))
  localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item=>item.id!=id)))
  
 
} 

  }
  const editPassword = (id) => {
    console.log("Editing Password with id", id)
setform(passwordArray.filter(i=>i.id===id)[0])
setPasswordArray(passwordArray.filter(item=>item.id!=id))




  }




  const handleChange = (e) => {

setform({...form,[e.target.name]:e.target.value})


  }
  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"

      });
    navigator.clipboard.writeText(text)
  }
  return (
    <>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />



        
<div className="p-2 md:p-0 md:mycontainer   ">
<div><h1 className=' sm:text-2xl lg:text-4xl   text-sm font-bold text-center'><span className='text-green-700 '>&lt;</span>
Pass
<span className='text-green-700 '>OP/&gt;</span></h1>
<p className='text-green-900   sm:text-base lg:text-lg   text-sm text-center '>Your own Passworn Manager</p></div>

<div className='text-black flex flex-col items-center p-4 gap-8'>
<input placeholder='Enter Website URL' id='site' name='site' value={form.site} onChange={handleChange} className='rounded-full border border-green-500 p-4 py-1 w-full '  type="text" />

<div className="flex flex-col md:flex-row w-full gap-8 justify-between">
<input placeholder='Enter Username' name='username' id='username' value={form.username} onChange={handleChange}className='rounded-full border border-green-500 p-4 py-1 w-full '  type="text" />
<div className="relative">
<input placeholder='Enter Password' ref={passwordRef}  name='password' id='password' value={form.password} onChange={handleChange}className='rounded-full border border-green-500 p-4 py-1 w-full '  type="password" />
<span className='absolute right-[3px] cursor-pointer top-[3px] ' onClick={showPassword}><img width={26} className='p-1' src="icons/eye.png" alt="eye" /> </span>
</div>

</div>

<button onClick={savePassword} className=' w-fit gap-2 flex border border-green-900 justify-center items-center hover:bg-green-300 px-5 py-2 bg-green-200 rounded-full'>
<span className='sm:text-base lg:text-lg     text-sm'>Save Password</span>
</button>
</div>
<div className='passwords'> 
<h2 className=' font-bold  sm:text-lg lg:text-xl text-base py-4'>Your Passwords</h2>
{passwordArray.length===0 && <div>No Passwords to show</div>}
{passwordArray.length!=0 &&<table className="table-auto w-full bg-green-100  overflow-hidden mb-10 rounded-md  sm:text-base lg:text-lg text-sm">
  <thead className=' bg-green-800 text-white'>
    <tr>
      <th className='py-2'>WebSite</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody>
{passwordArray.map((item,index)=>{
// eslint-disable-next-line react/jsx-key
return <tr key={index}>

<td className='py-2 border border-white text-center'>
<div className='flex items-center justify-center'>
<a href={item.site} target='_blank'>{item.site} </a>  
<div className='size-7 cursor-pointer mx-3' onClick={()=>{copyText(item.site)}}>      <img  src="icons\copy icon.png"   width={20} alt="copy icon" /></div>

</div>

</td>
<td className='py-2 border border-white text-center'>
<div className='flex items-center justify-center'>
{item.username} 
<div className='size-7 cursor-pointer mx-3' onClick={()=>{copyText(item.username)}}>      <img  src="icons\copy icon.png"   width={20} alt="copy icon" /></div>

</div>

</td>
<td className='py-2 border border-white text-center'>
<div className='flex items-center justify-center'>
{item.password}
<div className='size-7 cursor-pointer mx-3' onClick={()=>{copyText(item.password)}}>      <img  src="icons\copy icon.png"   width={20} alt="copy icon" /></div>

</div>

</td>
<td className='py-2 border border-white text-center'>
<div className='flex items-center justify-center'>

<span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
<lord-icon
    src="https://cdn.lordicon.com/ghhwiltn.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon>
</span>
<span className='cursor-pointer mx-1 delete'  onClick={()=>{deletePassword(item.id)}}>
<lord-icon
    src="https://cdn.lordicon.com/drxwpfop.json"
    trigger="hover"
    style={{"width":"25px","height":"25px",}}>
</lord-icon>
</span>







</div>



</td>



  
    </tr>

  })}

  </tbody>
</table>}








</div>






</div>





    </>
  )
}

export default Manager
