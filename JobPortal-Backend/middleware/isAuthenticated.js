import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {

  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message: "No token Provided",
        status: false 
      })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({
        message: "Invalid token",
        status: false 
      })
    }

    req.id = decoded.userId;
    next();
  } 
  catch (error) {
    return res.this.status(401).json({
      message: "Invalid token",
      status: false 
    })
  }
}

export default authenticateToken;

// const authenticateToken = (req, res, next) => {
//   try {
//     // Try to get the token from the cookies first
//     let token = req.cookies.token;

//     // If the token is not found in cookies, check the Authorization header
//     if (!token && req.headers.authorization) {
//       token = req.headers.authorization.split(' ')[1]; // Bearer <token>
//     }

//     if (!token) {
//       return res.status(401).json({
//         message: "No token provided",
//         status: false,
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       return res.status(401).json({
//         message: "Invalid token",
//         status: false,
//       });
//     }

//     req.id = decoded.userId;
//     next();
//   } 
//   catch (error) {
//     return res.status(401).json({
//       message: "Invalid token",
//       status: false,
//     });
//   }
// };

// export default authenticateToken;
