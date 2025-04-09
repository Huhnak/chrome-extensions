window.addEventListener('load', function() {
  function addQuickDeleteButtons() {
      const chatItems = document.querySelectorAll('div._83421f9');
      chatItems.forEach(chatItem => {
        if (!chatItem.querySelector('.quick-delete-btn')) {
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'quick-delete-btn';
          deleteBtn.textContent = '×';
          deleteBtn.style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            z-index: 100;
            transition: all ease-in-out 100ms;
            opacity:0;
          `;
          chatItem.addEventListener("mouseenter", (e)=>{
            e.target.getElementsByClassName("quick-delete-btn")[0].style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            z-index: 100;
            transition: all ease-in-out 100ms;
            opacity:1;
          `;
          })
          chatItem.addEventListener("mouseleave", (e)=>{
            e.target.getElementsByClassName("quick-delete-btn")[0].style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            z-index: 100;
            transition: all ease-in-out 100ms;
            opacity:0;
          `;
          }) 

          chatItem.style.cssText=`gap:10px;`
          chatItem.getElementsByClassName("_2090548")[0].style.cssText=`
          position:relative;
          right:0;
          top:0;
          transform:none;
          `
          chatItem.getElementsByClassName("c08e6e93")[0].style.cssText=`
          flex:"";
          flex-grow:1;
          `
          

          deleteBtn.addEventListener('click', function(e) {
            const userToken = JSON.parse(localStorage.getItem("userToken")).value;
            const chatName = e.target.parentElement.getElementsByClassName("c08e6e93")[0].innerHTML;

            fetch(`https://chat.deepseek.com/api/v0/chat_session/fetch_page?count=100`, { method: 'GET', headers:{"Authorization":`Bearer ${userToken}`}}).then((res)=>res.json()).then(data=>{
              let chatId = searchChatIdByName(chatName,data);
              deleteChatFromServer(chatId,userToken);
            })
            const chatToRemove = e.target.parentElement;
            e.stopPropagation();
            e.preventDefault();
            if (chatToRemove) {
              chatToRemove.style.transition = 'opacity 0.3s';
              chatToRemove.style.opacity = '0';
              setTimeout(() => {
                chatToRemove.remove();
              }, 300);
            }
          });
          chatItem.style.position = 'relative';
          chatItem.appendChild(deleteBtn);
        }
      });
  }
  addQuickDeleteButtons();
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(() => {
      addQuickDeleteButtons();
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function deleteChatFromServer(chatId,userToken) {
    fetch(`https://chat.deepseek.com/api/v0/chat_session/delete`, { method: 'POST', body:JSON.stringify({chat_session_id:chatId}), headers:{"Content-Type":"application/json","Authorization":`Bearer ${userToken}`}})
    
  }
  function searchChatIdByName(name, response){
    let result = null;
    response.data.biz_data.chat_sessions.forEach(value=>{
      if(value.title===name){
        result = value.id;
        return;
      }
    })
    return result;
  }
  
  setTimeout(()=>{
    document.getElementsByClassName("dc04ec1d")[0].style.cssText = `--local-sider-width: 350px;`;
  },100)
});
