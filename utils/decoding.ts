import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'hex';
const IV_LENGTH = 16;
const KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

const encrypt = (data: string) : string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);
  return iv.toString('hex') + encrypted.toString(ENCODING);
};

const decrypt = (data: string) : number => {
  const iv = Buffer.from(data.slice(0, IV_LENGTH * 2), 'hex');
  const encryptedData = Buffer.from(data.slice(IV_LENGTH * 2), ENCODING);
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  return Number(decrypted.toString('utf-8'));
};

export { encrypt, decrypt };