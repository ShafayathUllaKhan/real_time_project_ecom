import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import toast from 'react-hot-toast';
import { UserRegister } from '../../redux/slice/userAuthSlice/userAuthSlice';

const Register = () => {
    const [passShow,setPassShow] = useState(false);
    const [confirmpassShow,setConfirmPassShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputvalue,setInputValue] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    const [image,setImage] = useState("");
    const [preview,setPreview] = useState("");

    const setProfile = (e)=>{
        setImage(e.target.files[0]);
    }

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputValue({...inputvalue,[name]:value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const { firstname,lastname,email,password,confirmpassword} = inputvalue;

        if(firstname == ""){
            toast.error("First Name Is Required !")
        }else if(lastname == ""){
            toast.error("Last Name Is Required !")
        }else if(email == ""){
            toast.error("Email Is Required !")
        }else if(!email.includes("@")){
            toast.error("Enter Your Valid Email !")
        }else if(image == ""){
            toast.error("Profile Is Required !")
        }else if(password == ""){
            toast.error("Password Is Required !")
        }else if(confirmpassword == ""){
            toast.error("confirmpassword Is Required !")
        }else if(password !== confirmpassword){
            toast.error("password and confirmpassword is not match !")
        }else{
            const data = new FormData();
            data.append("firstname",firstname);
            data.append("lastname",lastname);
            data.append("email",email);
            data.append("userprofile",image);
            data.append("password",password);
            data.append("confirmpassword",confirmpassword);

            const config = {
                "Content-Type":"multipart/form-data"
            }

            const datasend = {
                data,
                config
            }

            dispatch(UserRegister(datasend)).then((res)=>{
                if(res?.payload){
                    setInputValue({...inputvalue,firstname:"",lastname:"",email:"",password:"",confirmpassword:""});
                    setImage("");
                    navigate("/login");
                }
            }).catch((error)=>{
                console.log("error",error)
            })
        }
    }

    useEffect(()=>{
        if(image){
            setPreview(URL.createObjectURL(image));
        }
    },[image])

  return (
    <>
       <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="profile_div text-center">
                        <img src={preview ? preview : "/logo192.png"} style={{width:"50px"}} alt="" />
                    </div>
                    <form>
                        <div className="form_input">                    
                            <input type='text' name="firstname" onChange={handleChange} placeholder='Enter Your Name' id="" />
                        </div>

                        <div className="form_input">
                            <input type='text' name="lastname" onChange={handleChange} placeholder='Enter Your Last Name' id="" />
                        </div>

                        <div className="form_input">                            
                            <input type='email' name="email" onChange={handleChange} placeholder='Enter Your Email Address' id="" />
                        </div>

                        <div className="form_input">      
                            <input type='file' name="userprofile" onChange={setProfile} id="" />
                        </div>

                        <div className="form_input">
                            <div className="two">
                                <input type={!passShow ? "password":"text"} name="password" onChange={handleChange} placeholder='Enter Your Password' id="" />
                                <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                    {!passShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <div className="two">
                                <input type={!confirmpassShow ? "password":"text"} name="confirmpassword" onChange={handleChange} placeholder='Enter Your Confirm Password' id="" />
                                <div className="showpass" onClick={()=>setConfirmPassShow(!confirmpassShow)}>
                                    {!confirmpassShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={handleSubmit}>Sign Up</button>
                        <p>Already have an Account ? <NavLink to="/login">Login In</NavLink></p>
                    </form>
                </div>
            </section>
    </>
  )
}

export default Register
