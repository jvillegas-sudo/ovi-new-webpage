import { contaminants } from "./catalog";

export { contaminants } from "./catalog";

export function getContaminant(id: string) {
  return contaminants.find((item) => item.id === id);
}
