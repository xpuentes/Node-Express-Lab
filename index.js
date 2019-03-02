const express = require('express');
const postRoutes = require('./postRoutes');
const server = express();
const PORT = 8000;

server.use('/api', postRoutes);

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
