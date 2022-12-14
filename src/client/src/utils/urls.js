export const VERIFY = '/auth/verify/admin?admin=true';
// export const LOGIN = '/auth/login/admin?admin=true';
export const LOGIN = '/auth/login/web/admin';
export const REGISTER_ADMIN = '/auth/register/admin';
export const CHANGE_PASSWORD = '/auth/staff/password';
export const CHANGE_OWN_PASSWORD = '/auth/staff/password/admin';
export const ADMIN_LOGS = '/auth/logs';
export const STAFF_LOGS = (staff) => `/auth/log?staff=${staff}`;
export const GETCLIENT = '/client'
export const UPLOADDOC = '/client/documents'
export const UPLOADFIELDS = '/client/fields'
export const UPDATEFIELDS = '/task/fields'
// export const UPDATECLIENT = '/client/'
export const UPDATEDOC = '/task/documents'
export const UPDATESTATUS = '/client/status'
export const GETBRANCH = '/branch'
export const GETDEPARTMENT = '/department'
export const GETSTAFF = '/auth/staff/web?role=staff'
export const GETHEAD = '/auth/staff/web?role=head'
export const GETHEADBYBRANCH = (branch = '', department = '') => `/auth/staff/web?role=head&branch=${branch}&department=${department}`
export const GETSTAFFBYBRANCH = (branch = '', department = '') => `/auth/staff/web?role=staff&branch=${branch}&department=${department}`
export const GETADMIN = '/auth/staff/web?role=admin'
export const GETTASKDASHBOARD = '/task/dashboard'
export const GETCLIENTDASHBOARD = '/client/dashboard'