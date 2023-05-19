import bcrypt from "bcrypt";

export const comparePassword = async (password, dbpassword) => {
  const cPassword = await bcrypt.compare(password, dbpassword);
  return cPassword;
};
