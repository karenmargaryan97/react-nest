"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path_1 = require("path");
const process_1 = require("process");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./modules/app-module");
const swagger_2 = require("./config/swagger");
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_2.swaggerOptions);
    fs.ensureDirSync(path_1.join(process_1.cwd(), 'dist/openapi'));
    fs.writeJsonSync(path_1.join(process_1.cwd(), 'dist', 'openapi', 'api-doc.json'), document, { spaces: 2 });
    process.exit(0);
})();
//# sourceMappingURL=doc-generator.js.map