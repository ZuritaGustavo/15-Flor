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
