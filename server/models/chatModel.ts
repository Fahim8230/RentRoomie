import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    sender: mongoose.Types.ObjectId;
    content: string; 
    createdAt: Date;
}

export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema: Schema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const ChatSchema: Schema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        messages: [MessageSchema],
    },
    {
        timestamps: true,
    }
);

ChatSchema.index({ participants: 1 }, { unique: true });

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;