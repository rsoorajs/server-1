import { checkPolicy } from '@plugins/auth/helpers';

import type { TGenericModelSchema, IPolicy, IUserDoc } from '@models/types';
import type { Model, Document, UpdateQuery } from 'mongoose';
import type {
  IAddDatabaseResult,
  IEditDatabaseResult,
  IDeleteDatabaseResult,
} from './types';

/**
 * Add Data into Database of the Particular Model after Verification
 *
 * @async
 * @param {Model} model - Model in the Database
 * @param {Object} data - Data to be Added to Database
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<Document>} - Saved Document
 */
export async function addDatatoDatabase<
  T extends TGenericModelSchema,
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  data: T,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<IAddDatabaseResult<T, U>> {
  let result: IAddDatabaseResult<T, U> | undefined = undefined;
  await checkPolicy(policies, admin).catch(() => {
    result = { doc: data, added: false };
  });
  const newData = new model(data);
  const savedData = await newData
    .save()
    .then((doc: U) => doc)
    .catch(() => {
      result = { doc: data, added: false };
    });
  if (result === undefined) {
    if (savedData) {
      return { doc: savedData, added: true };
    } else {
      return { doc: data, added: false };
    }
  } else {
    return result;
  }
}

/**
 * Edit Data in Database of the Particular Model after Verification
 *
 * @param {Model} model - Model in the Database
 * @param {Object} id - Data Document from the Database
 * @param {Object} modifiedData - Modified Data
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<IEditDatabaseResult>} - Returns EditDatabaseType
 */
export async function editDatainDatabase<
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  id: U['_id'],
  modifiedData: UpdateQuery<U>,
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<IEditDatabaseResult> {
  let result: IEditDatabaseResult | undefined = undefined;
  await checkPolicy(policies, admin).catch(() => {
    result = { id, updated: false };
  });
  await model.updateOne({ _id: id }, modifiedData).catch(() => {
    result = { id, updated: false };
  });
  if (result === undefined) {
    return { id, updated: true };
  } else {
    return result;
  }
}

/**
 * Delete Data from Database of the Particular Model after Verification
 *
 * @async
 * @param {Model} model - Model in the Database
 * @param {Object} id - id of the Docuemnt to Delete
 * @param {IUserDoc} admin - Admin user Document from Database
 * @param {Readonly<IPolicy>[]} policies - Array of Policies Applicable for the Function
 * @returns {Promise<IDeleteDatabaseResult>} - Returns DeleteDatabaseType
 */
export async function deleteDatafromDatabase<
  U extends Document,
  V extends Model<U>,
>(
  model: V,
  id: U['_id'],
  admin: IUserDoc,
  policies: Readonly<IPolicy>[],
): Promise<IDeleteDatabaseResult> {
  let result: IDeleteDatabaseResult | undefined = undefined;
  await checkPolicy(policies, admin).catch(() => {
    result = { id, deleted: false };
  });
  await model.deleteOne({ _id: id }).catch(() => {
    result = { id, deleted: false };
  });
  if (result === undefined) {
    return { id, deleted: true };
  } else {
    return result;
  }
}
