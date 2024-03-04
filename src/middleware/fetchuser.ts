import jwt, { JwtPayload } from "jsonwebtoken";

const fetchuser = async (req: any, res: any, next: any) => {
    const jwt_secret = process.env.JWT_SECRET!;
    const access_token = req.headers['access_token'];

    if (!access_token) {
        return res.status(401).json({ error: "user is not authenticated" });
    }

    try {
        const payload: JwtPayload = jwt.verify(access_token, jwt_secret) as JwtPayload;
        req.user_id = payload.id;
        next();
    } catch (error) {
        res.status(500).json({ error: "some error occurred" });
    }
};

export default fetchuser;
