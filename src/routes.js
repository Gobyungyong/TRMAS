const routes = {
  index: "/",
  about: "/about",
  project: "/project",
  story: "/story",
  policy: "/policy",
  admin: "/admin",
  projectAdmin: "/admin/project",
  projectUpload: "/admin/project/upload",
  projectModify: "/admin/project/modify",
  storyAdmin: "/admin/story",
  storyUpload: "/admin/story/upload",
  storyModify: "/admin/story/modify",
  storyDetail: "/story/detail/:storySubject",
  policyAdmin: "/admin/policy",
  policyUpload: "/admin/policy/upload",
  policyModify: "/admin/policy/modify",
  policyDetail: "/policy/detail/:policySubject",
  policyDetailAdmin: "/admin/policy/detail/:policySubject",
  adminLogin: "/admin/login",
  notFound: "/*",
};

export default routes;
