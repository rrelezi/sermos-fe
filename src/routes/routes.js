const names = {
    Login: `/login`,
    RegisterEmailVerification: `/user/register_confirm`,
    ForgotPassword: `/user/forget`,
    ResetPassword: `/user/reset`,
    Register: '/register',
    GoogleAuth: '/auth/google',
    Home: '/main/home'
};

export const PublicRouteNames = [
    names.Login,
    names.ForgotPassword,
    names.ResetPassword,
    names.Register,
    names.RegisterEmailVerification,
    names.GoogleAuth,
    names.Home
];

export default names;
