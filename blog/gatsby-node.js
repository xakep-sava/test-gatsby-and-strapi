/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const makeRequest = (graphql, request) => new Promise((resolve, reject) => {  
  // Запрос для получения данных, используемых при создании страниц.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
});

// Реализация функции Gatsby API "createPages". Она вызывается один раз когда 
// уровень данных готовится к работе для того, чтобы позволить плагину создать из этих данных страницы
exports.createPages = ({ boundActionCreators, graphql }) => {  
  const { createPage } = boundActionCreators;
  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticles {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Создаём страницы для каждой статьи.
    result.data.allStrapiArticles.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  const getAuthors = makeRequest(graphql, `
    {
      allStrapiUsers {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Создаём страницы для каждого пользователя.
    result.data.allStrapiUsers.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/user.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  // Запросы материалов статей и данных авторов для использования при создании страниц.
  return Promise.all([
    getArticles,
    getAuthors,
  ])
};