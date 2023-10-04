"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});
// Middleware to parse JSON
app.use(express_1.default.json());
// Mocked user data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // Add more users as needed
];
// Route: Home
app.get('/', (req, res) => {
    res.send('Hello, this is your TypeScript API!');
});
// Route: API version
app.get('/api/version', (req, res) => {
    res.json({ version: '1.0' });
});
// Route: Echo request body
app.post('/api/echo', (req, res) => {
    const { body } = req;
    res.json({ echo: body });
});
// Route: Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});
// Route: Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
