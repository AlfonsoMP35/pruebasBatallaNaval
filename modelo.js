
//CREACIÓN DEL JUEGO
function Juego(){
    this.partidas={}; //Diccionario (asociación clave-valor) this.partidas=[];
    this.usuarios={}; 

    this.agregarUsuario=function(nick){
        let res={"nick":-1};
        if (!this.usuarios[nick]){
            this.usuarios[nick]=new Usuario(nick,this);
            res={"nick":nick};
            console.log("Nuevo usuario: " +nick);
        }
        return res;
    }

    this.eliminarUsuario=function(nick){
        delete this.usuarios[nick];
    }

    //Usuario hace log out
    this.usuarioSale=function(nick){
		if (this.usuarios[nick]){
			this.finalizarPartida(nick);
			this.eliminarUsuario(nick);
		}
	}

    this.jugadorCreaPartida=function(nick){
        let usr = this.usuarios[nick]; //Juego.obtenerUsuario(nick)
        let res = {codigo:-1};
      
        if(usr){
          let codigo = usr.crearPartida();
          //let codigo = this.crearPartida(usr);
          res={codigo:codigo};         
        }
        return res;
    }

    this.crearPartida=function(usr){
        //obtener código único
        //crear la partida con propietario nick
        //devolver el código
        let codigo=Date.now();
        console.log("Usuario "+usr.nick+ " crea partida "+codigo);
        this.partidas[codigo]=new Partida(codigo, usr);
        return codigo;
    }

    this.unirseAPartida=function(codigo,usr){
        let res=-1;
        if(this.partidas[codigo]){
            res = this.partidas[codigo].agregarJugador(usr);
        }
        else{
            console.log("La partida no existe");
        }
        return res;
    }

    this.jugadorSeUneAPartida=function(nick,codigo){
        let usr = this.usuarios[nick];
        let res = {"codigo":-1};
      
        if(usr){
          let valor = usr.unirseAPartida(codigo);
          //let valor = this.unirseAPartida(codigo,usr);
          res={"codigo":valor};         
        }
        return res;
    }

    this.obtenerUsuario=function(nick){
        if(this.usuarios(nick)){
            return nick;
        }
    }

    //Devuelve la lista de todas las partidas 
    this.obtenerPartidas=function(){
        let lista;
        
        for(let key in this.partidas){ //for(i=0;i++;i<this.partidas.lenght;)
            lista.push({"codigo":key, "owner":this.partidas[codigo].owner})
        }
        return lista;
    }

    //Devuelve la lista de partidas disponibles (Las partidas no están completas)
	this.obtenerPartidasDisponibles=function(){
		let lista=[];
		for (let key in this.partidas){
			if (this.partidas[key].fase=="inicial"){
				lista.push({"codigo":key,"owner":this.partidas[key].owner.nick});
			}
		}
		return lista;
	}

    //Cambia el estado de las partidas a 'final'
    this.finalizarPartida=function(nick){
		for (let key in this.partidas){
			if (this.partidas[key].fase=="inicial" && this.partidas[key].estoy(nick)){
				this.partidas[key].fase="final";
			}
		}
	}

    this.obtenerPartida=function(codigo){
        return this.partidas[codigo];
    }

    
}

//CREACIÓN DE UN USUARIO
function Usuario(nick,juego){
    this.nick=nick;
    this.juego=juego;  //Usuario conoce la clase Juego
    this.tableroPropio;
    this.tableroRival;
    this.flota=[];

    this.crearPartida=function(){
        return this.juego.crearPartida(this)
    }

    this.unirAPartida=function(codigo){
        this.juego.unirAPartida(codigo, this);

    }

    this.inicializarTableros=function(dim){
        this.tableroPropio=new Tablero(dim);
        this.tableroRival=new Tablero(dim);

    }

    this.inicializarFlota=function(){
        this.flota.push(new Barco("b2",2));
        this.flota.push(new Barco("b4",4));
        //otros barcos ...
    }

    this.colocarBarco=function(){
        //posicioes fijas o predefinidas, aleatorias, creadas por el usuario...
        //coloca el barco de nombre en la casilla x,y del tam propio
    }

}


//CREACIÓN DE LA PARTIDA
function Partida(codigo, usr){
    this.codigo=codigo;
    this.owner=usr;
    this.jugadores=[];
    this.fase="inicial"; //new Inicial()
    this.maxJugadores = 2;

    this.agregarJugador=function(usr){
        let res=this.codigo;
        if (this.hayHueco()){
            this.jugadores.push(usr);
            console.log(usr.nick + " se ha unido a la partida");
            usr.inicializarTableros(5);
            usr.inicializarFlota();
            this.comprobarFase();
        }
        else {
            res=-1;
            console.log("La partida esta completa");
        }
        return res;
    }

    this.comprobarFase=function(){
        if (!this.hayHueco()){
            this.fase="jugando";
        }
    }

    this.hayHueco=function(){
        return (this.jugadores.length< this.maxJugadores);
    }

    //Existe el jugador
    this.estoy=function(nick){
		for(i=0;i<this.jugadores.length;i++){
			if (this.jugadores[i].nick==nick){
				return true;
			}
		}
		return false;
	}

    this.esJugando=function(){
        return this.fase=="jugando";
    }

    this.agregarJugador(this.owner);

    function Tablero(size){
        this.size=size;
        this.casillas;
        this.crearTablero=function(tam){
            this.casillas=new Array(tam);
            for(x=0;x<tam;x++){
                this.casillas[x]=new Array(tam);
                for(y=0;y<tam;y++){
                    this.casillas[x][y]=new Casilla(x,y);
                }
            }
        }
    
    }

    function Casilla(x,y){
        this.x=x;
        this.y=y;
        this.contiene;
    }

    function Barco(nombre,tam){
        this.nombre=nombre;
        this.tam=tam
        this.orientacion; //horizontal, vertical, ....
    }

    function Agua(){
        this.nombre="agua";
    }



}

module.exports.Juego = Juego; //Super objeto