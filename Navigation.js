const checkIsNavigationSupported = () => {
  return Boolean(document.startViewTransition);
};

const fetchPage = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  const data = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return data;
};

export const startViewTransition = () => {
  if (checkIsNavigationSupported) return;

  window.navigation.addEventListener("navigate", (event) => {
    const toUrl = new URL(event.destination.url);

    if (location.origin !== toUrl.origin) return;

    event.intercept({
      async handler() {
        const data = await fetchPage(toUrl.pathname);
        if (data) {
          document.startViewTransition(() => {
            document.body.innerHTML = data[1];
            document.documentElement.scrollTop = 0;
          });
        }
      },
    });
  });
};



// simple

  if (document.startViewTransition) {
    window.navigation.addEventListener("navigate", (event) => {
      const toUrl = new URL(event.destination.url);

      if (location.origin !== toUrl.origin) return;

      event.intercept({
        async handler() {
          const response = await fetch(toUrl.pathname);
          const html = await response.text();
          const data = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
          if (data) {
            document.startViewTransition(() => {
              document.body.innerHTML = data[1];
              document.documentElement.scrollTop = 0;
            });
          }
        },
      });
    });
  }
