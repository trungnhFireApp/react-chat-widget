import { createReducer } from '../../utils/createReducer';
import { AudienceInfo, AudienceState } from '../types';

import { AudienceActions, SET_AUDIENCE_INFO } from '../actions/types';

const initialState = {
    audienceInfo: {
        name: '',
        phone: '',
        email: ''
    }
};

const audienceReducer = {
    [SET_AUDIENCE_INFO]: (state: AudienceState, { audienceInfo }) => ({
        ...state,
        audienceInfo: { ...audienceInfo }
    })
};

export default (state: AudienceState = initialState, action: AudienceActions) =>
    createReducer(audienceReducer, state, action);
