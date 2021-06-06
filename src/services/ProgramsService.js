import Api from './Api';

export default {
  get() {
    return Api().get('programs');
  },
  post(program) {
    return Api().post('programs', program);
  },
};
