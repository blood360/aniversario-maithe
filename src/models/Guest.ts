import mongoose, { Schema, model, models } from 'mongoose';

const GuestSchema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório!'],
    trim: true,
  },
  // Campo para quantidade de adultos
  adultsCount: {
    type: Number,
    required: [true, 'A quantidade de adultos é obrigatória!'],
    default: 1,
  },
  // Campo para quantidade de crianças
  childrenCount: {
    type: Number,
    default: 0,
  },
  // Mantemos o total para facilitar a conta do Buffet no painel
  guestsCount: {
    type: Number,
    required: [true, 'O total de pessoas é obrigatório!'],
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