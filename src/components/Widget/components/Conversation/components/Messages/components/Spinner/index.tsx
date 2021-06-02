import React from 'react';

import './styles.scss';

function Spinner() {
    return (
        <div className="lds-container">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;
