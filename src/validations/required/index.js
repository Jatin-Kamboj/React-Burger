export const required = (value) => {
  console.log(value);
  return value || typeof value === "number" ? undefined : "Required";
};
