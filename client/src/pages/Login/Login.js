import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./commonstyle.scss"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userlogin } from '../../redux/slice/userAuthSlice/userAuthSlice';

const Login = () => {
    const [passShow,setPassShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputvalue,setInputValue] = useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputValue({...inputvalue,[name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const {email,password} = inputvalue;

        if(email == ""){
            toast.error("Email Is Required !")
        }else if(!email.includes("@")){
            toast.error("Enter Your Valid Email !")
        }else if(password == ""){
            toast.error("Password Is Required !")
        }else {
            dispatch(userlogin(inputvalue)).then((res)=>{
                if(res?.payload){
                    navigate("/");
                    setInputValue({...inputvalue,email:"",password:""});
                }
            }).catch((err)=>{
                console.log("error",err)
            })
        }
    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign In</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type='email' name="email" value={inputvalue.email} onChange={handleChange} placeholder='Enter Your Email Address' id="" />
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password":"text"} value={inputvalue.password} onChange={handleChange} name="password" placeholder='Enter Your Password' id="" />
                                <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                    {!passShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={handleSubmit}>Login</button>
                        <p>Don't have an Account ? <NavLink to="/register">Sign Up</NavLink></p>
                        <p style={{color:"black",fontWeight:"bold"}}>Forgot Password <NavLink to="/forgotpassword">Click Here</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
