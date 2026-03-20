require('dotenv').config();
const e = require('express');
const c = require('cors');
const { wrapper } = require('axios-cookiejar-support');
const a = require('axios').default;

wrapper(a);

const app = e();
app.use(c());

const port = process.env.PORT || 3000;

app.use('/fetch', require('./routes/fetch'));
app.use('/search', require('./routes/search'));

app.listen(port, () => console.log(`running on port ${port}`));
