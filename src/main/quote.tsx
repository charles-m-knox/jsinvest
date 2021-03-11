import axios from 'axios';

const TransformQuote = (quote: RawQuote): Quote => {
    const tQuote: Quote = {
        rawQuote: quote,
        price: 0.0,
        change: 0.0,
        changePercent: 0.0,
        isActive: false,
        isRegularTradingSession: false,
    };

    if (quote.marketState === "REGULAR") {
        tQuote.price = quote.regularMarketPrice;
        tQuote.change = quote.regularMarketChange;
        tQuote.changePercent = quote.regularMarketChangePercent;
        tQuote.isActive = true;
        tQuote.isRegularTradingSession = true;
        return tQuote;
    }

    if (quote.marketState === "POST" && quote.postMarketPrice === 0.0) {
        tQuote.rawQuote = quote;
        tQuote.price = quote.regularMarketPrice;
        tQuote.change = quote.regularMarketChange;
        tQuote.changePercent = quote.regularMarketChangePercent;
        tQuote.isActive = true;
        tQuote.isRegularTradingSession = false;
        return tQuote;
    }

    if (quote.marketState === "PRE" && quote.preMarketPrice === 0.0) {
        tQuote.rawQuote = quote;
        tQuote.price = quote.regularMarketPrice;
        tQuote.change = quote.regularMarketChange;
        tQuote.changePercent = quote.regularMarketChangePercent;
        tQuote.isActive = false;
        tQuote.isRegularTradingSession = false;
        return tQuote;
    }

    if (quote.marketState === "POST") {
        tQuote.rawQuote = quote;
        tQuote.price = quote.postMarketPrice;
        tQuote.change = quote.postMarketChange + quote.regularMarketChange;
        tQuote.changePercent = quote.postMarketChangePercent + quote.regularMarketChangePercent;
        tQuote.isActive = true;
        tQuote.isRegularTradingSession = false;
        return tQuote;
    }

    if (quote.marketState === "PRE") {
        tQuote.rawQuote = quote;
        tQuote.price = quote.preMarketPrice;
        tQuote.change = quote.preMarketChange;
        tQuote.changePercent = quote.preMarketChangePercent;
        tQuote.isActive = true;
        tQuote.isRegularTradingSession = false;
        return tQuote;
    }

    if (quote.postMarketPrice !== 0.0) {
        tQuote.rawQuote = quote;
        tQuote.price = quote.postMarketPrice;
        tQuote.change = quote.postMarketChange + quote.regularMarketChange;
        tQuote.changePercent = quote.postMarketChangePercent + quote.regularMarketChangePercent;
        tQuote.isActive = false;
        tQuote.isRegularTradingSession = false;
        return tQuote;
    }

    tQuote.rawQuote = quote;
    tQuote.price = quote.regularMarketPrice;
    tQuote.change = quote.regularMarketChange;
    tQuote.changePercent = quote.regularMarketChangePercent;
    tQuote.isActive = false;
    tQuote.isRegularTradingSession = false;
    return tQuote;
}

export const GetQuotes = (symbols: string[], useYahooDirect: boolean = false): Promise<Quote[] | never[] | undefined> => {
    let url = `https://873laarwv8.execute-api.us-west-2.amazonaws.com/?symbols=${symbols.join(',')}`;
    if (useYahooDirect === true) {
        url = `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${symbols.join(',')}`;
    }

    return axios.get(url).then(res => {
        const response: APIResponse = res.data;
        if (response.quoteResponse.result) {
            const results: Quote[] = [];
            response.quoteResponse.result.forEach((rq: RawQuote) => {
                const tq = TransformQuote(rq);
                console.log(tq);
                results.push(tq);
            })
            return results;
        }
    }).catch(err => {
        console.error(err);
        return [];
    })
}

export interface Quote {
    rawQuote: RawQuote;
    price: number;
    change: number;
    changePercent: number;
    isActive: boolean;
    isRegularTradingSession: boolean;
}

// http://www.json2ts.com/#
export interface RawQuote {
    language: string;
    region: string;
    quoteType: string;
    quoteSourceName: string;
    triggerable: boolean;
    currency: string;
    marketState: string;
    messageBoardId: string;
    exchangeTimezoneName: string;
    exchangeTimezoneShortName: string;
    gmtOffSetMilliseconds: number;
    market: string;
    esgPopulated: boolean;
    tradeable: boolean;
    exchange: string;
    shortName: string;
    longName: string;
    firstTradeDateMilliseconds: any;
    priceHint: number;

    // may or may not be present depending on when the API is hit
    exchangeName: string;
    exchangeDelay: number;
    preMarketChange: number;
    preMarketChangePercent: number;
    preMarketPrice: number;

    postMarketChangePercent: number;
    postMarketTime: number;
    postMarketPrice: number;
    postMarketChange: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: number;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    bid: number;
    ask: number;
    bidSize: number;
    askSize: number;
    fullExchangeName: string;
    financialCurrency: string;
    regularMarketOpen: number;
    averageDailyVolume3Month: number;
    averageDailyVolume10Day: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    earningsTimestamp: number;
    earningsTimestampStart: number;
    earningsTimestampEnd: number;
    trailingPE: number;
    epsTrailingTwelveMonths: number;
    epsForward: number;
    epsCurrentYear: number;
    priceEpsCurrentYear: number;
    sharesOutstanding: number;
    bookValue: number;
    fiftyDayAverage: number;
    fiftyDayAverageChange: number;
    fiftyDayAverageChangePercent: number;
    twoHundredDayAverage: number;
    twoHundredDayAverageChange: number;
    twoHundredDayAverageChangePercent: number;
    marketCap: any;
    forwardPE: number;
    priceToBook: number;
    sourceInterval: number;
    exchangeDataDelayedBy: number;
    displayName: string;
    symbol: string;
    dividendDate?: number;
    trailingAnnualDividendRate?: number;
    trailingAnnualDividendYield?: number;
    [key: string]: any; // allows for values we haven't specified above
}

export interface QuoteResponse {
    result: RawQuote[];
    error?: any;
}

export interface APIResponse {
    quoteResponse: QuoteResponse;
}
