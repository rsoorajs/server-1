import {
  createDocument,
  createMultipleDocuments,
  clearCollection,
} from '@plugins/db/statics';

import { map as rolesMap } from '@plugins/templates/roles';

// Types
import { IRole, IRoleDoc, IRoleModel } from './types';
import { Error as MongoError, Schema } from 'mongoose';
import type { IInlineResponse } from '@typs/inline.response';

/**
 * Create a Role Document and Save it to Database
 *
 * @param {IRoleModel} this - Role Model
 * @param {IRole} doc - Role Doc to be Created and Saved
 * @returns {Promise<IRoleDoc>} - Promise Returning Saved Document
 */
export function createDoc(this: IRoleModel, doc: IRole): Promise<IRoleDoc> {
  return createDocument<IRole, IRoleDoc, IRoleModel>(this, doc);
}

/**
 * Create Multiple Role Document and Save it to Database
 *
 * @param {IRoleModel} this - Role Model
 * @param {IRole[]} docs - Role Docs to be Created and Saved
 * @returns {Promise<IRoleDoc[]>} - Promise Returning Saved Documents
 */
export function createMultiDoc(
  this: IRoleModel,
  docs: IRole[],
): Promise<IRoleDoc[]> {
  return createMultipleDocuments<IRole, IRoleDoc, IRoleModel>(this, docs);
}

/**
 * Clears the Role Collection by Deleting all the Records
 *
 * @param {IRoleModel} this - Role Model
 * @returns {Promise<IInlineResponse<string>>} - Response whether cleared or not
 */
export function clearAll(this: IRoleModel): Promise<IInlineResponse<string>> {
  return clearCollection<IRoleDoc, IRoleModel>(this);
}

/**
 * Checks the Predefined map of Roles with the Docs present in Database
 *
 * @param {IRoleModel} this - Policy Model
 * @returns {Promise<IInlineResponse<boolean>>} - Response whether map is matching or not
 */
export function mapCheck(this: IRoleModel): Promise<IInlineResponse<boolean>> {
  return new Promise<IInlineResponse<boolean>>((resolve, reject) => {
    const result: IInlineResponse<boolean> = {
      success: false,
      data: false,
      error: null,
    };
    this.find({})
      .then((docs) => {
        const roleMatches: boolean[] = [];
        result.success = true;
        for (let i = 0; i < rolesMap.length; i++) {
          const map = rolesMap[i];
          const [doc] = docs.filter((doc) => doc._id === map._id);
          if (doc && map && doc._id === map._id) {
            const name = doc.name === map.name;
            const allowedPolicies =
              doc.allowed_policies.length === map.allowed_policies.length;
            roleMatches.push(name && allowedPolicies);
          } else {
            roleMatches.push(false);
          }
        }
        if (roleMatches.includes(false)) {
          result.data = false;
        } else {
          result.data = true;
        }
        resolve(result);
      })
      .catch((err: MongoError) => {
        result.error = err;
        reject(new Error(`${err.name}: ${err.message}`));
      });
  });
}

/**
 * Appends all the Static Helpers with Schema
 *
 * @param {Schema<IRoleDoc, IRoleModel>} schema - Model Schema
 * @returns {Schema<IRoleDoc, IRoleModel>} - Schema with Static Helpers
 */
export default function (
  schema: Schema<IRoleDoc, IRoleModel>,
): Schema<IRoleDoc, IRoleModel> {
  schema.statics.createDoc = createDoc;
  schema.statics.createMultiDoc = createMultiDoc;
  schema.statics.clearAll = clearAll;
  schema.statics.mapCheck = mapCheck;
  return schema;
}
