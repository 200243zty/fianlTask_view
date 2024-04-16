<template>
  <div class="chat-app">
    <div class="chat-messages" ref="messages">
      <div v-for="(message, index) in messages" :key="index" :class="{ 'message-left': message.sender !== 'User', 'message-right': message.sender === 'User' }">
        <div style="display: flex;justify-content: flex-start;margin-top: 15px">
        <div class="message-avatar">
          <img :src="message.sender === 'User' ? userAvatar : friendAvatar" alt="Avatar">
        </div>
        <div class="message-content">
          <div class="message-bubble" :class="{ 'message-left-bubble': message.sender !== 'User', 'message-right-bubble': message.sender === 'User' }">
            <div class="message-text" v-if="!message.image">{{ message.text }}</div>
            <img v-if="message.image" :src="message.image" alt="Uploaded Image" class="message-image">
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="chat-input">
      <div class="emoji-upload">
        <div class="emoji-icon" @click="toggleEmojiPicker">
          😃
        </div>
        <input type="file" ref="fileInput" style="display: none" @change="sendImage">
        <div class="upload-image-icon" @click="openFileInput">
          📷
        </div>
      </div>
      <input v-model="messageInput" @keyup.enter="sendMessage" placeholder="Type your message...">
      <button @click="sendMessage">Send</button>
      <div class="emoji-picker" v-show="showEmoji">
        <button v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)">{{ emoji }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageInput: '',
      messages: [
        { sender: 'Friend', text: 'Hello, how are you?', time: '10:00 AM' },
        { sender: 'User', text: 'Hi! I am doing fine, thank you.', time: '10:02 AM' },
        { sender: 'Friend', text: 'That\'s good to hear!', time: '10:05 AM' }
      ],
      emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "😍", "🤩", "😘", "😗", "☺️"],
      showEmoji: false,
      userAvatar: 'https://i.pravatar.cc/150?img=10',
      friendAvatar: 'https://i.pravatar.cc/150?img=20'
    };
  },
  methods: {
    addEmoji(emoji) {
      this.messageInput += emoji;
      this.showEmoji=!this.showEmoji
    },
    sendMessage() {
      if (!this.messageInput.trim()) return;

      const message = {
        sender: 'User',
        text: this.messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.messages.push(message);
      this.messageInput = '';
      this.scrollToBottom();
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    sendImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageMessage = {
          sender: 'User',
          image: reader.result,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        this.messages.push(imageMessage);
        this.scrollToBottom();
      };
      reader.readAsDataURL(file);
    },
    scrollToBottom() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    },
    toggleEmojiPicker() {
      this.showEmoji = !this.showEmoji;
    }
  }
};
</script>

<style scoped>
.chat-app {
  max-width: 800px;
  width: 600px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
}

.message-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message-content {
  margin-top: -10px;
  display: flex;
  align-items: center;
}

.message-left .message-bubble {
  margin-right: auto;
}

.message-right .message-bubble {
  margin-left: auto;
}

.message-bubble {
  background-color: #e5f5f9;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;
}

.message-left-bubble {
  margin-right: auto;
  background-color: #e5f5f9;
}

.message-right-bubble {
  margin-left: auto;
  background-color: #d6eaf8;
}

.message-text {
  word-wrap: break-word;
}

.message-time {
  font-size: 12px;
  color: #888;
}

.message-image {
  max-width: 200px;
  border-radius: 10px;
  margin-top: 5px;
}

.chat-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: relative;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.emoji-upload {
  display: flex;
}

.emoji-icon,
.upload-image-icon {
  cursor: pointer;
  margin-right: 10px;
  width: 30px;
  height: 30px;
}

.emoji-picker {
  position: absolute;
  margin-top: 150px;
  //top: -160px;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
}

.emoji-picker button {
  margin: 5px;
  cursor: pointer;
  border: none;
  background-color: transparent;
}
</style>
