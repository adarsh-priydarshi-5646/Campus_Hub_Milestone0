const prisma = require('../config/db.config');

const getTimetable = async (req, res) => {
  const { semesterId } = req.params;
  try {
    const timetable = await prisma.timetable.findMany({ 
      where: { 
        semesterId: parseInt(semesterId)
      } 
    });
    res.json(timetable);
  } catch(err) { 
    res.status(500).json({ error: err.message }); 
  }
};

module.exports = { getTimetable };
