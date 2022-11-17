import React from 'react'
import { useState } from 'react';
import axios from 'axios';


function Dashbroad() {

  const [searchField, setSearchField] = useState("");
  const [images, setImages] = useState([]);

  const find = (query) => {
    axios.get(`http://localhost:5000/api/user/search/photos?tags=${query}`)
      .then(response => {
        console.log("imagesData" , response.data);
        setImages(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
    const onChangeSearchName = e => {
      console.log(e.target.value);
        const searchField = e.target.value;
        setSearchField(searchField);
    };
    
    const findByName = () => {
      find(searchField)
    };
  
  return (
    <div>
      <div class="container">
        <input class="ui-input" type="text" placeholder="Search Flickr for Photos..." value={searchField} onChange={onChangeSearchName}></input>
        <button className="btn" type="button" onClick={findByName}>
              Search
            </button>
      </div>
      <div class="image-container">
      {images && images.map((img) => {
           return <img class="singleImage" alt="" src={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}></img> })}
      </div>
         
    </div>
    
  )
}

export default Dashbroad;