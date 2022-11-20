import create from "zustand";

export default create((set) => ({
  UserPic: null,
  UserName: null,
  UserEmail: null,
  UserPhone: null,
  UserBio: null,
  UserState: false,
  EditState: false,
  SaveState: false,


//   toggleEditDetailsSelection: () =>
//     set((state) => {
//       return {
//         isEditDetailsSelected: !state.isEditDetailsSelected,
//       };
//     }),

    saveUserName: (name) =>
        set(() => {
        return {
            UserName: name,
        };
    }),

    saveUserEmail: (email) =>
        set(() => {
        return {
            UserEmail: email,
        };
    }),

    saveUserPhone: (phone) =>
        set(() => {
        return {
            UserPhone: phone,
        };
    }),

    saveUserBio: (bio) =>
        set(() => {
        return {
            UserBio: bio,
        };
    }),

    saveUserPic: (imageUrl) =>
        set(() => {
        return {
            UserPic: imageUrl,
        };
    }),

    changeLoginStatus: (changeState) =>
        set(() => {
        return {
            UserState: changeState,
        };
    }),
    changeEditStatus: (EditOn) =>
        set(() => {
        return {
            EditState: EditOn,
        };
    }),

}));