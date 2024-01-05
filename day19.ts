import { Expect, Equal } from "type-testing";
//@raijinhasarrived solution

type Emojis = ["🛹", "🚲", "🛴", "🏄"];

type MyFill<T extends any, U, R extends any[] = []> = R["length"] extends T
  ? R
  : MyFill<T, U, [U, ...R]>;

type Rebuild<
  List extends unknown[],
  Result extends any[] = [],
  Count extends "⚡"[] = []
> = List extends [infer First, ...infer Rest]
  ? [
      //spread MyFill with first amount and Emoji using the length of count
      ...MyFill<First, Emojis[Count["length"]]>,
      //recursively call Rebuild
      ...Rebuild<
        Rest,
        Result,
        // keep track of Current position of emoji to use, when we reach end of emoji array
        // we reset count to empty array to go back to first index in emoji array.
        Count["length"] extends 3 ? [] : ["⚡", ...Count]
      >
    ]
  : Result;

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
  "🛹",
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🏄",
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
