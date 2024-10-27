export function formatId(id: number): string {
  if (id >= 1000) return `${id}`;
  if (id >= 100) return `0${id}`;
  if (id >= 10) return `00${id}`;
  return `000${id}`;
}
