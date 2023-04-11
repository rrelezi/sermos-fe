import * as React from "react";
import AppInput from "../AppInput";
import { useForm } from "react-hook-form";
import AppButton from "../AppButton";
import UserService from "../../services/UserService";
import {useState} from "react";
import {getQueryParams, passwordRegex} from "../../services/UtilityService";
import toast from "react-hot-toast";
import Message from "./Message";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm();

    const [loading,setLoading] = useState(false);
    const [completed,setCompleted] = useState(false);

    const params = getQueryParams(decodeURI(window.location.href));

    const checkConfirmPassword = (password:  string, confirmedPassword: string) => (password === confirmedPassword);

    const resetPassword = (payload: any) => {
        setLoading(true);
        UserService.resetPassword(payload)
            .then(()=>{
                setCompleted(true);
                toast.success('Password reset was successful')
            })
            .catch((e)=>{
                toast.error(e.message)
            })
            .finally(() =>  setLoading(false))
    }

    const submit = (payload: any) => {
        if(checkConfirmPassword(payload.password,payload.confirmPassword)){
            resetPassword({
                token: params.token,
                newPassword: payload.password,
                confirmPassword: payload.confirmPassword
            });
            reset();
        }else{
            setError('confirmPassword',{ type: 'validate', message: 'Passwords do not match.' })
        }
    }

    if(completed)
        return <Message message={'Password reset was successful.'}/>

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
                    <div className={'py-1 text-xl md:text-2xl font-semibold font-mono'}>Forgot Password</div>
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
                                   text={"Reset password"}
                                   loading={loading}
                                   className={'login-button mx-auto'}
                                   icon={'ri-login-circle-line'}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
