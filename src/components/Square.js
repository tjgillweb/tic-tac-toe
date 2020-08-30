import React from 'react';

const Square = (props) => {
    var styleClass = ''
    if(props.value){
        styleClass = 'square active'
        if(props.AI === props.value){
            styleClass += ' teal'
        }
        if((props.winnerLine).length !== 0){
            if(props.id === props.winnerLine[0] || props.id === props.winnerLine[1] || props.id === props.winnerLine[2])
            {
            styleClass += ' winnerLine'
            }
        }
    }
    else{
        styleClass = 'square'
    }
    return ( 
        <button id={props.id} className={styleClass} onClick={props.onClick}>
            {props.value}
        </button>
     );
}
 
export default Square;