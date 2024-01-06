export interface ICurrency {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
}

export interface ICurrency1 {
  result: string;
  base_code: string;
  conversion_rates: { [currencyCode: string]: number };
}

export interface ISymbol {
  success: boolean;

  symbols: {
    [currencyCode: string]: string;
  };
}
