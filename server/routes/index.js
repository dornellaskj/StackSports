import express from 'express';
import home from './homePage';

const app = express();

//app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', home);

app.listen(80, () => {
  console.log('Stack Sports listening on port 80!');
});
