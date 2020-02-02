export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';
export const PASSWORD_FORGET = '/pw-forget';
export const SIGN_OUT = '/signout';
export const PRIVACY_POLICY = '/privacy-policy';
export const NAME = '/name';
export const PARTY_CODE = '/party-code';
export const PARTY_DETAILS = '/party-details';

export const pageTitle = (route) => {
    switch (route) {
        case LANDING: return 'Shoot!';
        case SIGN_UP: return 'Sign Up';
        case SIGN_OUT: return 'Logged Out';
        case HOME: return 'Home';
        case ACCOUNT: return 'My Account';
        case ADMIN: return 'Admin';
        case PASSWORD_FORGET: return 'Forgot Password';
        case PRIVACY_POLICY: return 'Privacy Policy';
        case NAME: return 'Je naam';
        case PARTY_CODE: return 'Welkom!';
        case PARTY_DETAILS: return 'Party Details';
        default: return 'home'
    }
};