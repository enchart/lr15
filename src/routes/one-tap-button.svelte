<script>
  if ("VKIDSDK" in window) {
    const VKID = window.VKIDSDK;

    VKID.Config.init({
      app: 53454430,
      redirectUrl: "http://localhost/api/auth/callback/vk",
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
      scope: "", // Заполните нужными доступами по необходимости
    });

    const oneTap = new VKID.OneTap();

    oneTap
      .render({
        container: document.currentScript.parentElement,
        showAlternativeLogin: true,
      })
      .on(VKID.WidgetEvents.ERROR, vkidOnError)
      .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
        const code = payload.code;
        const deviceId = payload.device_id;

        VKID.Auth.exchangeCode(code, deviceId).then(vkidOnSuccess).catch(vkidOnError);
      });

    function vkidOnSuccess(data) {
      console.log(data);
      test();
    }

    function vkidOnError(error) {
      console.error(error);
    }
  }
</script>

<svelte:head>
  <script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
</svelte:head>

<!-- <div>
  <script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
  <script type="text/javascript">
    if ("VKIDSDK" in window) {
      const VKID = window.VKIDSDK;

      VKID.Config.init({
        app: 53454430,
        redirectUrl: "http://localhost/api/auth/callback/vk",
        responseMode: VKID.ConfigResponseMode.Callback,
        source: VKID.ConfigSource.LOWCODE,
        scope: "", // Заполните нужными доступами по необходимости
      });

      const oneTap = new VKID.OneTap();

      oneTap
        .render({
          container: document.currentScript.parentElement,
          showAlternativeLogin: true,
        })
        .on(VKID.WidgetEvents.ERROR, vkidOnError)
        .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
          const code = payload.code;
          const deviceId = payload.device_id;

          VKID.Auth.exchangeCode(code, deviceId).then(vkidOnSuccess).catch(vkidOnError);
        });

      function vkidOnSuccess(data) {
        console.log(data);
        test();
      }

      function vkidOnError(error) {
        console.error(error);
      }
    }
  </script>
</div> -->
