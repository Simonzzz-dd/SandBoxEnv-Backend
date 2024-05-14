const forge = require('node-forge');
const fs = require('fs').promises;
const path = require('path');


async function encryptPass(password) {
    const publicKeyPEM = `
    -----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAsJFhti8fYm+oUcPSXLFaQrhw/jf5pVCoYRof/ofwEa+HQRO3ZhU4
/2KeRHf0HTZLKOgtWIeOJbEO4xBgGTn8vMdQAMgdI2xq7Y2s/05Xs/mot0VQ+L1o
AQsXtOY/5r0q9XLDwLDxXwI+v6dAxqLM4uGd+BjSb2trd6ePORA/bfaeGHj7ay7G
DbqHSmV65CLzCkBoxMqDq4DaLOCeI4dMb40uZ0XY+JMv+Mquca9kf/Q69O+nTkfy
kwMqqO2Xv2bnwpN9dXtvyjekevFtku6+UI6qNe0N3Tk86QmDjG8I0/j8IMvEfOjs
hBGMMOJRgLsxZL3c4F9FGM2ER+44A4mPMwIDAQAB
-----END RSA PUBLIC KEY-----
    `
  
    console.log(publicKeyPEM)
    const public_key = publicKeyPEM
    const publicKey = forge.pki.publicKeyFromPem(public_key);

    // Encrypt the password using RSAES-PKCS1-v1_5 with SHA-1 hashing and SHA-1 MGF1 mask generation function
    const encryptedPassword = publicKey.encrypt(
    password,
    'RSAES-PKCS1-V1_5',
    {
        md: forge.md.sha1.create(),
        mgf1: {
        md: forge.md.sha1.create(),
        },
    }
    );
    const encodedEncryptedPassword = forge.util.encode64(encryptedPassword);
    console.log(encodedEncryptedPassword)
    return encodedEncryptedPassword.toString()
}

module.exports = {encryptPass}