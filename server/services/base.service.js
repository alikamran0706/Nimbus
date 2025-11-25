// services/base.service.js
export default class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  create(data) {
    return this.repository.create(data);
  }

  findById(id) {
    return this.repository.findById(id);
  }

  findAll(query, options) {
    return this.repository.findAll(query, options);
  }

  updateById(id, data) {
    return this.repository.updateById(id, data);
  }

  deleteById(id) {
    return this.repository.deleteById(id);
  }
}
