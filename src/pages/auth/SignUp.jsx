import React, { useState } from 'react'
import AuthService from '../../service/AuthService';

export default function SignUp() {
const authservice = new AuthService()
    const [ formdata , setformdata ] = useState()

    function handleChange(e){
        setformdata({...formdata, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const res = await  authservice.UserSignIn(formdata)
            localStorage.setItem("token", res.data.token)
               alert("Registration Successful!");
        } catch (error) {
               alert(error.response.data.message);
        }
    }
  return (
  <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
      <input type="email" name="useremail" placeholder="Email" onChange={handleChange} /><br />
      <input type="password" name="userpassword" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
    </form>
  )
}
