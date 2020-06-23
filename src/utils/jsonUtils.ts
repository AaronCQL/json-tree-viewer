import { map } from "lodash-es";

function getType(variable: unknown): string {
  return Object.prototype.toString
    .call(variable)
    .replace("]", "")
    .split(" ")[1];
}

function makeTree(json: JSON) {
  return map(json, (val, key) => {
    const leaf = {
      key: key,
      type: getType(val),
      value: null,
      children: null,
    };
    if (val === null || typeof val !== "object") {
      leaf.value = val;
    } else {
      leaf.children = makeTree(val);
    }
    return leaf;
  });
}

function isValidJsonString(string: string): boolean {
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
}

export { makeTree, isValidJsonString };
