import Tab = chrome.tabs.Tab;

export enum BrowserMessageType {
    GET_ACTIVE_TAB = 'GET_ACTIVE_TAB',
    STREAM_ID = 'STREAM_ID',
    STREAM_IDENTIFIED = 'STREAM_IDENTIFIED',
    CREATE_TAB = 'CREATE_TAB',
    START_CAPTURE = 'START_CAPTURE',
    START_RECORDING = 'START_RECORDING',
    STOP_RECORDING = 'STOP_RECORDING',
    NEW_FRAME = 'NEW_FRAME',
    LOG = 'LOG'
}

export interface BrowserMessage<T> {
    type: BrowserMessageType;
    data?: T;
}

export interface BrowserActiveTab {
    tab: Tab;
}
