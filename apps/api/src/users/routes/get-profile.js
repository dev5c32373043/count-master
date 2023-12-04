export default async function getProfile({ user }, res) {
  res.json(user);
}
