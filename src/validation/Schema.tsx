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
