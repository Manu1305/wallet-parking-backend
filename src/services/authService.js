const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utilis/hashPassword');
const { signToken } = require('../utilis/jwt');

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email: email})
    const hashedPassword = await hashPassword(password);
    if (existingUser) {
        throw new Error ('User already exists')
    }
    const user = new User({ name, email, password: hashedPassword });
    return await user.save();
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = signToken(user._id);
    return { user, token };
};

module.exports = { registerUser, loginUser };
