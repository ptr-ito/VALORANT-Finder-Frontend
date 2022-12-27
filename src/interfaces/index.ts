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
  id: number;
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

export interface UpdateUserFormData extends FormData {
  append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any;
}

export interface UpdateEmailFormData extends FormData {
  append(name: keyof UpdateEmailData, value: String | Blob, fileName?: string): any;
}
