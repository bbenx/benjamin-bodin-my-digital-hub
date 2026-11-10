import { describe, expect, it } from "vitest";
import { pinLatestPublished } from "./book-order";

const photo = (id: string, date: string, published?: string) => ({
  id,
  date,
  published,
});

describe("pinLatestPublished", () => {
  it("place les trois dernières publiées devant, même si elles ne sont pas en fin de liste", () => {
    const items = [
      photo("070", "2026-09-15", "2026-09-15"),
      photo("085", "2026-10-11", "2026-11-10"),
      photo("001", "2025-11-28"),
      photo("088", "2026-10-11", "2026-11-10"),
      photo("086", "2026-10-11", "2026-11-10"),
      photo("087", "2026-10-11", "2026-11-10"),
    ];
    const result = pinLatestPublished(items, () => 0);

    expect(result.slice(0, 3).map((item) => item.id)).toEqual([
      "088",
      "087",
      "086",
    ]);
    expect(result.slice(3).map((item) => item.id).sort()).toEqual([
      "001",
      "070",
      "085",
    ]);
  });

  it("met la plus récente devant quand il y a moins de trois photos", () => {
    const items = [photo("a", "2026-01-01"), photo("b", "2026-02-01")];
    expect(pinLatestPublished(items, () => 0.9).map((item) => item.id)).toEqual([
      "b",
      "a",
    ]);
  });
});
