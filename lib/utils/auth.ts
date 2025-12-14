// Authentication utilities

const VALID_USERNAME = 'hackathon';
const VALID_PASSWORD = '1214';

export function validateCredentials(username: string, password: string): boolean {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const authState = localStorage.getItem('auth_state');
  if (!authState) return false;

  try {
    const { isAuthenticated } = JSON.parse(authState);
    return isAuthenticated === true;
  } catch {
    return false;
  }
}
