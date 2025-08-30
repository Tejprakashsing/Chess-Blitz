import { Game } from "./game.js";
import { INIT_GAME,MOVE } from "./messageTypes.js";

class GameManager{
    constructor(socket){
        this.Games=new Array();  // array of game class
        this.pendingUser=null;
        this.users=new Array();
    }

    addUser(socket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket){
        this.users = this.users.filter(user => user !== socket);
    }

    addHandler(socket){
        socket.on('message',(data)=>{
            const message=JSON.parse(data.toString());
            console.log(message);
            if(message.type===INIT_GAME) this.initializeGame(socket)
            
            if(message.type===MOVE) this.handleMove(socket,message);
        
        })
    }

    initializeGame(socket){
        if(!this.pendingUser) this.pendingUser=socket;
        else{
            const game=new Game(this.pendingUser,socket);

            this.Games.push(game);
            this.pendingUser=null;
        }
    }

    handleMove(socket,message){
        // console.log(Game.length);
        let game=this.Games.find(game=> game.player1===socket || game.player2===socket );
        if(game)
        game.makeMove(socket,message.move);
        else console.log("game not found");
    }

}

export {GameManager};