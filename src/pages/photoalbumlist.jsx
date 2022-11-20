import React, { useState, useEffect } from "react";
import PhotoAlbumForm from './photoablumform';
import PhotoAlbum from './photoalbum';
import { updateProfile, getAuth } from "firebase/auth";
import { ref, getDatabase, child, push, update, set, remove, get } from "firebase/database";
import Tabs from "./tabs";
import PhotoAlbumsearch from "./photoalbumsearch";
import usePhotoStore from "./usePhotoStore";


function PhotoAlbumList() {

    const [photos, setPhotos] = useState([]);
    const [oldPhotos, setOldPhotos] = useState([])
    const [didFetch, setFetch] = useState(false);
    const [addNewPhoto, setAddNewPhoto] = usePhotoStore((state) => [
        state.addNewPhoto,
        state.setAddNewPhoto,
    ]);
    const auth = getAuth();
    const user = auth.currentUser;

    const addPhoto = photo => {
        if(!photo.text || /^\s*$/.test(photo.text)){
            return;
        }
        writeData(photo);
        const newPhotos = [photo, ...photos];
        setPhotos(newPhotos);
        setOldPhotos(newPhotos);
    };

    const updatePhoto = (photoId, newValue) => {
        if(!newValue.URL || /^\s*$/.test(newValue.URL)){
            return;
        }
        newValue.id = photoId
        setPhotos(prev => prev.map(item => (item.id === photoId ? newValue : item)));
        setOldPhotos(prev => prev.map(item => (item.id === photoId ? newValue : item)));
        updateData(newValue)
    };

    const removePhoto = id => {
        const removeArr = [...photos].filter(photo => photo.id !== id)
        const removedPhoto = photos.filter(photo => photo.id == id)
        // URL.revokeObjectURL(removedPhoto.URL)
        setPhotos(removeArr)
        setOldPhotos(removeArr)
        removeData(id)
    };

    const writeData = (photo) => {
        const db = getDatabase();   
      
        return set(ref(db, "User/"+user.uid+"/PhotoAlbum/"+photo.id), {
            id: photo.id,
            text: photo.text,
            URL: photo.URL,
        });
    }
    const updateData = (photo) => {
        const db = getDatabase();   
      
        return update(ref(db, "User/"+user.uid+"/PhotoAlbum/"+photo.id), {
          id: photo.id,
          text: photo.text,
          URL: photo.URL,
        });
    }
    const removeData = (id) => {
        const db = getDatabase();
        remove(ref(db, "User/"+user.uid+"/PhotoAlbum/"+id))
    }
    const getData = async () => {
        const db = getDatabase();   
      
        await get(child(ref(db), `User/${user.uid}/PhotoAlbum/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const photos = Object.values(snapshot.val()).map((photo) => {
                    return ({
                        id: photo.id,
                        text: photo.text,
                        URL: photo.URL,
                    })
                })
                setPhotos(photos)
                setOldPhotos(photos)
            }
        })
    }
    if(didFetch == false){
        setFetch(true)
        getData()
    }
    const changePhotoState = () => {
        setAddNewPhoto(!addNewPhoto);        
    }

  return (
    <div className='photo-body'>
        <button className="add-photo-btn" onClick={() => changePhotoState()}>{addNewPhoto ? "Search Photo" : "Add Photo"}</button>
        {addNewPhoto == true ? (
            <PhotoAlbumForm onSubmit={addPhoto} />
        ) : (
            <PhotoAlbumsearch oldPhotos={oldPhotos} photos={photos} setPhotos={setPhotos} />
        )}       
        <div className='photos-ctn'>
            <PhotoAlbum 
                photos={photos}  
                removePhoto = {removePhoto} 
                updatePhoto= {updatePhoto}
            />
        </div>
    </div>
  );
}

export default PhotoAlbumList; 