import User from '../models/user.js';

const verifyRole = (roles) => {
  console.log("\nim here at verifyRole\n");
  return async (req, res, next) => {
    const user = req.user;
    const userFind = await User.findById(user._id);
    const userRole = userFind.role;

    if (roles.includes(userRole)) {
      console.log("\nverified role\n");
      next();
    } else {
      res.status(403).json({ message: 'Access denied due to role!' });
    }
  };
};

// const verifyRole = (role) => {
//   return async (req, res, next) => {
//     console.log(req);
//     const user = req.user;
//     const userFind = await User.findById(user._id);
//     const userRole = userFind.role;
//     // console.log('userFind', userFind);
//     // console.log('user role', userRole);
//     if (userRole === role) {
//       next(); 
//     } else {
//       res.status(403).json({ message: 'Access denied due to role!' }); 
//     }
//   };
// };

export default verifyRole;
