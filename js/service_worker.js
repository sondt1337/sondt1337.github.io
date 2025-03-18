(() => {
  // <stdin>
  if ("serviceWorker" in navigator && window.siteConfig.swPath) {
    let emitUpdate = function() {
      _$(".notification-wrapper").classList.add("show");
    };
    emitUpdate2 = emitUpdate;
    _$("#notification-update-btn").onclick = () => {
      try {
        navigator.serviceWorker.getRegistration().then((reg) => {
          reg.waiting.postMessage("skipWaiting");
        });
      } catch (e) {
        window.location.reload();
      }
    };
    _$("#notification-close-btn").onclick = () => {
      _$(".notification-wrapper").classList.remove("show");
    };
    navigator.serviceWorker.register(siteConfig.swPath).then((registration) => {
      console.log("Service Worker \u6CE8\u518C\u6210\u529F: ", registration);
      if (registration.waiting) {
        emitUpdate();
        return;
      }
      registration.onupdatefound = () => {
        console.log("Service Worker \u66F4\u65B0\u4E2D...");
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              emitUpdate();
            }
          }
        };
      };
    }).catch((error) => {
      console.log("Service Worker \u6CE8\u518C\u5931\u8D25: ", error);
    });
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) {
        return;
      }
      refreshing = true;
      window.location.reload();
    });
  }
  var emitUpdate2;
})();
