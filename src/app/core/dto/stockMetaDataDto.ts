export interface StockMetaDataDto {
    /**
     * Dashboard id.
     * 
     * The dashboard in which should the stock value displayed.
     */
    dashboardId: number,

    /**
     * Currency.
     * 
     * Represent the currency of the stock.
     */
    currency: string

    /**
     * Description.
     * 
     * The description of the stock.
     */
    description: string

    /**
     * Display symbol.
     * 
     * The display symbol of the stock.
     */
    displaySymbol: string

    /**
     * Figi.
     * 
     * The figi id of the stock.
     */
    figi: string

    /**
     * Isin.
     * 
     * The isin value of the stock.
     */
    isin: string

    /**
     * Mic.
     * 
     * The mic value of the stock.
     */
    mic: string

    /**
     * Share class figi.
     * 
     * The share class figi value of the stock.
     */
    shareClassFIGI: string

    /**
     * Symbol.
     * 
     * The symbole value of the stock.
     */
    symbol: string

    /**
     * Symbol 2.
     * 
     * The symbole 2 value of the stock.
     */
    symbol2: string

    /**
     * Type.
     * 
     * The type of the stock.
     */
    type: string
}