import { withNaturalLanguage } from "../";

class Model {
  booleanToBeTrue = b => {
    expect(b).toBe(true);
  };
}

it("should make assertions on booleans", () => {
  const model = withNaturalLanguage(new Model());
  model.expect.booleanToBeTrue(true);
  model.expect.not.booleanToBeTrue(false);
});
