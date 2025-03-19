"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermissionSchema = exports.CreatePermissionSchema = void 0;
const zod_1 = require("zod");
exports.CreatePermissionSchema = zod_1.z.object({
    nombre: zod_1.z.string()
});
exports.UpdatePermissionSchema = zod_1.z.object({
    id: zod_1.z.number(),
    nombre: zod_1.z.string(),
});
