export type ZodErrorTree = {
  errors: string[];
  properties?: Record<string, ZodErrorTree>;
  items?: Record<number, ZodErrorTree>;
};
