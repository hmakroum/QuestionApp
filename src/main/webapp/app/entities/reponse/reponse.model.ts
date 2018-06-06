import { BaseEntity } from './../../shared';

export class Reponse implements BaseEntity {
    constructor(
        public id?: number,
        public reponse?: string,
        public question?: BaseEntity,
    ) {
    }
}
