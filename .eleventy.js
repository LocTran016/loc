module.exports = function(eleventyConfig) {
    let markdownIt = require("markdown-it");
    let options = {
      html: true,
      breaks: true,
    };
    eleventyConfig.setLibrary("md", markdownIt(options));
    eleventyConfig.addLayoutAlias('post', 'post.njk')
    eleventyConfig.addLayoutAlias('slide', 'slide.njk')
    return {
      dir: {
        input: "md",
        output: "src/",
        layouts: "_layouts"
      }
    };
  };