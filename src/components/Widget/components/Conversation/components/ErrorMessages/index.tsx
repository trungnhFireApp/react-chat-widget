import { GlobalState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

function ErrorMessages() {
    const { errors } = useSelector((state: GlobalState) => ({
        errors: state.error.errors
    }));
    return (
        <div className="rcw-err">
            {errors.length > 0 &&
                errors.map((p, index) => (
                    <div key={index} className="rcw-err-item">
                        {p}
                    </div>
                ))}
        </div>
    );
}

export default ErrorMessages;
