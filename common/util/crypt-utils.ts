import * as crypto from 'node:crypto'

const isBrowser = typeof window !== 'undefined' && typeof window.crypto !== 'undefined';

export const rsa = {
  /**
   * 生成 RSA 密钥对
   */
  generateKey: (() => {
    if (isBrowser) {
      return async () => {
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
          },
          true,
          ["encrypt", "decrypt"]
        );
        const [publicKey, privateKey] = await Promise.all([
          window.crypto.subtle.exportKey('spki', keyPair.publicKey),
          window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
        ])
        return {
          publicKey: arrayBufferToBase64(publicKey),
          privateKey: arrayBufferToBase64(privateKey)
        };
      }
    } else {
      return async () => {
        return new Promise<{ publicKey: string, privateKey: string }>((resolve, reject) => {
          crypto.generateKeyPair(
            'rsa',
            {
              modulusLength: 2048,
              publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
              },
              privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
              },
            },
            (err: Error | null, publicKey: string, privateKey: string) => {
              if (err) {
                reject(err);
              } else {
                resolve({ publicKey, privateKey });
              }
            }
          );
        });
      }
    }
  })(),
  /**
   * RSA 加密
   */
  encrypt: (() => {
    if (isBrowser) {
      return async (publicKey: string, message: string) => {
        const encodedMessage = new TextEncoder().encode(message);
        const publicKeyBuffer = base64ToArrayBuffer(convertKeyForEnvironment(publicKey, 'public'));
        const importedPublicKey = await window.crypto.subtle.importKey(
          'spki',
          publicKeyBuffer,
          {
            name: "RSA-OAEP",
            hash: "SHA-256",
          },
          true,
          ["encrypt"]
        );
        const encrypted = await window.crypto.subtle.encrypt(
          {
            name: "RSA-OAEP",
          },
          importedPublicKey,
          encodedMessage
        );
        return arrayBufferToBase64(encrypted);
      }
    } else {
      return async (publicKey: string, message: string) => {
        const encrypted = crypto.publicEncrypt(
          {
            key: convertKeyForEnvironment(publicKey, 'public'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
          },
          Buffer.from(message, 'utf8')
        );
        return encrypted.toString('base64');
      }
    }
  })(),
  /**
   * RSA 解密
   */
  decrypt: (() => {
    if (isBrowser) {
      return async (privateKey: string, message: string) => {
        const privateKeyBuffer = base64ToArrayBuffer(convertKeyForEnvironment(privateKey, 'private'));
        const importedPrivateKey = await window.crypto.subtle.importKey(
          'pkcs8',
          privateKeyBuffer,
          {
            name: "RSA-OAEP",
            hash: "SHA-256",
          },
          true,
          ["decrypt"]
        );
        const encryptedMessageBuffer = base64ToArrayBuffer(message);
        const decrypted = await window.crypto.subtle.decrypt(
          {
            name: "RSA-OAEP",
          },
          importedPrivateKey,
          encryptedMessageBuffer
        );
        return new TextDecoder().decode(decrypted);
      }
    } else {
      return async (privateKey: string, message: string) => {
        const decrypted = crypto.privateDecrypt(
          {
            key: convertKeyForEnvironment(privateKey, 'private'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
          },
          Buffer.from(message, 'base64')
        );
        return decrypted.toString('utf8');
      }
    }
  })(),
  /**
   * RSA 签名
   */
  sign: (() => {
    if (isBrowser) {
      return async (privateKey: string, message: string) => {
        const privateKeyObj = await importKey(convertKeyForEnvironment(privateKey, 'private'), 'private');
        const encoder = new TextEncoder();
        const encodedMessage = encoder.encode(message);
        const signature = await window.crypto.subtle.sign(
          {
            name: "RSA-PSS",
            saltLength: 32,
          },
          privateKeyObj,
          encodedMessage
        );
        return arrayBufferToBase64(signature);
      }
    } else {
      return async (privateKey: string, message: string) => {
        const signer = crypto.createSign('sha256');
        signer.update(message);
        const signature = signer.sign({
          key: convertKeyForEnvironment(privateKey, 'private'),
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        });
        return signature.toString('base64');
      }
    }
  })(),
  /**
   * RSA 验证
   */
  verify: (() => {
    if (isBrowser) {
      return async (publicKey: string, message: string, signature: string) => {
        const publicKeyObj = await importKey(convertKeyForEnvironment(publicKey, 'public'), 'public');
        const encoder = new TextEncoder();
        const encodedMessage = encoder.encode(message);
        const signatureBuffer = base64ToArrayBuffer(signature);
        const isValid = await window.crypto.subtle.verify(
          {
            name: "RSA-PSS",
            saltLength: 32,
          },
          publicKeyObj,
          signatureBuffer,
          encodedMessage
        );
        return isValid;
      }
    } else {
      return async (publicKey: string, message: string, signature: string) => {
        const verifier = crypto.createVerify('sha256');
        verifier.update(message);
        const isValid = verifier.verify(
          {
            key: convertKeyForEnvironment(publicKey, 'public'),
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          },
          Buffer.from(signature, 'base64')
        );
        return isValid;
      }
    }
  })()
};

function convertKeyForEnvironment(key: string, type: 'public' | 'private'): string {
  if (isBrowser && key.startsWith('-----')) {
    const base64 = key
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replace(/\n/g, '');
    return base64;
  } else if (!isBrowser && !key.startsWith('-----')) {
    return `-----BEGIN ${type.toUpperCase()} KEY-----\n${splitStringByLength(key, 64).join('\n')}\n-----END ${type.toUpperCase()} KEY-----`;
  } else {
    return key
  }

  function splitStringByLength(str: string, length: number) {
    const result = [];
    for (let i = 0; i < str.length; i += length) {
      result.push(str.substring(i, i + length));
    }
    return result;
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

async function importKey(key: string, type: string) {
  const keyData = base64ToArrayBuffer(key);
  const keyFormat = type === 'public' ? 'spki' : 'pkcs8';
  return window.crypto.subtle.importKey(
    keyFormat,
    keyData,
    {
      name: "RSA-PSS",
      hash: "SHA-256",
    },
    true,
    [type === 'public' ? 'verify' : 'sign']
  );
}
