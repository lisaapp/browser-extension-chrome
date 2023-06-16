import { Frame } from './frame.ts';
import { Logger } from './monitoring/logger.ts';
import { Socket } from './socket.ts';

const log = (...args: any[]) => {
    chrome.runtime.sendMessage({
        type: 'LOG',
        data: args
    });
};

export class Recorder {
    private stream: MediaStream;
    private socket: Socket;
    

    public async start(stream: MediaStream): Promise<boolean> {
        this.stream = stream;
        log('Recorder started!', this.stream);

        const video = document.getElementById('video') as HTMLVideoElement;
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const countex = document.getElementById('countex') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        

        this.socket = new Socket();
        await this.socket.connect();

        const recorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=H264',
            videoBitsPerSecond: 8000000
        });
 
        recorder.ondataavailable = (e: BlobEvent) => {
            
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frame = new Frame({
                blob: e.data,
                data: canvas.toDataURL('image/jpeg'),
                timecode: e.timecode
            });
            Logger.debug(`Generated new Frame() from MediaStream blob @ ${ frame.timecode } with ${ frame.data.length } bytes!`, 'recorder.ondataavailable', 'Recorder');
            console.log(``);
            this.socket.send(frame.toSocketMessage());
        };

        recorder.onstart = (event: Event) => {
            console.log(event);
        };

        recorder.start(1000 / 30);

        return true;
    }
}
