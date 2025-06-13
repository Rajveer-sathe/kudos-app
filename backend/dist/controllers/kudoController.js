import Kudo from '../models/Kudo.js';
import User from '../models/User.js';
export const giveKudo = async (req, res) => {
    const { fromId, toId, message } = req.body;
    console.log(req.body);
    const fromUser = await User.findById(fromId);
    console.log('from user:', fromUser);
    if (!fromUser || fromUser.kudosLeft <= 0) {
        res.status(400).json({ message: 'No kudos left' });
        return;
    }
    const kudo = await Kudo.create({ from: fromId, to: toId, message });
    console.log('kudo:', kudo);
    fromUser.kudosLeft -= 1;
    await fromUser.save();
    res.json(kudo);
};
export const getReceivedKudos = async (req, res) => {
    const kudos = await Kudo.find({ to: req.params.userId }).populate('from', 'name');
    res.json(kudos);
};
export const getKudosByUserId = async (req, res) => {
    const userId = req.params.userId;
    //console.log('userid:',userId)
    try {
        const kudos = await Kudo.find({
            $or: [{ from: userId }, { to: userId }],
        })
            .populate('from', 'name')
            .populate('to', 'name')
            .sort({ createdAt: -1 });
        // console.log('kudos:',kudos)
        res.json(kudos);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch kudos', error: err });
    }
};
