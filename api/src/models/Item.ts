import mongoose, { Schema } from 'mongoose';

const ChangeLogSchema = new Schema({
  delta: Number,
  reason: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

const ItemSchema = new Schema({
  name: { type: String, required: true },
  sku: String,
  category: String,
  unit: String,
  quantity: { type: Number, default: 0 },
  minStock: Number,
  notes: String,
  changeLog: [ChangeLogSchema]
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
