import React, { Fragment, useState,useContext } from "react";
import "./Create.css";
import {useHistory} from 'react-router-dom'
import Header from "../Header/Header";
import Swal from 'sweetalert2'

import {FireBaseContext,AuthContext} from '../../store/Context'
const Create = () => {
  const history=useHistory()
  const {firebase}=useContext(FireBaseContext)
  const {user}=useContext(AuthContext)
  const [productName, setProductname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date=new Date()
  const handleSubmit=()=>{
    if((productName||category||price)===""){
      Swal.fire({  
        icon: 'error',  
        title: 'OOPS!',  
        text: "Fields can't be Empty",  
      });
      return
    }
    if(image===null){
      Swal.fire({  
        icon: 'error',  
        title: 'OOPS!',  
        text: 'Upload An Image',  
      });
      return
    }
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        firebase.firestore().collection('products').add({
          productName,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        Swal.fire({
          
          icon: 'success',
          title: 'Your product  has been Added',
          showConfirmButton: false,
          timer: 1500
        })
        history.push('/')

      })
    })

  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={productName}
              onChange={(e) => {
                setProductname(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="input"
              type="number"
              id="fname"
              name="Price"
              required
            />
            <br />
          
          <br />
          {image && <img  alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" required/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
