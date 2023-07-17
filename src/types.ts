export type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Allows to expand "ugly" types wrapped in helper types
 */
export type Pretty<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/**
 * Inverts optional and required properties on a type
 */
export type InvertRequired<T> = Pretty<
    Required<Pick<T, OptionalKeys<T>>> & Partial<Omit<T, OptionalKeys<T>>>
>;
