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

  router.get('/', readAll);

  router.get('/:postId', readOne);

  router.put('/:postId', verifyUserMiddleware, update);

  router.delete('/:postId', verifyUserMiddleware, deleteOne);

  return router;
};
