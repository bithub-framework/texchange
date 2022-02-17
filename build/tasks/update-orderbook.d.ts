/// <reference types="node" />
import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import { Orderbook } from '../interfaces';
import { EventEmitter } from 'events';
export declare class UpdateOrderbook extends EventEmitter {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
