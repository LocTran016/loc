module.exports = function(eleventyConfig) {
    var markdownIt = require("markdown-it");
    var markdownItAnchor = require('markdown-it-anchor');
    var markdownItToc = require('markdown-it-table-of-contents');
    let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.use(markdownItAnchor, {
		permalink: true,
		permalinkBefore: false,
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3,4]
	})
	.use(markdownItToc);

    eleventyConfig.setLibrary("md", mdIt);
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