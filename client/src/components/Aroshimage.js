import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Albumlist from "./Albumlist";
import { Link } from "react-router-dom";



const AroshImage = () => {

const [newUser , setNewUser] = useState(
    {
        name:"",
        birthday : "",
        photo: '',
    }
);


const handleChange = (e) => {
    setNewUser({...newUser,[e.target.name]:e.target.value});
}

// const handlePhoto = (e) => {
//     setNewUser({...newUser, photo: e.target.files[0]});
//     console.log(newUser.photo);
// }

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('birthday',newUser.birthday);
    formData.append('name',newUser.name);
    formData.append('photo',newUser.photo);
    console.log(newUser.photo);
    axios.post('/arosh',formData)
        .then(res => {
            console.log(res);
            window.alert("uploaded")
        })
        .catch (err => {
            console.log(err);
            window.alert("not uploaded")
        })
}


// const [getImage ,setGetImage] = useState(['']);

// const getArosh = async() => {
//    try{
//    const res =  await axios.get('http://localhost:8000/aroshget',{
//     headers:{
       
//     }
//    });
//    console.log("getarosh");
//    console.log(res.data)
//    console.log(res.photo)
//    console.log(res);
//   setGetImage(res.data)
  

//    }catch(err)  {
//     console.log(err);
//    } 
// }
// useEffect(()=>{
//     getArosh();
// },[])
// const [getImage ,setGetImage] = useState([]);

// useEffect(() => {
//   axios.get('http://localhost:8000/aroshget',{
//     headers: {
//         'Content-Type': 'image/png'
//       }
//   })
  
//     .then(res => setGetImage(res.data))
    
//     .catch(err => console.error(err));
// }, []);



return (
  <>

<nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="./">Albumlist</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add album</li>
                </ol>
            </nav>
  
  <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
       <div  className="p-4 ">
       <input 
        type="text"
        accept=".png,.jpg,.jpeg"
        name="photo"
        placeholder="copy paste image address"
        value={newUser.photo}
        onChange={handleChange}
        className="col-12  border border-primary p-3"
        />
       </div>

        <div className="p-4">
        <input 
        type="text"
        name= "name"
        placeholder="name"
        value={newUser.name}
        className="col-12  border border-primary p-3"
        onChange={handleChange}
        />
        </div>

       <div className="p-4">
       <input 
        type="date"
        name= "birthday"
        className="col-12  border border-primary p-3"
        placeholder="birthday"
        value={newUser.date}
        
        onChange={handleChange}
        />
       </div>
        <div className="bg">

        </div>

        <input
        type="submit"
        />


    </form>
  </div>
 
    {/* <div>
       
      {getImage.map(item => (
        <li key={item._id}>
          {}: {item.name}
          {/* <img key={item._id} src={`data:image/png;base64,${item.photo}`} alt="Image" /> */}
          {/* <img key={item._id} src={`data:image/jpeg;base64,${item.photo}`} alt={item.name} /> */}
          {/* <img src={URL.createObjectURL(item.image)} alt="Original Image"/> */}
           {/* <img src={URL.createObjectURL(new Blob([item.photo], { type: 'image/png' }))} alt="Original Image"/> 
          <p>{item.photo}</p> */}
          {/* <img src={`data.res:image/png;base64,${item.photo}`} /> */}
          {/* <img src={URL.createObjectURL(item.photo)} alt={item.name} /> */}
          {/* <img src={window.URL.createObjectURL(new Blob([item.photo], { type: "image/png/jpeg/jpg" }))} alt={item.name} /> */}
        {/* </li> */}
        {/* // ))} */}
   
   {/* // </div> */} 
   {/* <div>
      {Array.isArray(getImage) ? getImage.map(item => {
        let format = "jpeg";
        if (item.photo) {
          const extension = item.photo.substring(item.photo.lastIndexOf(".") + 1);
          format = extension === "png" ? "png" : "jpeg";
        }
        return (
          <div key={item._id}>
            <p>Name: {item.name}</p>
            <p>Birthday: {item.birthday}</p>
            <img src={`data:image/${format};base64,${item.photo}`} alt={item.name} />
            {/* <img src={`data:image/jpeg;base64,${item.photo}`} alt="Image" /> */}
            {/* <img  src={item.photo}/> */}
          {/* </div> */}
        {/* ); */}
      {/* }) : <p>No data</p>} */}
    {/* </div> */} 
    {/* <img src={`data:image/jpeg;base64,${new TextDecoder("utf-8").decode(new Uint8Array(item.photo))}`} alt={item.name} /> */}

  </>
)

}

export default AroshImage;