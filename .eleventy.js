const moment = require('moment');
const readingTime = require('eleventy-plugin-reading-time');
const readerBar = require('eleventy-plugin-reader-bar');
const blogTools = require("eleventy-plugin-blog-tools");
const pluginTOC = require('eleventy-plugin-toc');
 
moment.locale('vi');
module.exports = function(eleventyConfig) {
    var markdownIt = require("markdown-it");
    var mdItAnchor = require('markdown-it-anchor');
    var mdItToc = require('markdown-it-table-of-contents');
    var mdItAttrs = require('markdown-it-attrs');
    var mdItBracketedSpan= require('markdown-it-bracketed-spans');
    var mdItContainer = require('markdown-it-container');
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
  .use(mdItContainer, 'tip', {

    validate: function(params) {
      return params.trim().match(/^tip\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^tip\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="tip custom-block"><p class="custom-block-title">' + mdIt.utils.escapeHtml(m[1]) + '</p>\n';
  
      } else {
        // closing tag
        return '</div>\n';
      }
    }
  })
  .use(mdItContainer, 'warning', {

    validate: function(params) {
      return params.trim().match(/^warning\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^warning\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="warning custom-block"><p class="custom-block-title">' + mdIt.utils.escapeHtml(m[1]) + '</p>\n';
  
      } else {
        // closing tag
        return '</div>\n';
      }
    }
  })
  .use(mdItContainer, 'danger', {

    validate: function(params) {
      return params.trim().match(/^danger\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^danger\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="danger custom-block"><p class="custom-block-title">' + mdIt.utils.escapeHtml(m[1]) + '</p>\n';
  
      } else {
        // closing tag
        return '</div>\n';
      }
    }
  })
  .use(mdItContainer, 'detail', {

    validate: function(params) {
      return params.trim().match(/^detail\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^detail\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details class="details custom-block"><summary>' + mdIt.utils.escapeHtml(m[1]) + '</summary>\n';
  
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  })
  .use(mdItContainer, 'section', {

    validate: function(params) {
      return params.trim().match(/^section\s+(.*)$/);
    },
  
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^section\s+(.*)$/);
  
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<section ' + mdIt.utils.escapeHtml(m[1]) + '>\n';
  
      } else {
        // closing tag
        return '</section>\n';
      }
    }
  })
  .use(mdItAttrs)
  .use(mdItBracketedSpan);
  /************** MARKDOWN ******************/

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  
eleventyConfig.addPassthroughCopy("src/scss")

  eleventyConfig.addCollection("presents", function(collection) {
    return collectionApi.getFilteredByGlob('**/*.md').sort((a,b) => {
      if(a.data.title < b.data.title) return -1;
      if(a.data.title > b.date.title) return 1;
      return 0;
    });
  });
  eleventyConfig.addCollection("allPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });
  eleventyConfig.addCollection("allSlides", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/slides/*.md");
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
    eleventyConfig.addPlugin(pluginTOC, {
      tags: ['h2', 'h3'],
      })
    return {
      dir: {
        input: "src",
        layouts: "_layouts"
      }
    };
  };
