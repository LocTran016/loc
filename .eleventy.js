module.exports = function(eleventyConfig) {
    let markdownIt = require("markdown-it");
    let markdownItAnchors = require('markdown-it-anchor');
    let markdownItTOC = require('markdown-it-table-of-contents');
    let options = {
      html: true,
      breaks: true,
    };
    var markdownLib = markdownIt(options)
                                        .use(markdownItAnchors.default)
                                        .use(markdownItTOC);
                                        
    eleventyConfig.setLibrary("md", markdownLib);
    eleventyConfig.addLayoutAlias('post', 'post.njk');
    eleventyConfig.addLayoutAlias('slide', 'slide.njk');
    return {
      dir: {
        input: "md",
        output: "src/",
        layouts: "_layouts"
      }
    };
  };