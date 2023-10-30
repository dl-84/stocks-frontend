export interface StockLiveDataDto {
    /**
     * Data.
     * 
     * The stock live data content.
     */
    data: StockLiveDataContentDto[]

    /**
     * Type.
     * 
     * The type from the delivered websocket message.
     */
    type: string
}

export interface StockLiveDataContentDto {
    /**
     * P.
     * 
     * Represent the last price of the stock.
     */
    p: number

    /**
     * S.
     * 
     * Represent the symbol of the stock.
     */
    s: string

    /**
     * T.
     * 
     * Represent the unix timestamp of the stock.
     */
    t: number

    /**
     * V.
     * 
     * Represent the volume of the stock.
     */
    v: number
}