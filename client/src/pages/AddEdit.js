import React , {useState, useEffect} from 'react';
//import {useHistory, useParams, Link } from "react-router-dom";
import {useNavigate, Navigate , useParams, Link } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from 'axios';
import './AddEdit.css';


const initialState = {
    name : '',
    email : '',
    contact : '',
    password:''
}

const AddEdit = () => {

    const [state, setState] = useState(initialState);
    const {name, email, contact, password} = state;
    
     //const history = useHistory();
     const navigate = useNavigate();

    // const confirm = (e) => {
    //     navigate.push('/')
    // }


    const {id} = useParams();
    useEffect(()=>{
        axios
          .get(`http://localhost:5000/api/get/${id}`)
          .then((resp)=>setState({...resp.data[0]}))
    }, [id]);



    const handelSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact || !password) {
            toast.error('Please provide value into each input field');
        }else{
          if(!id){
              axios
                .post("http://localhost:5000/api/post", {name, email, contact, password})
                .then(()=>{setState({name: "", email: "", contact: "", password:""});  })
                .catch(err => {toast.error(err.response.data)});
                toast.success('Contact Added Successfully');
                setTimeout((e)=> navigate('/'), 500 );
          }else{
            axios
            .put(`http://localhost:5000/api/update/${id}`, {name, email, contact})
            .then(()=>{setState({name: "", email: "", contact: ""});  })
            .catch(err => {toast.error(err.response.data)});
            toast.success('Contact Updated Successfully');           
            setTimeout((e)=> navigate('/home'), 500 );
          }

        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]:value})
    }


  return (
    <div style={{margintop: "100px"}}>
      <h2>{id ? "Update guest profile" : "Add a new guest"}</h2>
      <form style={{ margintop: "100px", padding: "15px", maxWidth: "400px", margin:"auto", contentAlign: "center" }} onSubmit={handelSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name"
            name = "name"
            placeholder="Your name..."
            value={name || ""}
            onChange={handleInputChange}
         />
          <label htmlFor="email">Password</label>
          <input 
            type="password" 
            id= "password"
    
            name = "password"
            placeholder="Password..."
            value={password || ""}
            onChange={handleInputChange}
         />
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id= "email"
    
            name = "email"
            placeholder="Your email..."
            value={email || ""}
            onChange={handleInputChange}
         />
          <label htmlFor="contact">Contact</label>
          <input 
            type="text" 
            id="contact"
            name = "contact"
            placeholder="Your contact no..."
            value={contact || ""}
            onChange={handleInputChange}
         />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to={`/`}>             
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default AddEdit
