import React from 'react';

const ChoosePlayer = ({handlePlayerSelection}) => {

    return ( 
        <div className="choosePlayer">
            <p>Choose Player</p>
            <div className="players">
                <div onClick={handlePlayerSelection.bind(this,"X")}>X</div>
                <div onClick={handlePlayerSelection.bind(this,"O")}>O</div>
            </div>
        </div>
     );
}
 
export default ChoosePlayer;