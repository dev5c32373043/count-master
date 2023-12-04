export const AccessGuard = permission => (req, res, next) => {
  const permissions = req.user?.permissions ?? [];
  if (!permissions.includes(permission)) {
    res.status(403).json({ message: 'Access Denied' });
    return;
  }

  next();
};
