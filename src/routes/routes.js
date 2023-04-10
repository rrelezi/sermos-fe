const names = {
    Login: `/login`,
    RegisterEmailVerification: `/user/register_confirm`,
    ForgotPassword: `/user/forget`,
    ResetPassword: `/user/reset`,
    Register: '/register',
};

export const PublicRouteNames = [
    names.Login,
    names.ForgotPassword,
    names.ResetPassword,
    names.Register,
    names.RegisterEmailVerification
];

export default names;
