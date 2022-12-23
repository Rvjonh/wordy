import { createSlice } from "@reduxjs/toolkit";

let initialNotifications = { 
    emailverification : ""
}

let initial = {}

if (localStorage.getItem("global_notifications")){
    initial = JSON.parse(localStorage.getItem("global_notifications"));
}else{
    initial = initialNotifications;
}

const GlobalNotifications = createSlice({
    name : "global_notifications",
    initialState : initial,
    reducers : {
        setEmailVerification(state, action){
            localStorage.setItem("global_notifications", JSON.stringify(action.payload))
            state.emailverification = action.payload.emailverification;
        },
        activateEmailVerification(state){
            localStorage.setItem("global_notifications", JSON.stringify({...initialNotifications, emailverification:true}))
            state.emailverification = true;
        },
        desactivateEmailVerification(state){
            localStorage.setItem("global_notifications", JSON.stringify(initialNotifications))
            state.emailverification = false;
        }
    }
})

const GlobalNotificationsActions = GlobalNotifications.actions;
export default GlobalNotificationsActions;

const GlobalNotificationsReducer = GlobalNotifications.reducer;
export { GlobalNotificationsReducer }