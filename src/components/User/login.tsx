import * as React from "react";
import AppInput from "../AppInput";
import { useForm } from "react-hook-form";
import AppButton from "../AppButton";
import UserService from "../../services/UserService";
import {useState} from "react";
import {emailRegex, passwordRegex} from "../../services/UtilityService";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (payload: any) => {
    UserService.login(payload)
        .then(()=>{
      console.log('then test')
    })
        .catch((e)=>{
          console.log('error test');
        })
  }

  const submit = (payload: any) => {
    setLoading(true);
    login(payload);
    reset();
    setLoading(false);
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
                 onClick={() => navigate('/user/forget',{ replace : true })}
            >Forgot password?</div>
          </div>


          <div className={'pt-5'}>
            <AppButton type={'submit font-mono'}
                       text={"Login"}
                       loading={loading}
                       icon={'ri-login-circle-line'}
            />
          </div>

          <div className={'flex justify-start pt-5'}>
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
