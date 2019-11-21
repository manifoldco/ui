export type Unpack<T, K extends string> = T extends { [k in K]: infer U }
  ? U // if T has K then we extarct the type of K
  : T;
