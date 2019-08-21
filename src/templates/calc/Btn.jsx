import React from 'react';

export default props => {
    return(
        <button onClick={e => props.click && props.click(props.v)} type="button">
            {props.v}
        </button>
    );
}
