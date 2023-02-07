import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter ,Route} from "react-router-dom"

import Addalbum from './components/Addalbum';
import Albumlist from './components/Albumlist';
import AroshImage from './components/Aroshimage';
import LandingPage from './components/Home';
import Login from './components/Login';
import Params from './components/Params';
import Register from './components/Register';
import UploadImage from './components/Uploadimage';
//npm i dropzone axios react-redux redux redux-promise redux-thunk react-toastify bootstrap router-dom 




// import { useEffect, useState } from "react";
// import axios from 'axios'
// import SongForm from "./components/Songform";
// import Songs from "./components/song";
// import './App.css';


function App() {
  // const [songs,setSongs] = useState({})

  // const getAllSongs = async() => {
  //   try {
  //     const {data} = await axios.get(process.env.REACT_APP_API_URL + "/getsongs");
  //     getAllSongs(data.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   getAllSongs()
  // },[])
  return (
    <div>

    {/* <SongForm/>
    <div className='song_container'>
    {songs.map((song)=>(
      <Songs song={song} key={song._id} />
    ))}
    </div> */}


      <BrowserRouter>
   {/* <ToastContainer /> */}
   <Route path="/" exact component={LandingPage} />
   <Route path="/album list" exact component={Albumlist} />
   <Route path="/add" exact component={Addalbum} />
   <Route path="/upload/:name" exact component={UploadImage} />
   <Route path="/params/:name" exact component={Params} />
   <Route path="/arosh" exact component={AroshImage} />
   <Route path="/Register" exact component={Register} />
   <Route path="/login" exact component={Login} />
    </BrowserRouter> 
   </div>
  );
}

export default App;
