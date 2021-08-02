import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {
    constructor() { }

    keySize = 256;
    ivSize = 128;
    iterationCount = 1989;

    generateKey(salt: string, passPhrase: string): string {
        return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
            keySize: this.keySize / 32,
            iterations: this.iterationCount
        });
    }

    encryptWithIvSalt(salt: string, iv: string, passPhrase: string, plainText: string): string {
        let key = this.generateKey(salt, passPhrase);
        let encrypted = CryptoJS.AES.encrypt(plainText, key, {
            iv: CryptoJS.enc.Hex.parse(iv)
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    decryptWithIvSalt(salt: string, iv: string, passPhrase: string, cipherText: string) {
        let key = this.generateKey(salt, passPhrase);
        let cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        });
        let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: CryptoJS.enc.Hex.parse(iv)
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    encrypt(passPhrase: string, plainText: string): string {
        let iv = CryptoJS.lib.WordArray.random(this.ivSize / 8).toString(CryptoJS.enc.Hex);
        let salt = CryptoJS.lib.WordArray.random(this.keySize / 8).toString(CryptoJS.enc.Hex);
        let cipherText = this.encryptWithIvSalt(salt, iv, passPhrase, plainText);
        return salt + iv + cipherText;
    }

    decrypt(passPhrase: string, cipherText: string): string {
        let ivLength = this.ivSize / 4;
        let saltLength = this.keySize / 4;
        let salt = cipherText.substr(0, saltLength);
        let iv = cipherText.substr(saltLength, ivLength);
        let encrypted = cipherText.substring(ivLength + saltLength);
        let decrypted = this.decryptWithIvSalt(salt, iv, passPhrase, encrypted);
        return decrypted;
    }
}
