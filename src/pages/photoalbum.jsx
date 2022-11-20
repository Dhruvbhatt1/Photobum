import React,{useState} from 'react'
import PhotoAlbumForm from './photoablumform';
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'


function PhotoAlbum({photos, removePhoto, updatePhoto}) {
    const [edit, setEdit] = useState({
        id:null,
        value: '',
        URL: '',
    })

    const submitUpdate = (value, URL) => {
        updatePhoto(edit.id, value, URL);
        setEdit({
            id: null,
            value: '',
            URL: '',
        })
    }

    if(edit.id){
        return <PhotoAlbumForm edit={edit} onSubmit = {submitUpdate} />;
    }

    const uploadImage = ( event, photo ) => {
        setEdit({id: photo.id, text: photo.text, value: URL.createObjectURL(event.target.files[0])})
        console.log(photo);
    }


  return (
    <div className='photos-display-continer'>
        {photos.map((photo, index) => (
            <div className="photo-container" key={index}>
                <label htmlFor='photos-label'>
                    <img className="photos-display" src={photo.URL} alt="" key={photo.id}/>
                </label>
                <input id="photos-label" type="file" accept="image/*" placeholder="" onChange={(event) => uploadImage(event, photo)} className="getImg" />
                <div className='photo-icons'>
                    <RiCloseCircleLine 
                    onClick ={()=> removePhoto(photo.id)}
                    className='delete-icon'
                    />
                    <span className='photo-text'>{photo.text}</span>
                </div>
            </div>
        ))}
  </div>
  )
}

export default PhotoAlbum