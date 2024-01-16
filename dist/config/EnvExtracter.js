"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configEnv = void 0;
const dotenv_1 = require("dotenv");
const configEnv = () => {
    (0, dotenv_1.config)({
        path: `src/config/.env`,
    });
    const Mode = process.env.MODE;
    (0, dotenv_1.config)({
        path: `src/config/${Mode}.env`,
    });
    console.log(`app is ruuning in ${Mode} mode`);
};
exports.configEnv = configEnv;
