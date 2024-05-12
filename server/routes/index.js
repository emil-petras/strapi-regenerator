module.exports = [
  {
    method: 'POST',
    path: '/media',
    handler: 'myController.updateMediaItems',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::strapi-regenerator.manage'],
          },
        }
      ],
    },
  },
  {
    method: 'POST',
    path: '/content',
    handler: 'myController.updateContentItems',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::strapi-regenerator.manage'],
          },
        },
      ],
    },
  },
  {
    method: 'GET',
    path: '/types',
    handler: 'myController.listContentTypes',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::strapi-regenerator.manage'],
          },
        },
      ],
    },
  },
];
