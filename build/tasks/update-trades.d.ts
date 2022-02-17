/// <reference types="node" />
import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import { DatabaseTrade } from '../interfaces';
import { EventEmitter } from 'events';
export declare class UpdateTrades extends EventEmitter {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}
