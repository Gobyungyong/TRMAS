import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { firebaseAuth } from "../firebase";
// import { createNewAdmin } from "../../firebase";
import routes from "../routes";

function Login() {
  const [loginIsFault, setLoginIsFault] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm();

  const onLogInSubmit = async (data) => {
    try {
      await setPersistence(firebaseAuth, browserSessionPersistence);
      await signInWithEmailAndPassword(firebaseAuth, data.id, data.password);

      navigate(routes.projectAdmin, { replace: true });
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoginIsFault(true);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onLogInSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm leading-6 text-gray-900 font-bold"
              >
                ID
              </label>
              <div className="mt-2">
                <input
                  className="focus:outline-none pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="아이디"
                  aria-invalid={
                    isSubmitted ? (errors.id ? "true" : "false") : undefined
                  }
                  {...register("id", {
                    required: "아이디는 필수 입력입니다.",
                    minLength: {
                      value: 3,
                      message: "3자리 이상 입력해주세요.",
                    },
                  })}
                />
                {errors.id && (
                  <small className="text-red-500 font-semibold" role="alert">
                    {errors.id.message}
                  </small>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-900 font-bold"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="focus:outline-none pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="password"
                  placeholder="비밀번호"
                  aria-invalid={
                    isSubmitted
                      ? errors.password
                        ? "true"
                        : "false"
                      : undefined
                  }
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 5,
                      message: "5자리 이상 비밀번호를 사용하세요.",
                    },
                  })}
                />
                {errors.password && (
                  <small className="text-red-500 font-semibold" role="alert">
                    {errors.password.message}
                  </small>
                )}
                {loginIsFault && (
                  <p className="font-semibold text-red-500">
                    아이디 혹은 비밀번호가 잘못됐습니다.
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
