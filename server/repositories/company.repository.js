// src/repositories/company.repository.js
import BaseRepository from "./base.repository.js";
import Company from "../models/company.model.js";

class CompanyRepository extends BaseRepository {
  constructor() {
    super(Company);
  }
}

export default new CompanyRepository();
