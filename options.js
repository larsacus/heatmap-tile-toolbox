function saveOptions(e) {

  var colorCheckedElement = document.querySelector('input[name=color]:checked')
  var colorType = "hot"
  if (colorCheckedElement != null) {
    colorType = colorCheckedElement.value
  }

  var dataTypeElement = document.querySelector('input[name=type]:checked')
  var dataType = "cycling"
  if (dataTypeElement != null) {
    dataType = dataTypeElement.value
  }

  browser.storage.sync.set({
    colorStyle: colorType,
    dataType: dataType,
    trailforksRideLines: document.querySelector('input[name=trailforksRideLines]').checked
  });
  e.preventDefault();
}

function restoreOptions() {
  var color = browser.storage.sync.get('colorStyle');
  if (color != null) {
    browser.storage.sync.get('colorStyle').then((res) => {
      var colorStyle = res.colorStyle || "hot"
      document.querySelector(`input[name=color][value=${colorStyle}]`).checked = true
    });
  } else {
    document.querySelector(`input[name=color][value=hot}]`).checked = true
  }


  browser.storage.sync.get('dataType').then((res) => {
    var heatmapType = res.dataType || "cycling";
    document.querySelector(`input[name=type][value=${heatmapType}]`).checked = true
  });

  var trailforksRideLines = browser.storage.sync.get('trailforksRideLines');
  trailforksRideLines.then((res) => {
    document.querySelector(`input[name=trailforksRideLines]`).checked = res.trailforksRideLines
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
