import { defineStore } from 'pinia';
import { Status } from '../lib/status.ts';

export interface SocketState {
    socket: Status;
    recorder: Status;
}

export interface StateStore {

}

export const useSocketStore = defineStore('socket', {
    state: () => {
        return {
            socket: Status.DISCONNECTED,
            recorder: Status.DISCONNECTED
        };
    },
    actions: {
        setSocketStatus(status: Status) {
            this.socket = status;
        },
        setRecorderStatus(status: Status) {
            this.recorder = status;
        }
    }
});
