//@ts-ignore
import {Crypt} from 'hybrid-crypto-js'

export const decryptionRSA = (encrypted: string, privateKey: string) => {

    // Initialize RSA-class
    const crypt = new Crypt({
        rsaStandard: 'RSA-OAEP',
    });

    // Decrypt encryped message with private RSA key
    const decrypted = crypt.decrypt(privateKey, encrypted);

    // Get decrypted message
    return decrypted.message
}