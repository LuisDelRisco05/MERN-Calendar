import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import '../calendar.css';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();

    const { setActiveEvent } = useCalendarStore();

    const handleClick = () => {

        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2),
            bgColor: '#fafafa',
            user: {
              _id: '123',
              name: 'Liam'
            }
        })

        openDateModal();
        
    }


  return (
    <button
        className="btn btn-primary bg-gradient fab"
        onClick={ handleClick }
    >
        <i className="fa fa-plus" ></i>
    </button>
  )
}
