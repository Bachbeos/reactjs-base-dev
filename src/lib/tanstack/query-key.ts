import type { QueryKey } from '@tanstack/react-query';

type WithRoot<TRoot extends string, T> = {
  _root: readonly [TRoot];
} & {
  [K in keyof T]: T[K] extends (...args: infer A) => QueryKey ? (...args: A) => QueryKey : never;
};

export function createKeys<
  TRoot extends string,
  T extends Record<string, (...args: never[]) => QueryKey>,
>(root: TRoot, factory: T): WithRoot<TRoot, T> {
  const result = {
    _root: [root] as const,
  } as Record<string, unknown>;

  for (const key in factory) {
    const fn = factory[key];
    if (!fn) continue;

    result[key] = (...args: Parameters<typeof fn>) => [root, ...fn(...args)] as const;
  }

  return result as WithRoot<TRoot, T>;
}
