import { FaUserCircle } from "react-icons/fa";
import { UserCard } from "../components/UserCard";
import { ChatBox } from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import {
    allChats,
    allUsers,
    btnLoading,
    current_2nd_user,
    loggedInUser,
    msgBlink,
    onlineUsersArr
} from '../store/ConversationUser';
import { io } from 'socket.io-client';

export function Home() {

    const navigate = useNavigate();

    const [users, setUsers] = useRecoilState(allUsers);
    const [filterUsers, setFilterUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [userSearch, setUserSearch] = useState("");

    const [selectedUser, setSelectedUser] = useRecoilState(current_2nd_user);
    const loginUser = useRecoilValue(loggedInUser);

    const [chats, setChats] = useRecoilState(allChats);
    const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUsersArr);

    const [btnLoad, setBtnLoad] = useRecoilState(btnLoading);
    const [blink, setBlink] = useRecoilState(msgBlink);

    const inputRef = useRef(null);
    const socket = useRef(null);
    const audio = useRef(null);

    const connectedRef = useRef(false); // prevents duplicate socket connections

    const focusInput = () => {
        inputRef.current.value = "";
        setIsSearching(false);
    };

    // ✅ SOCKET SETUP (Runs Once Only)
    useEffect(() => {

        if (connectedRef.current) return; 
        connectedRef.current = true;

        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        Notification.requestPermission();
        audio.current = new Audio('/notif.wav');

        socket.current = io(import.meta.env.VITE_DB_ORIGIN_URL, {
            query: { _id: loginUser?._id }
        });

        socket.current.on("connect", () => {
            console.log("Socket Connected:", socket.current.id);
        });

        socket.current.on("message", (message) => {
            audio.current?.play().catch(() => {});

            // Update chat only if message is from selected chat user
            setChats(prev => {
                if (message?.newMessage?.senderId === selectedUser?._id) {
                    return [...prev, message?.newMessage];
                }
                return prev;
            });
        });

        socket.current.on("onlineUsers", setOnlineUsers);

        return () => {
            socket.current?.disconnect();
            socket.current = null;
            console.log("Socket Disconnected");
        };

    }, []); // ✅ no re-runs

    // ✅ USER SEARCH
    const handleSearch = async (e) => {
        const value = e.target.value;
        setUserSearch(value);

        if (!value.trim()) {
            setIsSearching(false);
            return;
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/user/filterUserSearch?filter=${value}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setFilterUsers(Object.values(res.data.responseData.users));
            setIsSearching(true);
        } catch (error) { }
    };

    return (
        <div className="flex flex-col items-center sm:flex-row">

            {/* LEFT SIDE */}
            <div className="part1 sm:h-screen sm:w-[35vw] h-[50vh] w-[80vw] border-2 border-white/10 flex flex-col">

                <div className="bg-gray-600 h-10 flex justify-center items-center font-bold">
                    GupShap
                </div>

                <label className="input validator w-full h-10">
                    <input
                        ref={inputRef}
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search Username"
                        required
                    />
                </label>

                <div className="my-2 overflow-y-scroll h-full border-2 border-white/10">
                    {(isSearching ? filterUsers : users)?.map(user =>
                        user.userName !== loginUser?.userName &&
                        <UserCard key={user._id} user={user} onClick={() => {
                            setSelectedUser(user);
                            focusInput();
                        }} />
                    )}
                </div>

                {/* PROFILE BUTTON */}
                <button
                    className="h-20 text-blue-300 px-5 sm:flex justify-center text-2xl font-bold hidden"
                    onClick={() => { setSelectedUser(loginUser); navigate("/profileUpdate"); }}
                >
                    <div className="avatar avatar-online">
                        <div className="w-10 rounded-full">
                            <img src={loginUser?.avatar} />
                        </div>
                    </div>
                    <div>{loginUser?.fullName}</div>
                </button>

            </div>

            {/* RIGHT SIDE (CHAT) */}
            <div className="part2 border border-white/10 w-full sm:h-screen h-[50vh]">
                <ChatBox user={selectedUser} />
            </div>

        </div>
    );
}
