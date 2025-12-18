// @/stores/socketStore.ts

import { create } from "zustand";

type LeaderboardEntry = {
    name: string;
    studentNumber: string;
    email: string;
    gender: string;
    score: number;
};

type SocketState = {
    socket: WebSocket | null;
    leaderboard: LeaderboardEntry[];
    initSocket: () => Promise<void>;
    closeSocket: () => void;
    fetchLeaderboard: () => void;
};

const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL as string;

export const useSocketStore = create<SocketState>((set, get) => ({
    socket: null,
    leaderboard: [],

    initSocket: async () => {
        const existingSocket = get().socket;

        if (existingSocket && existingSocket.readyState !== WebSocket.CLOSED) {
            console.log("⚠️ Socket already initialized.");
            return;
        }

        try {
            const response = await fetch("/api/fetch-token");
            if (!response.ok) throw new Error("Failed to fetch token");
            const { token } = await response.json();

            const ws = new WebSocket(
                `${websocketUrl}/admin?token=${token}`
            );

            ws.onopen = () => {
                console.log("🔌 WebSocket connected");
                // Auto-fetch leaderboard on open
                get().fetchLeaderboard();
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("📨 Message from server:", data);

                    if (data.event === "leaderboard") {
                        set({ leaderboard: data.results });
                    }
                } catch (err) {
                    console.log(err); 
                    console.warn(
                        "📭 Non-JSON message from server:",
                        event.data
                    );
                }
            };


            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            // ws.onclose = () => {
            //     console.warn("WebSocket closed");
            //     set({ socket: null });
            // };

            ws.onclose = (event) => {
                console.warn(
                    `WebSocket closed. Code=${event.code}, Reason=${event.reason}, WasClean=${event.wasClean}`
                );
                set({ socket: null });
            };


            set({ socket: ws });
        } catch (err) {
            console.error("❌ Failed to initialize WebSocket:", err);
        }
    },

    closeSocket: () => {
        const sock = get().socket;
        if (sock && sock.readyState === WebSocket.OPEN) {
            sock.close();
            console.log("🔒 WebSocket closed by client.");
        }
        set({ socket: null });
    },

    fetchLeaderboard: () => {
        const sock = get().socket;
        if (sock && sock.readyState === WebSocket.OPEN) {
            sock.send(JSON.stringify({ event: "leaderboard" }));
        }
    },
}));