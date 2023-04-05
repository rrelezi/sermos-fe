import * as React from 'react';
import AppInput from "../AppInput";
import {useForm} from "react-hook-form";
import AppButton from "../AppButton";

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm();

    return(
        <div className={'background'}>
            <form className={'relative top-1/4 w-10/12 md:w-9/12 max-w-2xl mx-auto'}>
                <div className={'form py-10 w-full'}>
                    <AppInput
                        {...register('email', {
                            required: true,
                        })}
                        label={'Email'}
                        className={'text-black rounded-lg w-full'}
                    />
                    <AppInput
                        {...register('password', {
                            required: true,
                        })}
                        type={'password'}
                        label={'Password'}
                        className={'text-black rounded-lg'}
                    />
                    <AppButton
                    text={'Login'}
                    />
                </div>
            </form>
        </div>

    );
}

export default Login;

