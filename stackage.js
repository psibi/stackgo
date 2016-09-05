var pattern = "*://hackage.haskell.org/package/*";
var stackagePattern = "*://*.stackage.org/haddock/lts*";
var stackagePackagePattern = "*://*.stackage.org/package/*";

var ltsVersion = "lts-6.14";
var stackageUrl = "https://www.stackage.org/package/";
var haddockUrl = "https://www.stackage.org/haddock/" + ltsVersion + "/";

var originUrls = [];

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function extractPackageName(name) {
    // name: Package name with version
    // >> extractPackageName("yesod-core-2.3.3.4")
    // >> "yesod-core"
    // >> extractPackageName("yesod-core-hask")
    // >> "yesod-core-hask"
    var parts = name.split("-");
    var possibleVersionNumber = parts[parts.length - 1];
    if (isNaN(parseFloat(possibleVersionNumber))) {
        return parts.join('-');
    } else {
        parts.pop();
        return parts.join('-');
    }
}


function redirect(requestDetails) {
    consoe.log('rque', requestDetails);
    var originalUrl = requestDetails.url;
    var parts = originalUrl.split('package');
    var packagePath = parts[1];
    var packageParts = packagePath.split('/');
    var redirectUrl = null;
    if (packageParts.length === 2) {
        // It's a package index page
        var packageName = packageParts[1];
        var packageNameParts = packageName.split("-");
        if (packageNameParts.length === 1) {
            // Reached the home page. Version ins't selected yet.
            // Eg: hackage.haskell.org/package/download
            redirectUrl = stackageUrl + packageName;
        } else {
            // Reached a specifc version page
            // Eg: hackage.haskell.org/package/download-0.3.2
            // Also handles edge case naming: yesod-core-3.2/yesod-core-samp
            redirectUrl = stackageUrl + extractPackageName(packageName);
        }
    } else {
        // We have to determine if it's a module page inside the
        // package or some other package entirely like report in which
        // case it's better we redirct it to hackage itself.
        var isDocs = isInArray("docs", packageParts);
        if (isDocs) {
            var modulePackageName = extractPackageName(packageParts[1]);
            var moduleName = packageParts[3];
            redirectUrl = haddockUrl + modulePackageName + "/" + moduleName;
        } else {
            // it's some other page
            redirectUrl = requestDetails.url;
        }
    }

    if (requestDetails.originUrl === undefined) {
        // chrome doesn't yet support originUrl
    } else {
        if (requestDetails.originUrl.startsWith("http://www.stackage") ||
            requestDetails.originUrl.startsWith("https://www.stackage") ||
            requestDetails.originUrl.startsWith("http://www.hackage") ||
            requestDetails.originUrl.startsWith("https://www.hackage"))
            return true;
    }
    
    if (originUrls[requestDetails.originUrl] === undefined) {
        return {
            redirectUrl: redirectUrl
        };
    }
}


chrome.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:[pattern], types:["main_frame"]},
    ["blocking"]
);

function checkStatusAndRedirect(requestDetails) {
    if (requestDetails.statusCode === 500) {
        // Redirect to the original hackage url
        originUrls[requestDetails.originUrl] = true;
        return {
            redirectUrl: requestDetails.originUrl
        };
    } else {
        return 0;
    }
}

chrome.webRequest.onHeadersReceived.addListener(
    checkStatusAndRedirect, 
    {urls:[stackagePattern, stackagePackagePattern], types:["main_frame"]},
    ["blocking", "responseHeaders"]
);
