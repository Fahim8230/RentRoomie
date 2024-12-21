// models/likeModel.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface ILike extends Document {
  likerId: mongoose.Types.ObjectId;
  likedId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const LikeSchema: Schema = new mongoose.Schema(
  {
    likerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Ensure a user cannot like the same person more than once
LikeSchema.index({ likerId: 1, likedId: 1 }, { unique: true });

const Like = mongoose.model<ILike>('Like', LikeSchema);

export default Like;
