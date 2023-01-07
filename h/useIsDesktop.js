import * as React from "react";

function useIsDesktop() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  const isDesktop = width >= 768;

  return isDesktop;
}

export default useIsDesktop;
