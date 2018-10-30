import { middlewares } from 'auth0-extension-express-tools';
import { Router as router } from 'express';
import config from '../lib/config';


export default () => {
  const hooks = router();
  const hookValidator = middlewares
    .validateHookToken(config('AUTH0_DOMAIN'), config('WT_URL'), config('EXTENSION_SECRET'));

  hooks.use('/on-uninstall', hookValidator('/.extensions/on-uninstall'));
  hooks.use(middlewares.managementApiClient({
    domain: config('AUTH0_DOMAIN'),
    clientId: config('AUTH0_CLIENT_ID'),
    clientSecret: config('AUTH0_CLIENT_SECRET')
  }));

  hooks.delete('/on-uninstall', (req, res) => {
    console.log('Entered deleted')
    const clientId = config('AUTH0_CLIENT_ID');
    // req.auth0.clients.delete({ client_id: clientId })
    //   .then(() => {
    //     logger.debug(`Deleted client ${clientId}`);
    //     res.sendStatus(204);
    //   })
    //   .catch((err) => {
    //     logger.debug(`Error deleting client: ${config('AUTH0_CLIENT_ID')}`);
    //     logger.error(err);

    //     // Even if deleting fails, we need to be able to uninstall the extension.
    //     res.sendStatus(204);
    //   });
  });
  return hooks;
};
