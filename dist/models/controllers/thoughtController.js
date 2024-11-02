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
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const Thought_1 = require("../Thought");
const User_1 = require("../User");
// Get all thoughts
const getThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought_1.Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to retrieve thoughts', error: err });
    }
});
exports.getThoughts = getThoughts;
// Get a single thought by ID
const getSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to retrieve thought', error: err });
    }
});
exports.getSingleThought = getSingleThought;
// Create a new thought
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newThought = yield Thought_1.Thought.create(req.body);
        yield User_1.User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(400).json({ message: 'Failed to create thought', error: err });
    }
});
exports.createThought = createThought;
// Update a thought by ID
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(400).json({ message: 'Failed to update thought', error: err });
    }
});
exports.updateThought = updateThought;
// Delete a thought by ID
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        yield User_1.User.findByIdAndUpdate(thought.get('userId'), { $pull: { thoughts: thought._id } });
        res.json({ message: 'Thought deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete thought', error: err });
    }
});
exports.deleteThought = deleteThought;
// Add a reaction to a thought
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to add reaction', error: err });
    }
});
exports.addReaction = addReaction;
// Remove a reaction from a thought
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to remove reaction', error: err });
    }
});
exports.removeReaction = removeReaction;
