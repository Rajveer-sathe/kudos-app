import express from 'express';
import cors from 'cors';
import connectDB from './config/mongoose.js';
import { seedDemoData } from './utils/seed.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use('/', routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const startServer = async () => {
    await connectDB();
    await seedDemoData();
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
};
startServer();
