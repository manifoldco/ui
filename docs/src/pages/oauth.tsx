import React from 'react';

export const Oauth = () => (
  <script>
    {`if (window.parent) {
      window.parent.postMessage({"access_token":"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJyYXciOiJ4eEdASk0zMlJSMklSbml4UGhATUpSU05EZnZRT3FAdCIsImV4cCI6MTU2NDc1MzkyMywic3ViIjoiMjFtNjZ6OXF1djAxNjVoMDdxeGtyMzAxMzg2bWciLCJhdWQiOiJtYW5pZm9sZC5jby9nYXRla2VlcGVyIn0.XzJDaE0Vd85PMmNtg8-ZVNd6i2ZMUf9-Prb-W6beDb4KoLzyn0E-f742K6KhjN6N4aqswCiBlH_j34-0OW9ceQ","expiry":1564753923}, "*");
    }`}
  </script>
);

export default Oauth;
