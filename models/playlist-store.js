const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");

const playlistStore = {
  async getPlaylist(id) {
    const query = 'SELECT * FROM playlist4_playlists WHERE id=$1';
    const values = [id];
    try {
      let result = await dataStoreClient.query(query, values);
      return result.rows[0];
    } catch (e) {
      logger.error("Error fetching playlist", e);
    }
  },
  async getAllPlaylists() {
    const query = 'SELECT * FROM playlist4_playlists';
    try {
      let result = await dataStoreClient.query(query);
      return result.rows;
    } catch (e) {
      logger.error("Error fetching all playlists", e);
    }
  },
  async getUserPlaylists(email) {
    const query = 'SELECT * FROM playlist4_playlists WHERE user_id=$1';
    const values = [email];
    try {
      let result = await dataStoreClient.query(query, values);
      return result.rows;
    } catch (e) {
      logger.error("Error fetching playlists for user: ", e);
    }
  },
  async removePlaylist(id) {
    const query = 'DELETE FROM playlist4_playlists WHERE id=$1';
    const values = [id];
    try {
      await dataStoreClient.query(query, values);
    } catch (e) {
      logger.error("Unable to remove playlist:", e);
    }
  },
  async addPlaylist(playList) {
    try {
      const query = 'INSERT INTO playlist4_playlists (TITLE, USER_ID) VALUES($1, $2)';
      const values = [playList.title, playList.userid];
      await dataStoreClient.query(query, values);
    } catch (e) {
      logger.error("Error cannot add playlist", e);
    }
  },
};

module.exports = playlistStore;
