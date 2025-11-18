import APIFeatures from "../utils/apiFeatures.js";

export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create(data);
  }

  bulkCreate(docs) {
    return this.model.insertMany(docs);
  }

  findById(id, populate = "") {
    let q = this.model.findById(id);
    if (populate) q = q.populate(populate);
    return q;
  }

  findOne(filter, populate = "") {
    let q = this.model.findOne(filter);
    if (populate) q = q.populate(populate);
    return q;
  }

  async findAll(queryString = {}, options = {}) {
    const { searchFields = [], defaultLimit = 10, populate = "" } = options;

    let q = this.model.find();
    const features = new APIFeatures(q, queryString)
      .filter()
      .search(searchFields)
      .sort()
      .limitFields()
      .paginate(defaultLimit);

    q = features.query;
    if (populate) q = q.populate(populate);

    const docs = await q;
    return { data: docs, pagination: features.pagination };
  }

  updateById(id, updateData, options = {}) {
    return this.model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      ...options,
    });
  }

  bulkUpdate(filter, updateData) {
    return this.model.updateMany(filter, updateData);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  bulkDelete(filter) {
    return this.model.deleteMany(filter);
  }

  count(filter = {}) {
    return this.model.countDocuments(filter);
  }
}
