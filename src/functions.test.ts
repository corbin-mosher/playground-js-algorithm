import { countSalutes, movieTicketSales, validParens } from "./functions";

describe("functions", () => {
  it("test countSalutes", () => {
    expect(countSalutes("-->-->----<-<")).toBe(8);
    expect(countSalutes("--<--<---->-<")).toBe(2);
    expect(countSalutes("-")).toBe(0);
    expect(countSalutes(">")).toBe(0);
    expect(countSalutes("")).toBe(0);
    expect(countSalutes("<")).toBe(0);
    expect(countSalutes("<>")).toBe(0);
    expect(countSalutes("><")).toBe(2);
  });

  it("test validParens", () => {
    expect(validParens("()()()")).toBe(true);
    expect(validParens("(")).toBe(false);
    expect(validParens(")")).toBe(false);
    expect(validParens("(()()())")).toBe(true);
  });

  it("test movieTicketSales", () => {
    expect(movieTicketSales(25, [25, 25, 50, 100])).toBe(true);
    expect(movieTicketSales(25, [25, 100])).toBe(false);
    expect(
      movieTicketSales(
        25,
        [25, 50, 25, 100, 25, 25, 25, 100, 25, 25, 50, 100, 50, 25]
      )
    ).toBe(false);
  });
});
