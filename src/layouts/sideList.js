export const sideList = [
  {
    name: '文档',
    path: '/document',
    children: [
      {
        name: '写文档',
        path: '/document/new',
      },
      {
        name: '我的文档',
        path: '/document/my',
      },
      // {
      //   name: '草稿',
      //   path: '/document/draft',
      // },
    ],
  },
  {
    name: '书架',
    path: '/project',
    children: [
      {
        name: '所有',
        path: '/project/all',
      },
    ],
  },
  {
    name: '设置',
    path: '/setting',
    children: [
      {
        name: '用户',
        path: '/setting/user',
      },
    ],
  },
];