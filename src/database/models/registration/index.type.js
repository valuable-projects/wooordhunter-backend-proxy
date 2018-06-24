// @flow

export type RegistrationEntity = {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  usageNumber: number;
}

export type Query = Promise<Array<RegistrationEntity>> & {
  limit: (number: number) => Query,
  skip: (number: number) => Query,
}

export type QueryOptions = {|
  limit: ?number,
  offset: ?number,
|};

export type UpdateOptions = {
  upsert?: boolean,
  setDefaultsOnInsert?: boolean,
}
