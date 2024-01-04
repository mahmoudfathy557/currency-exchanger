/* eslint-disable @typescript-eslint/no-explicit-any */
export class FormElementType<T> {
  public label: string;
  public elementName: string;
  public elementType: string;
  public innerElementType: string;
  public fieldValue?: T;
  public placeholder?: string;
  public styles?: string;
  public visibleField?: string;
  public requiredField?: boolean;
  public foreignKey?: string;
  public isVisibleField?: boolean;
  public isDisabledField!: boolean;

  constructor(
    label: string = '',
    elementName: string = '',
    elementType: string = '',
    innerElementType: string = '',
    fieldValue: T,
    placeholder: string = '',
    styles: string = '',
    visibleField: string = '',
    requiredField: boolean = false,
    foreignKey: string = '',
    isVisibleField: boolean = true,
    isDisabledField: boolean = false
  ) {
    this.label = label;
    this.elementType = elementType;
    this.innerElementType = innerElementType;
    this.elementName = elementName;
    this.placeholder = placeholder;
    this.fieldValue = fieldValue;
    this.styles = styles;
    this.visibleField = visibleField;
    this.requiredField = requiredField;
    this.foreignKey = foreignKey;
    this.isVisibleField = isVisibleField;
    this.isDisabledField = isDisabledField;
  }
}
