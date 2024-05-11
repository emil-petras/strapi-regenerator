import React, { useState, memo } from 'react';
import { Box, Layout, Main, HeaderLayout, Button, ContentLayout, MultiSelectNested, Typography, Loader, Status } from '@strapi/design-system';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import {useFetchClient} from '@strapi/helper-plugin';

import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin-bottom: 24px;
`;

const HomePage = () => {
  const fetchClient = useFetchClient();

  const options = [{
    label: 'All',
    children: [{
      label: 'Images',
      value: 'images'
    }, {
      label: 'Videos',
      value: 'videos'
    }, {
      label: 'Audios',
      value: 'audios'
    }, {
      label: 'Files',
      value: 'files'
    }]
  }];
  const [values, setValues] = useState([]);
  const [regenerating, setRegenerating] = useState(false);
  const [requested, setRequested] = useState(false);
  const [message, setMessage] = useState("")
  const [variant, setVariant] = useState("")

  const handleRegenerate = async () => {
    if (regenerating) return;  // Prevents multiple submissions
    setRequested(false);
    setRegenerating(true);
    
    try {
      const response = await fetchClient.post('/strapi-regenerator/media', { types: values });
      if (response.status >= 200 && response.status < 300) {
        console.log('Success:', response.data.message);
        setMessage(response.data.message);
        setVariant("success");
      } else {
        console.log('Failure:', response.data.message);
        console.log(response.data.message);
        setVariant("danger");
      }
    } catch (error) {
      console.error(error);
      // Check if the error is an instance of AxiosError and has a response
      if (error.response) {
        // Use the actual error message from the server or default to a generic message
        setMessage(error.response.data.message || "An unexpected error occurred.");
      } else {
        // This covers cases where the error might not be from an Axios request
        setMessage(error.message || "An error occurred during the request.");
      }
      setVariant("danger");
    } finally {
      setRegenerating(false);
      setRequested(true);
      setTimeout(() => {
        setRequested(false);
      }, 10000);
    }
  };  

  return (
    <Layout sideNav={""}>
      <SettingsPageTitle name="Regenerator" />
      <Main>
        <HeaderLayout
          title="Regenerator"
          subtitle="Trigger item update event"
        />
      </Main>
      <ContentLayout>
        <Box background="neutral0" shadow="tableShadow" padding={10} hasRadius>
          <StyledWrapper>
            <Typography variant="beta" id="media-items">
              Regenerate media items
            </Typography>
          </StyledWrapper>
          <StyledWrapper>
            <MultiSelectNested label="Media items" required placeholder="Selected media items to regenerate..." 
              onClear={() => {
                setValues([]);
              }} value={values} onChange={setValues} options={options} />
          </StyledWrapper>
          <StyledWrapper>
          <Button variant="default" disabled={values.length === 0} onClick={handleRegenerate}>Regenerate media items</Button>
          </StyledWrapper>
          {regenerating ? <Loader>Regenerating...</Loader> : ""}
          {requested &&
            <Status variant={variant} showBullet={false}>
              <Typography>
                {message}
              </Typography>
            </Status>
          }
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default memo(HomePage);
