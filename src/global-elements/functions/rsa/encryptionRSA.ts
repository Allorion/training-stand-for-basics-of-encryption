//@ts-ignore
import {Crypt} from 'hybrid-crypto-js'

export interface IEncryptedRSA {
    "v": string,        // Current package version
    "iv": string, // Initialization vector
    "keys": {                             // Encrypted AES keys by RSA fingerprints
        "85:3d:10:e1:56...": string,
        "d3:48:6a:e9:13...": string,
    },
    "cipher": string, // Actual encrypted message
    "signature": string, // Signature (optional)
}

export const encryptionRSA = (publicKey: string, message: string) => {

    // Initialize RSA-class
    const crypt = new Crypt({
        rsaStandard: 'RSA-OAEP',
    });

    // Encryption with one public RSA key
    const encrypted: string = crypt.encrypt(publicKey, message);

    // Create Blob objects from the keys
    const encryptedBlob: Blob = new Blob([encrypted], {type: 'text/plain'});

    //@ts-ignore
    const encryptedURL: string = URL.createObjectURL(encryptedBlob);

    const encryptedLink: HTMLAnchorElement = document.createElement('a');

    // Set the attributes of the anchor elements
    encryptedLink.href = encryptedURL;
    encryptedLink.download = 'encrypted.rsa';

    // Append the anchor elements to the document body
    document.body.appendChild(encryptedLink);

    // Simulate a click on the public key element
    encryptedLink.click();
    // Add an event listener to the private key element
    encryptedLink.addEventListener('click', function () {
        document.body.removeChild(encryptedLink);
    });
}