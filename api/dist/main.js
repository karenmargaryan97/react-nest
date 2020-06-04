"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app-module");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("./pipes/validation-pipe");
const exception_filter_1 = require("./exceptions/filter/exception-filter");
const swagger_2 = require("./config/swagger");
const database_service_1 = require("./modules/database/database-service");
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: '*',
        allowedHeaders: ['Content-Type', 'authorization'],
    });
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalFilters(new exception_filter_1.HttpExceptionFilter());
    const databaseService = await app.get(database_service_1.DatabaseService);
    await databaseService.executePendingMigrations();
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_2.swaggerOptions);
    swagger_1.SwaggerModule.setup('/api/swagger', app, document);
    await app.listen(process.env.PORT || 8080);
})();
//# sourceMappingURL=main.js.map