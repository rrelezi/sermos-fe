import * as React from "react";
import AppInput from "../AppInput";
import { useForm } from "react-hook-form";
import AppButton from "../AppButton";
import UserService from "../../services/UserService";
import {useState} from "react";
import {emailRegex} from "../../services/UtilityService";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [loading,setLoading] = useState(false);

    const forget = (payload: any) => {
        UserService.forgotPassword(payload)
            .then(()=>{
                toast.success('An email was sent to reset password')
            })
            .catch((e)=>{
                toast.error(e.message)
            })
    }

    const submit = (payload: any) => {
        setLoading(true);
        forget(payload);
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
                    <div className={'py-1 text-xl md:text-2xl font-semibold font-mono'}>Forgot Password</div>
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

export default ForgotPassword;
