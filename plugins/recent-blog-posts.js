/**
 * @file recent-blog-posts.js
 * @description A custom local Docusaurus plugin decorator that extends the core blog plugin.
 * Intercepts the build-time data lifecycle hook (`contentLoaded`), filters out unlisted posts, 
 * truncates the list to the 5 most recent records, and flushes them directly to a local JSON 
 * schema file. This enables client-side components to safely load recent blog metadata without 
 * bundling massive layout trees.
 * 
 * @module recent-blog-posts
 * @requires node:fs
 * @requires @docusaurus/plugin-content-blog
 * @environment Node.js (Build-time compilation middleware)
 */

const fs = require("node:fs");
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
  const dir = ".docusaurus";

  return {
    ...blogPluginInstance,
    
    /**
     * Intercepts compiled blog data structures, extracts public post metadata nodes,
     * writes them synchronously to disk, and runs the upstream plugin lifecycle handler.
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
        // Only show published posts.
        .filter((p) => !p.metadata.unlisted)
        .slice(0, 4);

      recentPosts = recentPosts.map((p) => {
        return {
          id: p.id,
          metadata: {
            ...p.metadata,
          },
        };
      });

      fs.mkdirSync(dir, {
        recursive: true, // Avoid error if directory already exists.
      });
      fs.writeFileSync(`${dir}/recent-posts.json`, JSON.stringify(recentPosts));

      return blogPluginInstance.contentLoaded(data);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced,
};
