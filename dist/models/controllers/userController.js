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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const User_1 = require("../User");
const Thought_1 = require("../Thought");
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to retrieve users', error: err });
    }
});
exports.getUsers = getUsers;
// Get a single user by ID
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user', error: err });
    }
});
exports.getSingleUser = getSingleUser;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: 'Failed to create user', error: err });
    }
});
exports.createUser = createUser;
// Update a user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: 'Failed to update user', error: err });
    }
});
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndDelete(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Optionally delete user's thoughts as well
        yield Thought_1.Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err });
    }
});
exports.deleteUser = deleteUser;
// Add a friend to a user's friend list
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to add friend', error: err });
    }
});
exports.addFriend = addFriend;
// Remove a friend from a user's friend list
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to remove friend', error: err });
    }
});
exports.removeFriend = removeFriend;
