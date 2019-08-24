import React from 'react';
import './Btn.css';

export default props => {
    return(
        <button onClick={e => props.click && props.click(props.v)} className={`button ${props.double? 'double': ''}`} type="button">
            {props.v}
        </button>
    );
}
