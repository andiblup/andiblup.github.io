async function sendRequest() {
    const messageContainer = this.$refs.messageContainer;
    const inputTextEl = this.$refs.inputText;
    const userMessage = inputTextEl.value.trim();
    if (!userMessage) {
      alert('Bitte gib eine Nachricht ein.');
      return;
    }
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          "Authorization": 'Bearer ' + this.API_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/gpt-3.5-turbo",
          "messages": [{
            "role": "user",
            "content": userMessage
          }]
        })
      });
      const data = await response.json();
      const result = marked.parse(data.choices[0].message.content);
      const newPre = document.createElement("pre");
      newPre.classList.add('output');
      newPre.innerHTML = result;
      messageContainer.appendChild(newPre);
    } catch (error) {
      this.error = error;
      const newPre = document.createElement("pre");
      newPre.classList.add('output');
      newPre.textContent = 'Fehler bei der API-Anfrage: ' + error;
      this.$refs.messageContainer.appendChild(newPre);
    }
  }