document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('sidebar_width');
    const valueDisplay = document.getElementById('value-display');
  
    chrome.storage.sync.get(['sidebar_width'], (result) => {
      const savedValue = result.delay || 500;
      slider.value = savedValue;
      valueDisplay.textContent = savedValue;
    });
  
    slider.addEventListener('input', () => {
      const value = slider.value;
      valueDisplay.textContent = value;
      chrome.storage.sync.set({ delay: value });
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'apply_sidebar_width',
          value
        });
      });

    });
  });