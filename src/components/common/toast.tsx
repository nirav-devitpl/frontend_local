import { toast , TypeOptions} from 'react-toastify';

/**
 * @function showToast
 * @description A utility function to display toast notifications using the `react-toastify` library.
 *  This function simplifies the process of showing toast messages with customizable options for message type and behavior.
 * @param {string} message - The message to be displayed in the toast notification.
 * @param {TypeOptions | undefined} type - The type of toast notification.
 * @returns {void} - This function does not return a value.
 */
export default function showToast(message : string ,type : TypeOptions | undefined) {
toast(message, {
    type: type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});
}