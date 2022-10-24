import { useState } from 'react';

import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../calendar.css';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useMemo } from 'react';

import { useCalendarStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { closeDateModal } = useUiStore();  

    const { isDateModalOpen } = useUiStore();    

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const { activeEvent, startSavingEvent } = useCalendarStore();

    

    const [ formValues, setFormValues ] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours ( new Date(), 2 )
    });

    const { title, notes, start, end } = formValues;

    const titleClass = useMemo(() => {

        if( !formSubmitted ) return '';

        return ( title.length > 0 )
            ? ''
            : 'is-invalid'

    }, [ title, formSubmitted ]);

    useEffect(() => {

        if( activeEvent !== null ){
            setFormValues({...activeEvent})
        }

        // const { title, notes, start, end } = activeEvent ;
    }, [activeEvent])
    

    // const onCloseModal = () => {
    //     console.log('cerrando.. modal');
    // };

    const handleChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const handleDateChange = ( e, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: e
        })
    };

    const onSubmit = async( e )=> {
        e.preventDefault();

        setFormSubmitted(true);

        const difference = differenceInSeconds( end, start); // el de la izquierda se espera que sea mas grande que el de la derecha

        if( isNaN( difference ) || difference <= 0 ){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas', 'error');
            return;
        };

        if( title.length <= 0 ) return;

   
        console.log("🚀 ~ file: CalendarModal.jsx ~ line 104 ~ onSubmit ~ formValues", formValues)

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ closeDateModal }
        style={ customStyles }
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form onSubmit={ onSubmit } className="container">

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker
                    selected={ start }
                    className="form-control"
                    onChange={ e => handleDateChange( e, 'start' ) }
                    dateFormat="Pp"
                    showTimeSelect
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker
                    minDate={ start }
                    selected={ end }
                    className="form-control"
                    onChange={ e => handleDateChange( e, 'end' ) }
                    dateFormat="Pp"
                    showTimeSelect
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${ titleClass }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={ handleChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
