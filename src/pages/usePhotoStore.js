import create from "zustand";

export default create((set) => ({
  addNewPhoto: false,
  photoURL: null,

    setAddNewPhoto: (state) =>
        set(() => {
        return {
            addNewPhoto: state,
        };
    }),

    setPhotoURL: (state) =>
        set(() => {
        return {
            photoURL: state,
        };
    }),


}));