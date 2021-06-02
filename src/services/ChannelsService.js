import Api from './Api';

export default {
  getChannels() {
    return Api().get('channels');
  },
  getChannel(id) {
    return Api().get(`channels/${id}`);
  },
  post(channel) {
    return Api().post('channels', channel);
  },
  put(channel, id) {
    return Api().put(`channels/${id}`, channel);
  },
};
