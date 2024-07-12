import _ from 'lodash';

export const removeNullKeys = <T extends object>(obj: T): Partial<T> => {
    return _.omitBy(obj, _.isNull) as Partial<T>;
};
