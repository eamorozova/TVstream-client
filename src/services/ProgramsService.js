import Api from './Api';

export default {
  getPrograms(channelId) {
    return Api().get(`programs/?channelId=${channelId}`);
  },
  get() {
    return Api().get('programs');
  },
  post(program) {
    return Api().post('programs', program);
  },
};
