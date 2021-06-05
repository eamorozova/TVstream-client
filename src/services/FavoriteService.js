import Api from '../services/Api';

export default {
  get() {
    return Api().get('favorites');
  },
  post(favorite) {
    return Api().post('favorites', favorite);
  },
  delete(favoriteId) {
    return Api().delete(`favorites/${favoriteId}`);
  },
};
