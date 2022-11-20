import React, { useState, useEffect, useRef } from 'react';
import usePhotoStore from './usePhotoStore';


function PhotoAlbumForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.text : '');
  const [inputURL, setInputURL] = usePhotoStore((state) => [
    state.photoURL,
    state.setPhotoURL,
  ]);
  if(props.edit){
    setInputURL(props.edit.value);
  }

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleChangeURL = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // Base64 Data URL 👇
      console.log(reader.result);
      setInputURL(reader.result);
    });

    reader.readAsDataURL(file);
    
  };
  useEffect(() => {
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      URL: inputURL
    });
    setInput('');
  },[inputURL])
  

  return (
    <form className='todo-form photo-form' autoComplete='off'>
      {props.edit ? (
        <>
          <label htmlFor="upload-image">
            <span className='todo-button span-button'>Update</span>
          </label>
          <input 
            id="upload-image" 
            type="file" 
            accept="image/*" 
            placeholder="" 
            name='URL'
            ref={inputRef}
            onChange={handleChangeURL} 
            className="getImg" 
          />
        </>
      ) : (
        <>
          <input
            placeholder='Add a Label'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <label htmlFor="upload-image">
            <span src="" alt="" className='todo-button span-button'>Upload</span>
          </label>
          <input 
            id="upload-image" 
            type="file" 
            accept="image/*" 
            placeholder="" 
            name='URL'
            onChange={handleChangeURL} 
            className="getImg" 
          />
        </>
      )}
    </form>
  );
}

export default PhotoAlbumForm;