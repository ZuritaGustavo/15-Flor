document.addEventListener("DOMContentLoaded", function() {
    const myModal = new bootstrap.Modal(document.getElementById('modal-principal'))
    myModal.show();
    const btnPause = document.getElementById("botonPause");
    const miAudio = document.getElementById("miAudio");
    const btnPlay = document.getElementById("boton-play");
    const btnCerrar =  document.getElementById("boton-cerrar");
    let isPlaying = false;
    btnPlay.addEventListener("click", ()=>{
        miAudio.play();
      myModal.hide();
    })

    btnCerrar.addEventListener("click", ()=>{
      myModal.hide();
    })
    btnPause.addEventListener("click", ()=>{
        if (isPlaying) {
            miAudio.pause();
            isPlaying = false;
        } else {
            miAudio.play();
            isPlaying = true;

        }
    })

    miAudio.addEventListener("ended", function() {
        isPlaying = false;
    });

    function handleAnimation(entries, observer) {
        entries.forEach((entry) => {
            const element = entry.target;
    
            if (entry.isIntersecting) {
                element.classList.add("fade-in"); // Agrega clase para fade in
                element.classList.remove("fade-out");
            } else {
                element.classList.remove("fade-in");
                element.classList.add("fade-out"); // Agrega clase para fade out
            }
        });
    }
    
    // Crear una instancia de Intersection Observer
    const observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5 // Umbral de visibilidad (50% del elemento visible)
    });
    
    // Seleccionar el elemento que se animará
    const aros = document.querySelector(".aros");
    
    // Observar el elemento
    observer.observe(aros);

    
    const btnAgendar = document.getElementById("btn-agendar");

    btnAgendar.addEventListener("click", function() {
        const fechaEvento = new Date("2023-11-04T22:00:00");

        // Formatea la fecha y hora para que Google Calendar la entienda
        const fechaFormateada = fechaEvento.toISOString().replace(/-|:|\.\d+/g, "");

        // Nombre y dirección del evento
        const nombreEvento = "Fiesta de 15 Flor";
        const direccionEvento = "C.Jorge Luis Borges 3091, Yerba Buena, Tucumán";

        // URL para agregar el evento a Google Calendar
        const urlGoogleCalendar = `https://www.google.com/calendar/render?action=TEMPLATE&text=${nombreEvento}&dates=${fechaFormateada}/${fechaFormateada}&location=${direccionEvento}`;

        // Abre la página de Google Calendar en una nueva pestaña
        window.open(urlGoogleCalendar, "_blank");
    });

    const enviarBtn = document.getElementById("enviar");
 
    // Agrega un evento click al botón de envío
    enviarBtn.addEventListener("click", function() {
        // Obtiene los valores de los campos del formulario
        const confirmo = document.querySelector('input[name="confirmo"]:checked').value;
        let mensaje=''
        if(confirmo == 'si'){
            mensaje = 'Confirmo mi asistencia!';
        }else{
            mensaje = 'No podre asistir :( espero que pases una hermosa noche';
        }
        const nombre = document.getElementById("recipient-name").value;
        const detalle = document.getElementById("message-text").value;
 
        // Construye la URL de la API de WhatsApp con los datos
        const apiURL = `https://api.whatsapp.com/send?phone=+5493816016292&text=Confirmación:${mensaje}%0A%0ANombre:${nombre}%0A%0ADetalle:${detalle}`;
 
        // Redirige a la URL de la API de WhatsApp
        window.location.href = apiURL;
    });



    // Fecha programada (descomenta esta línea y ajusta la fecha según tu necesidad)
     var fechaProgramada = new Date('2023-11-04T22:00:00');

    // Si quieres programar la fecha, usa la variable fechaProgramada
    var fechaActual = new Date();
    var tiempoRestante;

    if (typeof fechaProgramada !== 'undefined') {
        tiempoRestante = fechaProgramada - fechaActual;
    } else {
        // Si no has programado una fecha, ajusta el tiempo en milisegundos aquí (por ejemplo, 7 días)
        tiempoRestante = 7 * 24 * 60 * 60 * 1000;
    }

    function actualizarCuentaRegresiva() {
        var dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        var horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        document.querySelector('.dias').textContent = dias;
        document.querySelector('.horas').textContent = horas;
        document.querySelector('.minutos').textContent = minutos;
        document.querySelector('.segundos').textContent = segundos;

        if (tiempoRestante <= 0) {
            clearInterval(cuentaRegresiva);
            // Aquí puedes agregar acciones adicionales cuando se alcance la fecha programada
        }

        tiempoRestante -= 1000; // Restar 1 segundo
    }


    actualizarCuentaRegresiva(); // Actualizar la cuenta regresiva inmediatamente

    var cuentaRegresiva = setInterval(actualizarCuentaRegresiva, 1000); // Actualizar cada segundo
});
