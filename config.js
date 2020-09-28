module.exports = {
  url: 'https://domagic.site',
  pathPrefix: '/',
  title: 'Blog by Yaroslav Khvorostyanenko',
  keywords:
    'react, web, web developer, frontend, javascript, Yaroslav Khvorostyanenko, site, blog, info',
  subtitle: 'Developer. Optimizer. Learner.',
  copyright: '© 2020 | Kyiv, Ukraine',
  disqusShortname: 'dospolov',
  postsPerPage: 20,
  googleAnalyticsId: 'UA-6589522-7',
  menu: [
    {
      label: 'Blog',
      path: '/'
    },
    {
      label: 'CV',
      path: '/cv'
    }
  ],
  author: {
    name: 'Marat Dospolov',
    photo: '/photo.jpg',
    bio: 'Developer. Optimizer. Learner.',
    contacts: {
      // don't remove fields, just make them empty string ''
      // https://github.com/gatsbyjs/gatsby/issues/2392
      github: 'dospolov',
      twitter: 'marat_dospolov',
      linkedin: 'dospolov',
      telegram: 'dospolov',
      instagram: 'dospolov',
      facebook: 'dospolov',
      email: '',
      rss: '/rss.xml'
    }
  }
}
