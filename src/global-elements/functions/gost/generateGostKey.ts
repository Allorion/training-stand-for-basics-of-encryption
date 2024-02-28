// Импортируем библиотеку для работы с криптографией
import CryptoJS from "crypto-js";

// Создаем функцию, которая генерирует 32-битный подключ
function generateSubkey(): number {
    // Генерируем 4 случайных байта с помощью библиотеки crypto-js
    const bytes: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random(4);

    // Преобразуем байты в 32-битное число
    // Возвращаем подключение
    return bytes.words[0];
}

// Создаем функцию, которая генерирует 32-битный ключ для шифрования алгоритмом ГОСТ 28147-89
export function generateGostKey() {
    // Создаем массив для хранения восьми подключей
    const subkeys: string[] = [];

    // Генерируем восемь подключей
    for (let i = 0; i < 8; i++) {
        subkeys.push(generateSubkey().toString(16));
    }

    // Возвращаем ключ в виде массива подключей
    return subkeys.join('');
}