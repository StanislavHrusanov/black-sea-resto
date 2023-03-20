// import { createContext, useEffect, useState } from "react";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import * as userProfileService from "../services/userProfileService";

// export const UserProfileContext = createContext();

// export const UserProfileProvider = ({ children }) => {
//     const [userProfile, setUserProfile] = useLocalStorage('userProfile', null);

//     const addUserProfile = (profile) => {
//         setUserProfile(profile);
//     }

//     const removeUserProfile = () => {
//         setUserProfile(null);
//     }

//     const addReviewToProfile = (review) => {
//         setUserProfile(state => ({
//             ...state,
//             myReviews: [...state.myReviews, review]
//         }));
//     }

//     const editReviewInProfile = (review, editedReview) => {
//         setUserProfile(state => ({
//             ...state,
//             myReviews: state.myReviews.map(x => x._id === review._id ? editedReview : x)
//         }));

//     }


//     return (
//         <UserProfileContext.Provider value={{
//             userProfile,
//             addUserProfile,
//             addReviewToProfile,
//             editReviewInProfile,
//             removeUserProfile
//         }}>
//             {children}
//         </UserProfileContext.Provider>
//     )
// }