const responseWithSuccess = ({
  res,
  data = {},
  status,
  message,
}) => {
  const resultData = {
    success: true,
    message,
    ...data,
  };

  res.status = status;

  res.body = resultData;
};

const responseWithError = ({
  res,
  err,
  status,
}) => {
  const resultData = {
    success: false,
    error: err.message,
  };

  if (status) {
    res.status = status;
  }

  res.body = resultData;
};


export {
  responseWithSuccess,
  responseWithError,
};
