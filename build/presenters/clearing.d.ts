import { type Hub } from '../hub';
export declare class Clearing {
    private hub;
    constructor(hub: Hub);
    settle(): void;
}
