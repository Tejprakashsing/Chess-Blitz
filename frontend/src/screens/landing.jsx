import Button from "../components/button"
import { useNavigate } from "react-router-dom"

export default function Landing(){
    const navigate=useNavigate();
    return(
        <div className="flex justify-center items-center">
            <div className="max-w-80 max-h-80">
                <img src="https://www.houseofstaunton.com/media/wysiwyg/ChessBasics/HOS/setup-board.JPG" alt="" />
            </div>
            <div className="ml-10 flex-row">
                <div>
                    <p className="text-white">welcome to #1 chess platform</p>
                </div>
                <div className="p-3 flex justify-center bg-green-500 mt-10 rounded-xl">
                    <Button onClick={()=>{
                        navigate("/game")
                    }} text={"Start Game"}/>
                </div>
            </div>
        </div>
    )
}