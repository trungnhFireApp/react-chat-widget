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

    const handleInputChange = (type, value) => {
        dispatch(
            setAudienceInfo({
                ...audienceInfo,
                [type]: value
            })
        );
    };

    return (
        <div className="rcw-audience-form">
            <div className="rcw-audience-form_group">
                <input
                    className="rcw-audience-form_input"
                    placeholder="Anna Lip"
                    onChange={e => handleInputChange('name', e.target.value)}
                ></input>
            </div>
            <div className="rcw-audience-form_group">
                <input
                    className="rcw-audience-form_input"
                    placeholder="exame@email.com"
                    onChange={e => handleInputChange('email', e.target.value)}
                ></input>
            </div>
            <div className="rcw-audience-form_group">
                <input
                    className="rcw-audience-form_input"
                    placeholder="+01 3456870933"
                    onChange={e => handleInputChange('phone', e.target.value)}
                ></input>
            </div>
        </div>
    );
}

export default AudienceForm;
