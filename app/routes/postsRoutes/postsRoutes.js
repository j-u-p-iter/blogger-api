export const createPostsRoutes = ({
  router,
  postController: {
    create,
    readAll,
    readOne,
    update,
    deleteOne,
  },
}) => {
  router.post('/', create);

  router.get('/', readAll);

  router.get('/:postId', readOne);

  router.put('/:postId', update);

  router.delete('/:postId', deleteOne);

  return router;
};
