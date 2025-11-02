# Vapi Voice Agent Widget

A beautiful, interactive voice agent frontend built with React and Vapi AI. Features a centered interface with animated voice visualizations.

## Features

- 🎤 **Voice Interaction**: Start conversations with a single click
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 💬 **Real-time Transcripts**: See conversation history in real-time
- 🌊 **Voice Waves**: Animated visual feedback when the agent speaks
- 📱 **Responsive**: Works on all screen sizes

## Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and add your Vapi credentials:
   ```env
   VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
   VITE_SALES_ASSISTANT_ID=your_sales_assistant_id_here
   VITE_SUPPORT_ASSISTANT_ID=your_support_assistant_id_here
   VITE_DEMO_ASSISTANT_ID=your_demo_assistant_id_here
   ```
   - Get your API key and create assistants at [vapi.ai](https://vapi.ai)

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
   - Navigate to `http://localhost:5173`

> **Note**: The `.env` file is gitignored to protect your API keys. Never commit it to version control.

## Adding Lottie Animations

To replace the current wave animation with a custom Lottie file:

### Option 1: Using lottie-react (Recommended)

1. **Install lottie-react**:
```bash
npm install lottie-react
```

2. **Download a Lottie animation**:
   - Visit [LottieFiles](https://lottiefiles.com/)
   - Search for "voice" or "sound wave" animations
   - Download the JSON file
   - Save it to `src/assets/voice-animation.json`

3. **Update App.jsx**:
```jsx
import Lottie from 'lottie-react';
import voiceAnimation from './assets/voice-animation.json';

// Replace the voice waves div with:
<Lottie 
  animationData={voiceAnimation}
  loop={true}
  style={{ width: '200px', height: '200px' }}
/>
```

### Option 2: Using lottie-web

1. **Install lottie-web**:
```bash
npm install lottie-web
```

2. **Update the component**:
```jsx
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const lottieRef = useRef(null);

useEffect(() => {
  if (lottieRef.current && isConnected) {
    const animation = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/voice-animation.json' // Place in public folder
    });
    
    return () => animation.destroy();
  }
}, [isConnected]);
```

## Customization

### Colors
Edit the gradient colors in `App.jsx`:
```jsx
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Button Text
Change the button labels:
```jsx
<button>Your Custom Text</button>
```

### Animation Speed
Adjust the wave animation speed:
```jsx
animation: isSpeaking ? `wave 0.8s ease-in-out infinite ${i * 0.1}s` : 'none'
// Change 0.8s to your preferred speed
```

## Recommended Lottie Animations

- [Voice Wave 1](https://lottiefiles.com/animations/voice-wave)
- [Sound Equalizer](https://lottiefiles.com/animations/sound-equalizer)
- [Microphone Animation](https://lottiefiles.com/animations/microphone)
- [Voice Assistant](https://lottiefiles.com/animations/voice-assistant)

## Project Structure

```
vapi_web_widget/
├── src/
│   ├── components/
│   │   └── voice_widget/
│   │       ├── VoiceWidget.jsx  # Reusable voice widget component
│   │       ├── styles.css       # Widget styles
│   │       └── README.md        # Component documentation
│   ├── App.jsx          # Main app with widget grid
│   ├── App.css          # App-level styles
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables (gitignored)
├── .env.example         # Example environment variables
├── package.json
└── README.md
```

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **@vapi-ai/web** - Voice AI SDK
- **CSS Animations** - Smooth transitions and effects

## License

MIT
