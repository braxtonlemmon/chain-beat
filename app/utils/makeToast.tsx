import {toast} from 'react-toastify'

type ToastType = 'success' | 'error' | 'info' | 'warning'

type ToastArgs = {
  type: ToastType
  message: string
  info?: unknown
  toastId?: string
  customTitle?: string
}

const getTitle = (type: ToastType, customTitle?: string) => {
  switch (type) {
    case 'success':
      return customTitle || 'Success!'
    case 'error':
      return customTitle || 'Oops, something went wrong.'
    case 'info':
      return customTitle || 'Info'
    case 'warning':
      return customTitle || 'Warning!'
  }
}

const getToastBody = (
  type: ToastType,
  message: string,
  customTitle?: string
) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-sm">{getTitle(type, customTitle)}</p>
      <p className="text-sm">{message}</p>
    </div>
  )
}

const makeToast = ({type, message, info, toastId, customTitle}: ToastArgs) => {
  if (info) {
    console.error(info)
  }

  switch (type) {
    case 'success':
      return toast.success(getToastBody(type, message, customTitle), {
        toastId: toastId || message,
      })
    case 'error':
      return toast.error(getToastBody(type, message, customTitle), {
        toastId: toastId || message,
      })
    case 'info':
      return toast.info(getToastBody(type, message, customTitle), {
        toastId: toastId || message,
      })
    case 'warning':
      return toast.warning(getToastBody(type, message, customTitle), {
        toastId: toastId || message,
      })
  }
}

export default makeToast
