import Api from './Api';

export default {
  login(data) {
    return Api().post('login', data);
  },
  register(data) {
    return Api().post('register', data);
  },
  getInfo() {
    return Api().get('user');
  },
  editInfo(data) {
    return Api().put('user', data);
  },
  delete() {
    return Api().delete('user');
  },
};
