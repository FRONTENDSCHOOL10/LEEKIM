interface dbItem {
  collectionId: string;
  id: string;
  Poster: string;
}

export default function getImageURL(item: dbItem, fileName: string = 'Poster'): string {
  const apiUrl = import.meta.env.VITE_DB_API;
  return `${apiUrl}/files/${item.collectionId}/${item.id}/${item[fileName as keyof dbItem]}`;
}
