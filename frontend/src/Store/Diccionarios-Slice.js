import { createSlice } from '@reduxjs/toolkit';

let dataDictionaries = []

const DiccionariosState = createSlice({
    name : "diccionarios_state",
    initialState : {
        loadLocalState : "pending",
        diccionarios: dataDictionaries
    },
    reducers : {
        setLocalState(state, action){
            state.loadLocalState = action.payload.loadLocalState;
        },
        loadLocalDiccionaries(state, action){
            state.loadLocalState = action.payload.loadLocalState;
            state.diccionarios = action.payload.diccionarios;
        },
        agregarDiccionario(state, action){
            if(action.payload.diccionario !== undefined){
                state.diccionarios = [...state.diccionarios, action.payload.diccionario]
            }
        },
        eliminarDiccionario(state, action){
            return {
                ...state,
                diccionarios: state.diccionarios.filter((dic)=> dic.id !== action.payload)
            }
        },
        actualizarDiccionario(state, action){
            return {
                ...state,
                diccionarios: [...state.diccionarios.filter((dic)=> dic.id !== action.payload.dictID), action.payload.newDict]
            }
        },
        clearDiccionarios(state){
            state.diccionarios = []
        }
    }
})

const DiccionariosActions = DiccionariosState.actions;
export default DiccionariosActions ;

const DiccionariosReducer = DiccionariosState.reducer;
export { DiccionariosReducer };