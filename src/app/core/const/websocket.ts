import { Token } from "./token";

export class Websocket {
    public static readonly finnhub: string =
        `wss://ws.finnhub.io?token=${Token.finnhub}`;
}