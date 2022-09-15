import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

function MetaData({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
}

export default MetaData;
