const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).send({ error: "Please authenticate" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(400).send({ error: "Invalid token" });
    }
};

module.exports = {fetchUser};
