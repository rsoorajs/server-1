import {
  smtp_provider_view,
  smtp_provider_add,
  smtp_provider_edit,
  smtp_provider_rm,
} from './policies';

export default {
  view: smtp_provider_view,
  add: smtp_provider_add,
  edit: smtp_provider_edit,
  remove: smtp_provider_rm,
};

export const map = [
  smtp_provider_view,
  smtp_provider_add,
  smtp_provider_edit,
  smtp_provider_rm,
];
