import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ValidationPipe } from '../../../src/pipes/validation-pipe';
import { EnvironmentService } from '../../../src/modules/environment/environment-service';
import { EnvironmentModule } from '../../../src/modules/environment/environment-module';
import { DatabaseModule } from '../../../src/modules/database/database.module';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../../src/database/database-constants';
import { UserModule } from '../../../src/modules/user/user-module';

describe('User (e2e)', () => {
  let app: INestApplication;
  let environmentService: EnvironmentService;
  let sequelizeInstance: Sequelize;
  let token: string;

  const testUser = {
    email: 'test-user@gmail.com',
    password: 'Testpass123',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule, EnvironmentModule],
    }).compile();

    sequelizeInstance = module.get<any>(SEQUELIZE);
    app = module.createNestApplication();
    environmentService = await app.get<EnvironmentService>(EnvironmentService);

    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await sequelizeInstance.query(`DELETE FROM users WHERE email='${testUser.email}'`);
  });

  it(`POST /users/signup - success`, async done => {
    const response: any = await request(app.getHttpServer())
      .post('/users/signup')
      .send(testUser);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toHaveProperty('accessToken');

    done();
  });

  it(`POST /users/signup - validation error`, async done => {
    const invalidUser = { ...testUser, password: '111' };
    const response: any = await request(app.getHttpServer())
      .post('/users/signup')
      .send(invalidUser);

    expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body[0].message).toBe('password must be longer than or equal to 8 characters');

    done();
  });

  it(`POST /users/login - success`, async done => {
    const response: any = await request(app.getHttpServer())
      .post('/users/login')
      .send(testUser);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('accessToken');
    token = response.body.accessToken;

    done();
  });

  it(`POST /users/login - invalid login or password`, async done => {
    const invalidUser = { ...testUser, password: 'Testpass1777' };
    const response: any = await request(app.getHttpServer())
      .post('/users/login')
      .send(invalidUser);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body[0].message).toBe('Invalid email or password');

    done();
  });

  it(`GET /users/me - success`, async done => {
    const response: any = await request(app.getHttpServer())
      .get('/users/me')
      .set({ Authorization: token });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe(testUser.email);

    done();
  });

  it(`GET /users/me - unauthorized`, async done => {
    const response: any = await request(app.getHttpServer())
      .get('/users/me');

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    expect(response.body[0].message).toBe('Unauthorized');

    done();
  });

  afterAll(async () => {
    await app.close();
  });
});
