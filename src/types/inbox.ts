export interface Comment {
  ProfileName: string;
  Date: string;
  CommentText: string;
  CommentId: string;
  ActivityId: string;
  Network: string;
  PostlogId: string;
}

export interface CommentListParams {
  postlogId?: string;
  network?: string;
}
