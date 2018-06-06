import { BaseEntity } from './../../shared';

export const enum QuestionSubject {
    'PERSONNALITE_QUOTIDIEN',
    'FAMILLE_PROJETS',
    'PROFILE_RECHERCHE'
}

export const enum QuestionType {
    'BINAIRE',
    'MULTIPLE',
    'LIBRE'
}

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public questionSubject?: QuestionSubject,
        public question?: string,
        public questionType?: QuestionType,
        public defaultResponses?: BaseEntity[],
        public reponses?: BaseEntity[],
    ) {
    }
}
