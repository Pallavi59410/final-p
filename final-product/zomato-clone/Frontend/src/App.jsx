import { Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Restaurant from './Components/Restaurant';
import Search from './Components/Search';
import { BASE_URL } from "./Components/apiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {

  let getUserDetails = () => {
    let token = localStorage.getItem("zc_auth_token");
    if (token === null) {
      return null;
    } else {
      try {
        let data = jwt_decode(token);
        return data;
      } catch (error) {
        return null;
      }
    }
  };

  let [user, setUser] = useState(getUserDetails());
  let [locationList, setLocationList] = useState([]);
  let getLocationList = async () =>{
    try{
    let url = BASE_URL + 'get-location-list';

    let {data} = await axios.get(url);
    setLocationList(data.locationList);
  }catch (error){
    alert("server error");
  }

  };

  useEffect( () => {
    getLocationList();
    console.log(user);
  },[]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home locationList = {locationList} user={user} />}/>
      <Route path="/search/:id/:name" element={<Search locationList = {locationList} user={user} />}/>
      <Route path="/restaurant/:id" element={<Restaurant user={user} />}/>
   </Routes>
   </>
  );
}

export default App;
