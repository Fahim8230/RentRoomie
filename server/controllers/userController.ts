// controllers/userController.ts
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import Like from '../models/likeModel';
import Match from '../models/matchModel';
import User, { IUser } from '../models/userModel';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            additionalInfo // Destructure additionalInfo from request body
        } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !email || !password || !dateOfBirth || !gender) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        // Validate additionalInfo if provided
        if (additionalInfo) {
            const { budget } = additionalInfo;
            if (!budget || typeof budget.low !== 'number' || typeof budget.high !== 'number') {
                res.status(400).json({ error: 'Invalid additionalInfo format' });
                return;
            }

            if (budget.low < 0 || budget.high < 0) {
                res.status(400).json({ error: 'Budget values must be non-negative' });
                return;
            }

            if (budget.low > budget.high) {
                res.status(400).json({ error: 'Budget "low" cannot be greater than "high"' });
                return;
            }
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ error: 'Email is already in use' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user: IUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            additionalInfo // Include additionalInfo if provided
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in createUser:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { additionalInfo, ...updateData } = req.body;

        // If additionalInfo is present, validate it
        if (additionalInfo) {
            const { budget } = additionalInfo;
            if (!budget || typeof budget.low !== 'number' || typeof budget.high !== 'number') {
                res.status(400).json({ error: 'Invalid additionalInfo format' });
                return;
            }

            if (budget.low < 0 || budget.high < 0) {
                res.status(400).json({ error: 'Budget values must be non-negative' });
                return;
            }

            if (budget.low > budget.high) {
                res.status(400).json({ error: 'Budget "low" cannot be greater than "high"' });
                return;
            }

            // Merge additionalInfo into updateData
            updateData.additionalInfo = additionalInfo;
        }

        // If password is being updated, hash the new password
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        console.error('Error in updateUser:', error);
        res.status(500).json({ message: error.message });
    }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        // Create JWT payload with user id
        const payload = {
            id: user._id, // Include user ID
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
        };

        // Generate JWT token with a 24-hour expiration
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '24h' });

        // Send token in response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};


// Get detailed user profile
export async function getUserProfile(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.params; // Extract the user ID from the route parameters

        // Find the user by ID and include all relevant fields
        const user = await User.findById(userId).select(
            'firstName lastName email dateOfBirth gender preference additionalInfo'
        );

        // If user is not found, return a 404 error
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Respond with the user details
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            preference: user.preference,
            additionalInfo: user.additionalInfo,
        });
    } catch (error: any) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Failed to retrieve user profile' });
    }
}

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};


// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// New Controller Functions for Preferences

// Update roommate preferences
export const updatePreferences = async (
    req: Request & { user?: any }, // Extend Request to include user
    res: Response
): Promise<void> => {
    try {
        const userId = req.user.id;

        const { agePreference, genderPreference, budgetPreference } = req.body;

        // Validation
        const updateData: any = {};

        if (agePreference) {
            const { minAge, maxAge } = agePreference;
            if (
                typeof minAge !== 'number' ||
                typeof maxAge !== 'number' ||
                minAge < 18 ||
                maxAge < 18 ||
                minAge > maxAge
            ) {
                res.status(400).json({ error: 'Invalid agePreference values' });
                return;
            }
            updateData['preference.agePreference'] = { minAge, maxAge };
        }

        if (genderPreference) {
            if (
                !Array.isArray(genderPreference) ||
                genderPreference.some((g) => typeof g !== 'string')
            ) {
                res.status(400).json({ error: 'Invalid genderPreference format' });
                return;
            }
            updateData['preference.genderPreference'] = genderPreference;
        }

        if (budgetPreference) {
            const { low, high } = budgetPreference;
            if (
                typeof low !== 'number' ||
                typeof high !== 'number' ||
                low < 0 ||
                high < 0 ||
                low > high
            ) {
                res.status(400).json({ error: 'Invalid budgetPreference values' });
                return;
            }
            updateData['preference.budgetPreference'] = { low, high };
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res
            .status(200)
            .json({ message: 'Preferences updated successfully', preferences: user.preference });
    } catch (error: any) {
        console.error('Error in updatePreferences:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get roommate preferences
export const getPreferences = async (   
    req: Request & { user?: any }, // Extend Request to include user
    res: Response
): Promise<void> => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('preference');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ preferences: user.preference });
    } catch (error: any) {
        console.error('Error in getPreferences:', error);
        res.status(500).json({ message: error.message });
    }
};


// Like a user
export const likeUser = async (
    req: Request & { user?: any },
    res: Response
  ): Promise<void> => {
    try {
      const likerId = req.user.id;
      const { likedUserId } = req.body;
  
      // Validate likedUserId
      if (!likedUserId) {
        res.status(400).json({ error: 'likedUserId is required' });
        return;
      }
  
      // Prevent liking oneself
      if (likerId === likedUserId) {
        res.status(400).json({ error: 'You cannot like yourself' });
        return;
      }
  
      // Check if likedUserId exists
      const likedUser = await User.findById(likedUserId);
      if (!likedUser) {
        res.status(404).json({ error: 'User to like not found' });
        return;
      }
  
      // Check if the like already exists
      const existingLike = await Like.findOne({ likerId, likedId: likedUserId });
      if (existingLike) {
        res.status(400).json({ error: 'You have already liked this user' });
        return;
      }
  
      // Save the new like
      const newLike = new Like({ likerId, likedId: likedUserId });
      await newLike.save();
  
      // Check for mutual like
      const reciprocalLike = await Like.findOne({ likerId: likedUserId, likedId: likerId });
      if (reciprocalLike) {
        // Check if a match already exists
        const existingMatch = await Match.findOne({
          userIds: { $all: [likerId, likedUserId] },
        });
  
        if (!existingMatch) {
          // Create a new match
          const newMatch = new Match({ userIds: [likerId, likedUserId] });
          await newMatch.save();
        }
  
        // Retrieve matched user data to return
        const matchedUser = await User.findById(likedUserId).select(
          'firstName lastName email'
        );
  
        res.status(200).json({
          message: "It's a match!",
          matchedUser,
        });
      } else {
        res.status(200).json({ message: 'User liked successfully' });
      }
    } catch (error: any) {
      console.error('Error in likeUser:', error);
      res.status(500).json({ error: 'Failed to like user' });
    }
  };

  // Remove a like
export const removeLike = async (
    req: Request & { user?: any },
    res: Response
  ): Promise<void> => {
    try {
      const likerId = req.user.id;
      const { likedUserId } = req.body;
  
      // Validate likedUserId
      if (!likedUserId) {
        res.status(400).json({ error: 'likedUserId is required' });
        return;
      }
  
      // Prevent unliking oneself
      if (likerId === likedUserId) {
        res.status(400).json({ error: 'You cannot unlike yourself' });
        return;
      }
  
      // Check if the like exists
      const existingLike = await Like.findOne({ likerId, likedId: likedUserId });
      if (!existingLike) {
        res.status(404).json({ error: 'Like not found' });
        return;
      }
  
      // Remove the like
      await Like.deleteOne({ _id: existingLike._id });
  
      // Check if a match exists
      const existingMatch = await Match.findOne({
        userIds: { $all: [likerId, likedUserId] },
      });
  
      if (existingMatch) {
        // Remove the match since the mutual like is broken
        await Match.deleteOne({ _id: existingMatch._id });
  
        res.status(200).json({
          message: 'Like removed and match deleted successfully',
        });
      } else {
        res.status(200).json({ message: 'Like removed successfully' });
      }
    } catch (error: any) {
      console.error('Error in removeLike:', error);
      res.status(500).json({ error: 'Failed to remove like' });
    }
  };

// Get users who have liked the authenticated user
export const getUsersWhoLikedMe = async (
    req: Request & { user?: any },
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user.id;
  
      // Find all likes where the likedId is the authenticated user
      const likes = await Like.find({ likedId: userId }).populate('likerId', 'firstName lastName email');
  
      // Extract the users who liked the authenticated user
      const usersWhoLikedMe = likes.map(like => like.likerId);
  
      res.status(200).json(usersWhoLikedMe);
    } catch (error: any) {
      console.error('Error in getUsersWhoLikedMe:', error);
      res.status(500).json({ error: 'Failed to retrieve users who liked you' });
    }
  };
  
  // Get users the authenticated user has liked
  export const getUsersILiked = async (
    req: Request & { user?: any },
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user.id;
  
      // Find all likes where the likerId is the authenticated user
      const likes = await Like.find({ likerId: userId }).populate('likedId', 'firstName lastName email');
  
      // Extract the users the authenticated user has liked
      const usersILiked = likes.map(like => like.likedId);
  
      res.status(200).json(usersILiked);
    } catch (error: any) {
      console.error('Error in getUsersILiked:', error);
      res.status(500).json({ error: 'Failed to retrieve users you have liked' });
    }
  };
  
  // Get matches for the authenticated user
  export const getMyMatches = async (
    req: Request & { user?: any },
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user.id;
  
      // Find all matches where the userIds array contains the authenticated user
      const matches = await Match.find({ userIds: userId }).populate('userIds', 'firstName lastName email');
  
      // Extract matched users (excluding the authenticated user)
      const matchedUsers = matches.map(match => {
        return match.userIds.find((user: any) => user._id.toString() !== userId);
      });
  
      res.status(200).json(matchedUsers);
    } catch (error: any) {
      console.error('Error in getMyMatches:', error);
      res.status(500).json({ error: 'Failed to retrieve your matches' });
    }
  };


  // Remove a like
export const removeLike = async (
    req: Request & { user?: any },
    res: Response
  ): Promise<void> => {
    try {
      const likerId = req.user.id;
      const { likedUserId } = req.body;
  
      // Validate likedUserId
      if (!likedUserId) {
        res.status(400).json({ error: 'likedUserId is required' });
        return;
      }
  
      // Prevent unliking oneself
      if (likerId === likedUserId) {
        res.status(400).json({ error: 'You cannot unlike yourself' });
        return;
      }
  
      // Check if the like exists
      const existingLike = await Like.findOne({ likerId, likedId: likedUserId });
      if (!existingLike) {
        res.status(404).json({ error: 'Like not found' });
        return;
      }
  
      // Remove the like
      await Like.deleteOne({ _id: existingLike._id });
  
      // Check if a match exists
      const existingMatch = await Match.findOne({
        userIds: { $all: [likerId, likedUserId] },
      });
  
      if (existingMatch) {
        // Remove the match since the mutual like is broken
        await Match.deleteOne({ _id: existingMatch._id });
  
        res.status(200).json({
          message: 'Like removed and match deleted successfully',
        });
      } else {
        res.status(200).json({ message: 'Like removed successfully' });
      }
    } catch (error: any) {
      console.error('Error in removeLike:', error);
      res.status(500).json({ error: 'Failed to remove like' });
    }
  };