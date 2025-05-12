// import dotenv from 'dotenv';
// import express from 'express';
// import connectDB from './config/db';
// import userRoutes from './routes/user.routes';
// import { errorHandler } from './middlewares/errormiddleware';
// import app from './app';


// dotenv.config();

// // Connect to MongoDB
// // connectDB();

// // const app = express();

// // Middleware
// // app.use(express.json());

// // Error handler
// // app.use(errorHandler);

// // Routes
// // app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(`API Gateway running at http://localhost:${PORT}`);
// });

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { createProxy } from './proxy/proxy';
import { protect } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(morgan('dev'));
app.use(express.json());

// Route middleware
app.use('/auth', createProxy(process.env.AUTH_SERVICE_URL || "", "authService"));
// app.use('/user', createProxy(process.env.USER_SERVICE_URL || "", "userService"));
app.use('/gym', createProxy(process.env.GYM_SERVICE_URL || "", "gymService"));

// Fallback route
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});

export default app;