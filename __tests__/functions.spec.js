import {
  getKeyFromValue,
  getNewMap,
  objectValueByString,
  writeTemporaryConsoleLine,
} from "../functions";
import {
  MockOriginalObject,
  MockRefactoredObject,
  MockResultObject,
} from "./mockData.js";

describe(objectValueByString, () => {
  it("show correct value of object by string", () => {
    const obj = { path: { to: { name: "here!" } } };
    const str = "path.to.name";

    expect(objectValueByString(obj, str)).toEqual("here!");
  });

  it("works with more complex objects", () => {
    const obj = {
      path: {
        wrongPath: "not here",
        notHere: ["wrong path"],
        to: {
          wrong: { invalid: "path" },
          bad: 0,
          name: "correct!",
        },
      },
    };
    const str = "path.to.name";

    expect(objectValueByString(obj, str)).toEqual("correct!");
  });
});

describe(getKeyFromValue, () => {
  it("Finds a key and returns a string", () => {
    const map = new Map([
      ["key1", 1],
      ["key2", 2],
      ["key3", 3],
    ]);

    expect(getKeyFromValue(map, 1)).toEqual("key1");
    expect(getKeyFromValue(map, 2)).toEqual("key2");
    expect(getKeyFromValue(map, 3)).toEqual("key3");
  });

  it("Does not find a key and returns undefined", () => {
    const map = new Map([
      ["key1", 1],
      ["key2", 2],
      ["key3", 3],
    ]);

    expect(getKeyFromValue(map, "value")).toBeUndefined();
  });
});

describe(getNewMap, () => {
  it("Returns a map with the bindings", () => {
    const original = new Map(Object.entries(MockOriginalObject));
    const refactored = new Map(Object.entries(MockRefactoredObject));

    const result = new Map([["LANGUAGES", MockResultObject]]);

    expect(getNewMap(original, refactored)).toEqual(result);
  });
});

// TODO: Implement the writeTemporaryConsoleLine tests
describe(writeTemporaryConsoleLine, () => {
  afterAll(() => {
    jest.clearMocks();
  });

  it("Format the console correctly", () => {
    // writeTemporaryConsoleLine("Text to console");
    // expect(process.stdout.clearLine).toBeCalled();
    // expect(process.stdout.write).toBeCalledWith("Text to console");
    // expect(process.stdout.cursorTo).toBeCalledWith(0);
  });
});
