import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks"
import { setOnlineUsers } from "../store/features/onlineStatusSlice";



export const useWebSocket = (token: string | null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket('ws://localhost:5000', [token]);

    ws.onopen = () => {
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'online_users') {
          dispatch(setOnlineUsers(data.payload));
        }
      } catch (error) {
        console.error('Ошибка парсинга', error);
      }
    }

    ws.onclose = () => {
      console.log('Closed');
    };

    ws.onerror = (err) => {
      console.error('WS Error', err);
    };

    return () => ws.close();

  }, [dispatch, token])
}