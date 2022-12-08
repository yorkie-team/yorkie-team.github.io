import jwt_decode, { JwtPayload } from 'jwt-decode';

// isValidToken checks if the given token is valid. This function is used to
// check if the token is expired or not.
export function isValidToken(token: string | null) {
  if (!token) {
    return false;
  }
  
  const decoded = jwt_decode<JwtPayload>(token);
  const currentTime = new Date().getTime() / 1000;
  if (!decoded || decoded.exp! < currentTime) {
    return false;
  }

  return true
}
