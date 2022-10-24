import { useCalendarStore } from '../../hooks';
import '../calendar.css';

export const FabDelete = () => {

  

  const { startDeleteEvent } = useCalendarStore();

  const handleClickDelete = () => {
    startDeleteEvent();
  };


  return (
    <button
        className="btn btn-danger bg-gradient fab-delete"
        onClick={ handleClickDelete }
    >
        <i className="fa fa-trash-alt" ></i>
    </button>
  )
}
