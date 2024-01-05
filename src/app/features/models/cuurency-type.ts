export interface ICurrency {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
}

export interface ISymbol {
  success: boolean;

  symbols: {
    [currencyCode: string]: string;
  };
}
