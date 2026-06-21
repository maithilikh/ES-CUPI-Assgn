import { io } from "socket.io-client";

const getBackendBaseUrl = () => {
	const rawUrl = import.meta.env.VITE_API_URL || window.location.origin;

	return rawUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
};

const socket = io(getBackendBaseUrl());

export default socket;
