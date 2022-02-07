"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema = new mongoose_1.default.Schema({
    content: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    user: { type: String, required: true },
    likes: { type: Number, default: 0 },
    replies: { type: Array, default: [] },
    likedByUsers: { type: Array, default: [] },
    tags: { type: Array, default: [] },
    topics: { type: Array, default: [] }
});
exports.default = TuitSchema;
