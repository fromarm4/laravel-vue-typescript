import {
  Inputs,
  Errors,
  Rules
} from './types'


class Validator {
  max(value: string, num: number): string | void {
    if (value && value.length > num) {
      return num + "字以内で入力してください。";
    }
  }
  min(value: string, num: number): string | void {
    if (value && value.length < num) {
      return num + "字以上で入力してください。";
    }
  }
  required(value: string): string | void {
    if (value.length === 0) {
      return "必須です！";
    }
  }
}

class CustomValidator extends Validator {
  email(value: string): string | void {
    if (!value.match(/.+@.+\..+/)) {
      return "メールアドレスじゃありません！";
    }
  }
}

export class Form {
  private inputs: Inputs = {};
  private rules: Rules = {};
  errors: Errors = {};
  validator: Validator = new CustomValidator();

  constructor(inputs: Rules) {
    for (let key of Object.keys(inputs)) {
      this.inputs[key] = '';
      this.rules[key] = inputs[key];
    }
    this.initErrors();
  }

  init(): void {
    this.initErrors();
    this.initInputs();
  }
  check(name: string, value: string): void {
    this.errors[name] = [];
    for (let key of Object.keys(this.rules[name])) {
      let ruleChecker = (<any>this.validator)[key];
      if (typeof ruleChecker === "function") {
        let error = <string>ruleChecker(value, this.rules[name][key]);
        if (error) {
          this.errors[name].push(error);
        }
      }
    }
  }
  post(url: string): void {
    for (let key of Object.keys(this.inputs)) {
      this.check(key, this.inputs[key]);
    }
    // this.initInputs();
  }
  cancel(): void {
    this.init();
  }
  hasError(key: string): boolean {
    for (let name of Object.keys(this.rules[key])) {
      if (this.errors[key].length) {
        return true;
      }
    }
    return false;
  }
  hasErrors(): boolean {
    let flag = false;
    for (let key of Object.keys(this.inputs)) {
      flag = this.hasError(key);
    }
    return flag;
  }
  protected initErrors(): void {
    for (let key of Object.keys(this.inputs)) {
      this.errors[key] = [];
    }
  }
  protected initInputs(): void {
    for (let key of Object.keys(this.inputs)) {
      this.inputs[key] = '';
    }
  }
}
