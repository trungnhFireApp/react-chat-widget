import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAudienceInfo } from '../../../../../../store/actions';

import { GlobalState } from 'src/store/types';

import './style.scss';

function AudienceForm() {
    const dispatch = useDispatch();
    const {
        customWidget: {
            behaviour: {
                visitor: {
                    require_information: {
                        fields: { email, name, phone }
                    }
                }
            }
        },
        audienceInfo
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget,
        audienceInfo: state.audience.audienceInfo
    }));

    const [error, setError] = useState({
        name: false,
        email: false,
        phone: false
    });

    const handleInputChange = (type, value) => {
        dispatch(
            setAudienceInfo({
                ...audienceInfo,
                [type]: value
            })
        );
    };

    const validate = () => {
        let valid = false;

        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
        }
    };

    return (
        <div className="rcw-audience-form">
            <div className="rcw-audience-form_group">
                <input
                    className={`rcw-audience-form_input ${
                        error.name ? '--invalid' : ''
                    }`}
                    placeholder="Anna Lip"
                    onChange={e => handleInputChange('name', e.target.value)}
                ></input>
            </div>
            <div className="rcw-audience-form_group">
                <input
                    className={`rcw-audience-form_input ${
                        error.email ? '--invalid' : ''
                    }`}
                    placeholder="exame@email.com"
                    onChange={e => handleInputChange('email', e.target.value)}
                ></input>
            </div>
            <div className="rcw-audience-form_group">
                <input
                    className={`rcw-audience-form_input ${
                        error.phone ? '--invalid' : ''
                    }`}
                    placeholder="+01 3456870933"
                    onChange={e => handleInputChange('phone', e.target.value)}
                ></input>
            </div>
            <div className="rcw-audience-form_group">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default AudienceForm;
