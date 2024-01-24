const jwt = require('jsonwebtoken');

const AdminSecret = "Secret"
const UserSecret = "user"

const generateTokenA=(admin)=>{
  return jwt.sign({ username:admin.username },AdminSecret,{ expiresIn: '1h'})
}

const generateTokenU=(User)=>{
  return jwt.sign({ username:User.username },UserSecret,{ expiresIn: '1h' })
}

const AuthAdmin=(req,res,next)=>{
  if(req.headers.authorization){
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,AdminSecret,(err,user)=>{
      if(err){
        res.sendStatus(403);
      }else{
        req.user=user;
        next();
      }
    })
  }else
  return res.sendStatus(401)
}

const AuthUser=(req,res,next)=>{
  if(req.headers.authorization){
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,UserSecret,(err,user)=>{
      if(err){
        res.sendStatus(403);
      }else{
        req.user=user;
        next();
      }
    })
  }else
  return res.sendStatus(401)
}

module.exports={
  AuthAdmin,
  AuthUser,
  generateTokenA,
  generateTokenU
}
