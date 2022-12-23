import { createSlice } from '@reduxjs/toolkit';

let initialSession = { 
    email : "",
    token : "",
    name : "",
    emailverification : ""
}

let initial = {}

if (localStorage.getItem("session")){
    initial = JSON.parse(localStorage.getItem("session"));
}else{
    initial = initialSession;
}

const SessionState = createSlice({
    name : "session_state",
    initialState : initial,
    reducers : {
        Login(state, action){
            localStorage.setItem("session", JSON.stringify(action.payload))
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.emailverification = action.payload.emailverification;
        },
        Logout(state){
            localStorage.setItem("session", JSON.stringify(initialSession))
            state.email = "";
            state.token = "";
            state.name = "";
            state.emailverification = "";
        },
        UpdateUser(state, action){
            state.name = action.payload.name;
            state.email = action.payload.email
        }
    }
})

const SessionActions = SessionState.actions;
export default SessionActions ;

const SessionReducer = SessionState.reducer;
export { SessionReducer };
