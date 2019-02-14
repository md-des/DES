export default {
  state: {},
  namespace: 'projects_all',
  effects: {
    *list({ payload}, { call, put }) {
  
    }
  },
  reducers: {
    saveDetail(state, action) {
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total
      };
    },
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};