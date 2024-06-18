import express from 'express'
import User from '../models/user.js';
import * as user_controller from '../controllers/userController.js';
import * as post_controller from '../controllers/postController.js';
import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const router = express.Router();


function getSignedJwtToken(user) {
    const _id = user._id;
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
  
    const signedToken = jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14d' });
  
    return signedToken;
  }
  

router.post('/sign-up', user_controller.user_create); 

router.post('/log-in', asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
        if (!user) {
          res.status(401).json({ success: false, message: "Incorrect username" });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
          // passwords do not match!
          res.status(401).json({ success: false, message: "Incorrect password" });
        }
        const token = getSignedJwtToken(user);
        const twoWeeksExpiration = new Date();
        twoWeeksExpiration.setDate(twoWeeksExpiration.getDate() + 14);
        console.log(token);
        res.cookie('jwt', token, {httpOnly: true, secure: true, sameSite: 'Strict', expires: twoWeeksExpiration });
        res.status(200).json({success: true})
}));

router.post('/log-out', (req, res) => {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.status(200).json({success: true});
  });

router.get('/', post_controller.post_list);

export default router;