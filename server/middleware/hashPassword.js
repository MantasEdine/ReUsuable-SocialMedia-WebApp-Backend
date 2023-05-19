import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // 10 rounds of hashing
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
