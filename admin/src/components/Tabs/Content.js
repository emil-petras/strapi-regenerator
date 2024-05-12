import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Loader, Status, MultiSelectNested } from '@strapi/design-system';
import styled from 'styled-components';
import { useFetchClient } from '@strapi/helper-plugin';

const StyledWrapper = styled.div`
  margin-bottom: 24px;
`;

const ContentTab = () => {
  const fetchClient = useFetchClient();
  const [values, setValues] = useState([]);
  const [regenerating, setRegenerating] = useState(false);
  const [requested, setRequested] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [contentTypes, setContentTypes] = useState([{ label: 'All', children: [] }]);

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await fetchClient.get('/strapi-regenerator/types');
        if (response.status >= 200 && response.status < 300) {
          const mappedContentTypes = response.data.contentTypes.map(ct => ({
            label: ct.name,
            value: ct.uid
          }));
          setContentTypes([{ label: 'All', children: mappedContentTypes }]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchContentData();
  }, []);

  const handleRegenerate = async () => {
    if (regenerating) return;
    setRequested(false);
    setRegenerating(true);

    try {
      const response = await fetchClient.post('/strapi-regenerator/content', { types: values });
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
        <Typography variant="beta" id="content-items">Content items</Typography>
      </StyledWrapper>
      <StyledWrapper>
        <MultiSelectNested label="Content item types" required withTags
          placeholder="Select content item types to regenerate..." onClear={() => setValues([])} 
          value={values} onChange={setValues} options={contentTypes} />
      </StyledWrapper>
      <StyledWrapper>
        <Button variant="default" disabled={values.length === 0} onClick={handleRegenerate}>Regenerate</Button>
      </StyledWrapper>
      {regenerating ? <Loader>Regenerating content...</Loader> : ""}
      {requested &&
        <Status variant={variant} showBullet={false}>
          <Typography>{message}</Typography>
        </Status>
      }
    </Box>
  );
};

export default ContentTab;
