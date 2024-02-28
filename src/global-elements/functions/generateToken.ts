// Импортируем библиотеку crypto-js для работы с криптографией
import CryptoJS from "crypto-js";

// Определяем интерфейс для результата генерации токена
interface TokenResult {
    token: string;
    issued: number;
    expires: number;
}

// Создаем функцию для генерации токена на основе данных пользователя
export function generateToken(nameRoom: string, secretKey: string): TokenResult {

    // Определяем время выдачи и истечения токена
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;

    // Создаем полезную нагрузку токена с данными пользователя и временем
    const payload = {
        nameRoom,
        issued,
        expires
    };

    // Преобразуем полезную нагрузку в JSON-строку
    const payloadString = JSON.stringify(payload);

    // Хешируем полезную нагрузку с секретным ключом и алгоритмом
    const token = CryptoJS.SHA256(payloadString).toString();

    // Возвращаем результат с токеном и временем
    return {
        token,
        issued,
        expires
    };
}
