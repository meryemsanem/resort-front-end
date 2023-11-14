import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => (
  <div>
    <p className="message">{message}</p>
  </div>
);
Message.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Message;
