"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../entities/User.model");
const ApiError_1 = __importDefault(require("./ApiError"));
const getUserFromToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", process.env.JWT_SECRET_KEY);
        // 3) Check if user exists
        const currentUser = await User_model_1.User.findOne({
            where: { id: decoded?.userId },
            select: [
                "id",
                "username",
                "email",
                "gender",
                "phoneNumber",
                "birthDate",
                "imageUrl",
            ],
        });
        return { currentUser, decoded };
    }
    catch (error) {
        throw new ApiError_1.default("unauthorized", 401);
    }
};
exports.getUserFromToken = getUserFromToken;
