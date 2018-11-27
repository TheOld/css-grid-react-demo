// @flow

declare module 'NaturalForm' {
  declare type Fields = {
    fields: Array<Field>,
    isExample: ?boolean,
  };

  declare type Field = {
    id: string,
    label: string,
    name: string,
    options: Array<any>,
    order: int,
    placeholder?: string,
    required: boolean,
    type: string,
  };
}
