import React, { useState } from 'react'
import "./HomeContact.scss"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { usercontact } from '../../redux/slice/userAuthSlice/userAuthSlice';

const HomeContacts = () => {

  const [inputvalue,setInputvalue] = useState({
    name: "",
    email:"",
    message:""
  });

  const dispatch = useDispatch();

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setInputvalue({...inputvalue,[name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const {name,email,message} = inputvalue;
    if(name == ""){
      toast.error("name is required");
    }else if (email == ""){
      toast.error("email is required");
    }else if (!email.includes("@")){
      toast.error("Enter Valid Email");
    }else if (message == ""){
      toast.error("message is required");
    }else{
      dispatch(usercontact(inputvalue)).then((res)=>{
        if(res?.payload){
          setInputvalue({...inputvalue,name:"",email:"",message:""})
        }
      }).catch((error)=>{
        console.log("error",error)
      })
    }
  }
  return (
    <>
      <section id='contact'>
        <div className="contact containers">
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2700743165096!2d77.61842311075347!3d13.018465813795794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae171c9729a9b7%3A0x700fa3102810af5d!2sVinobha%20Nagar%2C%20Kadugondanahalli%2C%20Bengaluru%2C%20Karnataka%20560045!5e0!3m2!1sen!2sin!4v1706885447186!5m2!1sen!2sin" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <form action=''>
                <div className="form">
                    <div className="form-txt">
                        <h4>INFORMATION</h4>
                        <h1>Contact Us</h1>
                        <span>As you might expect of a company that began as a high-end interiors contractors, we pay strict attention. </span>
                        <h3>USA</h3>
                        <p>195 E Parker Square Dr, Parker, CO 801
                             +43 982-314-0958</p>
                        <h3>India</h3>
                        <p>HW95+C9C, Lorem ipsum dolor sit.
                             411014</p>
                    </div>
                    <div className="form-details">
                        <input type="text" name="name" value={inputvalue.name} onChange={handleChange} placeholder='Name' className="textinp" id="" />
                        <input type='email' name='email' value={inputvalue.email} onChange={handleChange} placeholder='Email' className='emailinp' id="" />
                        <textarea name="message" id="" value={inputvalue.message} onChange={handleChange} cols="52" className='textareainp' rows="7" placeholder="Message"></textarea>
                        <button onClick={handleSubmit}>SEND MESSAGE</button>
                    </div>
                </div>
            </form>
        </div>
      </section>
    </>
  )
}

export default HomeContacts
