export enum ActionType {
  numeric,
  operator,
  decimal,
  evaluate,
  clear,
  none
}

export class InputType {
  type: ActionType = ActionType.none;
  value: string = '';
}

export function inputType(input: HTMLElement): InputType {
  const inputObj: InputType = new InputType();
  const type = input.dataset.type || '';
  inputObj.type = ActionType[type];
  inputObj.value = input.dataset[type] || '';
  if (inputObj.type === ActionType.numeric) {
    inputObj.value = input.textContent || '';
  }
  if (inputObj.type === ActionType.operator) {
    inputObj.value = input.dataset.operator || '';
  }
  return inputObj;
}