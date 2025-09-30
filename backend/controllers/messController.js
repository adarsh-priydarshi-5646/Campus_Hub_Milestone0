const prisma = require('../config/db.config');

const getMess = async (req, res) => {
  try {
    const mess = await prisma.mess.findMany();
    res.json(mess);

  } catch(err) { 
    res.status(500).json({ error: err.message }); 
  }
};

module.exports = { getMess };
