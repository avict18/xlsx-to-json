import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const connectDb = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Already connected to the database');
    return;
  }

  if (connectionState === 2) {
    console.log('Database connection is in progress...');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: 'nela',
      bufferCommands: false,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error in connecting to the database:', error);
    throw error; // Throw the actual error so it can be logged and not a generic message
  }
};

export default connectDb;
