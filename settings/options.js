function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    stackageResolver: document.querySelector("#stackageResolver").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#stackageResolver").value = result.stackageResolver || "blue";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("stackageResolver");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);