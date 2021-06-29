import Credentials from './credentials';

interface serviceAccount {
  _id: string;
  project_id: string;
  private_key: {
    id: string;
    key: string;
  };
  client: {
    id: string;
    email: string;
  };
  related_to: Credentials['_id'];
}

export default serviceAccount;
