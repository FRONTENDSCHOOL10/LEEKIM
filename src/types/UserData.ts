export interface UserData {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: Date;
  updated: Date;
  Bookmark: { id: string[] };
  RecentlyViewed: { id: string[] };
  InterestedTag: string[];
  Admin: boolean;
}
