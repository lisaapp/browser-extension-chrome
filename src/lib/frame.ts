export class Frame {
    public blob: Blob;
    public timecode: number;
    public data?: string;

    public constructor(obj: any) {
        Object.assign(this, obj);
    }

    public toSocketMessage(): string {
        return JSON.stringify({
            data: this.data,
            timecode: this.timecode
        });
    }
}
