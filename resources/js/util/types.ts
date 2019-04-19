export interface Inputs {
  [key: string]: string;
}

export interface Errors {
  [key: string]: string[];
}
export interface Rules {
  [key: string]: {
    [key: string]: any,
  }
}