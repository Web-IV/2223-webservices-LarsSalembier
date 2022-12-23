const jwksrsa = require('jwks-rsa');
const config = require('config');

/**
 * Get the secret for the JWT token.
 *
 * @return {Promise<string>} the secret
 */
function getJwtSecret() {
  try {
    const secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get('auth.jwksUri'), // 👈
      cache: true,
      cacheMaxEntries: 5,
    });
    return secretFunction;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Check the JWT token.
 *
 * @return {Promise<function>} the middleware
 */
function checkJwtToken() {
  try {
    const secretFunction = getJwtSecret();
    return jwt({
      secret: secretFunction,
      audience: config.get('auth.audience'),
      issuer: config.get('auth.issuer'),
      algorithms: ['RS256'],
      passthrough: true, // 👈
    });
    // .unless({
    //   path: [], // whitelist urls
    // }),
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  checkJwtToken,
};
