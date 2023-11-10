"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ngrok_1 = __importDefault(require("ngrok"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const errorHandler = (err, req, res, next) => {
    console.error(err.mesage);
    res.status(500).send('Something broke!');
};
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listener = yield ngrok_1.default.connect({
            addr: port,
            authtoken_from_env: true,
        });
        console.log(`Ingress established at ${listener}`);
    }
    catch (err) {
        console.error(err);
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listener = yield connect();
        app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
        app.use(body_parser_1.default.json());
        app.use(errorHandler);
        app.get("/", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "./index.html"));
        });
        app.get("/basic", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "./analyze-this.gif"));
        });
        app.get("/oauth", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "./have-a-good-day.gif"));
        });
        app.listen(port, () => console.log(`Listening on port ${port}!`));
    }
    catch (err) {
        console.error(err);
        throw new Error("Issue starting server");
    }
});
startServer();
