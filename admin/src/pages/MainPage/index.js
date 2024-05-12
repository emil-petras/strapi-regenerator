import React from 'react';
import { Layout, Main, HeaderLayout, ContentLayout } from '@strapi/design-system';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from '@strapi/design-system';

import MediaTab from './../../components/Tabs/Media';
import ContentTab from './../../components/Tabs/Content';

const MediaPage = () => {
  return (
    <Layout sideNav={""}>
      <SettingsPageTitle name="Regenerator" />
      <Main>
        <HeaderLayout
          title="Regenerator"
          subtitle="Trigger item update events for media and content"
        />
      </Main>
      <ContentLayout>
        <TabGroup label="Manage Regeneration" id="tabs">
          <Tabs>
            <Tab id="media">Media</Tab>
            <Tab id="content">Content</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel id="media">
              <MediaTab />
            </TabPanel>
            <TabPanel id="content">
              <ContentTab />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ContentLayout>
    </Layout>
  );
};

export default MediaPage;
