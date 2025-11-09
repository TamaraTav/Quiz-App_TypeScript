# Quiz App - TypeScript React Application

A modern, interactive quiz application built with React, TypeScript, and Vite. Features include real-time scoring, progress tracking, timer functionality, quiz history, and full accessibility support.

## Features

### Core Functionality

- **Interactive Quiz Interface**: Answer questions with immediate visual feedback
- **Progress Tracking**: Visual progress bar and question counter
- **Timer**: Real-time timer that tracks quiz completion time
- **Score Display**: Final score with accuracy percentage
- **Quiz History**: View previous quiz results stored in localStorage
- **Restart Functionality**: Restart quiz at any time

### User Experience

- **Visual Feedback**: Color-coded correct/incorrect answers (green/red)
- **Smooth Transitions**: Animated feedback messages and transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader compatibility

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Comprehensive error boundaries and validation
- **Performance Optimized**: React.memo, useMemo, and useCallback optimizations
- **Data Validation**: Robust validation for quiz data structure
- **localStorage Integration**: Persistent quiz history storage

## Tech Stack

- **React 18.3.1**: UI library
- **TypeScript 5.2.2**: Type safety
- **Vite 5.3.1**: Build tool and development server
- **ESLint**: Code linting and quality
- **CSS3**: Styling with modern CSS features

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Quiz-App_TypeScript
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Available Scripts

- `npm run dev`: Start development server with hot module replacement
- `npm run build`: Build for production
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview production build

## Project Structure

```
src/
├── components/          # React components
│   ├── Quiz.tsx        # Main quiz component
│   ├── Question.tsx    # Question display component
│   ├── QuizHistory.tsx # Quiz history modal
│   ├── ErrorBoundary.tsx # Error boundary component
│   └── *.css           # Component styles
├── hooks/              # Custom React hooks
│   └── useTimer.ts     # Timer hook
├── utils/              # Utility functions
│   ├── validation.ts   # Data validation
│   └── localStorage.ts # localStorage utilities
├── types.ts            # TypeScript type definitions
├── data.json           # Quiz questions data
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

## Usage

### Taking a Quiz

1. Start the application
2. Read the question carefully
3. Click on your answer choice
4. View feedback (correct/incorrect)
5. Wait 1.5 seconds for automatic progression
6. Complete all questions
7. View your final score and statistics

### Viewing History

1. Complete a quiz
2. Click "View History" button on the results screen
3. Browse through previous quiz results
4. See score, accuracy, time taken, and date for each attempt

### Restarting Quiz

- Click "Restart Quiz" button at any time
- Quiz will reset to the first question
- Timer and score will be reset

## Data Structure

Quiz questions are stored in `src/data.json` with the following structure:

```json
{
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": "Correct Option",
  "category": "Optional Category",
  "difficulty": "easy" | "medium" | "hard"
}
```

## Features in Detail

### Timer

- Starts automatically when quiz begins
- Tracks total time taken
- Displays in MM:SS format
- Stops when quiz is completed

### Progress Tracking

- Visual progress bar
- Question counter (e.g., "Question 1 of 10")
- Real-time updates as you progress

### Feedback System

- Immediate visual feedback on answer selection
- Green highlight for correct answers
- Red highlight for incorrect answers
- Text feedback with correct answer display
- Animated transitions

### Quiz History

- Stores up to 50 most recent quiz results
- Displays score, accuracy, time, and date
- Category and difficulty badges (if available)
- Accessible via modal overlay

### Error Handling

- Error boundaries for React errors
- Data validation for quiz structure
- Graceful error messages
- Fallback UI for invalid data

### Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

### Performance

- React.memo for component memoization
- useMemo for expensive calculations
- useCallback for stable function references
- Optimized re-renders

## Customization

### Adding Questions

Edit `src/data.json` to add new questions:

```json
{
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "category": "Custom Category",
  "difficulty": "medium"
}
```

### Styling

- Component styles are in their respective `.css` files
- Global styles in `src/index.css` and `src/App.css`
- Modify colors, fonts, and spacing as needed

### Timer Duration

Adjust the feedback delay in `src/components/Question.tsx`:

```typescript
setTimeout(() => {
  onSelectOption(selectedOption);
}, 1500); // Change 1500 to desired milliseconds
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- React Hooks rules enforced
- Consistent code formatting

### Best Practices

- Component-based architecture
- Separation of concerns
- Type safety throughout
- Error handling
- Accessibility first
- Performance optimization

## License

This project is private and not licensed for public use.

## Contributing

This is a private project. Contributions are not currently accepted.

## Author

Tamara Tava

**Note**: This application requires a modern browser with JavaScript enabled. localStorage is used for quiz history storage.
