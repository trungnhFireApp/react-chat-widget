import { load } from 'dotenv';
import React from 'react';

import './styles.scss';

type Props = {
    loading: boolean;
};

function Spinner({ loading }: Props) {
    return (
        <div className={`lds-container ${loading ? 'active' : ''}`}>
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
