"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var path_1 = __importDefault(require("path"));
var cellls_1 = require("./routes/cellls");
var serve = function (port, filename, dir, useProxy) {
    var app = (0, express_1.default)();
    //while doing active development
    if (useProxy) {
        //We can make a request from our browser over to our local api and  have it get routed automatically over  to our running react app development server
        //Whenever we recieve a request from the broswer that is not to fetch some cells or it's trying to save a list of cells then we will just assume it is some request
        //that is intended to go over to our create react app and get development files  so proxy that request to localhost 3000
        //We are using a proxy so we can access 
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else { //WHile installed in a users machine
        //absolute path to get to that index.html file
        var packagePath = require.resolve('local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath))); //we want path upto build directory     
    }
    app.use((0, cellls_1.createCellsRouter)(filename, dir));
    //If everything goes well it will get resolved and it will work as it should be else if there's an error it will throw an error which can be caught in try catch block
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
