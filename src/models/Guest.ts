import mongoose, { Schema, model, models } from 'mongoose';

const GuestSchema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório!'],
    trim: true,
  },
  guestsCount: {
    type: Number,
    required: [true, 'A quantidade de pessoas é obrigatória!'],
    default: 1,
  },
  confirmedAt: {
    type: Date,
    default: Date.now,
  },
});

// Truque pra não dar erro de "Model Overwrite" no Next.js
const Guest = models.Guest || model('Guest', GuestSchema);

export default Guest;