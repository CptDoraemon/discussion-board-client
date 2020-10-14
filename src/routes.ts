class Routes {
  home = '/';
  login = '/login';
  register = '/register';
  postDetail = '/post/:postID';
  editPost = '/edit-post/:postID?';
  accountSetting = '/account-setting';
  fallback = '/*';

  getPostDetail = (postID: string) => `/post/${postID}`;
  getEditPost = (postID: string | undefined) => `/edit-post/${postID}`;
}


const routes = new Routes();

export default routes
