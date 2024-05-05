'use strict';

module.exports = ({ strapi }) => {
  const myController = require('./controllers/my-controller');
  strapi.controllers.myController = myController;

  try {
    strapi.admin.services.permission.actionProvider.registerMany([
      {
        section: 'plugins',
        displayName: 'Manage Plugin',
        uid: 'manage',
        pluginName: 'regenerator',
        subCategory: 'general',
      }
    ]);
  } catch (error) {
    strapi.log.error("Registering permissions failed:", error);
  }
};
