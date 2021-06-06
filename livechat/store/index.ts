import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

import './windowProp';

const store = createStore(rootReducer(), undefined, applyMiddleware(thunk));
export default store;
