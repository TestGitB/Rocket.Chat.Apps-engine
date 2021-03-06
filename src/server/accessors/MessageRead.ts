import { IMessageBridge } from '../bridges/IMessageBridge';

import { IMessageRead } from '../../definition/accessors';
import { IMessage } from '../../definition/messages';
import { IRoom } from '../../definition/rooms';
import { IUser } from '../../definition/users';

export class MessageRead implements IMessageRead {
    constructor(private messageBridge: IMessageBridge, private appId: string) { }

    public getById(id: string): Promise<IMessage> {
        return this.messageBridge.getById(id, this.appId);
    }

    public async getSenderUser(messageId: string): Promise<IUser> {
        const msg = await this.messageBridge.getById(messageId, this.appId);

        if (!msg) {
            return undefined;
        }

        return msg.sender;
    }

    public async getRoom(messageId: string): Promise<IRoom> {
        const msg = await this.messageBridge.getById(messageId, this.appId);

        if (!msg) {
            return undefined;
        }

        return msg.room;
    }
}
