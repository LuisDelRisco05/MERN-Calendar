import { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPages = () => {
  const { user } = useAuthStore();

  const { events, activeEvent, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const { openDateModal } = useUiStore();   

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event ) => {

    // console.log("🚀 ~ file: CalendarPages.jsx ~ line 23 ~ eventStyleGetter ~ event", event);
    // console.log("🚀 ~ file: CalendarPages.jsx ~ line 24 ~ eventStyleGetter ~ event", user);
    

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      background: isMyEvent ? '#347CF7' : '#483D8B',
      borderRadius: '0px',
      opacity: isMyEvent ? 1 : 0.7,
      color: 'white',
      zIndex: isMyEvent ? 5 : 1,
    }

    return {
      style
    }
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event )
  };

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ openDateModal }
        onSelectEvent= { e => setActiveEvent( e ) }
        onView={ onViewChanged }
      />

      <FabAddNew />
      { activeEvent &&  <FabDelete />}

      <CalendarModal />

    </>
  )
}
