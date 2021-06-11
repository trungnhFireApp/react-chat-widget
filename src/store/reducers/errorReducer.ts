import { createReducer } from '../../utils/createReducer';
import { SET_ERRORS, ErrorActions } from '../actions/types';
import { ErrorState, QuickButton } from '../types';

const initialState = {
    errors: []
};

const errorReducer = {
    [SET_ERRORS]: (state: ErrorState, { errors }) => ({
        ...state,
        errors: [...errors]
    })
};

export default (state = initialState, action: ErrorActions) =>
    createReducer(errorReducer, state, action);
