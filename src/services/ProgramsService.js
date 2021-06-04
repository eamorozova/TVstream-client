import Api from './Api';

export default {
  getPrograms(channelId) {
    return Api().get(`programs/?channelId=${channelId}`);
  },
  getProgram(channelId, programId) {
    return Api().get(`programs/?channelId=${channelId}&programId=${programId}`);
  },
};
