import mongoose from 'mongoose';

const dischargePlanSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },

  // Core structured data (parsed by AI)
  medicines: [{
    name:         String,
    dosage:       String,
    timing:       String,
    duration:     String,   // e.g. "5 days", "until finished"
    instructions: String    // e.g. "take with water", "not with milk"
  }],

  // Diet split into two lists for clarity
  dietEat:   [String],   // what to eat
  dietAvoid: [String],   // what to avoid

  precautions:          [String],
  activity:             [String],   // activity restrictions
  followUp:             String,     // follow-up appointment instructions
  warningSigns:         [String],   // symptoms → go to hospital immediately
  specialInstructions:  [String],   // anything else

  // Raw + generated text
  rawText:    String,
  spokenText: String,   // the full caretaker voice script (stored for transcript view)

  // Audio — Mixed so Object.keys() only returns populated language keys.
  // Value is an ARRAY of base64 WAV strings (one per TTS chunk) so long
  // spoken text can be played back sequentially without hitting Sarvam's
  // per-request character limit.
  // e.g. { 'hi-IN': ['base64chunk1', 'base64chunk2', ...] }
  audioFiles: { type: mongoose.Schema.Types.Mixed, default: {} }

}, { timestamps: true });

export default mongoose.model('DischargePlan', dischargePlanSchema);