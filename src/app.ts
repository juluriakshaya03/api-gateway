// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import morgan from 'morgan';


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors({
//   origin: 'http://localhost:5143',
// }));

// app.use(morgan('dev'));
// app.use(express.json());

// // Route middleware
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
// app.use('/gym', gymRoutes);

// // Fallback route
// app.use('*', (req: Request, res: Response) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // app.listen(PORT, () => {
// //   console.log(`API Gateway running at http://localhost:${PORT}`);
// // });

// export default app;