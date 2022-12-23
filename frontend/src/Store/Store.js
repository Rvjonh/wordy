import { configureStore } from '@reduxjs/toolkit';
import { SessionReducer } from './Session-Slice';
import { GlobalNotificationsReducer } from './GlobalNotification-Slice';
import { DiccionariosReducer } from './Diccionarios-Slice';
import { PracticeConfigurationReducer } from './Practice-slice';
import { VoicesIdiomasReducer } from './Voices-slices';

const STORE = configureStore({
    reducer : {
        session : SessionReducer,
        notifications : GlobalNotificationsReducer,
        diccionarios : DiccionariosReducer,
        practiceConfi : PracticeConfigurationReducer,
        voices : VoicesIdiomasReducer
    }
})

export default STORE;