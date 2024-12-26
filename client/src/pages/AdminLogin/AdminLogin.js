import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {AdminAuthLogin} from "../../redux/slice/adminAuthSlice/AdminSlice"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    const [passShow,setPassShow] = useState(false);

    const [inpvalue,setInputValue] = useState({
        email:"",
        password:""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setInputValue({...inpvalue,[name]:value})
    }

    // admin Login
    const handleLogin = (e)=>{
        e.preventDefault();

        const { email, password } = inpvalue;

        if(email == ""){
            toast.error("Email is Required!")
        }else if(!email.includes("@")){
            toast.error("Enter Your Valid Email !");
        }else if(password == ""){
            toast.error("Password is Required!")
        }else{
            dispatch(AdminAuthLogin(inpvalue)).then((res)=>{
                if(res.payload.token){
                    navigate("/admin/dashboard")
                }
            }).catch((error)=>{
                console.log("error",error)
            })
        }
    }



  return (
   <>
        <section>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Admin Sign In</h1>
                </div>

                <form action="">
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={handleChange} placeholder='Enter Your Email Address'/>
                    </div>

                    <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password":"text"} name="password" onChange={handleChange} placeholder='Enter Your Password' id="" />
                                <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                    {!passShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={handleLogin}>Login</button>
                </form>
            </div>
        </section>
   </>
  )
}

export default AdminLogin
