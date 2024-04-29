import io from 'socket.io-client';
import {hostName} from "./globalData";

export const SOCKET = io(`http://${hostName}:8999`);