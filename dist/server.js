"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
function main() {
    try {
        mongoose_1.default
            .connect(config_1.default.Database_Url)
            .then(() => {
            console.log('Database Connected...');
        })
            .catch(err => console.log(err));
        app_1.default.listen(config_1.default.Port, () => {
            console.log(`server listening port on ${config_1.default.Port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
