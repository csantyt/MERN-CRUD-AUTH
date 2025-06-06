import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createdAccesToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const userFound = await User.findOne({ email });
    if (userFound)return res.status(400).json({ message: ["El email ya esta en uso"] });

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createdAccesToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no registrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) 
      return res.status(400).json({ message: "Password Incorrecto" });

    const token = await createdAccesToken({ id: userFound._id });
    res.cookie("token", token, {
      sameSite: 'none',
      secure: true,
      httpOnly: false
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updateAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User no found" })

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  });
};
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "NO AUTORIZADO" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "NO AUTORIZADO" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
}


