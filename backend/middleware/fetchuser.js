var jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const fetchuser = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) {
        return res.status(401).json({
            error: "Invalid token"
        })
    }
    try {
        const data = jwt.verify(token, JWT_KEY);
        req.user = data.user.id;
        console.log(data);
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Error while verifying the token"
        });
    }
}


module.exports = fetchuser;