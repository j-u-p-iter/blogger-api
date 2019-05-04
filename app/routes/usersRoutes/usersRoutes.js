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
  router.post(
    '/', 
    verifyUserMiddleware, 
    verifyAdminMiddleware, 
    create,
  );

  router.get('/', readAll);

  router.get('/:userId', readOne);

  router.put(
    '/:userId', 
    verifyUserMiddleware, 
    verifyAdminMiddleware, 
    update,
  );

  router.delete(
    '/:userId', 
    verifyUserMiddleware, 
    verifyAdminMiddleware, 
    deleteOne,
  );

  return router;
};
