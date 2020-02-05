// auth
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const SIGN_OUT = '/signout';
export const PASSWORD_FORGET = '/pw-forget';

// guests
export const NAME = '/name';
export const PARTY_CODE = '/party-code';
export const LANDING = '/';
export const PRIVACY_POLICY = '/privacy-policy';

// organiser
export const HOME = '/home';
export const ACCOUNT = '/account';
export const GALLERY = '/gallery';

// admin
export const PARTIES = '/parties';
export const PARTY_DETAILS = '/party-details';

export const MONITOR = '/monitor';
export const REQUESTS = '/requests';



export const pageTitle = (route) => {
    switch (route) {
        case LANDING: return 'Shoot!';
        case SIGN_UP: return 'Sign Up';
        case SIGN_OUT: return 'Logged Out';
        case HOME: return 'Welkom!';
        case ACCOUNT: return 'My Account';
        case PARTIES: return 'Events';
        case PASSWORD_FORGET: return 'Forgot Password';
        case PRIVACY_POLICY: return 'Privacy Policy';
        case NAME: return 'Je naam';
        case PARTY_CODE: return 'Welkom!';
        case PARTY_DETAILS: return 'Party Details';
        case GALLERY: return 'Gallerij';
        case MONITOR: return 'Monitor';
        case REQUESTS: return 'Verzoekjes';
        default: return 'home'
    }
};