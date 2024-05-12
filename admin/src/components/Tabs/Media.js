import React, { useState } from 'react';
import { Box, Button, Typography, Loader, Status, MultiSelectNested } from '@strapi/design-system';
import styled from 'styled-components';
import { useFetchClient } from '@strapi/helper-plugin';

const StyledWrapper = styled.div`
  margin-bottom: 24px;
`;

const MediaTab = () => {
  const fetchClient = useFetchClient();
  const [values, setValues] = useState([]);
  const [regenerating, setRegenerating] = useState(false);
  const [requested, setRequested] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const mediaOptions = [{
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

  const handleRegenerate = async () => {
    if (regenerating) return;
    setRequested(false);
    setRegenerating(true);

    try {
      const response = await fetchClient.post('/strapi-regenerator/media', { types: values });
      if (response.status >= 200 && response.status < 300) {
        setMessage(response.data.message);
        setVariant("success");
      } else {
        setMessage(response.data.message);
        setVariant("danger");
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "An error occurred during the request.");
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
    <Box background="neutral0" shadow="tableShadow" padding={10} hasRadius>
      <StyledWrapper>
        <Typography variant="beta" id="media-items">Media items</Typography>
      </StyledWrapper>
      <StyledWrapper>
        <MultiSelectNested label="Media item types" required withTags
          placeholder="Select media item types to regenerate..." onClear={() => setValues([])} 
          value={values} onChange={setValues} options={mediaOptions} />
      </StyledWrapper>
      <StyledWrapper>
        <Button variant="default" disabled={values.length === 0} onClick={handleRegenerate}>Regenerate</Button>
      </StyledWrapper>
      {regenerating ? <Loader>Regenerating media...</Loader> : ""}
      {requested &&
        <Status variant={variant} showBullet={false}>
          <Typography>{message}</Typography>
        </Status>
      }
    </Box>
  );
};

export default MediaTab;
