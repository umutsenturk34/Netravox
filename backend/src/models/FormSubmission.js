const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  formType: { type: String, enum: ['contact', 'reservation', 'appointment', 'other', 'custom'], default: 'contact' },
  fields: { type: mongoose.Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['new', 'seen', 'replied'], default: 'new' },
  kvkkConsent: { type: Boolean, required: true },
  ipAddress: { type: String, default: null },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

formSubmissionSchema.index({ tenantId: 1, status: 1 });

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);
