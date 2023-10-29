export interface StockLiveDataDto {
    data: StockLiveDataContentDto[]
    type: string
}

export interface StockLiveDataContentDto {
    p: number
    s: string
    t: number
    v: number
}