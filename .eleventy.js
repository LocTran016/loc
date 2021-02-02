const moment = require('moment');
 
moment.locale('vi');
module.exports = function(eleventyConfig) {
    var markdownIt = require("markdown-it");
    var mdItAnchor = require('markdown-it-anchor');
    var mdItToc = require('markdown-it-table-of-contents');
    var mdItAttrs = require('markdown-it-attrs')
    var mdItBracketedSpan= require('markdown-it-bracketed-spans')
    /************** MARKDOWN ******************/
    let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.use(mdItAnchor, {
		permalink: true,
		permalinkBefore: false,
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3,4]
	})
  .use(mdItToc)
  .use(mdItAttrs)
  .use(mdItBracketedSpan);
  /************** MARKDOWN ******************/

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addCollection("presents", function(collection) {
    return collection.getFilteredByGlob('**/*.md').sort((a,b) => {
      if(a.data.title < b.data.title) return -1;
      if(a.data.title > b.date.title) return 1;
      return 0;
    });
  });

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
 
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('ll'); // E.g. May 31, 2019
  });

  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

    eleventyConfig.setLibrary("md", mdIt);
    eleventyConfig.addLayoutAlias('post', 'post.njk');
    eleventyConfig.addLayoutAlias('slide', 'slide.njk');
    return {
      dir: {
        input: "src",
        layouts: "_layouts"
      }
    };
  };

  // https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
  function extractExcerpt(article) {
    if (!article.hasOwnProperty('templateContent')) {
      console.warn('Failed to extract excerpt: Document has no property "templateContent".');
      return null;
    }
   
    let excerpt = null;
    const content = article.templateContent;
   
    // The start and end separators to try and match to extract the excerpt
    const separatorsList = [
      { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
      { start: '<p>', end: '</p>' }
    ];
   
    separatorsList.some(separators => {
      const startPosition = content.indexOf(separators.start);
      const endPosition = content.indexOf(separators.end);
   
      if (startPosition !== -1 && endPosition !== -1) {
        excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
        return true; // Exit out of array loop on first match
      }
    });
   
    return excerpt;
  }