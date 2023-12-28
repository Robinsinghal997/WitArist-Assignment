export const sendToken = (user, status, res, next) => {
  const token = user.getJwtToken();
  const option = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  res.status(status).cookie("token", token, option).json({
    success: true,
    user,
    token,
  });
};
