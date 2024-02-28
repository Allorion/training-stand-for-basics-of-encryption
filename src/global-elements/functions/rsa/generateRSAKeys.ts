//@ts-ignore
import {RSA} from 'hybrid-crypto-js';

export const generateRSAKeys = () => {
    // Initialize RSA-class
    const rsa = new RSA();

    // Generate 1024 bit RSA key pair
    rsa.generateKeyPair(function (keyPair: { publicKey: string; privateKey: string; }) {
        // Callback function receives new 1024 bit key pair as a first argument
        const publicKey: string = keyPair.publicKey;
        const privateKey: string = keyPair.privateKey;

        // Create Blob objects from the keys
        const publicKeyBlob: Blob = new Blob([publicKey], {type: 'text/plain'});
        const privateKeyBlob: Blob = new Blob([privateKey], {type: 'text/plain'});

        // Create URLs for the Blob objects
        const publicKeyURL: string = URL.createObjectURL(publicKeyBlob);
        const privateKeyURL: string = URL.createObjectURL(privateKeyBlob);

        // Create anchor elements for downloading the files
        const publicKeyLink: HTMLAnchorElement = document.createElement('a');
        const privateKeyLink: HTMLAnchorElement = document.createElement('a');

        // Set the attributes of the anchor elements
        publicKeyLink.href = publicKeyURL;
        publicKeyLink.download = 'publicKey.pem';
        privateKeyLink.href = privateKeyURL;
        privateKeyLink.download = 'privateKey.pem';

        // Append the anchor elements to the document body
        document.body.appendChild(publicKeyLink);
        document.body.appendChild(privateKeyLink);

        // Simulate a click on the public key element
        privateKeyLink.click();
        // Add an event listener to the private key element
        privateKeyLink.addEventListener('click', function () {
            document.body.removeChild(privateKeyLink);
        });
        setTimeout(() => {
            publicKeyLink.click();
            // Add an event listener to the private key element
            privateKeyLink.addEventListener('click', function () {
                document.body.removeChild(privateKeyLink);
                document.body.removeChild(publicKeyLink);
            });
        }, 100)
    }, 1024); // Key size
}
