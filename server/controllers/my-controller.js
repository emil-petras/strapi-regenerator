'use strict';

module.exports = ({ strapi }) => ({
  updateMediaItems: async (ctx) => {
    try {
      const { types } = ctx.request.body;

      const updates = await Promise.all(types.map(async (type) => {
        let whereCondition;
        switch (type) {
          case 'images':
            whereCondition = { mime: { $startsWith: 'image/' } };
            break;
          case 'videos':
            whereCondition = { mime: { $startsWith: 'video/' } };
            break;
          case 'audios':
            whereCondition = { mime: { $startsWith: 'audio/' } };
            break;
          case 'files':
            whereCondition = { mime: { $not: { $startsWith: ['image/', 'video/', 'audio/'] } } };
            break;
          default:
            strapi.log.warn(`Unrecognized type: ${type}`);
            return [];
        }

        const items = await strapi.query('plugin::upload.file').findMany({
          select: ['id', 'mime'],
          where: whereCondition
        });

        return Promise.all(items.map(item => strapi.plugins['upload'].services.upload.update(item.id, {
          updatedAt: new Date().toISOString()
        })));
      }));

      const updatedItems = updates.flat();
      strapi.log.info(`${updatedItems.length} media items updated successfully.`);
      ctx.body = { message: `${updatedItems.length} media items updated successfully.` };
      ctx.status = 200;
    } catch (error) {
      strapi.log.error(`An error occurred: ${error.message}`);
      ctx.body = { message: error.message };
      ctx.status = 500;
    }
  },

  listContentTypes: async (ctx) => {
    try {
      const contentTypes = Object.keys(strapi.contentTypes).filter(type => type.startsWith('api::')).map(type => ({
        uid: type,
        name: strapi.contentTypes[type].info.singularName || strapi.contentTypes[type].info.pluralName,
        kind: strapi.contentTypes[type].kind
      }));

      strapi.log.info('User-created content types listed successfully.');
      ctx.body = { contentTypes };
      ctx.status = 200;
    } catch (error) {
      strapi.log.error(`An error occurred while listing user-created content types: ${error.message}`);
      ctx.body = { message: error.message };
      ctx.status = 500;
    }
  },

  updateContentItems: async (ctx) => {
    try {
      const { types } = ctx.request.body;

      const updates = await Promise.all(types.map(async (contentType) => {
        const items = await strapi.entityService.findMany(`${contentType}`, {
          fields: ['id']
        });

        return Promise.all(items.map(item => strapi.entityService.update(`${contentType}`, item.id, {
          data: {
            updatedAt: new Date().toISOString()
          }
        })));
      }));

      const updatedContentItems = updates.flat();
      strapi.log.info(`${updatedContentItems.length} content items updated successfully.`);
      ctx.body = { message: `${updatedContentItems.length} content items updated successfully.` };
      ctx.status = 200;
    } catch (error) {
      strapi.log.error(`An error occurred: ${error.message}`);
      ctx.body = { message: error.message };
      ctx.status = 500;
    }
  }
});
