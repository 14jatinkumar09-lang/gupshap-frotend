
export function InputBox ({label , type , placeholder , onChange , onKeyDown  }) {
    return <div className="m-1 p-3 text-left  ">
        <label className="font-medium" htmlFor={label} >{label}</label>
        <input  placeholder={placeholder} type={type == undefined ? "text" : type} id={label} 
        className="border w-full rounded-md py-2 px-3 focus:outline-none focus:border-2 focus:border-blue-500" 
        onChange = {onChange}
        onKeyDown={!onKeyDown ? ()=>{} : onKeyDown }
        ></input>
    </div>
}