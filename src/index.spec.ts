import { withNaturalLanguage, NaturalLanguage } from ".";

class Model {
  act = (): void => {
    // do something
  };

  booleanToBeTrue = (b: boolean): void => {
    expect(b).toBe(true);
  };

  booleanToBeTrueAsync = async (b: boolean): Promise<void> => {
    expect(b).toBe(true);
  };
}

describe("Test suite of withNaturalLanguage()", () => {
  it("should allow to make a simple assertion (expect, assert, should)", () => {
    const model: NaturalLanguage<Model> = withNaturalLanguage(new Model());
    expect(() => model.expect.booleanToBeTrue(true)).not.toThrow();
    expect(() => model.expect.booleanToBeTrue(false)).toThrow();
    expect(() => model.assert.booleanToBeTrue(true)).not.toThrow();
    expect(() => model.assert.booleanToBeTrue(false)).toThrow();
    expect(() => model.should.booleanToBeTrue(true)).not.toThrow();
    expect(() => model.should.booleanToBeTrue(false)).toThrow();
  });

  it("should allow negations", () => {
    const model: NaturalLanguage<Model> = withNaturalLanguage(new Model());
    expect(() => model.expect.not.booleanToBeTrue(false)).not.toThrow();
    expect(() => model.expect.not.booleanToBeTrue(true)).toThrow();
    expect(() => model.assert.not.booleanToBeTrue(false)).not.toThrow();
    expect(() => model.assert.not.booleanToBeTrue(true)).toThrow();
    expect(() => model.should.not.booleanToBeTrue(false)).not.toThrow();
    expect(() => model.should.not.booleanToBeTrue(true)).toThrow();
  });

  it("should allow double negations", () => {
    const model: NaturalLanguage<Model> = withNaturalLanguage(new Model());
    expect(() => model.expect.not.not.booleanToBeTrue(true)).not.toThrow();
    expect(() => model.expect.not.not.booleanToBeTrue(false)).toThrow();
  });

  it("should allow to chain meaningless words", () => {
    const model: NaturalLanguage<Model> = withNaturalLanguage(new Model());
    expect(() => model.expect.meaningless.booleanToBeTrue(true)).not.toThrow();
    expect(() => model.a.b.expect.c.d.booleanToBeTrue(true)).not.toThrow();
  });

  it("should not have any effect on actions", () => {
    const model: NaturalLanguage<Model> = withNaturalLanguage(new Model());
    expect(() => model.act()).not.toThrow();
  });

  it("should allow to make asynchronous assertions", async () => {
    const model: NaturalLanguage<Model> = withNaturalLanguage(new Model());
    await model.expect.booleanToBeTrueAsync(true);
    try {
      await model.expect.booleanToBeTrueAsync(false);
    } catch (error) {}
    await model.expect.not.booleanToBeTrueAsync(false);
    try {
      await model.expect.not.booleanToBeTrueAsync(true);
    } catch (error) {}
  });
});
