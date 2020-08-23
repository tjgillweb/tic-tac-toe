import React from 'react';

const Square = (props) => {
    var styleClass = ''
    if(props.value){
        styleClass = 'square active'
        if(props.AI === props.value){
            styleClass += ' teal'
        }
    }
    else{
        styleClass = 'square'
    }
    return ( 
        <button className="square" className={styleClass} onClick={props.onClick}>
            {props.value}
        </button>
     );
}
 
export default Square;