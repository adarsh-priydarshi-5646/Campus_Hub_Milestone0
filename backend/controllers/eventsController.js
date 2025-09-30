const prisma = require('../config/db.config');

const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch(err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getEvents };
