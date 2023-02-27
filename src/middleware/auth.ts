import jwt from "jsonwebtoken";

//  tạo ra 1 middleware để kiểm tra xem access token có hợp lệ hay không.
export const auth = async (req, res, next) => {
    try {
        let accessToken = req.body["access_token"];
        if (accessToken) {
            //123456 là secret key.
            // Nó phải trùng với tham số secret key tạo ra access token khi login user.
            jwt.verify(accessToken, "123456", (err, decoded) => {
                    if (err) {
                        return res.status(401).json({
                            message: err.message,
                            status: 401,
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                },
            );
        } else {
            return res.status(401).json({
                message: 'No token provided.',
                status: 401,
            });

        }

    } catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401,
        });
    }
}