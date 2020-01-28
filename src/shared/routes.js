export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';
export const PASSWORD_FORGET = '/pw-forget';
export const SIGN_OUT = '/signout';
export const PRIVACY_POLICY = '/privacy-policy'

export const pageTitle = (route) => {
    switch (route) {
        case LANDING: return 'Landing';
        case SIGN_UP: return 'Sign Up';
        case SIGN_OUT: return 'Logged Out';
        case HOME: return 'Home';
        case ACCOUNT: return 'My Account';
        case ADMIN: return 'Admin';
        case PASSWORD_FORGET: return 'Forgot Password';
        case PRIVACY_POLICY: return 'Privacy Policy';
        default: return 'home'
    }
};