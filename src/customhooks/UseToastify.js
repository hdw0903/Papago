import { ToastContainer, toast } from 'react-toastify';

export const toastType = {
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
};

export const useToastify = () => {
  const toastNotify = (message = '', type = toastType.INFO) => {
    // toast.info('🦄 복사되었습니다!', {
    toast[type](message, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  return [ToastContainer, toastNotify];
};
