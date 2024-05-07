# Strapi Regenerator plugin

![Regenerator Icon](/docs/Regenerator_Strapi_Icon_Emil_Petras.png)

## Introduction
Regenerator is a plugin for <a href="https://github.com/strapi/strapi">Strapi CMS</a> that automates the triggering of update events for Strapi items, streamlining content and media management.

## Installation
To install, run:

```bash
npm install strapi-regenerator
```

## Configuration
Open/create file `config/plugins.js`. Enable this plugin by adding:

```js
module.exports = {
    ...
    'strapi-regenerator': {
      enabled: true
    },
  }
```

## Usage
- After refresh the plugin tab should appear on the Admin Dashboard.

![Dashboard Menu Plugins](/docs/strapi-menu.png)

- In the accessed tab you can choose the media items you want to trigger the update for.

![Select the items for regeneration](/docs/selection.png)

- And then trigger the update after which you will get the response to the number of updated items.

![Response](/docs/response.png)

## Features
For now the Regenerator only supports Media items.

## Permissions
By default, only the Super Admin has permission to use this plugin. To allow other roles:

<ol>
    <li>Go to Settings > Administration Panel.</li>
    <li>Select Roles and choose the role you want to edit.</li>
    <li>In the Plugins tab, find Regenerator and check "Manage Plugin".</li>
</ol>

## Thanks
Icon design thanks to [alexanders.design](https://alexanders.design)

## Changelog

### [0.1.1] - 2024-05-06

### Fixed
- image formatting in the README.md

### Changed
- updated logo

### [0.1.2] - 2024-05-06

### Changed
- added the icon for Dashboard
- added a header layout subtitle

### [0.1.3] - 2024-05-07

### Changed
- added thanks to readme