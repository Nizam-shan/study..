import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const Albumlist = () => {

    
const [getImage ,setGetImage] = useState(['']);

const getArosh = async() => {
   try{
   const res =  await axios.get('http://localhost:8000/aroshget',{
    headers:{
       
    }
   });
   console.log("getarosh");
   console.log(res.data)
   console.log(res.photo)
   console.log(res);
  setGetImage(res.data)
  

   }catch(err)  {
    console.log(err);
   } 
}
useEffect(()=>{
    getArosh();
},[])

const aroshDelete =async (e) => {
  e.preventDefault()
    try {
      const res = await axios.delete('http://localhost:8000/aroshdelete');
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
}

// const [isDeleted, setIsDeleted] = useState(false);
// const [name, setName] = useState('');

// const deleteData = async () => {
//   try {
//     const response = await axios.delete(`http://localhost:8000/aroshdelete/${name}`);
//     setIsDeleted(true);
//     console.log(response.data.msg, response.data);
//   } catch (error) {
//     console.error(error.response.data.msg);
//   }
// };

    return(
        <>
         <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/arosh">AddAlbum</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Album List</li>
                </ol>
            </nav>
           <div>
           
            <table class="table">
  <thead>
    <tr>
      <th scope="col">index</th>
      <th scope="col">Name</th>
      <th scope="col">Birthday</th>
      <th scope="col">photo</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  {
       getImage.map((item,index) => (
    <tr >
      
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{item.birthday}</td>
      <td>{item.photo ? <img src={item.photo} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover" }}/> : <p>no image</p>}</td>
      {/* {item.photo ? <img src={item.photo} /> : <p>no image</p>} */}
      {/* <td><img src={item.photo} /></td> */}
     <td> <button onClick={aroshDelete}>Delete</button></td>
    </tr>
       ))
      }
  </tbody>
</table>
           
           </div>
    

        </>
    )
}

export default Albumlist;


{/* <div>
      {isDeleted ? (
        <p>Data has been deleted successfully!</p>
      ) : (
        <div>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button onClick={deleteData}>Delete Data</button>
        </div>
      )}
    </div>
             */}
       