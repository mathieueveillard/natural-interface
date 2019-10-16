class Model {
  expectBooleanToBeTrue = b => {
    expect(b).toBe(true);
  };

  expectBooleanToBeFalse = b => {
    expect(b).toBe(false);
  };
}

it("should make assertions on booleans", () => {
  const model = new Model();
  model.expectBooleanToBeTrue(true);
  model.expectBooleanToBeFalse(false);
});
