describe("Player", function() {
  var miJuego;
  var usr1,usr2;

  beforeEach(function() {
    miJuego=new Juego();
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    let res=miJuego.jugadorCreaPartida("pepe");
    miJuego.jugadorSeUneAPartida("luis",res.codigo);
    usr1=miJuego.obtenerUsuario("pepe");
    usr2=miJuego.obtenerUsuario("luis");
    partida=miJuego.obtenerPartida(res.codigo);
  });

  it("inicialmente", function() {
    expect(usr1.nick).toEqual("pepe");
    expect(usr2.nick).toEqual("luis");

    //comprobar que los usuarios están en la partida
    //comprobar que cada usuario tiene 2 tableros de 5*5
    //comprobar que cada usuario tiene una flota de 2 barcos de tamaño 4 y 2
    //comprobar que la partida está en fase jugando
    

  });

  it("En partida (fase jugando)", function () {
    expect(partida.estoy("pepe")).toBeTrue();
    expect(partida.estoy("luis")).toBeTrue();

  });

  it("2 tableros de 5*5", function () {
    expect(usr1.tableroPropio).toBeDefined();
    expect(usr2.tableroPropio).toBeDefined();

    expect(usr1.tableroRival).toBeDefined();
    expect(usr2.tableroRival).toBeDefined();

    expect(usr1.tableroPropio.casillas.length).toEqual(5);
    expect(usr2.tableroPropio.casillas.length).toEqual(5);

    expect(usr1.tableroPropio.casillas[0].length).toEqual(5);
    expect(usr2.tableroPropio.casillas[0].length).toEqual(5);

    expect(usr1.tableroPropio.casillas[0][0].contiene.esAgua()).toBeTrue();


  });

  it("2 barcos de tamaño 4 y 5", function () {
  expect(usr1.flota).toBeDefined();
  expect(usr2.flota).toBeDefined();

  expect(Object.keys(usr1.flota).length).toEqual(2);
  expect(Object.keys(usr2.flota).length).toEqual(2);

  expect(usr1.flota["b2"].tam).toEqual(2);
  expect(usr1.flota["b4"].tam).toEqual(4);

  });

  it("la partida está en fase jugando", function () {
    expect(partida.esJugando()).toBeFalse();
    expect(partida.esDesplegando()).toBeTrue();
  });

});

describe("A jugar", function (){
  var miJuego;
  var usr1,usr2;


  beforeEach(function(){
    miJuego=new Juego();
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    let res=miJuego.jugadorCreaPartida("pepe");
    miJuego.jugadorSeUneAPartida("luis",res.codigo);
    usr1=miJuego.obtenerUsuario("pepe");
    usr2=miJuego.obtenerUsuario("luis");
    partida=miJuego.obtenerPartida(res.codigo);

    usr1.colocarBarco("b2",0,0) //0,0 1,0
    usr1.colocarBarco("b4",0,1) //0,1 1,1 1,2 1,3
    usr1.barcosDesplegados();

    usr2.colocarBarco("b2",0,0) //0,0 1,0
    usr2.colocarBarco("b4",0,1) //0,1 1,1 1,2 1,3
    usr2.barcosDesplegados();
  })


  it("Comprobar que las flotas están desplegadas", function() {
    expect(usr1.todosDesplegados()).toBeTrue();
    expect(usr2.todosDesplegados()).toBeTrue();
    expect(partida.flotasDesplegadas()).toBeTrue();


  });

  it("Comprobar jugada que Pepe gana", function() {
    expect(partida.turno.nick).toBeEquals("pepe");

    us1.disparar(0,0);
	  us1.disparar(1,0);

	  us1.disparar(0,1);
	  us1.disparar(1,1);
	  us1.disparar(2,1);
	  us1.disparar(3,1);

    expect(partida.turno.jugadores).toEqual(0);
    expect(partida.esFinal()).toBeTrue();




  });

  it("Comprobar el cambio de turno", function() {
    us1.disparar(2,0);

    expect(partida.turno.jugadorSeUneAPartida).toEqual(1);


  });

})

