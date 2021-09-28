import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user';
import { User } from '../models/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find().select('-passwordHash');
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user: IUser = await User.findById(req.params.id).select(
            '-passwordHash'
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with given ID was not found!',
            });
        }
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const register = async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
    } = req.body;

    const newUser: IUser = new User({
        name,
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
    });

    try {
        const user: IUser = await newUser.save();

        if (!user) {
            return res.status(400).json('User cannot be registered!');
        }

        return res.status(201).json(user);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user: IUser = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials!',
            });
        }

        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials!',
            });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: '1w',
        });

        return res.status(200).json({ email: user.email, token });
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        name,
        email,
        password,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
    } = req.body;

    try {
        const existingUser: IUser = await User.findById(id);

        const passwordHash: string = password
            ? bcrypt.hashSync(password, 10)
            : existingUser.passwordHash;

        const updatedUser: IUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                passwordHash,
                phone,
                isAdmin,
                street,
                apartment,
                zip,
                city,
                country,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json('User cannot be updated!');
        }

        return res.status(201).json(updatedUser);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};
