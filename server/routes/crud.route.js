// routes/crud.route.js
export function generateCrudRoutes(router, controller, access = {}) {
  const isPublic = (method) => access.public?.includes(method);

  if (isPublic("create")) router.post("/", controller.create);
  else router.post("/", verifyAuth, controller.create);

  if (isPublic("getAll")) router.get("/", controller.getAll);
  else router.get("/", verifyAuth, controller.getAll);

  if (isPublic("getOne")) router.get("/:id", controller.getOne);
  else router.get("/:id", verifyAuth, controller.getOne);

  if (isPublic("update")) router.put("/:id", controller.update);
  else router.put("/:id", verifyAuth, controller.update);

  if (isPublic("delete")) router.delete("/:id", controller.delete);
  else router.delete("/:id", verifyAuth, controller.delete);

  return router;
}
