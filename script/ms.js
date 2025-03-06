let messageQueue = [];
let currentIndex = 0;

function fetchMessages() {
   return new Promise((resolve, reject) => {
      fetch('data/ms.json')
         .then(x => x.json())
         .then(y => {
            resolve(y);
         })
         .catch(err => reject(err));
   });
}

fetchMessages()
   .then(y => prepareMessages(y)) 
   .catch(err => console.error('Error fetching data:', err));

function prepareMessages(json) {
   messageQueue = [];
   json.forEach(sectionData => {
      let sectionContent = `<section>`;
      sectionData.forEach((message,i) => {
         sectionContent += `
                <div class="message ${message.align}" style="--d: ${i*0.2}s">
                    <div>
                       <small>${message.person}</small>
                        <p>${message.content}</p>
                    </div>
                </div>
            `;
      });
      sectionContent += `</section>`;
      messageQueue.push(sectionContent);
   });
   showMessage(0);
}

function showMessage(index) {
   if (index >= 0 && index < messageQueue.length) {
      document.querySelector('main').innerHTML = messageQueue[index];
      currentIndex = index;
      document.querySelector('main').scrollTop = 0;
   }
}

let currentAudio = null;

function playStop(elm, src) {
   if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
   }

   if (elm.icon === 'play-circle') {
      currentAudio = new Audio(src);
      currentAudio.play();
      elm.icon = 'stop-circle';
   } else {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      elm.icon = 'play-circle';
   }
}