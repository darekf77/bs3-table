import { TableConfig } from './table-config.class';

export interface ArrayRepsonse<R> {
    content: R[];
    config: TableConfig;
};

