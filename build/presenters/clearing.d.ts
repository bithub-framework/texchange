import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
}
export declare class Clearing {
    private hub;
    constructor(hub: Deps);
    settle(): void;
}
export {};
