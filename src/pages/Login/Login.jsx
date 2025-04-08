import React,{useState}from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { toast } from "react-toastify";

const Login = () => {
  const [signState,setSignState]=useState('Sign In');
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
 

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6; 
};


  const user_auth=async (e)=>{
     e.preventDefault();
     setLoading(true);


if (!email || !validateEmail(email)) {
  toast.error("Please enter a valid email address.")
  setLoading(false);
  return;
}

if (!password || !validatePassword(password)) {
  toast.error("Password must be at least 6 characters.")
  setLoading(false);
  return;
}

if (signState === "Sign Up" && !name) {
  toast.error("Please enter your name.")
  setLoading(false);
  return;
}


    if(signState==="Sign In"){
      await login(email,password);
    }else{
      await signup(name,email,password);
    }
    setLoading(false);
  
  }
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
       <img src={logo} className='login-logo' alt="" />
       <div className="login-form">
        <h1>{signState}</h1>
        <form >

          {signState==='Sign Up'?<input type="text"
           value={name} 
           onChange={(e)=>{setName(e.target.value)}}
           placeholder="Your Name" />:<></> }
          
          <input type="email" 
          value={email} 
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="Your Email" />

          <input type="password" 
          value={password} 
          onChange={(e)=>{setPassword(e.target.value)}}
          placeholder="Password" />
          
          <button onClick={user_auth} type='submit'>{signState}</button>
          
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>

        </form>
        <div className="form-switch">
        {signState==='Sign In'? 
          <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign up Now</span></p>:
          <p>Already have an Account? <span onClick={()=>{setSignState("Sign In")}}>Sign in Now</span></p>
        }
        </div>
       </div>
    </div>
    
  )
}

export default Login






 