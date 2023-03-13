import prisma from '../prisma';
import { Request, Response } from 'express';

const getOptions = (req: Request) => {
  // Validate params
  const { cursor } = req.query;

  let options: {
    take: number;
    skip?: number;
    cursor?: {
      id: number;
    };
    orderBy: {
      id: 'asc' | 'desc';
    };
  } = {
    take: 50, // For first page, no need to set cursor and skip
    orderBy: {
      id: 'desc',
    },
  };

  if (cursor) {
    // For other pages, set skip with cursor id
    options = {
      ...options,
      skip: 1,
      cursor: {
        id: Number(cursor),
      },
    };
  }
  return options;
};

export const voters = async (req: Request, res: Response) => {
  // Validate params
  const options = getOptions(req);

  try {
    const voters = await prisma.voter.findMany(options);

    res.status(200).send({ voters });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const voteResults = async (req: Request, res: Response) => {
  const options = getOptions(req);

  try {
    const results = await prisma.voteResult.findMany(options);

    res.status(200).send({ results });
  } catch (e) {
    res.status(500).send(e);
  }
};
