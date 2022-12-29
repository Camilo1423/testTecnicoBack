import { app } from './app.js';

// settings
app.set('port', process.env.PORT || 5000)
app.set('json spaces', 2)
console.log(`server run in http://localhost:${app.get('port')}`);

app.listen(app.get('port'))