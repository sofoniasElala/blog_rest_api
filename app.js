import express from 'express';
import path from 'path';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import tagRouter from './routes/tag.js';
import postRouter from './routes/post.js';
import 'dotenv/config';

const mongoDB = process.env.MONGODB_URI;
async function main() {
    await mongoose.connect(mongoDB);
}
main().catch((err) => {console.log(err)});

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: allow lists on cors?
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/tags', tagRouter);
app.use('/', indexRouter);

app.listen(PORT, ()=> {
    console.log('app listening on port 3000!');
});

/** app.on('error', onError);

**
 * Event listener for HTTP server "error" event.
 *

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof PORT === 'string'
      ? 'Pipe ' + PORT
      : 'Port ' + PORT;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  } */