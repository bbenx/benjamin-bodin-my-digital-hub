import { describe, expect, it } from "vitest";
import { pinLatestPublished } from "./book-order";

describe("pinLatestPublished", () => {
  it("place les trois dernières publiées devant et mélange le reste", () => {
    const items = ["a", "b", "c", "d", "e", "f"];
    const result = pinLatestPublished(items, () => 0);

    expect(result.slice(0, 3)).toEqual(["f", "e", "d"]);
    expect(result.slice(3).sort()).toEqual(["a", "b", "c"]);
    expect(items).toEqual(["a", "b", "c", "d", "e", "f"]);
  });

  it("met la plus récente devant quand il y a moins de trois photos", () => {
    expect(pinLatestPublished(["a", "b"], () => 0.9)).toEqual(["b", "a"]);
    expect(pinLatestPublished(["a"], () => 0.9)).toEqual(["a"]);
  });
});
