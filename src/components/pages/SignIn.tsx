import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "lib/api/auth";
import { AuthContext } from "App";
import { SignInParams } from "interfaces/index";

export const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSignInSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"] || "");
        Cookies.set("_client", res.headers["client"] || "");
        Cookies.set("_uid", res.headers["uid"] || "");

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <p>サインインページです</p>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={(e) => handleSignInSubmit(e)}>
          Submit
        </button>
      </form>
      <Link to="/signup">サインアップへ</Link>
    </>
  );
};
