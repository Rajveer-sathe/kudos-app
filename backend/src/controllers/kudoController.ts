// kudoController.ts
import { Request, Response } from 'express';
import Kudo from '../models/Kudo.js';
import User from '../models/User.js';

export const giveKudo = async (req: Request, res: Response): Promise<void> => {
  const { fromId, toId, message } = req.body;
  const fromUser = await User.findById(fromId);
  console.log('from user:',fromUser);
  if (!fromUser || fromUser.kudosLeft <= 0) {
    res.status(400).json({ message: 'No kudos left' });
    return;
  }

  const kudo = await Kudo.create({ from: fromId, to: toId, message });
  
  fromUser.kudosLeft -= 1;
  await fromUser.save();
  res.json(kudo);
};

export const getReceivedKudos = async (req: Request, res: Response): Promise<void> => {
  const kudos = await Kudo.find({ to: req.params.userId }).populate('from', 'name');
  res.json(kudos);
};

export const getKudosByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const kudos = await Kudo.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate('from', 'name')
      .populate('to', 'name')
      .sort({ createdAt: -1 });
    res.json(kudos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch kudos', error: err });
  }
};