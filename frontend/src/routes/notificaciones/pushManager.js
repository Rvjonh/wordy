
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        console.log("Intentar registara worker")
      try {
        const swUrl = './frontend/src/routes/notificaciones/workerNotificacion.js';

        const registration = await navigator.serviceWorker.register(swUrl)

        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        //console.error(`Registration failed with ${error}`);
        console.error("Error de registro");
      }
    }else{
        console.log("ser wokers no disponibles ...")
    }
};

export { registerServiceWorker }