import { createReducer } from '../../utils/createReducer';
import { AudienceInfo, AudienceState } from '../types';

import {
    AudienceActions,
    SET_AUDIENCE_INFO,
    VALIDATE_AUDIENCE_INFO
} from '../actions/types';

const initialState = {
    audienceInfo: {
        name: '',
        phone: '',
        email: ''
    },
    audienceInfoError: {
        name: {
            isValid: false,
            errMes: []
        },
        email: {
            isValid: false,
            errMes: []
        },
        phone: {
            isValid: false,
            errMes: []
        }
    }
};

const audienceReducer = {
    [SET_AUDIENCE_INFO]: (state: AudienceState, { audienceInfo }) => ({
        ...state,
        audienceInfo: { ...audienceInfo }
    }),
    [VALIDATE_AUDIENCE_INFO]: (
        state: AudienceState,
        { audienceInfoError }
    ) => ({
        ...state,
        audienceInfoError: { ...audienceInfoError }
    })
};

export default (state: AudienceState = initialState, action: AudienceActions) =>
    createReducer(audienceReducer, state, action);
