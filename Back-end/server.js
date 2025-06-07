import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/DB.Connection.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing routes
import administratorRoutes from './Routes/administrator.route.js';
import userRoutes from './Routes/user.route.js';
import storeRoutes from './Routes/store.route.js';

// routes configuration
app.use('/api/',administratorRoutes)
app.use('/api/user',userRoutes)
app.use('/api/Store',storeRoutes)

app.listen(PORT, async()=>{
     connectDB()
     .then(()=>{
        console.log(`http://localhost:${PORT}`);
     })
     .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
     });
})
