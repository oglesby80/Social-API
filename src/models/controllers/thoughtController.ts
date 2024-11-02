import { Request, Response } from 'express';
import { Thought } from '../Thought';
import { User } from '../User';


// Get all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve thoughts', error: err });
  }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve thought', error: err });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create thought', error: err });
  }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update thought', error: err });
  }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    await User.findByIdAndUpdate(thought.get('userId'),  { $pull: { thoughts: thought._id } });
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete thought', error: err });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add reaction', error: err });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove reaction', error: err });
  }
};
