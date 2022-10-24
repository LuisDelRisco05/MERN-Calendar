import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {

            
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent( { ...calendarEvent, user } ) );

                return;
            } 

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventDB.id, user }) );
            
        } catch (error) {
            console.log("🚀 ~ file: useCalendarStore.js ~ line 36 ~ startSavingEvent ~ error", error)
            Swal.fire('Failed to save', error.response.data.msg, 'error')
        }
        
        
    };

    const startDeleteEvent = async() => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);

            dispatch( onDeleteEvent() )
        } catch (error) {
            console.log("🚀 ~ file: useCalendarStore.js ~ line 50 ~ startDeleteEvent ~ error", error)
            Swal.fire('Failed to delete', error.response.data.msg, 'error')
        }
    };

    const startLoadingEvents = async() => {

        try {

            const { data } = await calendarApi.get('/events');

            const eventsDate = convertEventsToDateEvents( data.events );

            dispatch( onLoadEvent( eventsDate ) );
            
            
        } catch (error) {
            console.log("🚀 ~ file: useCalendarStore.js ~ line 52 ~ startLoadingEvents ~ error", error)
            
        }

    }

    return {
        //* Propiedades
        events,
        activeEvent,

        //* Métodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }
}