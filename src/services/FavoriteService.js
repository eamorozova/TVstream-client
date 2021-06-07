import Api from '../services/Api';

export default {
  getChannels() {
    return Api().get('favorites/channels');
  },
  postChannel(favorite) {
    return Api().post('favorites/channels', favorite);
  },
  deleteChannel(favoriteId) {
    return Api().delete(`favorites/channels/${favoriteId}`);
  },
  getPrograms() {
    return Api().get('favorites/programs');
  },
  postProgram(favorite) {
    return Api().post('favorites/programs', favorite);
  },
  deleteProgram(favoriteId) {
    return Api().delete(`favorites/programs/${favoriteId}`);
  },
};
