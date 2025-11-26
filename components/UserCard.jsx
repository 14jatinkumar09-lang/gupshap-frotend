import { useSelector } from "react-redux";


export function UserCard ({onClick , user}) {
  const { allFriendUsers , loading , filterSearchUsers , loginUser , homePageLoader , selectedUser , onlineUsers } = useSelector(state => state.user) ;

    return <button className="w-full p-1 hover:cursor-pointer"
    onClick={onClick} >
            <div>
            <div className="flex gap-8 items-center w-full p-1  border border-white/10 rounded-2xl my-2">
                <div className={`avatar ${onlineUsers?.includes(user?._id)?"avatar-online" :"avatar-offline"}`}>
  <div className="w-15 rounded-full">
    <img src={user?.avatar} />
  </div>
</div>

            <div className="flex flex-col items-start">
                <h1 className="text-xl">{user?.fullName}</h1>
                <div className="text-[10px] ">{user?.userName}</div>
                </div>
            </div>
                
            </div>
        </button>
} 