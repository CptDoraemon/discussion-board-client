class Routes {
  home = '/';
  login = '/login';
  register = '/register';
  postDetail = '/post/:postID';
  editPost = '/edit-post/:postID?';
  accountSetting = '/account-setting';
  fallback = '/*';

  getPostList = (params: {tag?: string, page?: string}) => {
    let base = this.home;
    const entries = Object.entries(params);
    if (entries.length > 0) {
      base += '?';
      const paramStrings = entries.map(pair => `${pair[0]}=${pair[1]}`);
      const string = paramStrings.join('&');
      base += string;
    }
    return base
  };
  getPostDetail = (postID: string) => `/post/${postID}`;
  getEditPost = (postID: string | undefined) => `/edit-post/${postID}`;
}


const routes = new Routes();

export default routes
