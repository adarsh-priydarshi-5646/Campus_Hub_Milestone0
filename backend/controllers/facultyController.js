const prisma = require('../config/db.config');

const getFaculty = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teacher.findUnique({
      where: { 
        id: parseInt(id)
      },
    });
    
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFaculty, getTeacherById };
