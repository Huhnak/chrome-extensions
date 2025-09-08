  function addCloseOpenChatButton() {
      function toggleSidebar(isHidden){
        const leftMenu = document.querySelector('.twelve');
        const rightMenu = document.querySelector('.four');
        if(isHidden){
          rightMenu.style = 'opacity: 0; position: absolute;';
          leftMenu.style.setProperty('width', '100%', 'important');
          image.src = chrome.runtime.getURL('images/close-icon.svg');
          newButton.title = "Открыть чат";
        }
        else{
          leftMenu.style.setProperty('width', '100%')
          image.src =  chrome.runtime.getURL('images/chat-round-svgrepo-com.svg');
          newButton.title = "Закрыть чат";
          setTimeout(() => {
            rightMenu.style = '';
          },510)
        }
      }
      const playerContainer = document.querySelector('#playerContainer');
      const newButton = document.createElement('button');
      const image = document.createElement('img');
      newButton.className = 'ui icon button fullscreenBtn';
      image.ariaHidden = 'true';
      image.className = 'window maximize outline icon';
      image.src =  chrome.runtime.getURL('images/chat-round-svgrepo-com.svg');
      image.style.setProperty('height', '15px', 'important')
      newButton.title = "Закрыть чат";
      newButton.appendChild(image);    
      newButton.style.setProperty('right','7.2em')
      playerContainer.appendChild(newButton);
      let isHidden = false;
      newButton.addEventListener("click", (e)=>{
          isHidden = !isHidden;
          toggleSidebar(isHidden);
          })
  }

window.addEventListener('load', function() {
  addCloseOpenChatButton();
});
