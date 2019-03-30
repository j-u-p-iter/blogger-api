export const createUsersRoutes = ({
  router,
  userController: {
    create, readAll, update, deleteOne,
  },
}) => {
  router.post('/', create);

  router.get('/', readAll);

  router.put('/:userId', update);

  router.delete('/:userId', deleteOne);

  return router;
};
