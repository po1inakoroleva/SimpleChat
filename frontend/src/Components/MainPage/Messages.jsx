import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../../slices/messagesSlice';
import fetchInitialData from '../../slices/thunk';

/* eslint-disable */
const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);

  return (
    <ul />
  );
};

export default Messages;
