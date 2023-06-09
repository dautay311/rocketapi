import { EventEmitter } from 'tiny-events';
import { ISocket, IDriver } from './index';
import { ILogger, ISocketOptions, ICallback, ISubscription, ICredentials } from '../../interfaces';
export declare class MQTTDriver extends EventEmitter implements ISocket, IDriver {
    logger: ILogger;
    config: ISocketOptions;
    socket: any;
    constructor({ host, path, integrationId, config, logger, ...moreConfigs }: any);
    connect(options: ISocketOptions): Promise<any>;
    disconnect(): Promise<any>;
    subscribe(topic: string, { qos }: any): Promise<ISubscription>;
    unsubscribe(subscription: ISubscription, ...args: any[]): Promise<ISocket>;
    unsubscribeAll(): Promise<ISocket>;
    subscribeNotifyAll(): Promise<any>;
    subscribeLoggedNotify(): Promise<any>;
    subscribeNotifyUser(): Promise<any>;
    login(credentials: ICredentials, args?: any): Promise<any>;
    subscribeRoom(rid: string, ...args: any[]): Promise<ISubscription[]>;
    onMessage(cb: ICallback): void;
    onTyping(cb: ICallback): Promise<any>;
    notifyVisitorTyping(rid: string, username: string, typing: boolean, token: string): Promise<any>;
    notifyCallDeclined(rid: string): Promise<any>;
    onStreamData(name: string, cb: ICallback): Promise<any>;
    methodCall: (method: string, ...args: any[]) => Promise<any>;
}
