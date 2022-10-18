// const base = 'https://django-api-xiaoxihome.herokuapp.com/api/discussion_board/';
const base = 'http://127.0.0.1:8000/api/discussion_board/';

const accountBase = base + 'account/';
const login = accountBase + 'login/';
const register = accountBase + 'register/';
const verifySession = accountBase + 'verify_session/';
const refresh = accountBase + 'refresh/';
const updateAvatar = accountBase + 'update_avatar/';

const postBase = base + 'post/';
const getPostList = ({tag, page}: {tag: string | null, page: string}) => {
    let url = postBase + `all/?page=${page}`;
    if (tag) {
        url += `&tag=${tag}`
    }
    return url
};
const popularPosts = postBase + `all/?sort_by=view_count&limit=5`;
const getPostDetail = (id: number) => `${postBase}${id}/`;
const createPost = postBase + 'create/';
const editPost = (id: number) => `${postBase}edit/${id}/`;
const deletePost = (id: number) => `${postBase}delete/${id}/`;
const tagList = postBase + 'tag-list/';
const pinPost = postBase + 'pin/';
const allPinnedPosts = postBase + 'pinned-posts/';

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
    popularPosts,
    getPostDetail,
    createPost,
    editPost,
    deletePost,
    tagList,
    createComment,
    like,
    pinPost,
    allPinnedPosts
};

export default urls
