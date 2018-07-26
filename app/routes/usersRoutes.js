const createUsersRoutes = ({
  router,
  userController,
}) => {
  router.post('/', userController.create);

  router.get('/', userController.readAll);

  router.put('/:userId', userController.update);

  router.delete('/:userId', userController.deleteOne);

  return router.routes();
};


export default createUsersRoutes;
