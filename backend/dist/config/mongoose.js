import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/kudos_app', {});
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));
    db.once('open', () => {
        console.log('Connected to MongoDB successfully');
    });
};
export default connectDB;
