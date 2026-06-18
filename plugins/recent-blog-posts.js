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
  // This is the hidden background folder where Docusaurus builds temporary files
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
      // Step 1: Create a safe copy of all existing blog posts
      let recentPosts = [...data.content.blogPosts]
        // Step 2: Remove any posts marked as hidden or unlisted
        .filter((p) => !p.metadata.unlisted)
        // Step 3: Cut the list down to only keep the 4 most recent adventures
        .slice(0, 4);

      // Step 4: Clean up the data layout to keep the file size incredibly tiny
      recentPosts = recentPosts.map((p) => {
        return {
          id: p.id,
          metadata: {
            // Safely import title, date, permalink, description, tags, and processed author arrays
            ...p.metadata,
          },
        };
      });

      // Step 5: Make sure the hidden tracking folder exists so the computer doesn't crash
      fs.mkdirSync(dir, {
        recursive: true, // If the folder already exists, safely skip creating a new one
      });

      // Step 6: Convert the post list into a plain-text file so front-end widgets can load it quickly
      fs.writeFileSync(`${dir}/recent-posts.json`, JSON.stringify(recentPosts, null, 2));

      // Step 7: Tell Docusaurus to finish setting up the rest of the website normally
      return blogPluginInstance.contentLoaded(data);
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced,
};
