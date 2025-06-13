import User from '../models/User.js';
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    const now = new Date();
    const lastReset = new Date(user.lastReset);
    if ((now.getTime() - lastReset.getTime()) > 7 * 24 * 60 * 60 * 1000) {
        user.kudosLeft = 3;
        user.lastReset = now;
        await user.save();
    }
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        organization: user.organization,
    });
};
export const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};
export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
};
