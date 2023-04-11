import * as React from "react";
import AppInput from "../AppInput";
import { useForm } from "react-hook-form";
import AppButton from "../AppButton";
import UserService from "../../services/UserService";
import {useState} from "react";
import {emailRegex, passwordRegex} from "../../services/UtilityService";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm();

    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = (payload: any) => {
        UserService.register(payload)
            .then(()=>{
                toast.success('An email was send to confirm your account')
            })
            .catch((e)=>{
                toast.error(e.message)
            })
    }

    const checkConfirmPassword = (password:  string, confirmedPassword: string) => (password === confirmedPassword);

    const submit = (payload: any) => {
        setLoading(true);
        if(checkConfirmPassword(payload.password,payload.confirmPassword)){
            registerUser({
                name: payload.name,
                email: payload.email,
                password: payload.password
            });
            reset();
        }else{
            setError('confirmPassword',{ type: 'validate', message: 'Passwords do not match.' })
        }
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
                    <div className={'py-1 text-xl md:text-2xl font-semibold font-mono'}>Register</div>
                    <div className={'pb-7 text-md md:text-lg font-mono'}>Register to sermo chat app</div>
                    <AppInput
                        {...register("name", {
                            required: true,
                        })}
                        label={"Name"}
                        className={"rounded-lg w-full font-mono"}
                        labelIcon={"ri-user-line"}
                        errors={errors}
                        maxLength={40}
                    />
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

                    <AppInput
                        {...register("confirmPassword", {
                            required: true,
                        })}
                        type={"password"}
                        label={"Confirm password"}
                        className={"rounded-lg font-mono"}
                        errors={errors}
                        maxLength={30}
                    />

                    <div className={'pt-5'}>
                        <AppButton type={'submit font-mono'}
                                   text={"Register"}
                                   className={'login-button mx-auto'}
                                   loading={loading}
                        />
                    </div>

                    <div className={'flex justify-end pt-3'}>
                        <div className={'register-link font-mono'}
                             onClick={()=> navigate('/login')}
                        >Alreadey registered? Click here to login.</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
