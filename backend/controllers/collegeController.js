const prisma = require('../config/db.config');

const getCollegeDetails = async (req, res) => {
  try {
    const college = await prisma.college.findFirst();
    res.json(college);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCollegeDetails
};
