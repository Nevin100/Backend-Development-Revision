import jwt from 'jsonwebtoken';

const generateToken = (user,res) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',    
    });

    res.cookie("jwt", token,{
        maxAge:60*60*1000,
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === 'development' ? true : false,
    });

    return token;
};

export default generateToken;