import mongoose from 'mongoose';

const dischargePlanSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },

  condition:            String,   // e.g. "Typhoid Fever", "Dengue", extracted by AI
  medicineVerification: String,   // AI-generated one-liner confirming meds match condition

  medicines: [{
    name:         String,
    dosage:       String,
    timing:       String,
    duration:     String,
    instructions: String
  }],

  dietEat:   [String],
  dietAvoid: [String],

  precautions:          [String],
  activity:             [String],
  followUp:             String,
  warningSigns:         [String],
  specialInstructions:  [String],

  rawText:    String,
  spokenText: String,

  audioFiles: { type: mongoose.Schema.Types.Mixed, default: {} }

}, { timestamps: true });

export default mongoose.model('DischargePlan', dischargePlanSchema);
