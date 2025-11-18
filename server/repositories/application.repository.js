// application.repository.js
import BaseRepository from "./base.repository.js";
import Application from "../models/application.model.js";

class ApplicationRepository extends BaseRepository {
  constructor() {
    super(Application);
  }
}

export default new ApplicationRepository();
