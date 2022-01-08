const express = require('express');
const cors = require('cors');

const PORT = 5000;

const app = express();

app.use(cors());

app.get('get-messages', (req, res) => {
    
});

app.post('new-messages', (req, res) => {
    const message = req.body;
    req.statusCode(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
