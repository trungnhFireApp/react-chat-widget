import { combineReducers } from 'redux';

import conversation from './reducers/conversationReducer';
import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';

const rootReducer = () => combineReducers({ conversation, behavior, messages });

export default rootReducer;
