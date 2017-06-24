function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    stackageResolver: document.querySelector("#stackageResolver").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#stackageResolver").value = result.stackageResolver || "lts";
  }

  function onError(error) {
    console.log(`Error from Stackgo: ${error}`);
  }

  /* @if BROWSER_ENV='FIREFOX' */
  var getting = browser.storage.local.get("stackageResolver");
  getting.then(setCurrentChoice, onError);
  /* endif */

  /* @if BROWSER_ENV='CHROME' */
  chrome.storage.local.get("stackageResolver", function(version) {
    ltsVersion = version.stackageResolver;
    if (ltsVersion === undefined || ltsVersion === null)
      ltsVersion = "lts";
    document.querySelector("#stackageResolver").value = ltsVersion;
  });
  /* endif */

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
