import React, {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import './Home.css';
import {toast} from 'react-toastify';
import axios from 'axios';

import PropTypes from 'prop-types';

const Home = () => {
 
  
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  }


  const deleteConatct = (id) => {

      if(window.confirm("Are you sure you want to delete")) {
          axios.delete(`http://localhost:5000/api/remove/${id}`); 
          toast.success('Contact deleted Successfully');
          setTimeout((e)=> loadData(), 50 );
      }
  }


    useEffect(() => {
      loadData();
    }, []);

  return (
    <div style={{margintop: "150px"}}>
      <h2>Home</h2>
      <Link to={`/addContact`}>             
          <button className="btn btn-contact">Add contact</button>
      </Link>
      <Link to={`/`}>             
          <button className="btn btn-contact">Logout</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No.</th>
            <th style={{textAlign: "center"}}>Name</th>
            <th style={{textAlign: "center"}}>Email</th>
            <th style={{textAlign: "center"}}>Contact</th>
            <th style={{textAlign: "center"}}></th>
            <th style={{textAlign: "center"}}></th>
          </tr>
        </thead>
        <tbody>
            {data.map((item, i)=> {
                return (
                    <tr key={item.id}>
                      <th scope="row">{i+1}</th>
                      <td >{item.name}</td>
                      <td >{item.email}</td>
                      <td >{item.contact}</td>
                      <td>
                        <Link to={`/update/${item.id}`}>
                           <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button 
                          className="btn btn-delete" 
                          onClick={()=>deleteConatct(item.id)}>Delite
                        </button>
                        <Link to={`/view/${item.id}`}>
                           <button className="btn btn-view">View</button>
                        </Link>
                      </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    
    </div>
  )

}

Home.propTypes = {

}

export default Home;
