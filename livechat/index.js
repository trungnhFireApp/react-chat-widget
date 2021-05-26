import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './main';

const initMsLiveChat = options => (function(options) {
    const div = document.createElement('div')
    div.id = 'ms-live-chat';
    document.body.appendChild(div)
    ReactDOM.render(<App />, document.getElementById(div.id));
})(options);

initMsLiveChat();