export enum ActionType {
  numeric,
  operator,
  decimal,
  evaluate,
  clear,
  none
}

export interface InputType {
  type: ActionType,
  value: string
}

export function inputType(input: HTMLElement) {
  const inputObj: InputType = {
    type: ActionType.none,
    value: '',
  };

  const inputType = input.dataset.type as string;
  inputObj.type = ActionType[inputType];
  inputObj.value = input.dataset[inputType] as string;

  if (inputObj.type === ActionType.numeric) {
    inputObj.value = input.textContent as string;
  }
  if (inputObj.type === ActionType.operator) {
    inputObj.value = input.dataset.operator as string;
  }
  return inputObj;
}