const base = 'https://django-api-xiaoxihome.herokuapp.com/api/discussion_board/';

const accountBase = base + 'account/';
const login = accountBase + 'login/';
const register = accountBase + 'register/';
const verifySession = accountBase + 'verify_session/';
const refresh = accountBase + 'refresh/';

const postBase = base + 'post/';
const getPostList = postBase + 'all/';
const createPost = postBase + 'create/';

const userActionsBase = base + 'user_actions/';
const like = userActionsBase + 'like/';

const urls = {
    login,
    register,
    verifySession,
    getPostList,
    refresh,
    createPost,
    like
};

export default urls