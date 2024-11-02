import mongoose from 'mongoose';
import { User } from './models/User';
import { Thought } from './models/Thought';
import dotenv from 'dotenv';
dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB')
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection error:', error));

// Seed data
const users = [
  {
    username: 'testuser1',
    email: 'testuser1@example.com',
  },
  {
    username: 'testuser2',
    email: 'testuser2@example.com',
  },
];

const thoughts = [
  {
    thoughtText: 'This is a test thought by testuser1',
    username: 'testuser1',
  },
  {
    thoughtText: 'Another thought by testuser2',
    username: 'testuser2',
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:', createdUsers);

    // Insert thoughts and link them to users
    for (const thought of thoughts) {
      const user = createdUsers.find((user) => user.username === thought.username);
      if (user) {
        const createdThought = await Thought.create({ ...thought, userId: user._id });
        await User.findByIdAndUpdate(user._id, { $push: { thoughts: createdThought._id } });
        console.log('Thought seeded:', createdThought);
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
