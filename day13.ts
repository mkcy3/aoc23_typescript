import { Expect, Equal } from "type-testing";

// check if end number is equal to C.length, return end number if true
// check if starting number is equal to D.length, return C.length | increment C by 1.
// recursively call DayCounter incrementing both

type DayCounter<
  A extends number,
  B extends number,
  C extends any[] = [],
  D extends any[] = []
  // if end number is equal to length of C array
> = B extends C["length"]
  ? B
  : // if start number is equal to length of D array
  A extends D["length"]
  ? C["length"] | DayCounter<A, B, [1, ...C], D>
  : // if both if statements fails, increment both C and D by 1 and recursively call again
    DayCounter<A, B, [1, ...C], [1, ...D]>;

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
