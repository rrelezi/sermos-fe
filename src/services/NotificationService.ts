// import React from 'react';
// import toast from 'react-hot-toast';
// import { v4 as uuidv4 } from 'uuid';
// import { ToasterIcon, ToasterMessage } from '../components/Toasters';
//
//
// const show = (type: string, title: string, message: string, options: any, actions: any) => {
//     const toaster = { id: uuidv4() };
//     toast[type](<ToasterMessage toaster={toaster} title={title} message={message} actions={actions} />, {
//     id: toaster.id,
//         icon: <ToasterIcon type={type} />,
// ...options,
// });
// };
//
// const success = (title, message, options = {}, actions = []) => {
//     NotificationService.show('success', title, message, options, actions);
// };
//
// const error = (title, message, options = {}, actions = []) => {
//     NotificationService.show('error', title, message, options, actions);
// };
//
//
//
// const NotificationService = {
//     show,
//     success,
//     error
// };
//
// export default NotificationService;
