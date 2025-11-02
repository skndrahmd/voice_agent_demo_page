# Scrift Inbound Voice Widget

A reusable voice agent component for Vapi AI integration with customizable styling and configuration.

## Features

- ✅ Fully reusable component
- ✅ All styles in separate CSS file
- ✅ Customizable props (title, description, button text)
- ✅ Mute/Unmute functionality
- ✅ Animated voice waves
- ✅ Ready for Lottie animations
- ✅ Clean, modular code structure

## Usage

### Basic Usage

```jsx
import VoiceWidget from './components/voice_widget/VoiceWidget';

function App() {
  return (
    <VoiceWidget       
      apiKey="your_vapi_public_key"
      assistantId="your_assistant_id"
    />
  );
}
```

### With Custom Configuration

```jsx
<VoiceWidget 
  apiKey="your_vapi_public_key"
  assistantId="your_assistant_id"
  title="Customer Support"
  description="Talk to our AI support assistant"
  startButtonText="Start Support Chat"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | string | **required** | Your Vapi public API key |
| `assistantId` | string | **required** | Your Vapi assistant ID |
| `title` | string | "Voice Assistant" | Title displayed on landing page |
| `description` | string | "Click the button..." | Description text on landing page |
| `startButtonText` | string | "Start Conversation" | Text for the start button |
| `config` | object | `{}` | Additional Vapi configuration options |

## Customization

### Styling

All styles are in `styles.css`. You can customize:

- **Colors**: Change gradient colors in `.scrift-widget-container`
- **Sizes**: Modify dimensions in `.scrift-animation-circle`
- **Animations**: Adjust timing in `@keyframes wave`
- **Buttons**: Customize button styles in `.scrift-button` classes

### CSS Class Structure

```
.scrift-widget-container       // Main container
  .scrift-landing              // Landing page wrapper
    .scrift-title              // Main title
    .scrift-description        // Description text
    .scrift-start-button       // Start button
  
  .scrift-call-container       // Active call wrapper
    .scrift-animation-wrapper  // Animation container
      .scrift-animation-circle // Circular animation area
        .scrift-waves-container // Wave bars container
          .scrift-wave-bar     // Individual wave bar
    
    .scrift-status-section     // Status text area
      .scrift-status-title     // Status heading
      .scrift-status-description // Status text
    
    .scrift-controls           // Button container
      .scrift-mute-button      // Mute/unmute button
      .scrift-end-button       // End call button
```

## Creating Multiple Widgets

You can use multiple instances with different configurations:

```jsx
function App() {
  return (
    <div>
      {/* Sales Assistant */}
      <VoiceWidget 
        apiKey="your_key"
        assistantId="sales_assistant_id"
        title="Sales Assistant"
        description="Talk to our sales team"
      />

      {/* Support Assistant */}
      <VoiceWidget 
        apiKey="your_key"
        assistantId="support_assistant_id"
        title="Customer Support"
        description="Get help from our support team"
      />
    </div>
  );
}
```

## Adding Lottie Animations

To replace the wave animation with a Lottie file:

1. Install lottie-react:
```bash
npm install lottie-react
```

2. Import and use in `VoiceWidget.jsx`:
```jsx
import Lottie from 'lottie-react';
import animationData from './animation.json';

// Replace the waves container with:
<Lottie 
  animationData={animationData}
  loop={true}
  style={{ width: '200px', height: '200px' }}
/>
```

## File Structure

```
components/voice_widget/
├── VoiceWidget.jsx    # Main component logic
├── styles.css            # All component styles
└── README.md            # This file
```

## Events Handled

- `call-start` - When call begins
- `call-end` - When call ends
- `speech-start` - When assistant starts speaking
- `speech-end` - When assistant stops speaking
- `message` - For transcript messages
- `error` - For error handling

## State Management

The component manages:
- `isConnected` - Call connection status
- `isSpeaking` - Assistant speaking status
- `isMuted` - Microphone mute status
- `transcript` - Conversation transcript (stored but not displayed)

## License

MIT
