import { useState } from "react";
import { MOVE } from "../screens/game";

export default function Chessboard({board,setBoard,socket,chess}){
    
    let [from,setFrom]=useState(null);

    function movePiece(i,j){
        let colRepresentation=String.fromCharCode(j+97)+(8-i);
        if(!from){
            setFrom(colRepresentation);
        }
        else{
            socket.send(JSON.stringify({
                type:MOVE,
                move:{
                    from:from,
                    to:colRepresentation
                }
            }))
            chess.move({
                from:from,
                to:colRepresentation
            })
            setBoard(chess.board());
            setFrom(null);
        }
    }

    return(
        <div className="">
            {board.map( (row,i) => {
                return <div key={i} className="flex justify-between"> 
                    {row.map( (col,j)=>{
                        return <div onClick={()=>{movePiece(i,j)}} key={j} className={`w-11 h-11 ${(i+j)%2==0?"bg-green-100":"bg-green-700"} flex justify-center items-center`}>
                            {col?col.type:" "}
                        </div>
                    } )}
                </div>
            })}
        </div>
    )
}