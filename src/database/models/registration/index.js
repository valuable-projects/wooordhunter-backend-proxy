// @flow

const mongoose = require('mongoose');

const { Schema } = mongoose;

const RegistrationsSchema = new Schema({
  uuid: {
    index: true,
    type: String,
    unique: true,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
  usageNumber: {
    default: 1,
    min: 0,
    type: Number,
  },
});

type RegistrationEntity = {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  usageNumber: number;
}

type Query = {
  ...Promise<Array<RegistrationOptions>>,
  limit: (number: number) => Query,
  skip: (number: number) => Query,
  then: (RegistrationOptions[]) => RegistrationOptions[],
}

type QueryOptions = {|
  limit: ?number,
  offset: ?number,
|};

class Registrations {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  usageNumber: number;

  static findOne: (query: { [string]: mixed }) => Promise<RegistrationEntity>;
  static find: () => Query;
  static update: (criteria: Object, data: Object, { upsert?: boolean, setDefaultsOnInsert?: boolean })
    => Promise<RegistrationEntity>;

  static async findById(uuid: string): Promise<RegistrationEntity> {
    return this.findOne({ uuid });
  }

  static async findAll(options: QueryOptions): Promise<Array<RegistrationEntity>> {
    const { limit, offset } = options;

    const query: Query = this.find();

    if (offset) {
      query.skip(offset);
    }

    if (limit) {
      query.limit(limit);
    }

    const results: Promise<Array<RegistrationEntity>> = ((await query): any);

    return results;
  }

  static async upsertById(uuid: string): Promise<RegistrationEntity> {
    const updateQuery = { $inc: { usageNumber: 1 }, updatedAt: Date.now() };
    return this.update({ uuid }, updateQuery, { upsert: true });
  }
}

RegistrationsSchema.loadClass(Registrations);

module.exports = {
  Registration: mongoose.model('Registration', RegistrationsSchema),
};
