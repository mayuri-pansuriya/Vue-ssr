const getters = {
  token: state => state.user.token,
  role: state => state.user.role,
  name: state => state.user.name,
  user: state => state.user
}
export default getters
