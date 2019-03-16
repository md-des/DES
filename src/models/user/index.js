export default {
  state: {},
  namespace: 'userInfo',
  effects: {
    *list({ payload}, { call, put }) {
  
    }
  },
  reducers: {
    updateUserInfo(state, {payload}) {
      const {user = {}} = payload;
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user: JSON.parse(JSON.stringify(user)),
      }
    }
  },
};