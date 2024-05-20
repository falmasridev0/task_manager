const app = require('./app');

const PORT = process.env.PORT || 3002;

// Start the server 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
