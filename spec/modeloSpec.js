describe("Player", function() {
  var miJuego;
  var usr1,usr2;

  beforeEach(function() {
    miJuego=new Juego();
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    usr1=miJuego.usuarios["pepe"];
    usr2=miJuego.usuarios["luis"];
  });

  it("inicialmente", function() {
    let lista=miJuego.obtenerPartidas();
    expect(lista.length).toEqual(0);
    expect(usr1.nick).toEqual("pepe");
    expect(usr2.nick).toEqual("luis");

    //comprobar que los usuarios están en la partida
    //comprobar que cada usuario tiene 2 tableros de 5*5
    //comprobar que cada usuario tiene una flota de 2 barcos de tamaño 4 y 2
    //comprobar que la partida está en fase jugando
    

  });

  it("En partida (fase jugando)", function () {
    let codigo=usr1.crearPartida();
    miJuego.unirseAPartida(codigo,usr2);
    let partida=miJuego.partidas[codigo];
    expect(partida.jugadores.length).toEqual(2);



  });

  it("2 tableros de 5*5", function () {
    expect(us1.tableroPropio).toBeDefined();
    expect(us2.tableroPropio).toBeDefined();

    expect(us1.tableroRival).toBeDefined();
    expect(us2.tableroRival).toBeDefined();

    expect(us1.tableroPropio.casillas.length).toEqual(5);
    expect(us2.tableroPropio.casillas.length).toEqual(5);

    expect(us1.tableroPropio.casillas[0].length).toEqual(5);
    expect(us2.tableroPropio.casillas[0].length).toEqual(5);

    expect(us1.tableroPropio.casillas[0][0].contiene.nombre).toEqual(0);


  });

  it("2 barcos de tamaño 4 y 5", function () {
  expect(us1.flota).toBeDefined();
  expect(us2.flota).toBeDefined();

  expect(us1.flota.length).toEqual(2);
  expect(us2.flota.length).toEqual(2);

  expect(us1.flota[0].tam).toEqual(2);
  expect(us1.flota[1].tam).toEqual(4);

  });

  it("la partida está en fase jugando", function () {
    expect(partida.esJugando()).toBeTrue();
  });



  it("obtener partida", function() {  
    
    let codigo=usr1.crearPartida();
    expect(miJuego.partidas[codigo].toEqual(1));
    let partida=miJuego.partidas[codigo];
    expect(partida.owner.nick).toEqual(usr1.nick);
    expect(partida.jugadores[0].nick).toEqual(usr.nick);
    expect(partida.codigo).toEqual(codigo);

  });



});
