import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from 'axios';


export default function ImageCard(props) {

    const {userData} = useContext(UserContext);
    let image = props.image
    const history = useHistory();

    const colorImage = async () => {
        if(!userData.token){
            history.push("/")
            return
        }  

        let newImage = {imageId : image.id};
        // console.log(newImage);

        const response = await axios.post(
            "http://localhost:5000/user_images/add", 
            newImage,
            {headers: {"x-auth-token": userData.token}},
          );
        //   console.log(response);
      } 

   
    return(
         <div className="image-card">
                 {/* <h4>{image.national_park} National Park</h4>
                 <img alt="national park" className="new-image" src={`https://color-by-nature-api.herokuapp.com${image.svg_url}`} />*/}
                <button onClick={colorImage}>Color Me!</button>
        </div>
    )
    

}