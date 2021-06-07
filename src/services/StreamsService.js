import Api from './Api';

export default {
  getPrograms(channelId) {
    return Api().get(`streams?channelId=${channelId}`);
  },
  getChannels(programId) {
    return Api().get(`streams?programId=${programId}`);
  },
  post(stream) {
    return Api().post('streams', stream);
  },
  remove(id) {
    return Api().delete(`streams/${id}`);
  },
};
