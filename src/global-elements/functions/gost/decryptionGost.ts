// Функция для преобразования шестнадцатеричной строки в байтовый массив
function hexToBytes(hex: string): Uint8Array {
    let bytes: Uint8Array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        // Преобразование двух шестнадцатеричных символов в байт
        // Запись байта в массив
        bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return bytes;
}

// Функция для разбиения массива на блоки по 8 байтов
function splitBytes(bytes: Uint8Array): Uint8Array[] {
    let blocks = [];
    for (let i = 0; i < bytes.length; i += 8) {
        let block: Uint8Array = bytes.slice(i, i + 8);
        blocks.push(block);
    }
    return blocks;
}

// Функция для соединения блоков в один массив
function joinBytes(blocks: Uint8Array[]): Uint8Array {
    let bytes: Uint8Array = new Uint8Array(blocks.length * 8);
    for (let i: number = 0; i < blocks.length; i++) {
        let block: Uint8Array = blocks[i];
        bytes.set(block, i * 8);
    }
    return bytes;
}

// Функция для преобразования байтового массива в текст
function bytesToText(bytes: Uint8Array): string {
    let decoder: TextDecoder = new TextDecoder();
    return decoder.decode(bytes);
}

// Функция для циклического сдвига 32-битного числа вправо на n бит
function rotateRight(x: number, n: number): number {
    return (x >>> n) | (x << (32 - n));
}

// Функция для сложения 32-битных чисел по модулю 2^32
function addMod32(x: number, y: number): number {
    return (x + y) >>> 0;
}

// Функция для расшифрования 64-битного блока с помощью ГОСТ 28147-89
function decryptBlock(block: Uint8Array, key: string, sbox: number[][]): Uint8Array {
    // Преобразование блока в два 32-битных числа
    let n1: number = (block[0] << 24) | (block[1] << 16) | (block[2] << 8) | block[3];
    let n2: number = (block[4] << 24) | (block[5] << 16) | (block[6] << 8) | block[7];

    // Преобразование ключа в массив из восьми 32-битных чисел
    let k: number[] = [];
    for (let i = 0; i < 8; i++) {
        //@ts-ignore
        let ki: number = (key[i * 4] << 24) | (key[i * 4 + 1] << 16) | (key[i * 4 + 2] << 8) | key[i * 4 + 3];
        k.push(ki);
    }

    // Выполнение 32 раундов расшифрования
    for (let i: number = 0; i < 32; i++) {
        // Выбор подключа в зависимости от номера раунда
        let ki: number = k[7 - (i % 8)];
        if (i >= 8) {
            ki = k[i % 8];
        }

        // Вычисление функции расшифрования
        let f: number = addMod32(n1, ki); // Сложение по модулю 2^32
        f = sbox[0][f >>> 28] | sbox[1][(f >>> 24) & 15] | sbox[2][(f >>> 20) & 15] | sbox[3][(f >>> 16) & 15] | sbox[4][(f >>> 12) & 15] | sbox[5][(f >>> 8) & 15] | sbox[6][(f >>> 4) & 15] | sbox[7][f & 15]; // Замена с помощью узлов замены
        f = rotateRight(f, 11); // Циклический сдвиг вправо на 11 бит

        // Обновление состояния
        let temp: number = n2;
        n2 = n1 ^ f; // Исключающее ИЛИ
        n1 = temp;
    }

    // Обмен местами n1 и n2
    let temp: number = n1;
    n1 = n2;
    n2 = temp;

    // Преобразование n1 и n2 в 64-битный блок
    let decryptedBlock: Uint8Array = new Uint8Array(8);
    decryptedBlock[0] = n1 >>> 24;
    decryptedBlock[1] = (n1 >>> 16) & 255;
    decryptedBlock[2] = (n1 >>> 8) & 255;
    decryptedBlock[3] = n1 & 255;
    decryptedBlock[4] = n2 >>> 24;
    decryptedBlock[5] = (n2 >>> 16) & 255;
    decryptedBlock[6] = (n2 >>> 8) & 255;
    decryptedBlock[7] = n2 & 255;

    return decryptedBlock;
}

// Узлы замены
let sbox: number[][] = [
    [0x4, 0xA, 0x9, 0x2, 0xD, 0x8, 0x0, 0xE, 0x6, 0xB, 0x1, 0xC, 0x7, 0xF, 0x5, 0x3],
    [0xE, 0xB, 0x4, 0xC, 0x6, 0xD, 0xF, 0xA, 0x2, 0x3, 0x8, 0x1, 0x0, 0x7, 0x5, 0x9],
    [0x5, 0x8, 0x1, 0xD, 0xA, 0x3, 0x4, 0x2, 0xE, 0xF, 0xC, 0x7, 0x6, 0x0, 0x9, 0xB],
    [0x7, 0xD, 0xA, 0x1, 0x0, 0x8, 0x9, 0xF, 0xE, 0x4, 0x6, 0xC, 0xB, 0x2, 0x5, 0x3],
    [0x6, 0xC, 0x7, 0x1, 0x5, 0xF, 0xD, 0x8, 0x4, 0xA, 0x9, 0xE, 0x0, 0x3, 0xB, 0x2],
    [0x4, 0xB, 0xA, 0x0, 0x7, 0x2, 0x1, 0xD, 0x3, 0x6, 0x8, 0x5, 0x9, 0xC, 0xF, 0xE],
    [0xD, 0xB, 0x4, 0x1, 0x3, 0xF, 0x5, 0x9, 0x0, 0xA, 0xE, 0x7, 0x6, 0x8, 0x2, 0xC],
    [0x1, 0xF, 0xD, 0x0, 0x5, 0x7, 0xA, 0x4, 0x9, 0x2, 0x3, 0xE, 0x6, 0xB, 0x8, 0xC]
];

// Для расшифровки текста “d0b8d0b2d09fd18000000000d0b5d182” с помощью алгоритма ГОСТ 28147-89 нужно выполнить следующие шаги:
//
// Преобразовать зашифрованный текст в байтовый массив с помощью функции hexToBytes.
// Разбить массив на блоки по 8 байтов с помощью функции splitBytes.
// Расшифровать каждый блок с помощью функции decryptBlock, используя ключ и узлы замены.
// Соединить расшифрованные блоки в один массив с помощью функции joinBytes.
// Преобразовать массив в текст в кодировке UTF-8 с помощью функции bytesToText.
// Удалить дополнительные нули в конце текста, если они есть.

export const decryptionGost = (key: string, encryptedHex: string): string => {

    // Преобразование зашифрованного текста в байтовый массив
    let encryptedBytes: Uint8Array = hexToBytes(encryptedHex);

    // Разбиение массива на блоки по 8 байтов
    let encryptedBlocks = splitBytes(encryptedBytes);

    // Расшифрование каждого блока
    let decryptedBlocks: Uint8Array[] = [];
    for (let block of encryptedBlocks) {
        let decryptedBlock: Uint8Array = decryptBlock(block, key, sbox);
        decryptedBlocks.push(decryptedBlock);
    }

    // Соединение расшифрованных блоков в один массив
    let decryptedBytes: Uint8Array = joinBytes(decryptedBlocks);

    // Преобразование массива в текст
    let decryptedText: string = bytesToText(decryptedBytes);

    // Удаление дополнительных нулей в конце текста
    decryptedText = decryptedText.replace(/\0+$/, "");

    // Вывод расшифрованного текста
    return decryptedText

}