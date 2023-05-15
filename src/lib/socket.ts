import { Logger } from './monitoring/logger.ts';

export class Socket {
    private socket: WebSocket;
    private socketConnecting: boolean;
    private socketConnected: boolean;

    public constructor() {

    }

    public async connect(): Promise<boolean> {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

        return new Promise((resolve, reject) => {
            if (this.socketConnecting) {
                reject(false);
            }

            if (this.socketConnected) {
                reject(false);
            }

            this.socketConnecting = true;

            this.socket = new WebSocket(`ws://localhost:8081/ws?token=${ token }`);

            this.socket.onopen = () => {
                this.socketConnecting = false;
                this.socketConnected = true;
                resolve(true);
            };

            this.socket.onclose = () => {
                this.socketConnecting = false;
                this.socketConnected = false;
            };

            this.socket.onmessage = (event: MessageEvent) => {
                console.log(event);
            };

        });
    }

    public send(str: string): void {
        Logger.debug(`Sending string of ${ str.length } bytes`, 'send()', 'Socket');
        this.socket.send(str);
    }
}
