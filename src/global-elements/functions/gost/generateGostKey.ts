import CryptoJS from "crypto-js";

function generateSubkey(): string {
    const bytes: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random(4);
    return CryptoJS.enc.Hex.stringify(bytes);
}

export function generateGostKey(): string {
    const subkeys: Set<string> = new Set();

    while (subkeys.size < 8) {
        let subkeyHex = generateSubkey().toString()
        subkeys.add(subkeyHex);
    }
    return Array.from(subkeys).join('');
}