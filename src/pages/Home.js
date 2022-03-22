import React, { useState, useEffect } from 'react';
import { fireDb } from '../firebase';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Link } from 'react-router-dom';
import "./Home.css";
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});

  const db = getDatabase();
  const dbRef = ref(db, 'contacts');

  useEffect(() => {
    onValue(dbRef, (snapshot) =>{

        console.log("SNAP: ", snapshot.val());
        document.title = `FUCK THIS GUY firebase`;
        
        if(snapshot.val() !== null){
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }

    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this?")) {
      const db = getDatabase();
      const contactRef = ref(db, `contacts/${id}`);

      remove(contactRef);
      toast.error("Contact Removed");
    }
  }

  return (
    <div style={{marginTop: '50px'}}>
      <h2>Home</h2>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>Name</th>
            <th style={{textAlign: "center"}}>Email</th>
            <th style={{textAlign: "center"}}>Contact</th>
            <th style={{textAlign: "center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id) => {
            return(
              <tr key={id}>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button 
                    className='btn btn-delete' 
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home