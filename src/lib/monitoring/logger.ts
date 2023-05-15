export enum LoggerLevel {
    INFO = 'INFO',
    DEBUG = 'DEBUG',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

export class Logger {
    public static styles = {
        [LoggerLevel.INFO]: 'color: gray',
        [LoggerLevel.DEBUG]: 'color: orange',
        [LoggerLevel.WARN]: 'color: hotpink',
        [LoggerLevel.ERROR]: 'color: red'
    };

    public static log(level: LoggerLevel, message: any, context?: string, scope?: string): void {
        // eslint-disable-next-line no-console
        console.log(
            `%c${ level }%c${ scope || '...' }%c${ context }%c${ typeof message === 'object' ? JSON.stringify(message) : message }`,
            `
                padding: 2px;
                background-color: black;
                font-weight: bold;
                ${ Logger.styles[level] };
            `,
            `
                padding: 2px;
                background-color: black;
                // font-weight: bold;
                color: yellow
            `,
            `
                padding: 2px;
                background-color: black;
                // font-weight: bold;
                color: cyan
            `,
            `
                padding: 2px;
                background-color: black;
            `
        );
    }

    public static info(message: any, context?: string): void {
        Logger.log(LoggerLevel.INFO, message, context);
    }

    public static debug(message: any, context?: string, scope?: string): void {
        Logger.log(LoggerLevel.DEBUG, message, context, scope);
    }

    public static warn(message: any, context?: string): void {
        Logger.log(LoggerLevel.WARN, message, context);
    }

    public static error(message: any, context?: string): void {
        Logger.log(LoggerLevel.ERROR, message, context);
    }
}
