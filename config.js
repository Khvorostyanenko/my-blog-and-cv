module.exports = {
  url: 'https://domagic.site',
  pathPrefix: '/',
  title: 'Blog by Yaroslav Khvorostyanenko',
  keywords:
    'react, web, web developer, frontend, javascript, Yaroslav Khvorostyanenko, site, blog, info',
  subtitle: 'Developer. Creator. Visualizer.',
  copyright: '© 2020 | Cherkassy, Ukraine',
  disqusShortname: 'khvorostyanenko',
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
    name: 'Yaroslav Khvorostyanenko',
    photo: '/photo.jpg',
    bio: 'Developer. Creator. Visualizer.',
    contacts: {
      // don't remove fields, just make them empty string ''
      // https://github.com/gatsbyjs/gatsby/issues/2392
      github: 'khvorostyanenko',
      twitter: '',
      linkedin: '',
      telegram: 'yarik_travelchem',
      instagram: '_yar1k_',
      facebook: 'Khvorostyanenko',
      email: '',
      rss: ''
    }
  }
}
