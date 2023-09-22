import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from './config';

// 初始化
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);