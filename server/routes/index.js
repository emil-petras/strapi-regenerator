module.exports = [
  {
    method: 'POST',
    path: '/media',
    handler: 'myController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin',
      {
        name: 'admin::hasPermissions',
        config: {
          actions: ['plugin::regenerator.manage'],
        },
      },],
    },
  },
];