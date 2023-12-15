import { Expect, Equal } from "type-testing";

type FillArray<T, N, L extends T[] = []> = L["length"] extends N
  ? L
  : FillArray<T, N, [T, ...L]>;

type BoxToys<Item, Amount> = Amount extends infer U
  ? FillArray<Item, U>
  : never;

type test_doll_actual = BoxToys<"doll", 1>;
//   ^?
type test_doll_expected = ["doll"];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<"nutcracker", 3 | 4>;
//   ^?
type test_nutcracker_expected =
  | ["nutcracker", "nutcracker", "nutcracker"]
  | ["nutcracker", "nutcracker", "nutcracker", "nutcracker"];
type test_nutcracker = Expect<
  Equal<test_nutcracker_expected, test_nutcracker_actual>
>;
