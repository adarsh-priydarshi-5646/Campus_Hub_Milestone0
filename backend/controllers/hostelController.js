const prisma = require('../config/db.config');

const getHostels = async (req, res) => {
  try {
    const hostels = await prisma.hostel.findMany();
    res.json(hostels);
    
  } catch(err) { 
    res.status(500).json({ error: err.message }); 
  }
};

module.exports = { getHostels };
