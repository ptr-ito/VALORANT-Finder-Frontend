export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  confirmSuccessUrl: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface User {
  attributes: {
    id: string;
    uuid: string;
    uid: string;
    provider: string;
    email: string;
    name: string;
    nickname?: string;
    rank: string;
    agent: string;
    twitterName: string;
    youtubeUrl: string;
    startedOnVal: string;
    ingameName: string;
    highestRank: string;
    selfIntroduction: string;
    image: {
      url: string;
    };
    allowPasswordChange: boolean;
    created_at: Date;
    updated_at: Date;
  };
}

export interface UpdateUserData {
  id: number | undefined | null;
  name?: string;
  rankId?: string;
  agentIds?: string;
  twitterName?: string;
  youtubeUrl?: string;
  startedOnVal?: string;
  ingameName?: string;
  highestRankId?: string;
  selfIntroduction?: string;
  image?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface ForgotPassword {
  email: string;
  redirectUrl: string;
}

export interface ResetPassword {
  password: string;
  passwordConfirmation: string;
  accessToken: string;
  client: string;
  uid: string;
}

export interface EmailData {
  email?: string;
}

export interface MatchPost {
  attributes: {
    id: string;
    userUuid: string;
    userId: string;
    content: string;
    status: string;
    rank: string;
    mode: string;
    mood: string;
    userName: string;
    userImage?: {
      url: string;
    };
    createdAt: string;
  };
}

// マッチ募集投稿更新
export interface MatchPostUpdate {
  content?: string;
  rankIds?: string;
  modeId?: string;
  moodId?: string;
}

// マッチ募集投稿コメント
export interface MatchPostComment {
  attributes: {
    id: string;
    userUuid: string;
    content: string;
    rootId: string;
    userId: string;
    userName: string;
    userImage?: {
      url: string;
    };
    createdAt: string;
    commentableId: string;
    commentableType: string;
  };
}

export interface GetComments {
  commentableId: string;
  commentableType: string;
}

export interface UpdateUserFormData extends FormData {
  append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any;
}

export interface EmailFormData extends FormData {
  append(name: keyof EmailData, value: String | Blob, fileName?: string): any;
}

export interface ResetPasswordFormData extends FormData {
  append(name: keyof ResetPassword, value: String | Blob, fileName?: string): any;
}

export interface MatchPostFormData extends FormData {
  append(name: keyof MatchPost, value: String | Blob | Number, fileName?: string): any;
}

export interface MatchPostUpdateFormData extends FormData {
  append(name: keyof MatchPostUpdate, value: String | Blob | Number): any;
}

export interface PostCommentFormData extends FormData {
  append(name: keyof MatchPostComment, value: String | Blob | Number, fileName?: string): any;
}

export interface ResendEmailFormData extends FormData {
  append(name: keyof EmailData, value: String | Blob | Number, fileName?: string): any;
}

export interface PostFormProps {
  handleGetPosts: Function;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PostItemProps {
  matchPost: MatchPost;
  handleGetPosts: Function;
}

export interface PostEditProps {
  handleGetPosts: Function;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  matchPost: MatchPost | undefined;
  query: any;
}

export interface PostCommentFormProps {
  handleGetComments: Function;
  query: any;
}

export interface PostCommentReplyProps {
  handleGetComments: Function;
  query: any;
  rootId: string;
  setVisibleReply: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PostCommentItemProps {
  postComment: MatchPostComment;
  handleGetComments: Function;
  query: any;
  replies: any;
}

export interface PostCommentEditProps {
  postComment: MatchPostComment;
  query: any;
  setVisibleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetComments: Function;
}

export interface MatchPostTwitterProps {
  matchPost: MatchPost;
  handleMenuClose: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, link: string) => void) | undefined;
}
