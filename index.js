import ConnectedWidget from './src';
import {
    addUserMessage,
    addResponseMessage,
    unshiftUserMessage,
    unshiftResponseMessage,
    addLinkSnippet,
    renderCustomComponent,
    toggleWidget,
    toggleInputDisabled,
    toggleMsgLoader,
    toggleWidgetLoader,
    dropMessages,
    isWidgetOpened,
    setQuickButtons,
    deleteMessages,
    markAllAsRead,
    markMessageRead,
    setBadgeCount
} from './src/store/dispatcher';

export {
    ConnectedWidget as Widget,
    addUserMessage,
    addResponseMessage,
    unshiftUserMessage,
    unshiftResponseMessage,
    addLinkSnippet,
    renderCustomComponent,
    toggleWidget,
    toggleInputDisabled,
    toggleMsgLoader,
    toggleWidgetLoader,
    dropMessages,
    isWidgetOpened,
    setQuickButtons,
    deleteMessages,
    markAllAsRead,
    markMessageRead,
    setBadgeCount
};
