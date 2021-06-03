import Api from './Api';

export default {
  delete(id) {
    return Api().delete(`channels/${id}`);
  },
  getChannel(id) {
    return Api().get(`channels/${id}`);
  },
  getChannels() {
    return Api().get('channels');
  },
  post(channel) {
    return Api().post('channels', channel);
  },
  put(channel, id) {
    return Api().put(`channels/${id}`, channel);
  },
};
