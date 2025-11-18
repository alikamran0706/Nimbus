import subscriptionRepository from "../repositories/subscription.repository.js";

class SubscriptionService {
  getPlans(query) {
    return subscriptionRepository.findAll(query, {});
  }

  createPlan(payload) {
    return subscriptionRepository.create(payload);
  }
}

export default new SubscriptionService();
