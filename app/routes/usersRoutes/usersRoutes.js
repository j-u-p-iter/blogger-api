export const createUsersRoutes = ({
  router,
  verifyUserMiddleware,
  verifyAdminMiddleware,
  userController: {
    create, 
    readAll, 
    readOne, 
    update, 
    deleteOne,
  },
}) => {
  router.post('/', verifyUserMiddleware, verifyAdminMiddleware, create);

  router.get('/', readAll);

  router.get('/:userId', readOne);

  router.put('/:userId', update);

  router.delete('/:userId', deleteOne);

  return router;
};
