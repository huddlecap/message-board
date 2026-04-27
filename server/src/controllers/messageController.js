const prisma = require("../prisma");

const getMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const message = await prisma.message.create({
      data: {
        text,
        userId: req.user.userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getMessages, createMessage };