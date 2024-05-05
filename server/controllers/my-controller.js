'use strict';

module.exports = ({ strapi }) => ({
  index: async (ctx) => {
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
});
