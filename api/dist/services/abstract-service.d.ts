import { Model, Repository } from 'sequelize-typescript';
import { IncludeOptions, Transaction, WhereOptions } from 'sequelize';
import { IAbstractService, IFindOptions } from './interfaces';
export declare abstract class AbstractService<T extends Model<T>> implements IAbstractService<T> {
    private readonly repository;
    protected constructor(repository: Repository<T>);
    getAll({ where, order, attributes, offset, limit, raw, }?: IFindOptions, include?: IncludeOptions[]): Promise<T[]>;
    get({ where, attributes, }?: IFindOptions, include?: IncludeOptions[]): Promise<any>;
    create(entity: object, where?: WhereOptions, transaction?: Transaction): Promise<T>;
    update(id: number | string, values: object, transaction?: Transaction): Promise<T>;
    delete({ where }: {
        where?: {};
    }, transaction?: Transaction): Promise<void>;
}
