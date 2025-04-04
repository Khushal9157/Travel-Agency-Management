import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
export const verifyAdmin = (req, res, next) => {
    if (!req.body.role || req.body.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};


