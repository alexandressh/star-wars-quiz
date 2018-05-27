import { Character } from './character';

export interface People {
    next: string;
    previous: string;
    count: number;
    results: Character[];
}