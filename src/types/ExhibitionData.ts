export interface TagItem {
  id: string;
  Name: string;
}

export interface ExhibitionData {
  collectionId: string;
  id: string;
  Title: string;
  expand: {
    School: {
      Name: string;
    };
    Major: {
      Name: string;
    };
    TagLocation: TagItem[];
    TagDepartment: TagItem[];
  };
  URL: string;
  Poster: string;
  Introduce: string;
  Contact: string;
  Address: string;
  subtitle: string;
  Start: string;
  End: string;
  Time: {
    time: string[];
  };
}
