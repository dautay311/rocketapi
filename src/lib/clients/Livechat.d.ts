/**
    * @module LivechatDriver
    * Provides high-level helpers for Livechat connection, method calls, subscriptions.
    */
import LivechatRest from '../api/Livechat';
import { ISocket, Protocols, IDriver } from '../drivers';
import { ILogger, ISocketOptions, ICallback, ISubscription } from '../../interfaces';
export default class LivechatClient extends LivechatRest implements ISocket {
    livechatStream: string;
    userId: string;
    logger: ILogger;
    socket: Promise<ISocket | IDriver>;
    constructor({ logger, allPublic, rooms, integrationId, protocol, ...config }: any);
    import(protocol: Protocols, config: any): void;
    connect(options: ISocketOptions, callback?: ICallback): Promise<any>;
    disconnect(): Promise<any>;
    unsubscribe(subscription: ISubscription): Promise<any>;
    unsubscribeAll(): Promise<any>;
    subscribeNotifyAll(): Promise<any>;
    subscribeLoggedNotify(): Promise<any>;
    subscribeNotifyUser(): Promise<any>;
    onMessage(cb: ICallback): Promise<any>;
    onTyping(cb: ICallback): Promise<any>;
    onAgentChange(rid: string, cb: ICallback): Promise<void>;
    onAgentStatusChange(rid: string, cb: ICallback): Promise<void>;
    onQueuePositionChange(rid: string, cb: ICallback): Promise<void>;
    onVisitorChange(rid: string, cb: ICallback): Promise<void>;
    notifyVisitorTyping(rid: string, username: string, typing: boolean): Promise<any>;
    notifyCallDeclined(rid: string): Promise<any>;
    subscribe(topic: string, eventName: string): Promise<ISubscription>;
    subscribeRoom(rid: string): Promise<ISubscription[]>;
    onStreamData(event: string, cb: ICallback): Promise<any>;
    setUpConnection(): Promise<any>;
}
