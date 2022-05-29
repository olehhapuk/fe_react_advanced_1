const { Prisma } = require('@prisma/client');
const express = require('express');

const prisma = require('../../config/prisma');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const contact = await prisma.contact.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        company: req.body.company,
        avatarUrl: req.body.avatarUrl,
        createdBy: {
          connect: {
            id: req.body.userId,
          },
        },
        tags: {
          connectOrCreate: req.body.tags.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
      include: {
        createdBy: true,
        tags: true,
      },
    });

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

/**
 * @param {Request} req
 */
router.get('/', async (req, res, next) => {
  try {
    const { q = '', page = 1, perPage = 12 } = req.query;

    /**
     * @type {Prisma.ContactWhereInput}
     */
    const where = {
      OR: [
        {
          firstName: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: q,
            mode: 'insensitive',
          },
        },
      ],
    };

    const contacts = await prisma.contact.findMany({
      where,
      take: +perPage,
      skip: (+page - 1) * +perPage,
      include: {
        createdBy: true,
        tags: true,
      },
    });

    const count = await prisma.contact.count({ where });

    res.json({
      items: contacts,
      perPage: +perPage,
      page: +page,
      count,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
