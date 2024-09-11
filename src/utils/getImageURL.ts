import { ExhibitionData } from '@/types/ExhibitionData';

export function getImageURL(item: ExhibitionData, fileName: string = 'Poster'): string {
  const apiUrl = import.meta.env.VITE_DB_API;
  return `${apiUrl}/files/${item.collectionId}/${item.id}/${item[fileName as keyof ExhibitionData]}`;
}
