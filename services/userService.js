const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class UserService {
  static async info(id) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    return user;
  }

  static async register(id, password) {
    const user = await User.findOne({ where: { id } });
    if (user) throw new Error("User already exists");
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ id, password: hash });
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
  }

  static async login(id, password) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);
    await Token.create({ token, refreshToken, userId: user.id });
    return { token, refreshToken };
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
  }

  static generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  }
  static async invalidateToken(refreshToken) {
    const findRefreshToken = { where: { refreshToken } };
    const tokenRecord = await Token.findOne(findRefreshToken);
    if (tokenRecord) {
      await Token.destroy(findRefreshToken);
    } else {
      throw new Error("Token not found");
    }
  }

  static async invalidateUserTokens(userId, token) {
    await Token.destroy({ where: { userId, token } });
  }

  static async isTokenValid(token) {
    const tokenRecord = await Token.findOne({
      where: { token },
    });
    return !!tokenRecord;
  }
}

module.exports = UserService;
