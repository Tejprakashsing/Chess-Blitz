import { useState } from "react";
import { MOVE } from "../screens/game";

export default function Chessboard({board,setBoard,socket,chess,isWhite}){
    
    let [from,setFrom]=useState(null);
    function movePiece(i,j){

        console.log(chess)

        //trying to move opponents piece
        if(board[i][j] && !from && board[i][j].color=='w' && !isWhite) return console.log("not your piece");
        if(board[i][j] && !from && board[i][j].color=='b' && isWhite) return console.log("not your piece");

        //moving when not your turn
        if(chess._turn=='b' && isWhite) return console.log("not your turn");
        if(chess._turn=='w' && !isWhite) return console.log("not your turn");

        let colRepresentation=String.fromCharCode(j+97)+(8-i);
        if(!from){

            //trying to move from a null position
            if(!board[i][j]) return console.log("piece not avilable to move"); 
            
            setFrom(colRepresentation);
        }
        else{
            try {
                chess.move({
                    from:from,
                    to:colRepresentation
                })
                setBoard(chess.board());
                socket.send(JSON.stringify({
                type:MOVE,
                move:{
                    from:from,
                    to:colRepresentation
                }
                }))
                
            } catch (error) {
                console.log(error)
            }
            setFrom(null);
        }
    }
    
    function pieceUrl(col){
        switch(col.type){
            case 'b':
                if(col.color=='w') return "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
                else return "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png";
            case 'k':
                if(col.color=='w') return "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
                else return "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png";
            case 'n':
                if(col.color=='w') return "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
                else return "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png";
            case 'p':
                if(col.color=='w') return "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png";
                else return "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png";
            case 'q':
                if(col.color=='w') return "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
                else return "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";  
            case 'r':
                if(col.color=='w') return "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";
                else return "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png";
        }
    }

    return(
        <div className="">
            {(isWhite ? board : [...board].reverse()).map((row, i) => {
                return (
                    <div key={i} className="flex justify-between">
                        {row.map((col, j) => {
                            return (
                                <div onClick={() => movePiece(isWhite ? i : 7 - i, j)} key={j} className={`w-11 h-11 ${(i + j) % 2 === 0 ? "bg-green-100" : "bg-green-700"} flex justify-center items-center`}>
                                    {col ? <img src={pieceUrl(col)} alt=" " /> : " "}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}