// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  confirmSuccessUrl: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

// ユーザー
export interface User {
  id: string;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  rankId: number;
  agentId: number;
  selfIntroduction: string;
  image: {
    url: string;
  };
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UpdateUserData {
  id: number | undefined | null;
  name?: string;
  rankId?: number;
  agentId?: number;
  selfIntroduction?: string;
  image?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface UpdateEmailData {
  email?: string;
}

// マッチ募集投稿
export interface MatchPost {
  attributes: {
    id: string;
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

export interface MatchPostUpdate {
  content?: string;
  rankIds?: string;
  modeId?: string;
  moodId?: string;
}

export interface UpdateUserFormData extends FormData {
  append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any;
}

export interface UpdateEmailFormData extends FormData {
  append(name: keyof UpdateEmailData, value: String | Blob, fileName?: string): any;
}

export interface MatchPostFormData extends FormData {
  append(name: keyof MatchPost, value: String | Blob | Number, fileName?: string): any;
}

export interface MatchPostUpdateFormData extends FormData {
  append(name: keyof MatchPostUpdate, value: String | Blob | Number): any;
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
