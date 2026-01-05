import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { getServicesDataAction } from '../../../store/action/ServiceEngAction';

function SupportCalender() {
    const [value, setValue] = useState(new Date());
    const [isCalendarClicked, setIsCalendarClicked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCalendarClicked) {
            console.log('123');
            const date = new Date(value);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

            // Dispatch the action with the formatted date
            dispatch(getServicesDataAction(formattedDate));
        }
    }, [value, dispatch, isCalendarClicked]); // Depend on value, dispatch, and the click flag

    const handleCalendarChange = (newValue) => {
        setValue(newValue); // Update the state
        setIsCalendarClicked(true); // Mark that the calendar was clicked
    };

    const handleClear = (e) => {
        e.preventDefault();
        let search = '';
        let filter = 'All';
        dispatch(getServicesDataAction(search, filter));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', marginTop: '-30px' }}>
            <button onClick={handleClear} style={{ cursor: 'pointer', backgroundColor: '#98004c', color: 'white', display: 'inline', width: '50px', height: '40px', borderRadius: '10px' }}>clear</button>
            <Calendar onChange={handleCalendarChange} value={value} className='border-0' />
        </div>
    );
}

export default SupportCalender;
