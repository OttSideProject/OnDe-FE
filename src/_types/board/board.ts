export interface PostDetailType {
  post_idx: number;
  user_idx: number;
  title: string;
  contents: string;
  post_views: number;
  boardid: number;
  like_count: number;
  createdAt: string;
  modifiedAt: string;
}

export interface UserInfo {
  user_idx: number;
  userName: string;
  profile_path: string;
}
