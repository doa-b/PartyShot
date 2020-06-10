// auth
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const SIGN_OUT = '/signout';
export const PASSWORD_FORGET = '/pw-forget';

// guests
export const START = '/start';
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

const routeNames = new Map([
    [START, 'Welkom'],
    [LANDING, 'Shoot!'],
    [SIGN_UP, 'Sign Up'],
    [SIGN_OUT, 'Logged Out'],
    [HOME, 'Welkom!'],
    [ACCOUNT, 'My Account'],
    [PARTIES, 'Events'],
    [PASSWORD_FORGET, 'Forgot Password'],
    [PRIVACY_POLICY, 'Privacy Policy'],
    [NAME, 'Je naam'],
    [PARTY_CODE, 'Welkom!'],
    [PARTY_DETAILS, 'Party Details'],
    [GALLERY, 'Gallerij'],
    [MONITOR, 'Monitor'],
    [REQUESTS, 'Verzoekjes']
]);

export const pageTitle = (route) => {
    return routeNames.get(route) || 'Home';
};