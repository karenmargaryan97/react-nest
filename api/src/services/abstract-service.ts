import { Model, Repository } from 'sequelize-typescript';
import { throwException } from '../helpers/throw-exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DestroyOptions, IncludeOptions, Transaction, UpdateOptions, WhereOptions } from 'sequelize';
import { IAbstractService, IFindOptions } from './interfaces';
import { Exception } from '../exceptions/base-exception';
import { FindOrCreateOptions } from 'sequelize';
import { alreadyExists } from '../exceptions/constants';

@Injectable()
export abstract class AbstractService<T extends Model<T>> implements IAbstractService<T> {
  protected constructor(private readonly repository: Repository<T>) {}

  async getAll(
    {
      where = {},
      order = [],
      attributes = null,
      offset = 0,
      limit = 20,
      raw = false,
    }: IFindOptions = {},
    include: IncludeOptions[] = [],
  ): Promise<T[]> {
    try {
      return this.repository.findAll({
        where,
        order,
        attributes,
        offset,
        limit,
        include,
        raw,
      });
    } catch (e) {
      console.error(`Error: CRUD service - ${this.repository.name}[getAll]: `, e);
      throwException(e);
    }
  }

  async get(
    {
      where = {},
      attributes = null,
    }: IFindOptions = {},
    include: IncludeOptions[] = []) {
    try {
      return await this.repository.findOne({
        where,
        attributes,
        include,
      });
    } catch (e) {
      console.error(`Error: CRUD service - ${this.repository.name}[get]: `, e);
      throwException(e);
    }
  }

  async create(entity: object, where: WhereOptions = {}, transaction?: Transaction): Promise<T> {
    try {
      const options: FindOrCreateOptions = {
        where,
        defaults: entity,
      };

      if (transaction) {
        options.transaction = transaction;
      }

      const [instance, created] = await this.repository.findOrCreate(options);
      if (!created) {
        throw new Exception(alreadyExists(`${this.repository.name} with id: ${instance.id}`));
      }

      return instance;
    } catch (e) {
      console.error(`Error: CRUD service - ${this.repository.name}[create]: `, e);
      throwException(e);
    }
  }

  async update(id: number | string, values: object, transaction?: Transaction): Promise<T> {
    try {
      const options: UpdateOptions = {
        where: { id },
        returning: true,
      };

      if (transaction) {
        options.transaction = transaction;
      }
      const [updated, [instance]] = await this.repository.update(values, options);
      if (!updated) {
        throw new Exception('Update error', HttpStatus.BAD_REQUEST);
      }

      return instance;
    } catch (e) {
      console.error(`Error: CRUD service - ${this.repository.name}[update]: `, e);
      throwException(e);
    }
  }

  async delete({ where = {} }, transaction?: Transaction): Promise<void> {
    try {
      const options: DestroyOptions = { where };
      if (transaction) {
        options.transaction = transaction;
      }

      await this.repository.destroy(options);
    } catch (e) {
      console.error(`Error: CRUD service - ${this.repository.name}[delete]: `, e);
      throwException(e);
    }
  }
}
