import { objectValueByString } from "../functions";

describe("objectValueByString", () => {
  it("show correct value of object by string", () => {
    const obj = { path: { to: { name: "here!" } } };
    const str = "path.to.name";

    expect(objectValueByString(obj, str)).toEqual("here!");
  });
});
