export const createPostsRoutes = ({
  router,
  verifyUserMiddleware,
  postController: {
    create,
    readAll,
    readOne,
    update,
    deleteOne,
  },
}) => {
  router.post('/', verifyUserMiddleware, create);

  router.get('/', verifyUserMiddleware, readAll);

  router.get('/:postId', verifyUserMiddleware, readOne);

  router.put('/:postId', verifyUserMiddleware, update);

  router.delete('/:postId', verifyUserMiddleware, deleteOne);

  return router;
};
