import { PageName } from '../enums/pages-names';
import { FormElementType } from './form-element-type';
import { ICurrency } from './cuurency-type';

function getCurrencies(from: ICurrency[]) {
  // const titles = [] as any[];
  // from.map((item) => titles.push(item.title));
  // return ['All', ...titles];
  return [];
}

export class currencyExchangerFormTypes {
  public amount: FormElementType<string>;
  public from: FormElementType<any[]>;
  public to: FormElementType<any[]>;
  public result: FormElementType<string>;
  public approxResult: FormElementType<string>;

  constructor(to: ICurrency[], from: ICurrency[]) {
    this.amount = new FormElementType(
      'amount',
      'amount',
      'string',
      'number',
      '',
      '',
      'order:1',
      '',
      true,
      '',
      true,
      true
    );

    this.from = new FormElementType(
      'from',
      'from',
      'dropdown',
      'dropdown',
      getCurrencies(from),

      'Select first currency',
      'order:2'
    );

    this.to = new FormElementType(
      'to',
      'to',
      'dropdown',
      'dropdown',
      getCurrencies(to),

      'Select third currency',
      'order:3'
    );

    this.result = new FormElementType(
      '',
      'result',
      'string',
      'string',
      '',
      '',
      'order:4',
      '',
      true,
      '',
      true,
      true
    );

    this.approxResult = new FormElementType(
      '',
      'approxResult',
      'string',
      'string',
      '',
      '',
      'order:5',
      '',
      true,
      '',
      true,
      true
    );
  }
}
