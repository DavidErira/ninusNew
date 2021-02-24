
/*
------------------------------------------------------------------------------------------------------------------
*   Esta función toma la etiqueta a-scene y agrega el atributo networked-scene que contiene el id de la sala     *
*   el cual se genera aleatoriamente en esta misma función. [by David Erira - NINUS - 18/11/2020]                *
------------------------------------------------------------------------------------------------------------------
*/
var nickNameMe = "nick";

function NewTab(idVideo) {
  //window.open(enlace, "_blank");
  //var videoOut = document.getElementById('video_idOption');
  player.loadVideoById(idVideo);
  console.log("cargando nuevo video");
} 

function GeneraIDSala()
        {
          

          setTimeout(()=>{
            var preloader = document.getElementById("idPreloadre");
            preloader.style.display="flex";
          },500);
           

            setTimeout( () => {

             
                document.getElementById("InterSalaID").style.width="400px";
             

                var sceneEl = document.querySelector('a-scene');
                var idSala = Math.floor( Math.random()*(1000 * 99999));

                var username = 'user-' + makeId(5).toLowerCase();
                var inputNick=document.getElementById("nick");
                

                if(inputNick.value != ""){
                  username=inputNick.value;
                  console.log("Agrego un nickname valido");
                }
                nickNameMe=username;

                console.log("conectado a sala: "+ idSala);
                document.getElementById("InterSalaID").innerHTML = '<h3 class="sala-actual"> El id de la sala es: '+idSala+ '</h3>';
                sceneEl.setAttribute('networked-scene', "app: myApp; room: "+idSala+"; adapter: webrtc;  debug:true");
                
            
                document.getElementById('waitOnMe').emit('loaded'); 
                console.log( "Inicia todo" );


                //username = prompt('Choose a username', username);
                var player = document.getElementById('player');
                var myNametag = player.querySelector('.nametag');

                myNametag.setAttribute('text','value: '+username+'; align:center;');
                
                var preloader = document.getElementById("idPreloadre");
                preloader.style.display="none";

                //document.querySelector('a-scene').components['networked-scene'].connect();
            },2000)
        }




/*
------------------------------------------------------------------------------------------------------------------
*   Esta función toma la etiqueta a-scene y agrega el atributo networked-scene con el ID de la sala                  *
*   que se ah ingresado en el input, en caso de estar vacio genera un alert. [by David Erira - NINUS - 18/11/2020]   *
------------------------------------------------------------------------------------------------------------------
*/
function IngresaIdSalaExistente()
        {

          

          setTimeout(()=>{
            var preloader = document.getElementById("idPreloadre");
            preloader.style.display="flex";
          },500);

          setTimeout(()=>{

            

            var sceneEl = document.querySelector('a-scene');
            var SalaExistente = document.getElementById("Idsalaexistente");

            var username = 'user-' + makeId(5).toLowerCase();
            var inputNick=document.getElementById("nick");

            if(inputNick.value != ""){
              username=inputNick.value;
              console.log("Agrego un nickname valido");
            }

            nickNameMe=username;

            if (SalaExistente.value == "" ){
                console.log("ID invalido");
                alert("Ingresa un ID valido !!");
            }
            else {
                document.getElementById("InterSalaID").style.width="400px";

                console.log("conectado a sala: "+ SalaExistente.value);
                document.getElementById("InterSalaID").innerHTML = '<h3 class="sala-actual"> El id de la sala es: '+SalaExistente.value+ '</h3>';
                sceneEl.setAttribute('networked-scene', "app: myApp; room: "+SalaExistente.value+"; adapter: webrtc;  debug:true");
              
                
                document.getElementById('waitOnMe').emit('loaded'); 
                console.log( "va a iniciar" );

                //username = prompt('Choose a username', username);
                var player = document.getElementById('player');
                var myNametag = player.querySelector('.nametag');
                myNametag.setAttribute('text','value: '+username+'; align:center;');


                //document.querySelector('a-scene').components['networked-scene'].connect();
            }

            var preloader = document.getElementById("idPreloadre");
            preloader.style.display="none";

          },2000);  
        }


        
/*
------------------------------------------------------------------------------------------------------------------
*  función para generar Nombres de usuarío diferentes por default -----------------------------------------------*
------------------------------------------------------------------------------------------------------------------
*/

function makeId(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


/*
----------------------------------------------------------------------------------------------------------
*  Se registra un componente para generar una posición nueva para cada participante nuevo, la posición   *
*  se genera de forma aleatoria. [by David Erira - NINUS - 18/11/2020]                                   *
----------------------------------------------------------------------------------------------------------
*/
AFRAME.registerComponent('spawn-in-circle', {
    schema: {
        radius: {type: 'number', default: 1}
    },
    
    init: function() {
        var el = this.el;
        var center = el.getAttribute('position');
    
        var angleRad = this.getRandomAngleInRadians();
        var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
        var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
        el.setAttribute('position', worldPoint);
        // console.log('world point', worldPoint);
    
        var angleDeg = angleRad * 180 / Math.PI;
        var angleToCenter = -1 * angleDeg + 90;
        var angleRad = THREE.Math.degToRad(angleToCenter);
        el.object3D.rotation.set(0, angleRad, 0);
        // console.log('angle deg', angleDeg);
    },
    
    getRandomAngleInRadians: function() {
        return Math.random()*Math.PI*2;
    },
    
    randomPointOnCircle: function (radius, angleRad) {
        var x = Math.cos(angleRad)*radius;
        var y = Math.sin(angleRad)*radius;
        return {x: x, y: y};
    }
    });


    // se puede detecar si se esta en desde un celular
    var isMobile = AFRAME.utils.device.isMobile();

    if (isMobile) {
    var particles = document.getElementById('particles');
    particles.parentNode.removeChild(particles);
    }


    function ocultarMostrarIns() {
      var instr = document.getElementById("IdinstrPC");
      var icono = document.getElementById("iconOcultarInsPc");

      if (instr.style.display=="none"){
        instr.style.display="inline";
        icono.innerHTML="visibility_off";

      }
      else{
        instr.style.display="none";
        icono.innerHTML="live_help";
      }
      
    }

    function ocultarMostrarInsMov() {
      var instr = document.getElementById("IdinstrMov");
      var icono = document.getElementById("iconOcultarInsMov");

      if (instr.style.display=="none"){
        instr.style.display="inline";
        icono.innerHTML="visibility_off";

      }
      else{
        instr.style.display="none";
        icono.innerHTML="live_help";
      }
      
    }




    function ocultarMostrarVid() {
      var video = document.getElementById("playerVideo");
      var icono = document.getElementById("iconOcultarVid");

      if (video.style.display=="none"){
        video.style.display="inline";
        icono.innerHTML="visibility_off";

      }
      else{
        video.style.display="none";
        icono.innerHTML="ondemand_video";
      }
      
    }

   /* ----------------------- Enlaces en variables --------------------------- */

/* Se organiza 3 enlaces por Stands, en el nombre de la variable contiene el numero del stand seguido de la ubicacion 
dentro del stand, la variable almacena el id del video en yotube, para agregar la función de saltar enlace en un plano
se agrega la linea onclick='NewTab(StXUbicación)', en donde StXUbicación es el nombrede la variable que contiene el enlace */

/* --------  Enlaces Stand 1 -------- */
var vidSt1Fondo="1vUe4pJR1cU";
var vidSt1Caja="1vUe4pJR1cU";
var vidSt1Cenefa="1vUe4pJR1cU";


/* --------  Enlaces Stand 2 -------- */
var vidSt1Fondo="1vUe4pJR1cU";
var vidSt1Caja="1vUe4pJR1cU";
var vidSt1Cenefa="1vUe4pJR1cU";



