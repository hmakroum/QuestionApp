import { BaseEntity } from './../../shared';

export class DefaultResponse implements BaseEntity {
    constructor(
        public id?: number,
        public reponse?: string,
        public question?: BaseEntity,
    ) {
    }
}
