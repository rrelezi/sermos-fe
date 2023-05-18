import React, {useCallback} from "react";
import AppInput from "../AppInput";
import { useForm } from "react-hook-form";
import AppButton from "../AppButton";
import UserService from "../../services/UserService";
import {useEffect, useState} from "react";
import UtilityService, {emailRegex, passwordRegex} from "../../services/UtilityService";
import {useNavigate} from "react-router-dom";
import {getUserConvos, login} from "../../store/User";
import {useDispatch} from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [loading,setLoading] = useState(false);
  const [googleAuthUrl,setGoogleAuthUrl] = useState(null);
  const [loginData, setLoginData] = useState({
    user: {
      id: null
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = !!UtilityService.getAuthCookie();

  useEffect(() => {
    //if(loggedIn) navigate(RouteNames.Home, {replace: true})

    UserService.getGoogleAuth()
        .then((response)=> setGoogleAuthUrl(response.url))
        .catch((error) => console.error(error));
  }, []);

  const submit = (payload: any) => {
    setLoading(true);
    dispatch(login(payload))
        .then(({ type, payload }: any) => {
          if(!!payload && payload.user)dispatch(getUserConvos(payload.user.id))
          if(type.split('/')[1] === 'fulfilled'){
            navigate("/main/home");
          }
        })
        .finally(() => setLoading(false));
    reset();
  }

  return (
    <div className={"background"}>
      <div className={'header'}>Sermo</div>
      <form className={"relative w-10/12 md:w-9/12 max-w-2xl mx-auto"}
            onSubmit={handleSubmit(submit)}
            style={{
              top: '15vh'
            }}
      >
        <div className={"form py-10 w-full"}>

          <div className={'py-1 text-xl md:text-2xl font-semibold font-mono'}>Login</div>
          <div className={'pb-7 text-md md:text-lg font-mono'}>Please login to your account</div>

          <AppInput
            {...register("email", {
              required: true,
              pattern: {
                value: emailRegex,
                message: 'Please enter a correct email.'
              }
            })}
            label={"Email"}
            className={"rounded-lg w-full font-mono"}
            labelIcon={"ri-user-line"}
            errors={errors}
            maxLength={40}
          />

          <AppInput
            {...register("password", {
              required: true,
              pattern: {
                value: passwordRegex,
                message:
                    'Password must contain at least 8 characters, 1 upper case character, 1 lowercase character and 1 number.',
              }
            })}
            type={"password"}
            label={"Password"}
            className={"rounded-lg font-mono"}
            labelIcon={'ri-lock-password-line'}
            errors={errors}
            maxLength={30}
          />

          <div className={'flex justify-end'}>
            <div className={'register-link font-mono'}
                 onClick={() => navigate('/user/forget')}
            >Forgot password?</div>
          </div>


          <div className={'flex flex-row justify-end py-2 pr-5'}>
            <AppButton type={'submit font-mono'}
                       text={"Login"}
                       loading={loading}
                       icon={'ri-login-circle-line'}
                       iconClass={'pl-2'}
            />
            {googleAuthUrl && (
                <a className={'register-link font-mono text-base pl-2 pt-2'} href={googleAuthUrl}>or sign in with google</a>
            )}
          </div>

          <div className={'flex justify-between pt-3'}>
            <div className={'register-link font-mono'}
                 onClick={() => navigate('/register',{ replace : true })}
            >Click here to register</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
