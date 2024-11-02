"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./models/controllers/routes/userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./models/controllers/routes/thoughtRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/thoughts', thoughtRoutes_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB')
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Database connection error:', error));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
