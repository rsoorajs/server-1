import type { Document, Types } from 'mongoose';
import type { IBaseModel } from '../types';
import type { IInlineResponse } from '@types/inline.response';

export interface IPolicy {
  _id: Types.ObjectId;
  code: string;
  name: string;
  message: string;
  global_flag: boolean;
}

export interface IPolicyDoc extends IPolicy, Document {}

export interface IPolicyModel extends IBaseModel<IPolicyDoc> {
  /**
   * Checks the Predefined map of Policies with the Docs present in Database
   *
   * @returns {Promise<IInlineResponse<boolean>>} - Response whether map is matching or not
   */
  mapCheck: (this: IPolicyModel) => Promise<IInlineResponse<boolean>>;
}
