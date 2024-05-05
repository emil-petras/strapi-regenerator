# Strapi Regenerator plugin

<img src="/docs/Emil_Petras_Strapi_Regenerator_Icon.png" alt="Regenerator Icon" width="160" height="auto" />

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
- The plugin tab should appear on the Admin Dashboard.

<img src="/docs/strapi-menu.png" alt="Dashboard Menu Plugins" width="216" height="auto" />

- In the accessed tab you can choose the media items you want to trigger the update for.

<img src="/docs/selection.png" alt="Select the items for regeneration" width="400" height="auto" />

- And then trigger the update after which you will get the response to the number of updated items.

<img src="/docs/response.png" alt="Response" width="400" height="auto" />

## Features
For now the Regenerator only supports Media items.

## Permissions
By default, only the Super Admin has permission to use this plugin. To allow other roles:

<ol>
    <li>Go to Settings > Administration Panel.</li>
    <li>Select Roles and choose the role you want to edit.</li>
    <li>In the Plugins tab, find Regenerator and check "Manage Plugin".</li>
</ol>