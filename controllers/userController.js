const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    const userInput = req.body;
    // Check if username is already taken
    let user = (await UserModel.find({'username':userInput.username})).length > 0;

    // If not then create a new user
    if (!user) {
        let encryptedPassword = await bcrypt.hash(userInput.password, 7);
        userInput.password = encryptedPassword;
        let newUser = new UserModel(userInput);
        newUser.save()
            .then(result=>{
                res.status(201).json(result)
            })
    } else {
        res.status(200).json({
            message: 'This username is already taken'
        })
    }

}

const login = async (req, res)=>{
    let matchingUser = await UserModel.find({"username": req.body.username})
    let isUserFound = matchingUser.length > 0
    isUserFound ?
        await bcrypt.compare(req.body.password, matchingUser[0].password) ?
            res.status(200).json({
                message: 'Logged in',
                token: jwt.sign(
                    {username: req.body.username, date: new Date().getTime()},
                    process.env.JWT_KEY,
                    {expiresIn: '2h'}
                )
            }) :
            res.status(401).json({
                message: 'Password or username is not correct'
            }) :
        res.status(401).json({
            message: 'User not found'
        })
}


module.exports = {
    register,
    login
}
