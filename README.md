# natural-interface

In the context of tests using a page model (see [here](https://medium.com/tech-tajawal/page-object-model-pom-design-pattern-f9588630800b) and [here](https://martinfowler.com/bliki/PageObject.html)), `natural-interface` allows you to write tests in natural language.

`natural-interface` has no effect on methods used during the "arrange" or "act" steps of the test. It is relevant only for the "assert" step. Also, `natural-interface` works with every test runner that relies on exceptions internally.

## Installation

```
npm i -D natural-interface
```

## Usage

Assuming the following page model:

```JavaScript
class Model {
  expectBooleanToBeTrue = b => {
    expect(b).toBe(true);
  };

  expectBooleanToBeFalse = b => {
    expect(b).toBe(false);
  };
}
```

and the following test:

```JavaScript
it("should make assertions on booleans", () => {
  const model = new Model();
  model.expectBooleanToBeTrue(true);
  model.expectBooleanToBeFalse(false);
});
```

it is now possible to write:

```JavaScript
class Model {
  booleanToBeTrue = b => {
    expect(b).toBe(true);
  };
}
```

```JavaScript
import { withNaturalLanguage } from "natural-interface";

it("should make assertions on booleans", () => {
  const model = withNaturalLanguage(new Model());
  model.expect.booleanToBeTrue(true);
  model.expect.not.booleanToBeTrue(false);
});

```

This, of course, if a contrived example. Making assertions on booleans whithout business context is not a real world scenario.