import "./DateInputField.css"
import React from "react";

interface DateInputFieldProps {
    label: string;
    placeholder: string
    updateFieldCallback:  React.Dispatch<React.SetStateAction<number | undefined>>
    error: boolean
}

const DateInputField = (props: DateInputFieldProps) => {
    const { label, placeholder, updateFieldCallback, error } = props;

    return (
        <div className='date-input-container'>
            <div className="date-input-field-label">{label}</div>
            <input type="text" placeholder={placeholder} className={`date-input-field ${error && 'date-input-error'}`} id="day-input" onChange={(v) => updateFieldCallback(parseInt(v.target.value))}/>
        </div>
    )
}

export default DateInputField;