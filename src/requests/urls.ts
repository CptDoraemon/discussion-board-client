const base = 'https://django-api-xiaoxihome.herokuapp.com/';

const accountBase = base + 'api/discussion_board/account/';
const login = accountBase + 'login/';
const register = accountBase + 'register/';
const verifySession = accountBase + 'verify_session/';

const postBase = base + 'api/discussion_board/post/';
const getPostList = postBase + 'all/';

const urls = {
    login,
    register,
    verifySession,
    getPostList
};

export default urls