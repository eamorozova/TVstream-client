import Api from './Api';

export default {
  getChannels(programId) {
    return Api().get(`streams?programId=${programId}`);
  },
  getPrograms(channelId) {
    return Api().get(`streams?channelId=${channelId}`);
  },
  getProgramsForDate(channelId, time) {
    return Api().get(`streams?channelId=${channelId}&time=${time}`);
  },
  post(stream) {
    return Api().post('streams', stream);
  },
  remove(id) {
    return Api().delete(`streams/${id}`);
  },
};
