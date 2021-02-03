let pagesIndex, searchIndex;

const MAX_SUMMARY_LENGTH = 200

const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm

const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm

async function initSearchIndex() {
  try {
    const response = await fetch("/index.json");
    pagesIndex = await response.json();
    searchIndex = lunr(function () {
      this.field("excerpt");
      this.field("content");
      this.field("title");
      this.ref("href");
      pagesIndex.forEach((page) => this.add(page));
    });
  } catch (e) {
    console.log(e);
  }
}

initSearchIndex();

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("search-form") != null) {
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("keydown", (event) => {
        if (event.key == Enter) handleSearchQuery(event)
      });
      document
        .querySelector(".search-icon")
        .addEventListener("click", (event) => handleSearchQuery(event));
    }
  })

  function handleSearchQuery(event) {
    event.preventDefault();
    const query =  $(obj).find('#search-input').val().trim().toLowerCase();
    if (!query) {
        $(obj).find('#result-container').html('<span>Please enter a search term</span>');
        $(obj).find('#result-container').fadeIn(100);
      return;
    }
    const results = searchSite(query)
    if (!results.length) {
      $(obj).find('#result-container').html('<span>Your search returned no results</span>');
      $(obj).find('#result-container').fadeIn(100);
      return
    }
    renderSearchResults(query, results)
  }
  function searchSite(query) {
    const originalQuery = query;
    query = getLunrSearchQuery(query);
    let results = getSearchResults(query);
    return results.length
      ? results
      : query !== originalQuery
      ? getSearchResults(originalQuery)
      : [];
  }

  function getSearchResults(query) {
    return searchIndex.search(query).flatMap((hit) => {
      if (hit.ref == "undefined") return [];
      let pageMatch = pagesIndex.filter((page) => page.href === hit.ref)[0];
      pageMatch.score = hit.score;
      return [pageMatch];
    });
  }
  
  function getLunrSearchQuery(query) {
    const searchTerms = query.split(" ");
    if (searchTerms.length === 1) {
      return query;
    }
    query = "";
    for (const term of searchTerms) {
      query += `+${term} `;
    }
    return query.trim();
  }

  function createSearchResultBlurb(query, pageContent) {
    const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
    const searchQueryHits = Array.from(
      pageContent.matchAll(searchQueryRegex),
      (m) => m.index
    );
    const sentenceBoundaries = Array.from(
      pageContent.matchAll(SENTENCE_BOUNDARY_REGEX),
      (m) => m.index
    );
    let searchResultText = "";
    let lastEndOfSentence = 0;
    for (const hitLocation of searchQueryHits) {
      if (hitLocation > lastEndOfSentence) {
        for (let i = 0; i < sentenceBoundaries.length; i++) {
          if (sentenceBoundaries[i] > hitLocation) {
            const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
            const endOfSentence = sentenceBoundaries[i];
            lastEndOfSentence = endOfSentence;
            parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim();
            searchResultText += `${parsedSentence} ... `;
            break;
          }
        }
      }
      const searchResultWords = tokenize(searchResultText);
      const pageBreakers = searchResultWords.filter((word) => word.length > 50);
      if (pageBreakers.length > 0) {
        searchResultText = fixPageBreakers(searchResultText, pageBreakers);
      }
      if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break;
    }
    return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
      searchQueryRegex,
      "<strong>$&</strong>"
    );
  }

  function createQueryStringRegex(query) {
    const searchTerms = query.split(" ");
    if (searchTerms.length == 1) {
      return query;
    }
    query = "";
    for (const term of searchTerms) {
      query += `${term}|`;
    }
    query = query.slice(0, -1);
    return `(${query})`;
  }

  function tokenize(input) {
    const wordMatches = Array.from(input.matchAll(WORD_REGEX), (m) => m);
    return wordMatches.map((m) => ({
      word: m[0],
      start: m.index,
      end: m.index + m[0].length,
      length: m[0].length,
    }));
  }

  function fixPageBreakers(input, largeWords) {
    largeWords.forEach((word) => {
      const chunked = chunkify(word.word, 20);
      input = input.replace(word.word, chunked);
    });
    return input;
  }
  
  function chunkify(input, chunkSize) {
    let output = "";
    let totalChunks = (input.length / chunkSize) | 0;
    let lastChunkIsUneven = input.length % chunkSize > 0;
    if (lastChunkIsUneven) {
      totalChunks += 1;
    }
    for (let i = 0; i < totalChunks; i++) {
      let start = i * chunkSize;
      let end = start + chunkSize;
      if (lastChunkIsUneven && i === totalChunks - 1) {
        end = input.length;
      }
      output += input.slice(start, end) + " ";
    }
    return output;
  }

  function ellipsize(input, maxLength) {
    const words = tokenize(input);
    if (words.length <= maxLength) {
      return input;
    }
    return input.slice(0, words[maxLength].end) + "...";
  }

  if (!String.prototype.matchAll) {
    String.prototype.matchAll = function (regex) {
      "use strict";
      function ensureFlag(flags, flag) {
        return flags.includes(flag) ? flags : flags + flag;
      }
      function* matchAll(str, regex) {
        const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"));
        let match;
        while ((match = localCopy.exec(str))) {
          match.index = localCopy.lastIndex - match[0].length;
          yield match;
        }
      }
      return matchAll(this, regex);
    };
  }

  function getColorForSearchResult(score) {
    const highQualityHue = 171;
    const lowQualityHue = 212;
    return adjustHue(highQualityHue, lowQualityHue, score);
  }
  
  function adjustHue(hue1, hue2, score) {
    if (score > 3) return `hsl(${hue1}, 100%, 50%)`;
    const hueAdjust = (parseFloat(score) / 3) * (hue1 - hue2);
    const newHue = hue2 + Math.floor(hueAdjust);
    return `hsl(${newHue}, 100%, 50%)`;
  }
// New
function renderSearchResults(query, results) {
    clearSearchResults();
    updateSearchResults(query, results);
    showSearchResults();
    scrollToTop();
  }
  
  function clearSearchResults() {
    const results = document.querySelector(".search-results ul");
    while (results.firstChild) results.removeChild(results.firstChild);
  }
  
  function updateSearchResults(query, results) {
    document.getElementById("query").innerHTML = query;
    document.querySelector("#result-container ul").innerHTML = results
      .map(
        (hit) => `
      <li class="search-result-item" data-score="${hit.score.toFixed(2)}">
        <a href="${hit.href}" class="search-result-page-title">${hit.title}</a>
        <p>${createSearchResultBlurb(query, hit.content)}</p>
      </li>
      `
      )
      .join("");
    const searchResultListItems = document.querySelectorAll("#result-container ul li");
    document.getElementById("results-count").innerHTML = searchResultListItems.length;
    document.getElementById("results-count-text").innerHTML = searchResultListItems.length > 1 ? "results" : "result";
    searchResultListItems.forEach(
      (li) => (li.firstElementChild.style.color = getColorForSearchResult(li.dataset.score))
    );
  }

  function showSearchResults() {
    document.querySelector(".primary").classList.add("hide-element");
    document.querySelector(".search-results").classList.remove("hide-element");
    document.getElementById("site-search").classList.add("expanded");
    document.getElementById("clear-search-results-sidebar").classList.remove("hide-element");
  }
  
  function scrollToTop() {
    const toTopInterval = setInterval(function () {
      const supportedScrollTop = document.body.scrollTop > 0 ? document.body : document.documentElement;
      if (supportedScrollTop.scrollTop > 0) {
        supportedScrollTop.scrollTop = supportedScrollTop.scrollTop - 50;
      }
      if (supportedScrollTop.scrollTop < 1) {
        clearInterval(toTopInterval);
      }
    }, 10);
  }