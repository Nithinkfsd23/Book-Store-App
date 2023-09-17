//Middleware to authenticate Admin users
const adm = (req, res, next) => {
    if (req.body.role === "Admin" || req.params.role === "Admin") {
        return next(); // Continue to the next middleware or route handler
    } else {
        return res.json({ message: "Unauthorized! Admin access only." });

    }
}

module.exports = adm;