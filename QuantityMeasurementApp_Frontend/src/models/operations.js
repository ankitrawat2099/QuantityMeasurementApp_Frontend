export const ALL_OPERATIONS = [
  "Add",
  "Subtract",
  "Divide",
  "Compare",
  "Convert",
];

export const getAllowedOperations = (type) => {
  if (type === "Temperature") {
    return ["Compare", "Convert"];
  }
  return ALL_OPERATIONS;
};