import * as z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "ユーザーネームを入力してください" })
      .min(3, {
        message: "ユーザーネームは3文字以上10文字以下で入力してください",
      })
      .max(10, {
        message: "ユーザーネームは2文字以上10文字以下で入力してください",
      })
      .refine((value) => {
        return Boolean(value.trim().length);
      }, "最初の文字に空白を入れることはできません"),

    email: z.string().min(1, { message: "メールアドレスを入力してください" }).email({
      message: "このメールアドレスは無効です。example@email.comのような形式でメールアドレスが入力されているか確認してください",
    }),

    password: z
      .string()
      .min(1, { message: "パスワードを入力してください" })
      .regex(/^([a-zA-Z0-9]{6,})$/, {
        message: "半角英数字6文字以上で入力してください",
      }),

    passwordConfirmation: z.string().min(1, { message: "もう一度パスワードを入力してください" }),

    confirmSuccessUrl: z.string(),
  })

  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "パスワードが一致しません",
  });

export const signInSchema = z.object({
  email: z.string().min(1, { message: "メールアドレスを入力してください" }).email({
    message: "このメールアドレスは無効です。example@email.comのような形式でメールアドレスが入力されているか確認してください",
  }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ユーザーネームを入力してください" })
    .min(3, {
      message: "ユーザーネームは3文字以上20文字以下で入力してください",
    })
    .max(20, {
      message: "ユーザーネームは2文字以上20文字以下で入力してください",
    }),

  rankId: z.preprocess((v) => String(v), z.string()),

  agentId: z.preprocess((v) => String(v), z.string()),

  selfIntroduction: z.string().max(1000, {
    message: "自己紹介は1000文字以下で入力してください",
  }),
});

export const EditEmailSchema = z.object({
  email: z.string().min(1, { message: "メールアドレスを入力してください" }).email({
    message: "このメールアドレスは無効です。example@email.comのような形式でメールアドレスが入力されているか確認してください",
  }),
});

export const EditPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "パスワードを入力してください" })
      .regex(/^([a-zA-Z0-9]{6,})$/, {
        message: "半角英数字6文字以上で入力してください",
      }),

    passwordConfirmation: z.string().min(1, { message: "もう一度パスワードを入力してください" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "パスワードが一致しません",
  });

export const MatchPostSchema = z.object({
  content: z.string().min(1, { message: "募集の内容を入力してください" }),
  rankIds: z.string().array().nonempty({ message: "ランク帯を選択してください" }),
  modeId: z.number({ required_error: "対戦モードを選択してください" }),
  moodId: z.number({ required_error: "雰囲気を選択してください" }),
});

export const MatchPostUpdateSchema = z.object({
  content: z.string().min(1, { message: "募集の内容を入力してください" }),
  rankIds: z.preprocess((v) => String(v), z.string()),
  modeId: z.preprocess((v) => String(v), z.string()),
  moodId: z.preprocess((v) => String(v), z.string()),
});

export const MatchPostCommentSchema = z.object({
  content: z.string().min(1, { message: "コメントを入力してください" }),
});

export type MatchPostSchemaType = z.infer<typeof MatchPostSchema>;

export type MatchPostUpdateSchemaType = z.infer<typeof MatchPostUpdateSchema>;

export type MatchPostCommentSchemaType = z.infer<typeof MatchPostCommentSchema>;
