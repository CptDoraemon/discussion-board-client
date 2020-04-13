const base = 'https://django-api-xiaoxihome.herokuapp.com/';

const accountBase = base + 'api/discussion_board/account/';
const login = accountBase + 'login/';
const register = accountBase + 'register/';
const verifySession = accountBase + 'verify_session/';
const refresh = accountBase + 'refresh/';

const postBase = base + 'api/discussion_board/post/';
const getPostList = postBase + 'all/';
const createPost = postBase + 'create/';

const urls = {
    login,
    register,
    verifySession,
    getPostList,
    refresh,
    createPost
};

export default urls