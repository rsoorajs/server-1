/**
 * @file Global Settings Definition File
 * @description Describes different Global Settings for the Organisation
 * @author Sudharshan TK
 *
 * Note: This Will be used only at the time of First Setup
 */

import { IGlobalSettings } from '@models/types';
import { objectID } from '@plugins/misc/uid';

export const serverName = (flag: string): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'srvr-name',
  name: 'Server Name',
  message: 'Give a Nice Server Name for Display',
  global_flag: flag,
});

export const serverUserName = (flag: string): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'srvr-usr-name',
  name: 'Server Username',
  message: 'User name for Server (will be used in issuing tokens)',
  global_flag: flag,
});

export const userRequests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'usr-rqsts',
  name: 'Allow User Requests',
  message: 'Enable New User Requests Globally',
  global_flag: flag,
});

export const upgradeRequests = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'upg-rqsts',
  name: 'Allow Role Upgrade Requests',
  message: 'Enable Existing User Role Upgrade Requests Globally',
  global_flag: flag,
});

export const tmdbFlag = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'tmdb-meta',
  name: 'Allow TMDB Metadata',
  message: 'Enable TMDB Api for Fetching Metadata Globally',
  global_flag: flag,
});

export const mailing = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'mailing',
  name: 'Allow Mailing',
  message: 'Enable Mailing of User Requests, Invites, etc.',
  global_flag: flag,
});

export const otpVerification = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'otp-check',
  name: 'Allow OTP Verify',
  message: 'Require OTP Verification of New Users',
  global_flag: flag,
});

export const maxSessions = (sessions: number): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'max-sessions',
  name: 'Maximum Sessions for a User',
  message: 'Maximum Active Sessions Allowed for a User',
  global_flag: sessions,
});

export const loginTokenExpiry = (
  expiry: number,
): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'login-token-exp',
  name: 'Login Token Expiry Time',
  message: 'Maximum Time Login Session Token Allowed for a User',
  global_flag: expiry,
});

export const otherTokenExpiry = (
  expiry: number,
): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'other-token-exp',
  name: 'Other Token Expiry Time',
  message:
    'Maximum Time for Other Session Token Allowed for a User (Such as Media Token)',
  global_flag: expiry,
});

export const defaultSmtpProvider = (
  provider_id: string,
): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'smtp-provider',
  name: 'Default SMTP Provider',
  message: 'Default SMTP Provider to be Used while Mailing',
  global_flag: provider_id,
  reference: 'SMTPProvider',
});

export const defaultSmtpMailer = (
  mailer_id: string,
): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'smtp-mailer',
  name: 'Default SMTP Mailer',
  message: 'Default Mail ID to be Used while Maling',
  global_flag: mailer_id,
  reference: 'SMTPMailer',
});

export const setupStatus = (flag: boolean): Readonly<IGlobalSettings> => ({
  _id: objectID(),
  code: 'setup-flag',
  name: 'Application Setup Flag',
  message: 'Whether Application Setup has been Finished or not',
  global_flag: flag,
});
