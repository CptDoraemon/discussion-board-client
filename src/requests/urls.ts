// const base = 'https://django-api-xiaoxihome.herokuapp.com/api/discussion_board/';
const base = 'http://127.0.0.1:8000/api/discussion_board/';

const accountBase = base + 'account/';
const login = accountBase + 'login/';
const register = accountBase + 'register/';
const verifySession = accountBase + 'verify_session/';
const refresh = accountBase + 'refresh/';
const updateAvatar = accountBase + 'update_avatar/';

const postBase = base + 'post/';
const getPostList = postBase + 'all/';
const getPostDetail = (id: number) => `${postBase}${id}/`;
const createPost = postBase + 'create/';

const commentBase = base + 'comment/';
const createComment = commentBase + 'create/';

const userActionsBase = base + 'user_actions/';
const like = userActionsBase + 'like/';

const urls = {
    login,
    register,
    verifySession,
    refresh,
    updateAvatar,
    getPostList,
    getPostDetail,
    createPost,
    createComment,
    like
};

export default urls