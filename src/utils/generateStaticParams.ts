export async function generateStaticParamsForIds(ids: string[]) {
  return ids.map((id) => ({
    id: id,
  }));
}
