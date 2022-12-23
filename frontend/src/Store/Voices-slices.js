import { createSlice } from "@reduxjs/toolkit";

let initialNotifications = {}

let initial = {}

if (localStorage.getItem("voices_idiomas")){
    initial = JSON.parse(localStorage.getItem("voices_idiomas"));
}else{
    initial = initialNotifications;
}

const VoicesIdiomas = createSlice({
    name : "voices_idiomas",
    initialState : initial,
    reducers : {
        setVoices(state, action){
            localStorage.setItem("voices_idiomas", JSON.stringify({...state,
                                                                    [action.payload.language]: action.payload.name
                                                                }))
            return {
                ...state,
                [action.payload.language]: action.payload.name
            }
        },
    }
})

const VoicesIdiomasActions = VoicesIdiomas.actions;
export default VoicesIdiomasActions;

const VoicesIdiomasReducer = VoicesIdiomas.reducer;
export { VoicesIdiomasReducer }