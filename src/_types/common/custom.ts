import { SyntheticEvent } from 'react';

export type ValueOf<T> = T[keyof T];

type AppendTuple<A, B> = A extends [...infer P1]
  ? [...P1, ...(B extends [...infer P2] ? P2 : [])]
  : never;

export type Handler<T extends (...args: any) => any = () => void> = T extends (
  ...args: infer U
) => infer R
  ? (...args: AppendTuple<U, [e?: SyntheticEvent]>) => R
  : never;
