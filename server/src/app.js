module.exports.createApp = () => {
  const app = {
    listen: port => console.log('listening on port', port),
  };

  return app;
};
