import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import createError from 'http-errors';
import compression from 'compression';
import {Strategy as JWTStrategy} from 'passport-jwt';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import tagRouter from './routes/tag.js';
import postRouter from './routes/post.js';
import User from './models/user.js';
import 'dotenv/config';

const mongoDB = process.env.MONGODB_URI;
async function main() {
    await mongoose.connect(mongoDB);
}
main().catch((err) => {console.log(err)});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
});

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: allow lists on cors?
app.use(cors());
//app.use(limiter); unnecessary for now;
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  };


  passport.use(new JWTStrategy(options, async function(jwt_payload, done) {

    console.log(jwt_payload);
    try {
        const user = await User.findById({ _id: jwt_payload.sub }).exec();

        if (!user) {
            return done(null, false); // User not found, authentication fails
        }

        return done(null, user); // User found, authentication succeeds
    } catch (error) {
        return done(error, false); // Handle any errors
    }
    
}));

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/tags', tagRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      status: 'error',
      message: err.message,
      stack: req.app.get('env') === 'development' ? err.stack : {}
    });
  });

app.listen(PORT, ()=> {
    console.log(`app listening on port ${PORT}!`);
});
