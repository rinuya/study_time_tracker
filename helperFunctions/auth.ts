import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password:string, hashedPassword:string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function generateRandomToken() {
  let token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + + Math.random().toString(36).substring(2);
  return token;
}
