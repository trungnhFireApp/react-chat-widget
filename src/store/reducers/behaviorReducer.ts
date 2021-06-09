import { createReducer } from '../../utils/createReducer';
import { BehaviorState } from '../types';
import { CustomWidget } from '../customTypes';

import {
    BehaviorActions,
    TOGGLE_CHAT,
    TOGGLE_INPUT_DISABLED,
    TOGGLE_MESSAGE_LOADER,
    TOGGLE_WIDGET_LOADER,
    SET_CUSTOM_WIDGET
} from '../actions/types';

const initialState = {
    showChat: false,
    disabledInput: false,
    messageLoader: false,
    widgetLoader: false,
    customWidget: {} as CustomWidget
};

const behaviorReducer = {
    [TOGGLE_CHAT]: (state: BehaviorState) => ({
        ...state,
        showChat: !state.showChat
    }),

    [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) => ({
        ...state,
        disabledInput: !state.disabledInput
    }),

    [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState) => ({
        ...state,
        messageLoader: !state.messageLoader
    }),

    [TOGGLE_WIDGET_LOADER]: (state: BehaviorState) => ({
        ...state,
        widgetLoader: !state.widgetLoader
    }),

    [SET_CUSTOM_WIDGET]: (state: BehaviorState, { customWidget }) => ({
        ...state,
        customWidget: customWidget
    })
};

export default (state: BehaviorState = initialState, action: BehaviorActions) =>
    createReducer(behaviorReducer, state, action);
