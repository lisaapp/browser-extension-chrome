import { Logger } from './monitoring/logger.ts';
import { Recorder } from './recorder.ts';

if (chrome.tabCapture) {
    chrome.tabCapture.capture({
        video: true,
        audio: false,
        videoConstraints: {
            mandatory: {
                minFrameRate: 10,
                maxFrameRate: 30,
                // Limit to a max of 2160p (4k) resolution:
                maxWidth: 3840,
                maxHeight: 2160
            }
        }
    }, stream => {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
        }
        Logger.debug('Captured stream!', 'popup.ts', 'popup');

        const video = document.getElementById('video') as HTMLVideoElement;
        video.srcObject = stream;
        video.play();

        const recorder = new Recorder();
        recorder.start(stream);
    });
}
