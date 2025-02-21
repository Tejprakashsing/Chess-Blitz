import { Chess } from 'chess.js'
import { INIT_GAME, MOVE,GAME_OVER } from "./messageTypes.js";
export class Game{
    constructor(socket1,socket2){
        this.player1=socket1;
        this.player2=socket2;
        this.board=new Chess();
        this.moves=[]; // array of strings
        this.startTime=new Date();

        socket1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{colour:"white"}
        }))

        socket2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{colour:"black"}
        }))
    }

    makeMove(socket,move){

        //returing if opponents turn
        if(this.moves.length%2===0 && socket===this.player2){
            return;
        }
        if(this.moves.length%2!==0 && socket===this.player1){
            return;
        }


        try{
            this.board.move({...move});
            console.log(this.board.ascii());
        }
        catch(e){
            console.log(e);
        }

        this.moves.push(move);

        if(this.board.isGameOver()){
            socket.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner: this.moves.length%2===0 ? 'black' : 'white',
                }
            }))
            return;
        }

        if(this.moves.length%2===0){
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        else{
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }

    }
}