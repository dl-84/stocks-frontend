export class Url {
    /**
     * Dashboard.
     * 
     * The url to the dashboard controller in the backend.
     */
    public static readonly dashbord: string =
        'http://localhost:3000/api/dashboard';

    /**
    * Stock.
    * 
    * The url to the stock controller in the backend.
    */
    public static readonly stock: string =
        'http://localhost:3000/api/stock';

    /**
     * Available stocks.
     * 
     * The url to the finnhub api that deliver all availible stock
     * from the us market.
     */
    public static readonly availableStocks: string =
        'https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS';
}