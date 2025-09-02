import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.auth);

    useEffect(() => {
        if(!selectedUser) return;

        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(
                    `https://instaclone-axnu.onrender.com/api/v1/message/all/${selectedUser._id}`,
                    { withCredentials: true }
                );
                if(res.data.success){
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessage();
    }, [selectedUser, dispatch]);
};
export default useGetAllMessage;
