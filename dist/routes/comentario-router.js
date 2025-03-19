"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../error-handler");
const comentario_1 = require("../controllers/comentario");
const multer_1 = __importDefault(require("../config/multer"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const comentarioRouter = (0, express_1.Router)();
comentarioRouter.post('/', multer_1.default.array("imagenes", 2), [auth_1.default], (0, error_handler_1.errorHandler)(comentario_1.AddComment));
exports.default = comentarioRouter;
