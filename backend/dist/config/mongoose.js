import mongoose from 'mongoose';
//const mongoUri: string = process.env.MONGODB_URI || '';
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/kudos_app', {});
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
