"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./models/User");
const Thought_1 = require("./models/Thought");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB')
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
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear existing data
        yield User_1.User.deleteMany({});
        yield Thought_1.Thought.deleteMany({});
        // Insert users
        const createdUsers = yield User_1.User.insertMany(users);
        console.log('Users seeded:', createdUsers);
        // Insert thoughts and link them to users
        for (const thought of thoughts) {
            const user = createdUsers.find((user) => user.username === thought.username);
            if (user) {
                const createdThought = yield Thought_1.Thought.create(Object.assign(Object.assign({}, thought), { userId: user._id }));
                yield User_1.User.findByIdAndUpdate(user._id, { $push: { thoughts: createdThought._id } });
                console.log('Thought seeded:', createdThought);
            }
        }
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        mongoose_1.default.connection.close();
    }
});
seedDatabase();
