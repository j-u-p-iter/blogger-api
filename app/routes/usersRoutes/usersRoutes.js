export const createUsersRoutes = ({
  router,
  userController: {
    create, 
    readAll, 
    readOne, 
    update, 
    deleteOne,
  },
}) => {
  router.post('/', create);

  router.get('/', readAll);

  router.get('/:userId', readOne);

  router.put('/:userId', update);

  router.delete('/:userId', deleteOne);

  return router;
};
