// models/matchModel.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IMatch extends Document {
  userIds: [mongoose.Types.ObjectId]; // Array containing two user IDs
  createdAt: Date;
}

const MatchSchema: Schema = new mongoose.Schema(
  {
    userIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Ensure that a match between two users is unique
MatchSchema.index({ userIds: 1 }, { unique: true });

const Match = mongoose.model<IMatch>('Match', MatchSchema);

export default Match;
