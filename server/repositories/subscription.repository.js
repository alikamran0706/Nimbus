// subscription.repository.js
import BaseRepository from "./base.repository.js";
import SubscriptionPlan from "../models/subscriptionPlan.model.js";

class SubscriptionRepository extends BaseRepository {
  constructor() {
    super(SubscriptionPlan);
  }
}

export default new SubscriptionRepository();
