import { BrowserMessage, BrowserMessageType } from './browser/message.ts';

console.log('background.ts loaded');
chrome.runtime.onMessage.addListener(async function (message: BrowserMessage<any>) {
    if (message.type === BrowserMessageType.NEW_FRAME) {
        console.log('new frame', message);
    } else if (message.type === BrowserMessageType.LOG) {
        console.log(message);
    }
});
