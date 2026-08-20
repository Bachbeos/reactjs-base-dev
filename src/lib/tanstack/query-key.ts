import type { QueryKey } from '@tanstack/react-query';

type WithRoot<TRoot extends string, T> = {
  _root: readonly [TRoot];
} & {
  [K in keyof T]: T[K] extends (...args: infer A) => any ? (...args: A) => QueryKey : never;
};

export function createKeys<
  TRoot extends string,
  T extends Record<string, (...args: any[]) => QueryKey>,
>(root: TRoot, factory: T): WithRoot<TRoot, T> {
  const result: any = {
    _root: [root] as const,
  };

  for (const key in factory) {
    const fn = factory[key];
    if (!fn) continue;

    result[key] = (...args: any[]) => [root, ...fn(...args)] as const;
  }

  return result;
}
