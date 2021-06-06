import {NotificationManager} from 'react-notifications';

import {IErrorPayload, setError} from '~/store/common';

export const stubFn = () => null;

export const handleError = ({actionType, message, hasNotNotification}: IErrorPayload & {hasNotNotification?: Maybe<boolean>}) => {
  const hasInet = window?.navigator?.onLine;

  if (!hasNotNotification) {
    NotificationManager.error(`${message}. ${hasInet ? '' : 'Please check your internet.'}`);
  }

  setError({
    actionType,
    message
  });
};