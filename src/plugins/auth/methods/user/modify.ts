import { Users } from '@models';
import { checkPolicy } from '@plugins/auth/helpers';

import type { IPolicy, IUserDoc } from '@models/types';

/**
 * Place / Remove Restriction from a User
 *
 * @async
 * @param {IUserDoc} admin - Admin User with which to Modify
 * @param {Readonly<IPolicy>[]} policies - Modification Policies appliable to the User
 * @param {Object} modifiedUserOptions - Modified User Properties
 * @param {IUserDoc} user - User to be Modified
 * @returns {Promise<boolean>} - Promise resolving to boolean
 */
export default async function <T extends Partial<IUserDoc>>(
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
  modifiedUserOptions: T,
  user: IUserDoc,
): Promise<boolean> {
  await checkPolicy(policies, admin);
  await Users.updateOne({ _id: user._id }, modifiedUserOptions);
  return true;
}
