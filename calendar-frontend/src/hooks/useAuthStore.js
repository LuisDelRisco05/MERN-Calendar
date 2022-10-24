/*useAuthStore tiene como objetivo realizar cualquier interacción con la parte del auth en el store */

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onChecking, onLogin, onLogout, onClearErrorMessage, onLogoutCalendar } from '../store';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch();


    const startLogin = async({ email, password }) => {
    
        dispatch( onChecking() )

        try {
            
            const { data } = await calendarApi.post('/auth', { email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLogin({ name:data.name, uid:data.uid }) )

        } catch (error) {
            dispatch( onLogout('Invalid credentials') );

            setTimeout(() => {
                dispatch( onClearErrorMessage() )
            }, 1000);
            
        }

    };

    // startRegister
    const startRegister = async({ name, email, password }) => {
    
        dispatch( onChecking() )

        try {
            
            const { data } = await calendarApi.post('/auth/new', { name, email, password });

            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--') );

            setTimeout(() => {
                dispatch( onClearErrorMessage() )
            }, 1000);
            
        }

    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );
        

        try {
            const { data } = await calendarApi.get('auth/renew');


            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch( onLogout('Token expired') )
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch( onLogoutCalendar());

    }


    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos, van a ser acciones que van a poder llamar e interactuar con nuestro store
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}