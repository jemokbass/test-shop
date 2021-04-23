import React, { Fragment } from 'react';
import UseHttpError from '@src/hooks/http-error-hook';

import Modal from '@src/components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = UseHttpError(axios);

    return (
      <Fragment>
        <Modal show={error} closeModal={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
