export interface RuleChecker {
  (value: string, num?: number): string | void;
}

export interface ValidatorIF {
  [key: string]: RuleChecker;
}

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