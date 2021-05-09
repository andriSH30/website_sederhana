const User = require('../models/User');

module.exports = async (req, res, next) => {
    const id = req.user.id;
    const user = await (User.findById(id));

    if(user.role === "admin"){
        next();
    } else {
        res.status(403).json({ msg: 'not Authorized' });
    }
}