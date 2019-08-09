export default component => `
<manifold-connection>
  <manifold-auth-token token="something|${new Date(Date.now() + 6.04e8).getTime()}"/>
  ${component}
</manifold-connection>`;
