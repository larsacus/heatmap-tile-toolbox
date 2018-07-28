var stravaTilePattern = "https://*.strava.com/tiles/*";
var trailforksRideLinePattern = "https://gis.pinkbike.org/tiles/ridelines/*"
var heatmapColorStyle = "hot" // color options are blue, color2, color1, hot, bluered, gray
var heatmapDataType = "cycling" // type options are ride, all, cycling, both
var trailforksRedirectEnabled = false

function redirectStrava(requestDetails) {
  // color options are blue, color2, color1, hot, bluered, gray
  // type options are ride, all, cycling, both
  // 'https://heatmap-external-$1.strava.com/tiles-auth/$2/$3/$4.png?px=$5'
  var stravaFixURLParams = requestDetails.url.match(/^https:\/\/heatmap-external-([abc]).strava.com\/tiles\/(all|ride|cycling|both)\/(blue|color2|color1|hot|bluered|gray)\/(.*).png\?px=(256)$/)
  if (stravaFixURLParams != null && stravaFixURLParams.length > 1) {
    // console.log("Matches: " + urlParams)
    // console.log("Shard: " + urlParams[1])
    // console.log("Type: " + urlParams[2])
    // console.log("Heatmap Style: " + urlParams[3])
    // console.log("Tile Params: " + urlParams[4])
    // console.log("Tile Size: " + urlParams[5])

    if (heatmapColorStyle != null) {
      stravaFixURLParams.splice(3,1,heatmapColorStyle)
      // console.log(`Rewriting style to ${heatmapColorStyle}`)
    }

    if (heatmapDataType != null) {
      stravaFixURLParams.splice(2,1,heatmapDataType)
      // console.log(`Rewriting data type to ${heatmapDataType}`)
    }

    if (stravaFixURLParams[1] == 'a') {
      var shards = ['a','b','c']
      stravaFixURLParams.splice(1,1, shards[Math.floor(Math.random() * shards.length)]) // randomly seed a shard
    }

    stravaFixURLParams.shift() // remove the matched URL from the above array

    let newURL = `https://heatmap-external-${stravaFixURLParams[0]}.strava.com/tiles-auth/${stravaFixURLParams[1]}/${stravaFixURLParams[2]}/${stravaFixURLParams[3]}.png?px=${stravaFixURLParams[4]}`

    // console.log("Redirecting: " + requestDetails.url + " to " + newURL + " using " + urlParams);
    return {
      redirectUrl: newURL
    };
  } else {
    return {
      redirectUrl: requestDetails.url
    }
  }
}

function redirectTrailforks(requestDetails) {
  // color options are blue, color2, color1, hot, bluered, gray
  // type options are ride, all, cycling, both
  // 'https://heatmap-external-$1.strava.com/tiles-auth/$2/$3/$4.png?px=$5'
  var trailforksRideLinesParams = requestDetails.url.match(/^https:\/\/gis.pinkbike.org\/tiles\/ridelines\/(.*).png$/)
  if (trailforksRedirectEnabled && trailforksRideLinesParams != null && trailforksRideLinesParams.length > 1) {
    trailforksRideLinesParams.shift()

    var shards = ['a','b','c']
    var randomShard = shards[Math.floor(Math.random() * shards.length)]

    let newURL = `https://heatmap-external-${randomShard}.strava.com/tiles-auth/${heatmapDataType}/${heatmapColorStyle}/${trailforksRideLinesParams[0]}.png?px=${256}`

    // console.log("Redirecting: " + requestDetails.url + " to " + newURL + " using " + urlParams);
    return {
      redirectUrl: newURL
    };
  } else {
    return {
      redirectUrl: requestDetails.url
    }
  }
}

function updateStoragePrefs() {
  var colorStyleItem = browser.storage.sync.get('colorStyle');
    colorStyleItem.then((res) => {
      if (res.colorStyle != null && res.colorStyle != heatmapColorStyle) {
        heatmapColorStyle = res.colorStyle
        console.log(`Received updated colorStyle pref ${heatmapColorStyle}`)
      }
    });

    browser.storage.sync.get('dataType').then((res) => {
      if (res.dataType != null && res.dataType != heatmapDataType) {
        heatmapDataType = res.dataType
        console.log(`Received updated dataType pref ${heatmapDataType}`)
      }
    });

    browser.storage.sync.get('trailforksRideLines').then((res) => {
      if (res.trailforksRideLines != null && res.trailforksRideLines != trailforksRedirectEnabled) {
        trailforksRedirectEnabled = res.trailforksRideLines
        console.log(`Received updated trailforksRideLines pref  ${trailforksRedirectEnabled}`)
      }
    });
}

updateStoragePrefs()
browser.storage.onChanged.addListener(updateStoragePrefs)

browser.webRequest.onBeforeRequest.addListener(
  redirectStrava,
  {urls:[stravaTilePattern]},
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  redirectTrailforks,
  {urls:[trailforksRideLinePattern]},
  ["blocking"]
);

/*
https://heatmap-external-a.strava.com/tiles/both/bluered/34653.png?px=256
https://heatmap-external-b.strava.com/tiles/cycling/hot/34653.png?px=256
https://heatmap-external-c.strava.com/tiles/all/bluered/16/32768/32769.png?px=256
*/
