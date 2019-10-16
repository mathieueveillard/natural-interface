import { isPromise, noop } from "./util";

interface NaturalLanguageEnhancement<T> {
  [s: string]: NaturalLanguage<T>;
}

export type NaturalLanguage<T> = T & NaturalLanguageEnhancement<T>;

interface ActOrAssertFunction {
  (...args: any[]): void;
}

interface AsyncActOrAssertFunction {
  (...args: any[]): Promise<void>;
}

interface Matcher {
  expect?: boolean;
  no?: boolean;
  functionName?: string;
}

function modulateFunction(
  fn: ActOrAssertFunction | AsyncActOrAssertFunction,
  { expect, no, functionName }: Required<Matcher>
): ActOrAssertFunction | AsyncActOrAssertFunction {
  function throwError(): void {
    throw new Error(
      `Assertion failure: the assertion implemented by "${functionName}()" succeeded though it shouldn't have due to the "not" keyword.`
    );
  }
  return new Proxy(fn, {
    apply: function(_target, _thisArg, args) {
      if (expect && no) {
        try {
          const result: void | Promise<void> = fn(...args);
          if (isPromise(result)) {
            return result.then(throwError, noop);
          }
        } catch (error) {
          return;
        }
        throwError();
      }
      return fn(...args);
    }
  });
}

export function withNaturalLanguage<T extends Object>(object: T, matcher: Matcher = {}): NaturalLanguage<T> {
  const { expect, no } = {
    expect: false,
    no: false,
    ...matcher
  };

  // @ts-ignore
  return new Proxy(object, {
    get: function(target, property: keyof T) {
      if (["expect", "assert", "should"].includes(property as string)) {
        return withNaturalLanguage<T>(object, { expect: true, no });
      }
      if (property === "not") {
        return withNaturalLanguage<T>(object, { expect, no: !no });
      }
      if (target[property] === undefined) {
        return withNaturalLanguage<T>(object, { expect, no });
      }
      const matcher: Required<Matcher> = {
        expect,
        no,
        functionName: property.toString()
      };
      return modulateFunction((target[property] as unknown) as ActOrAssertFunction, matcher);
    }
  });
}
