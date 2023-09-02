export const generateToken = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let token = ''
  Array.from({ length }, () => {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  })

  return token
}