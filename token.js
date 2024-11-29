import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
const token = req.header('Authorization')?.split(' ')[1];  

  if (!token) {
    return res.json({ status:false, message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, 'keykey');
    req.user = decoded;  
    next();  
  } catch (error) {
    console.log("Invalid or expired token")
    res.json({ status:false,message: 'Invalid or expired token' });
    
  }
};

