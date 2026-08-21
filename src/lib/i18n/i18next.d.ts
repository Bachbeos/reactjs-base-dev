import 'i18next';
import common from '../../../public/locales/vi/common.json';
import auth from '../../../public/locales/vi/auth.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      auth: typeof auth;
      // thêm namespace mới ở đây khi tạo feature mới
    };
  }
}
