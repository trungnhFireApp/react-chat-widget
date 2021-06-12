import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GlobalState } from 'src/store/types';

import './style.scss';
import { AUDIENCE_FORM_REQUIRE_WHEN } from './../../../../../../../../constants';
import { AnyFunction } from 'src/utils/types';

type Props = {
    handleGetAudience: AnyFunction;
};

function AudienceForm({ handleGetAudience }: Props) {
    const {
        customWidget: {
            behaviour: {
                visitor: {
                    require_information: { fields, when }
                }
            }
        }
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
    }));

    const [audienceInfo, setAudienceInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [error, setError] = useState({
        name: {
            inValid: false,
            errMes: []
        },
        email: {
            inValid: false,
            errMes: []
        },
        phone: {
            inValid: false,
            errMes: []
        }
    });

    const handleInputChange = (type, value) => {
        setAudienceInfo({
            ...audienceInfo,
            [type]: value
        });
    };

    const checkRequire = (key, value) => {
        return fields[key] && !value?.trim();
    };

    const validate = () => {
        let valid = true;
        let tmpError = { ...error };
        for (let key in tmpError) {
            tmpError[key] = {
                ...tmpError[key],
                inValid: checkRequire(key, audienceInfo[key])
            };
        }

        valid =
            Object.keys(tmpError).filter(key => tmpError[key].inValid).length <=
            0;

        setError(tmpError);
        return valid;
    };

    const handleSubmit = () => {
        if (when.value === AUDIENCE_FORM_REQUIRE_WHEN.ALWAYS && validate()) {
            handleGetAudience({
                ...audienceInfo
            });
        }
    };

    return (
        <div className="rcw-audience-form">
            {fields.name && (
                <div className="rcw-audience-form_group">
                    <input
                        className={`rcw-audience-form_input ${
                            error.name.inValid ? '--invalid' : ''
                        }`}
                        placeholder="Anna Lip"
                        onChange={e =>
                            handleInputChange('name', e.target.value)
                        }
                    ></input>
                </div>
            )}
            {fields.email && (
                <div className="rcw-audience-form_group">
                    <input
                        className={`rcw-audience-form_input ${
                            error.email.inValid ? '--invalid' : ''
                        }`}
                        placeholder="exame@email.com"
                        onChange={e =>
                            handleInputChange('email', e.target.value)
                        }
                    ></input>
                </div>
            )}
            {fields.phone && (
                <div className="rcw-audience-form_group">
                    <input
                        className={`rcw-audience-form_input ${
                            error.phone.inValid ? '--invalid' : ''
                        }`}
                        placeholder="+01 3456870933"
                        onChange={e =>
                            handleInputChange('phone', e.target.value)
                        }
                    ></input>
                </div>
            )}
            <div className="rcw-audience-form_group rcw-mb-0 rcw-text-right">
                <button
                    onClick={handleSubmit}
                    className="rcw-audience-form_button"
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="20"
                            cy="20"
                            r="19.5"
                            fill="white"
                            stroke="#1C82FF"
                        />
                        <path
                            d="M11.4 28.4L28.85 20.92C29.66 20.57 29.66 19.43 28.85 19.08L11.4 11.6C10.74 11.31 10.01 11.8 10.01 12.51L10 17.12C10 17.62 10.37 18.05 10.87 18.11L25 20L10.87 21.88C10.37 21.95 10 22.38 10 22.88L10.01 27.49C10.01 28.2 10.74 28.69 11.4 28.4Z"
                            fill="#1C82FF"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default AudienceForm;
