import React , {useState, useEffect} from 'react';
//import {useHistory, useParams, Link } from "react-router-dom";
import {useNavigate, Navigate , useParams, Link } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from 'axios';
import './AddEdit.css';


const initialState = {
    name : '',
    email : ''
}

const AddEdit = () => {

    const [state, setState] = useState(initialState);
    const {password, email} = state;
    
    const navigate = useNavigate();

   // axios.defaults.withCredentials = true;
    const handelSubmit = (e) => {
        e.preventDefault();
        if(!password|| !email ) {
            toast.error('Please provide value into each input field');
        }else{
 
            axios
              .post("http://localhost:5000/api/login", {password, email})
              .then((response)=>{
                setState({password: "", email: ""})
                console.log(response.data) 
                if(response.data.message){
                  toast.error(response.data.message);
                }else{
                  toast.success(`User :  logged in Successfully`);
                  setTimeout((e)=> navigate('/home'), 500 );
                }
              })
              .catch(err => {toast.error(err.response.data)});

        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]:value})
    }


  return (
    <div style={{margintop: "100px"}}>
           <Link to={`/addContact`}>             
           <input type="button" value="Register" />
      </Link>
      <h4>or</h4>
      <h2>Login</h2>
      <form style={{ margintop: "100px", padding: "15px", maxWidth: "400px", margin:"auto", contentAlign: "center" }} onSubmit={handelSubmit}>

          <label htmlFor="email">Email</label>
          <input 
            type="text" 
            id= "email"
    
            name = "email"
            placeholder="Your email..."
            value={email || ""}
            onChange={handleInputChange}
         />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            name = "password"
            placeholder="Password..."
            value={password || ""}
            onChange={handleInputChange}
         />
         
        <input type="submit" value= "Save" />
        <Link to={`/home`}>             
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default AddEdit
