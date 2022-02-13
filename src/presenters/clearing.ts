import {
    Length,
} from '../interfaces';
import { type Hub } from '../hub';


export class Clearing {
    constructor(private hub: Hub) { }

    public settle(): void {
        const { calculation } = this.hub.context;
        const { assets, mtm, margin } = this.hub.models;

        const position = {
            [Length.LONG]: assets.position[Length.LONG],
            [Length.SHORT]: assets.position[Length.SHORT],
        };
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = calculation.dollarVolume(
                mtm.getSettlementPrice(), position[length],
            ).round(this.hub.context.config.CURRENCY_DP);
            const profit = assets.closePosition(
                length, position[length], dollarVolume,
            );
            assets.openPosition(
                length, position[length], dollarVolume,
            );
            margin[length] = calculation.ClearingMargin(length, profit);
        }
        calculation.assertEnoughBalance();
    }
}
