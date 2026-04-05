import CheckIn from '../models/CheckIn.js';

export const submitCheckin = async (req, res) => {
  try {
    const { patientId, tookMedicine, feeling } = req.body;

    // Rule-based risk scoring
    let riskScore = 0;
    if (!tookMedicine) riskScore += 30;
    if (feeling === 'bad') riskScore += 40;

    // Check if no response yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const lastCheckin = await CheckIn.findOne({
      patientId,
      createdAt: { $gte: yesterday }
    });
    if (!lastCheckin) riskScore += 20;

    const checkin = await CheckIn.create({
      patientId,
      tookMedicine,
      feeling,
      riskScore
    });

    res.json({ success: true, checkin, riskScore });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCheckins = async (req, res) => {
  try {
    const { patientId } = req.params;
    const checkins = await CheckIn.find({ patientId }).sort({ createdAt: 1 });
    res.json({ success: true, checkins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};