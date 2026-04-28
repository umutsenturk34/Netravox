const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: null },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, required: true },
  note: { type: String, default: null },
  status: {
    type: String,
    enum: ['new', 'seen', 'confirmed', 'rejected', 'cancelled'],
    default: 'new',
  },
  statusUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  statusUpdatedAt: { type: Date, default: null },
  kvkkConsent: { type: Boolean, required: true },
}, { timestamps: true });

reservationSchema.index({ tenantId: 1, status: 1 });
reservationSchema.index({ tenantId: 1, date: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
