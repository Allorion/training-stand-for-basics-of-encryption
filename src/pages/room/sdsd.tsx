// Импортируем React, useState и useEffect
import React, { useState, useEffect } from 'react';
// Импортируем socket.io-client
import io, {Socket} from 'socket.io-client';

// Создаем компонент ChatRoom
const ChatRoom = (props: { token: string }) => {
    // Получаем токен комнаты из пропсов
    const { token } = props;
    // Создаем состояние для id комнаты
    const [roomId, setRoomId] = useState<number | null>(null);
    // Создаем состояние для сокета
    const [socket, setSocket] = useState<Socket | null>(null);

    // Используем эффект для подключения к серверу и получения id комнаты
    useEffect(() => {
        // Создаем новый сокет
        const newSocket = io('http://localhost:8999');
        // Устанавливаем сокет в состояние
        setSocket(newSocket);
        // Отправляем HTTP-запрос к серверу с токеном комнаты
        fetch('http://localhost:3000/rooms/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        })
            .then((response) => response.json()) // Преобразуем ответ в JSON
            .then((data) => {
                // Получаем id комнаты из данных
                const id = data.id;
                // Устанавливаем id комнаты в состояние
                setRoomId(id);
            })
            .catch((error) => {
                // Обрабатываем ошибку
                console.error(error);
            });
        // Возвращаем функцию для очистки эффекта
        return () => {
            // Отключаем сокет
            newSocket.disconnect();
        };
    }, [token]); // Зависимость от токена комнаты

    // Используем эффект для присоединения к комнате по сокету
    useEffect(() => {
        // Проверяем, что сокет и id комнаты существуют
        if (socket && roomId) {
            // Вызываем метод socket.emit('joinRoom', roomId) для присоединения к комнате
            socket.emit('joinRoom', roomId);
            // Слушаем события сокета
            socket.on('userJoined', (data: any) => {
                // Обрабатываем событие userJoined
                console.log(data);
            });
            socket.on('messageSent', (data: any) => {
                // Обрабатываем событие messageSent
                console.log(data);
            });
            socket.on('userLeft', (data: any) => {
                // Обрабатываем событие userLeft
                console.log(data);
            });
            socket.on('error', (data: any) => {
                // Обрабатываем событие error
                console.error(data);
            });
        }
    }, [socket, roomId]); // Зависимость от сокета и id комнаты

    // Возвращаем JSX-элемент для отображения компонента
    return (
        <div>
            <h1>Chat Room</h1>
            {/* Отображаем токен и id комнаты */}
            <p>Token: {token}</p>
            <p>Room ID: {roomId}</p>
            {/* Отображаем другие элементы, например, форму для отправки сообщений */}
        </div>
    );
};

// Экспортируем компонент ChatRoom
export default ChatRoom;
