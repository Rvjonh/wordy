import { createSlice } from "@reduxjs/toolkit";

const ITEM_LOCAL = "practice-configuration"

let initialConfiguration = { 
    ask : false,
    exercices : [{
                    type:"ESCRIBIR",
                    value : true,
                },
                {
                    type:"LECTURA",
                    value : true
                },
                {
                    type:"ESCUCHAR",
                    value : true
                },
                {
                    type:"PRONUNCIACION",
                    value : true
                }],
    numeroWords : 3,
    helper : true
}

let initial = {}

if (localStorage.getItem(ITEM_LOCAL)){
    initial = JSON.parse(localStorage.getItem(ITEM_LOCAL));
}else{
    initial = initialConfiguration;
}

const PracticeConfiguration = createSlice({
    name : "practice_configuration",
    initialState : initial,
    reducers : {
        setExercicesState(state, action){
            localStorage.setItem(ITEM_LOCAL, JSON.stringify(action.payload))
            return {...action.payload};
        },
        setHelper(state, action){
            state.helper = action.payload
        }
    }
})

const PracticeConfigurationActions = PracticeConfiguration.actions;
export default PracticeConfigurationActions;

const PracticeConfigurationReducer = PracticeConfiguration.reducer;
export { PracticeConfigurationReducer }