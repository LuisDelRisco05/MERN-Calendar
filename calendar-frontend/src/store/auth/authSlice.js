import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
       status: 'checking', //'authenticated', 'not-authenticated'
       user: {},
       errorMessage: undefined
    },
    reducers: { // los reducer el objetivo es generar un nuevo state, gracias al toolkit podemos hacer code mutante
        onChecking: state => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload
        },
        onClearErrorMessage: state => {
            state.errorMessage = undefined;
        }
    }
});


export const { 
    onChecking, 
    onClearErrorMessage, 
    onLogin, 
    onLogout, 
} = authSlice.actions;