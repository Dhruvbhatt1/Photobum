import React, { useState, useEffect, useRef } from 'react';

function PhotoAlbumsearch(props) {

  const {oldPhotos, photos, setPhotos} = {...props};

  const onChange = (e) => {
    if(e.target.value == ""){
      setPhotos(oldPhotos);
      console.log(oldPhotos)
    }
    else{
      const filteredPhotos = photos.filter(photo => photo.text.toLowerCase().startsWith(e.target.value));
      setPhotos(filteredPhotos);
    }
  }


  return (
    <form className='todo-form' autoComplete='off'>
      <input 
        id="search-image"  
        placeholder="Search Image" 
        name='text'
        className="todo-input photo-search" 
        onChange={onChange}
      />
    </form>
  );
}

export default PhotoAlbumsearch;