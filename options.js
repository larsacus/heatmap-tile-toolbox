function saveOptions(e) {
    browser.storage.sync.set({
      colorStyle: document.querySelector('input[name=color]:checked').value,
      dataType: document.querySelector('input[name=type]:checked').value
    });
    e.preventDefault();
  }

  function restoreOptions() {
    var storageItem = browser.storage.sync.get('colorStyle');
    storageItem.then((res) => {
        document.querySelector(`input[name=color][value=${res.colorStyle}]`).checked = true
    });
  
    var gettingItem = browser.storage.sync.get('dataType');
    gettingItem.then((res) => {
        document.querySelector(`input[name=type][value=${res.dataType}]`).checked = true
    });
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);