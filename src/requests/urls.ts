const base = 'https://django-api-xiaoxihome.herokuapp.com/';

const accountBase = base + 'api/discussion_board/account/';
const login = accountBase + 'login/';
const register = accountBase + 'register/';
const verifySession = accountBase + 'verify_session/';

const urls = {
    login,
    register,
    verifySession
};

export default urls