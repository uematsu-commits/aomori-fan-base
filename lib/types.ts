export type Category = "風景" | "グルメ" | "祭り" | "つぶやき";
export type Location = "県内" | "県外" | "その他";

export type Profile = {
  id: string;
  name: string;
  avatar_url: string | null;
  location: Location;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  category: Category;
  created_at: string;
  profiles: Profile;
  comments: Comment[];
  likes: { count: number }[];
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: Profile;
};

export type Like = {
  id: string;
  post_id: string;
  user_id: string;
};
