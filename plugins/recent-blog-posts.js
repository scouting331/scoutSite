/**
 * @file recent-blog-posts.js
 * @description A custom local Docusaurus plugin decorator that extends the core blog plugin.
 * Intercepts the build-time data lifecycle hook (`contentLoaded`), filters out unlisted posts, 
 * truncates the list to the 4 most recent records, and flushes them directly to a local JSON 
 * schema file. This enables client-side components to safely load recent blog metadata without 
 * bundling massive layout trees.
 * 
 * @module recent-blog-posts
 * @requires node:fs
 * @requires @docusaurus/plugin-content-blog
 * @environment Node.js (Build-time compilation middleware)
 */

const blogPluginExports = require("@docusaurus/plugin-content-blog");
const defaultBlogPlugin = blogPluginExports.default;

/**
 * Enhances the base blog plugin instance with an interception hook on content compilation.
 * 
 * @async
 * @function blogPluginEnhanced
 * @param {...*} pluginArgs - Core execution parameters and configuration properties passed down from `docusaurus.config.js`.
 * @returns {Promise<Object>} An augmented Docusaurus plugin interface object.
 */
async function blogPluginEnhanced(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);

  return {
    ...blogPluginInstance,
    name: "recent-blog-posts",
    
    /**
     * Intercepts compiled blog data structures, extracts public post metadata nodes,
     * stores them as plugin global data, and runs the upstream plugin lifecycle handler.
     * 
     * @async
     * @method contentLoaded
     * @param {Object} data - Processed blog payloads containing original metadata loops.
     * @param {Object} data.content - Raw generated content trees.
     * @param {Array<Object>} data.content.blogPosts - Complete list of resolved markdown blog data entries.
     * @returns {Promise<void>} Resolves when downstream base core operations complete execution.
     */
    contentLoaded: async function (data) {
      let recentPosts = [...data.content.blogPosts]
        .filter((p) => !p.metadata.unlisted)
        .slice(0, 4)
        .map((p) => ({
          id: p.id,
          metadata: {
            ...p.metadata,
          },
        }));

      data.actions.setGlobalData(recentPosts);
      return blogPluginInstance.contentLoaded(data);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced,
};
