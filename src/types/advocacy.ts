export interface AdvocateProfile {
  Id: string;
  Created: string;
  Name: string;
  Status: string;
  Network: string;
  ImageLink: string;
  NetworkUsername: string;
}

export interface AdvocateShare {
  Id: string;
  Created: string;
  CreatedBy: string;
  Network: string;
  CredentialId: string;
  CredentialImage: string;
  Message: string;
  ImageUrl: string;
  LinkUrl: string;
  LinkTitle: string;
  Description: string;
  Picture: string | null;
  Type: string;
  Media: unknown | null;
  StartDateTime: string;
  EndDateTime: string;
  Status: string;
  Source: string;
  TargetGeo: string;
}

export interface Advocate {
  Id: string;
  Created: string;
  Modified: string;
  Status: string;
  Name: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PictureUrl: string | null;
  LastBoardLogin: string;
  Profiles: AdvocateProfile[];
  BoardIds: string[];
  Topics?: string[];
  LatestShares?: AdvocateShare[];
}

export interface AdvocateListItem {
  Email: string;
  Id: string;
  LastBoardLogin: string;
  Name: string;
  PictureUrl: string | null;
}

export interface AdvocateListParams {
  email?: string;
}

export interface AdvocateGetParams {
  boardId?: string;
}

export interface InviteAdvocateParams {
  firstName: string;
  lastName: string;
  email: string;
  boardId: string;
}

export interface BoardConfig {
  Color: string;
  DefaultExpiration: string;
  IconId: string;
  IsAllowSuggestionsEnabled: boolean;
  IsLeaderboardEnabled: boolean;
  LogoId: string;
  LogoPosition: string;
  NotificationsDay: string | null;
  NotificationsEnabled: boolean;
  NotificationsTimeUTC: string;
  PostAddress: string;
  SignUpDomains: boolean;
  SignUpEnabled: boolean;
  Slug: string;
  Terms: string;
}

export interface Board {
  Config: BoardConfig;
  Created: string;
  Id: string;
  Name: string;
  Status: string;
  UsersCount: number;
}

export interface StoryMessage {
  Id: string;
  Network: string;
  Message: string;
  Type: string;
  Mentions: { Id: string; Text: string }[];
  LinkTitle: string;
  LinkUrl: string;
  Description: string;
  ImageUrl: string;
  VideoPreview: string;
  VideoTitle: string;
  VideoSubtitle: string;
  Media: unknown[];
}

export interface Story {
  ID: string;
  Created: string;
  Modified: string;
  AccountId: string;
  CreatedBy: string;
  ModifiedBy: string;
  BoardId: string;
  CampaignId: string;
  PublishDate: string;
  ExpirationDate: string;
  IsFeatured: boolean;
  Title: string;
  Description: string;
  ImageUrl: string | null;
  LinkTitle: string | null;
  LinkUrl: string | null;
  LinkDescription: string | null;
  LinkContent: string | null;
  Type: string;
  Status: string;
  ShareCount: number;
  AltTexts: string | null;
  VideoTitle: string | null;
  VideoPreview: string | null;
  VideoSubtitle: string | null;
  PreviewFrame: string | null;
  WorkflowId: string | null;
  Messages: StoryMessage[];
  Media: unknown[];
  Topics: string[];
  Tags: string[];
}

export interface StoryListParams {
  boardId?: string;
}

export interface CreateStoryParams {
  boardId?: string;
  title: string;
  description: string;
  campaignId: string;
  mediaIds?: string;
  link?: string;
  messageIds?: string;
  topicIds?: string;
  tagIds?: string;
  publishDatetime?: number;
  expirationDatetime?: number;
  isDraft?: boolean;
  isFeatured?: boolean;
  workflowId?: string;
}

export interface UpdateStoryParams {
  boardId?: string;
  title?: string;
  description?: string;
  campaignId?: string;
  mediaIds?: string;
  link?: string;
  messageIds?: string;
  topicIds?: string;
  tagIds?: string;
  publishDatetime?: number;
  expirationDatetime?: number;
  isDraft?: boolean;
  isFeatured?: boolean;
  workflowId?: string;
}

export interface AddBoardMessageParams {
  boardId: string;
  messageId: string;
  startDate?: string;
  expireDate?: string;
  important?: 0 | 1;
  topicIds?: string;
}

export interface RemoveBoardMessageParams {
  boardId: string;
  messageId: string;
}

export interface Topic {
  Id: string;
  Name: string;
  BoardId: string;
  Used: string;
  Subscribers: string;
  LastUsedDate: string;
}

export interface TopicListParams {
  q?: string;
  boardId?: string;
}

export interface CreateTopicParams {
  boardId: string;
  name: string;
}

export interface UpdateTopicParams {
  name: string;
}
