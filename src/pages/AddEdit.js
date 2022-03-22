import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./AddEdit.css";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import { toast } from 'react-toastify';


const initialState = {
  name: "",
  email: "",
  contact: ""
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [date, setDate] = useState({});

  const {name, email, contact} = state;

  const history = useNavigate();

  const {id} = useParams();
  const [data, setData] = useState({});
  const db = getDatabase();
  const dbRef = ref(db, 'contacts');

  useEffect(() => {
    onValue(dbRef, (snapshot) =>{

        console.log("SNAP: ", snapshot.val());
        
        if(snapshot.val() !== null){
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }

    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if(id) {
      setState({...data[id]});
    } else {
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    };
  }, [id, data])

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error("Please provide value in each input field");
    } else {
      if(!id){
        writeNewUserData(name, email, contact);
        setTimeout(() => history('/'), 500);
      } else {
        updateUserData(id, name, email, contact);
        setTimeout(() => history('/'), 500);
      }
      
    }
  };

  function writeNewUserData(name, email, contact) {
    const db = getDatabase();
    const contactRef = ref(db, 'contacts');
    const newContactRef = push(contactRef); // Push auto generates a new id and spot in the DB

    set(newContactRef, {
      name: name,
      email: email,
      contact: contact
    });

    toast.success("Contact Added Successfully");
  }

  function updateUserData(id, name, email, contact){
    const db = getDatabase();
    const contactRef = ref(db, `contacts/${id}`);
    // const newContactRef = id;

    update(contactRef, {
      name: name,
      email: email,
      contact: contact
    });

    toast.success("Contact Updated Successfully");
  }

  return (
    <div style={{marginTop: "100px"}}>
        <form 
          style={{
            margin: "auto", 
            padding: "15px", 
            maxWidth: "400px", 
            alignContent: "center",
            }}
            onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name='name' 
            placeholder='Your Name...' 
            value={name || ""}
            onChange={handleInputChange}  
          />
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name='email' 
            placeholder='Your Email...' 
            value={email || ""}
            onChange={handleInputChange}  
          />
          <label htmlFor="contact">Contact</label>
          <input 
            type="number" 
            id="contact" 
            name='contact' 
            placeholder='Your Contact Number...' 
            value={contact || ""}
            onChange={handleInputChange}  
          />

          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
    </div>
  ) 
}

export default AddEdit