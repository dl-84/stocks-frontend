import { Token } from "./token";

export class Websocket {
    /**
     * Finnhub.
     * 
     * The connection to the finnhub websocket.
     */
    public static readonly finnhub: string =
        `wss://ws.finnhub.io?token=${Token.finnhub}`;
}