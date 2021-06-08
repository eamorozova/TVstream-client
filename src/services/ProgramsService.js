import Api from './Api';

export default {
  delete(id) {
    return Api().delete(`programs/${id}`);
  },
  get() {
    return Api().get('programs');
  },
  getProgram(id) {
    return Api().get(`programs/${id}`);
  },
  post(program) {
    return Api().post('programs', program);
  },
  put(program, id) {
    return Api().put(`programs/${id}`, program);
  },
};
