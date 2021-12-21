const logger = require("../utils/logger.js");
const playlistStore = require("../models/playlist-store.js");
const accounts = require("./accounts.js");

const dashboard = {
  async index(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    const playLists = await playlistStore.getUserPlaylists(loggedInUser.id);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playLists,
    };
    logger.info("about to render dashboard", playLists);
    response.render("dashboard", viewData);
  },

  async deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug("Deleting Playlist", playlistId);
    await playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

  async addPlaylist(request, response) {
    const loggedInUser = await accounts.getCurrentUser(request);
    const newPlayList = {
      userid: loggedInUser.id,
      title: request.body.title,
    };
    logger.debug("Creating a new Playlist", newPlayList);
    await playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
