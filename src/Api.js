import axios from 'axios';

class Api {
  constructor() {
    this.apiUrl = 'http://localhost:8080';

    this.apiPaths = {
      menu: '/wp-json/wp-api-menus/v2/menus/2',
      frontpage: '/wp-json/wp/v2/frontpage',
      page: '/wp-json/wp/v2/pages',
      media: '/wp-json/wp/v2/media'
    };
  }

  getApiUrl(pathKey) {
    return `${this.apiUrl}${this.apiPaths[pathKey]}`;
  }

  getMenuLinks() {
    return axios.get(this.getApiUrl('menu'))
      .then((resp) => {
        return resp.data.items;
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  getMedia(mediaId) {
    if (mediaId == null) {
      // return an empty promise
      return new Promise((resolve, reject) => {
        resolve({});
      });
    }

    const url = this.getApiUrl('media');
    const query = `${url}/${mediaId}`;

    return axios.get(query)
      .then((resp) => {
        return resp.data.guid.rendered;
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  getPage(page_slug) {
    if (page_slug == null) {
      // return an empty promise
      return new Promise((resolve, reject) => {
        resolve({});
      });
    }

    const url = this.getApiUrl('page');
    const query = `${url}?slug=${page_slug}`;

    return axios.get(query)
      .then((resp) => {
        if (resp.data.length > 0) {
          return resp.data[0];
        }

        return {};
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  /**
   * Returns the frontpage
   */
  getFrontpageSlug() {
    return axios.get(this.getApiUrl('frontpage'))
      .then((resp) => {
        return resp.data.slug;
      })
      .catch((err) => {
        // console.log(err);
      });
  }
}

export default Api;