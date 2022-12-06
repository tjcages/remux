import "../styles/globals.css";

import Remux from "../remux";

function MyApp({ Component, pageProps }) {
  return (
    <Remux preview scale="0.9" shadow="rgba(0, 0, 0, 0.2) 0px 30px 40px -7px">
      <Component {...pageProps} />
    </Remux>
  );
}

export default MyApp;
