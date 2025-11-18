import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";

class UserService {
  getUsers(query) {
    return userRepository.findAll(query, {
      searchFields: ["name", "email"],
    });
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  createUser(payload) {
    return userRepository.create(payload);
  }

  async updateUser(id, payload) {
    const user = await userRepository.updateById(id, payload);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async deleteUser(id) {
    const user = await userRepository.deleteById(id);
    if (!user) throw new AppError("User not found", 404);
    return true;
  }
}

export default new UserService();
