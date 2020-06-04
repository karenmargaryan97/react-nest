"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerOptions = new swagger_1.DocumentBuilder()
    .setTitle('App')
    .setDescription('Nest.js/React.js app')
    .setVersion('0.1.0')
    .addTag('Api', 'Application purpose')
    .addTag('Nest.js', 'Framework')
    .build();
//# sourceMappingURL=swagger.js.map