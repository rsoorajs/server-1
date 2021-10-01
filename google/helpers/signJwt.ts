import type { IServiceAccDoc } from '@models/service-account/types';

const subtleCrypto = new SubtleCrypto();

const jwtHeader = {
  alg: 'RS256',
  typ: 'JWT',
};

/**
 * Converts a Base64 String to Uint8array Buffer
 *
 * @param {string} base64 - Base64 String
 * @returns {ArrayBufferLike} - uint8array buffer
 */
function base64ToArrayBuffer(base64: string): ArrayBufferLike {
  const binaryString = Buffer.from(base64, 'base64').toString('utf8');
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Converts a String to Uint8array Buffer
 *
 * @param {string} str - String
 * @returns {ArrayBufferLike} - uint8array buffer
 */
function stringToArrayBuffer(str: string): ArrayBufferLike {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Converts a Array Buffer to Base64 Encoded String
 *
 * @param {Uint8Array} buffer - Uint8Array
 * @returns {string} - Base64 Encoded String
 */
function arrayBufferToBase64(buffer: ArrayBufferLike): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = Buffer.from(binary).toString('base64');
  return base64;
}

/**
 * Imports Service Account Private Key as a Cryptokey
 *
 * @param {string} pemKey - Private Key of Service Account
 * @returns {Promise<CryptoKey>} - CryptoKey Object for Private Key
 */
async function importPrivateKey(pemKey: string): Promise<CryptoKey> {
  const pemDER = base64ToArrayBuffer(
    pemKey
      .split('\n')
      .map((s) => s.trim())
      .filter((l) => l.length && !l.startsWith('---'))
      .join(''),
  );
  const cryptoKey = subtleCrypto.importKey(
    'pkcs8',
    pemDER,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign'],
  );
  return cryptoKey;
}

/**
 * Create a JWT Key for the Service Account
 *
 * @param {string} text - JWT Stringified Payload
 * @param {CryptoKey} key - Cryptographic Service Account Private key
 * @returns {Promise<ArrayBuffer>} - JWT Array Buffer
 */
async function createSignature(
  text: string,
  key: CryptoKey,
): Promise<ArrayBuffer> {
  const textBuffer = stringToArrayBuffer(text);
  return subtleCrypto.sign('RSASSA-PKCS1-v1_5', key, textBuffer);
}

/**
 * Creates a JWT Token for a Service Account to Generate Access Token
 *
 * @param {IServiceAccDoc} serviceAccount - ServiceAccount Document from Database
 * @returns {string} - JWT Signature for the Service Account
 */
export default async function (
  serviceAccount: IServiceAccDoc,
): Promise<string> {
  const iat = Date.now() / 1000;
  const payload = {
    iss: serviceAccount.private_key.id,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    exp: iat + 3600,
    iat,
  };
  const encPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const encHeader = Buffer.from(JSON.stringify(jwtHeader)).toString('base64');
  const key = await importPrivateKey(serviceAccount.private_key.key);
  const signed = await createSignature(encHeader + '.' + encPayload, key);
  return (
    encHeader +
    '.' +
    encPayload +
    '.' +
    arrayBufferToBase64(signed).replace(/\//g, '_').replace(/\+/g, '-')
  );
}
