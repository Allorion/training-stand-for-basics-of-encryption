type SBox = number[][];

// Пример использования:
const blocks: SBox = [
    [4, 10, 9, 2, 13, 8, 0, 14, 6, 11, 1, 12, 7, 15, 5, 3],
    [14, 11, 4, 12, 6, 13, 15, 10, 2, 3, 8, 1, 0, 7, 5, 9],
    [5, 8, 1, 13, 10, 3, 4, 2, 14, 15, 12, 7, 6, 0, 9, 11],
    [7, 13, 10, 1, 0, 8, 9, 15, 14, 4, 6, 12, 11, 2, 5, 3],
    [6, 12, 7, 1, 5, 15, 13, 8, 4, 10, 9, 14, 0, 3, 11, 2],
    [4, 11, 10, 0, 7, 2, 1, 13, 3, 6, 8, 5, 9, 12, 15, 14],
    [13, 11, 4, 1, 3, 15, 5, 9, 0, 10, 14, 7, 6, 8, 2, 12],
    [1, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12],
];

export class CryptGost {
    private _key: bigint = BigInt(0);
    private _subkeys: bigint[] = [];
    private sbox: SBox = blocks;

    constructor(key: string) {
        this.key = this.hexToBigint(`0x${key}`);
    }

    get key(): bigint {
        return this._key;
    }

    set key(value: bigint) {
        const bitLength = value.toString(2).length;
        if (bitLength > 256) {
            throw new Error('Key length is too long');
        }
        this._key = value;
        this._subkeys = [];
        for (let i = 0; i < 8; i++) {
            this._subkeys.push((value >> BigInt(32 * i)) & BigInt(0xFFFFFFFF));
        }
    }

    private _f(part: bigint, key: bigint): bigint {
        let temp = part ^ key;
        let output = BigInt(0);
        for (let i = 0; i < 8; i++) {
            output |= BigInt(this.sbox[i][Number((temp >> BigInt(4 * i)) & BigInt(0b1111))]) << BigInt(4 * i);
        }
        return ((output >> BigInt(11)) | (output << BigInt(32 - 11))) & BigInt(0xFFFFFFFF);
    }

    private stringToBigInt(str: string): bigint {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(str);
        let hex = '0x';
        encoded.forEach((byte) => {
            hex += byte.toString(16).padStart(2, '0');
        });
        return BigInt(hex);
    }

    private bigintToHex(value: bigint): string {
        return value.toString(16);
    }

    public encrypt(text: string): string {
        const msg = this.stringToBigInt(text)
        let leftPart = msg >> BigInt(32);
        let rightPart = msg & BigInt(0xFFFFFFFF);
        for (let i = 0; i < 24; i++) {
            [leftPart, rightPart] = [rightPart, leftPart ^ this._f(rightPart, this._subkeys[i % 8])];
        }
        for (let i = 0; i < 8; i++) {
            [leftPart, rightPart] = [rightPart, leftPart ^ this._f(rightPart, this._subkeys[7 - i])];
        }
        return this.bigintToHex((leftPart << BigInt(32)) | rightPart);
    }

    private bigintToString(bigint: bigint): string {
        let hexString = bigint.toString(16);
        // Добавляем ведущий ноль, если длина строки нечетная
        if (hexString.length % 2 !== 0) {
            hexString = '0' + hexString;
        }
        const bytes = new Uint8Array(hexString.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    }

    private hexToBigint(hex: string): bigint {
        // Убедимся, что строка начинается с '0x' для корректного преобразования
        if (!hex.startsWith('0x')) hex = '0x' + hex;
        return BigInt(hex);
    }

    public decrypt(text: string): string {
        const cryptedMsg = this.hexToBigint(text)
        let leftPart = cryptedMsg >> BigInt(32);
        let rightPart = cryptedMsg & BigInt(0xFFFFFFFF);
        for (let i = 0; i < 8; i++) {
            [leftPart, rightPart] = [rightPart ^ this._f(leftPart, this._subkeys[i]), leftPart];
        }
        for (let i = 8; i < 32; i++) {
            [leftPart, rightPart] = [rightPart ^ this._f(leftPart, this._subkeys[(7 - (i % 8))]), leftPart];
        }
        return this.bigintToString((leftPart << BigInt(32)) | rightPart);
    }
}