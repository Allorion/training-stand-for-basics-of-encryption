// Функция для преобразования текста в байтовый массив
function textToBytes(text: string): Uint8Array {
    let encoder = new TextEncoder();
    return encoder.encode(text);
}

// Функция для дополнения массива нулями до длины, кратной 8
function padBytes(bytes: Uint8Array): Uint8Array {
    let paddedLength = Math.ceil(bytes.length / 8) * 8;
    let paddedBytes = new Uint8Array(paddedLength);
    paddedBytes.set(bytes);
    return paddedBytes;
}

// Функция для разбиения массива на блоки по 8 байтов
function splitBytes(bytes: Uint8Array): Uint8Array[] {
    let blocks: Uint8Array[] = [];
    for (let i = 0; i < bytes.length; i += 8) {
        let block = bytes.slice(i, i + 8);
        blocks.push(block);
    }
    return blocks;
}

// Функция для соединения блоков в один массив
function joinBytes(blocks: Uint8Array[]): Uint8Array {
    let bytes = new Uint8Array(blocks.length * 8);
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        bytes.set(block, i * 8);
    }
    return bytes;
}

// Функция для преобразования массива в шестнадцатеричную строку
function bytesToHex(bytes: Uint8Array): string {
    let hex = "";
    // @ts-ignore
    for (let byte of bytes) {
        // Преобразование байта в шестнадцатеричную строку
        let hexByte = byte.toString(16);
        // Добавление нуля в начало, если нужно
        if (hexByte.length < 2) {
            hexByte = "0" + hexByte;
        }
        // Добавление байта к строке
        hex += hexByte;
    }
    return hex;
}

// Функция для циклического сдвига 32-битного числа влево на n бит
function rotateLeft(x: number, n: number): number {
    return (x << n) | (x >>> (32 - n));
}

// Функция для сложения 32-битных чисел по модулю 2^32
function addMod32(x: number, y: number): number {
    return (x + y) >>> 0;
}

// Функция для шифрования 64-битного блока с помощью ГОСТ 28147-89
function encryptBlock(block: Uint8Array, key: string, sbox: number[][]): Uint8Array {
    // Преобразование блока в два 32-битных числа
    let n1 = (block[0] << 24) | (block[1] << 16) | (block[2] << 8) | block[3];
    let n2 = (block[4] << 24) | (block[5] << 16) | (block[6] << 8) | block[7];

    // Преобразование ключа в массив из восьми 32-битных чисел
    let k: number[] = [];
    for (let i = 0; i < 8; i++) {
        //@ts-ignore
        let ki = (key[i * 4] << 24) | (key[i * 4 + 1] << 16) | (key[i * 4 + 2] << 8) | key[i * 4 + 3];
        k.push(ki);
    }

    // Выполнение 32 раундов шифрования
    for (let i = 0; i < 32; i++) {
        // Выбор подключа в зависимости от номера раунда
        let ki = k[i % 8];
        if (i >= 24) {
            ki = k[7 - (i % 8)];
        }

        // Вычисление функции шифрования
        let f = addMod32(n1, ki); // Сложение по модулю 2^32
        f = sbox[0][f >>> 28] | sbox[1][(f >>> 24) & 15] | sbox[2][(f >>> 20) & 15] | sbox[3][(f >>> 16) & 15] | sbox[4][(f >>> 12) & 15] | sbox[5][(f >>> 8) & 15] | sbox[6][(f >>> 4) & 15] | sbox[7][f & 15]; // Замена с помощью узлов замены
        f = rotateLeft(f, 11); // Циклический сдвиг влево на 11 бит

        // Обновление состояния
        let temp = n2;
        n2 = n1 ^ f; // Исключающее ИЛИ
        n1 = temp;
    }

    // Обмен местами n1 и n2
    let temp = n1;
    n1 = n2;
    n2 = temp;

    // Преобразование n1 и n2 в 64-битный блок
    let encryptedBlock = new Uint8Array(8);
    encryptedBlock[0] = n1 >>> 24;
    encryptedBlock[1] = (n1 >>> 16) & 255;
    encryptedBlock[2] = (n1 >>> 8) & 255;
    encryptedBlock[3] = n1 & 255;
    encryptedBlock[4] = n2 >>> 24;
    encryptedBlock[5] = (n2 >>> 16) & 255;
    encryptedBlock[6] = (n2 >>> 8) & 255;
    encryptedBlock[7] = n2 & 255;

    return encryptedBlock;
}


// Узлы замены
const sbox: number[][] = [
    [0x4, 0xA, 0x9, 0x2, 0xD, 0x8, 0x0, 0xE, 0x6, 0xB, 0x1, 0xC, 0x7, 0xF, 0x5, 0x3],
    [0xE, 0xB, 0x4, 0xC, 0x6, 0xD, 0xF, 0xA, 0x2, 0x3, 0x8, 0x1, 0x0, 0x7, 0x5, 0x9],
    [0x5, 0x8, 0x1, 0xD, 0xA, 0x3, 0x4, 0x2, 0xE, 0xF, 0xC, 0x7, 0x6, 0x0, 0x9, 0xB],
    [0x7, 0xD, 0xA, 0x1, 0x0, 0x8, 0x9, 0xF, 0xE, 0x4, 0x6, 0xC, 0xB, 0x2, 0x5, 0x3],
    [0x6, 0xC, 0x7, 0x1, 0x5, 0xF, 0xD, 0x8, 0x4, 0xA, 0x9, 0xE, 0x0, 0x3, 0xB, 0x2],
    [0x4, 0xB, 0xA, 0x0, 0x7, 0x2, 0x1, 0xD, 0x3, 0x6, 0x8, 0x5, 0x9, 0xC, 0xF, 0xE],
    [0xD, 0xB, 0x4, 0x1, 0x3, 0xF, 0x5, 0x9, 0x0, 0xA, 0xE, 0x7, 0x6, 0x8, 0x2, 0xC],
    [0x1, 0xF, 0xD, 0x0, 0x5, 0x7, 0xA, 0x4, 0x9, 0x2, 0x3, 0xE, 0x6, 0xB, 0x8, 0xC]
];

export const encryptionGost = (key: string, text: string): string => {
    // Преобразование текста в байтовый массив
    let bytes: Uint8Array = textToBytes(text);

    // Дополнение массива нулями до длины, кратной 8
    let paddedBytes: Uint8Array = padBytes(bytes);

    // Разбиение массива на блоки по 8 байтов
    let blocks: Uint8Array[] = splitBytes(paddedBytes);

    // Зашифрование каждого блока
    let encryptedBlocks: Uint8Array[] = [];
    for (let block of blocks) {
        let encryptedBlock: Uint8Array = encryptBlock(block, key, sbox);
        encryptedBlocks.push(encryptedBlock);
    }

    // Соединение зашифрованных блоков в один массив
    let encryptedBytes: Uint8Array = joinBytes(encryptedBlocks);

    // Преобразование массива в шестнадцатеричную строку
    return bytesToHex(encryptedBytes);
}