const moment = require('moment');
const readingTime = require('eleventy-plugin-reading-time');
const readerBar = require('eleventy-plugin-reader-bar');
const blogTools = require("eleventy-plugin-blog-tools");
 
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
    return moment(date).utc().format('ll');
  });
  /*********************** Remove some code for index.json ***************************/
  eleventyConfig.addFilter('algExcerpt', function (text) {
    //first remove code
    text = text.replace(/<code class="language-.*?">.*?<\/code>/sg, '');
    //now remove html tags
    text = text.replace(/<.*?>/g, '');
    // Remove all space
    text = text.replace(/\r\n/g, '');
    // text = text.replace(/\s/g, '')
    text = text.replace(/\n/g,'')
    //now limit to 5k
    return text.substring(0,5000);
  });

    eleventyConfig.setLibrary("md", mdIt);
    eleventyConfig.addLayoutAlias('post', 'post.njk');
    eleventyConfig.addLayoutAlias('slide', 'slide.njk');
    eleventyConfig.addPlugin(readingTime);
    eleventyConfig.addPlugin(readerBar);
    eleventyConfig.addPlugin(blogTools);
    return {
      dir: {
        input: "src",
        layouts: "_layouts"
      }
    };
  };
