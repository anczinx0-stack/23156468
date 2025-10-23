# HTML Poster Editor

A professional visual editor for creating stunning HTML posters with drag-and-drop simplicity and pixel-perfect control. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Drag-and-drop interface for easy element positioning
- Resize and transform images with visual handles
- Import and parse existing HTML files
- Real-time element tree visualization
- Alignment guides for precise positioning
- Comprehensive properties panel for element customization
- Export clean, production-ready HTML
- Undo/Redo functionality with command history

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

### Type Checking

```bash
npm run typecheck
```

## Project Structure

```
project/
├── app/
│   ├── page.tsx              # Landing page with animations
│   ├── app/page.tsx          # Main editor application
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and animations
├── components/
│   ├── AlignmentGuides.tsx   # Visual alignment helpers
│   ├── CanvasStage.tsx       # Main canvas rendering
│   ├── ElementTreePanel.tsx  # Hierarchical element view
│   ├── ImageUploadDialog.tsx # Image upload interface
│   ├── ImportPanel.tsx       # HTML import functionality
│   ├── PropertiesPanel.tsx   # Element property editor
│   ├── ResizeHandles.tsx     # Visual resize controls
│   ├── Toolbar.tsx           # Main toolbar actions
│   └── ui/                   # Reusable UI components (shadcn/ui)
├── hooks/
│   ├── use-history.ts        # Undo/redo functionality
│   └── use-toast.ts          # Toast notification system
├── lib/
│   ├── html-utils.ts         # HTML parsing and generation
│   ├── snapping.ts           # Alignment snapping logic
│   ├── types.ts              # TypeScript type definitions
│   ├── utils.ts              # Utility functions
│   └── validation.ts         # Input validation logic
└── public/
    └── image.png             # Application logo
```

## Architecture

### Design Philosophy

The application follows a modular, component-based architecture with clear separation of concerns. Each component has a single, well-defined responsibility, making the codebase maintainable and testable.

### Key Architectural Patterns

#### 1. Component-Based Architecture
- **Presentational Components**: UI-focused components in `components/ui/` handle rendering without business logic
- **Container Components**: Smart components like `CanvasStage.tsx` manage state and orchestrate child components
- **Feature Components**: Domain-specific components like `PropertiesPanel.tsx` encapsulate feature logic

#### 2. State Management
- **Local State**: React hooks (`useState`, `useRef`) for component-specific state
- **Lifted State**: Shared state managed at the application level in `app/app/page.tsx`
- **Custom Hooks**: Reusable stateful logic in `hooks/` directory

#### 3. Type Safety
- **Strict TypeScript**: Full type coverage with strict mode enabled
- **Centralized Types**: Shared types defined in `lib/types.ts`
- **Type Inference**: Leveraging TypeScript's inference for cleaner code

### Core Data Flow

```
User Interaction → Event Handler → State Update → Component Re-render → DOM Update
                                 ↓
                          History Stack (Undo/Redo)
```

### Key Components

#### CanvasStage
The central rendering component that:
- Manages element positioning and selection
- Handles mouse events for drag operations
- Renders all canvas elements with proper z-indexing
- Coordinates with alignment guides and resize handles

#### PropertiesPanel
A comprehensive property editor that:
- Dynamically displays relevant properties based on element type
- Provides real-time updates with debouncing for performance
- Validates input before applying changes
- Groups related properties for better UX

#### HTML Utils
Utility functions for:
- Parsing HTML strings into canvas elements
- Generating clean HTML from canvas state
- Sanitizing user input
- Preserving styles and attributes

#### Snapping System
Intelligent alignment that:
- Detects nearby elements and guide positions
- Calculates snap points for edges and centers
- Shows visual guides during drag operations
- Configurable snap threshold

## SOLID Design Principles

### Single Responsibility Principle (SRP)
Each component and module has a single, well-defined purpose:
- `AlignmentGuides.tsx`: Only renders alignment guides
- `ResizeHandles.tsx`: Only handles element resizing
- `html-utils.ts`: Only deals with HTML parsing/generation
- `snapping.ts`: Only handles alignment calculations

### Open/Closed Principle (OCP)
The system is open for extension but closed for modification:
- New element types can be added without modifying existing code
- Properties panel dynamically adapts to different element types
- Export format can be extended through the HTML utils module

### Liskov Substitution Principle (LSP)
Components can be substituted without breaking functionality:
- All UI components follow consistent prop interfaces
- Canvas elements share a common `CanvasElement` type
- Event handlers follow predictable patterns

### Interface Segregation Principle (ISP)
Interfaces are client-specific and minimal:
- `CanvasElement` type has only essential properties
- Components receive only the props they need
- Event handlers are granular and specific

### Dependency Inversion Principle (DIP)
High-level modules don't depend on low-level details:
- Components depend on abstractions (types) not implementations
- State management is abstracted through hooks
- UI components are decoupled from business logic

## Animation System

The landing page features a sophisticated animation system built with Tailwind CSS:

### Animation Types
1. **Fade-in animations**: Smooth opacity transitions on page load
2. **Slide-in animations**: Elements enter from various directions
3. **Scale animations**: Logo and elements grow into view
4. **Bounce animations**: Gentle floating effect on the logo
5. **Blob morphing**: Organic shape transformations on background elements
6. **Shimmer effect**: Subtle shine on interactive buttons
7. **Rotation**: Slow rotating background elements

### Performance Considerations
- CSS animations over JavaScript for better performance
- Hardware-accelerated transforms (translate, scale, rotate)
- Minimal repaints through proper use of transform and opacity
- Staggered animations with delays for visual hierarchy

## Known Limitations

### Current Limitations

1. **Element Types**: Currently supports only div, p, h1, h2, h3, and image elements
   - No support for forms, buttons, or interactive elements
   - Limited to basic block and inline elements

2. **Styling Constraints**:
   - Fixed canvas size (720x720px)
   - No responsive preview mode
   - Limited font selection
   - No gradient or pattern backgrounds

3. **Import Functionality**:
   - May not preserve complex CSS styles from imported HTML
   - JavaScript code is stripped during import
   - Some HTML5 elements may not be recognized

4. **Browser Compatibility**:
   - Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
   - May have issues with older browser versions
   - No IE11 support

5. **File Management**:
   - No cloud storage or project saving
   - Local storage limited to browser capacity
   - No project versioning or collaboration features

6. **Performance**:
   - Large number of elements (>100) may impact performance
   - No virtualization for element tree
   - Memory usage grows with undo history

## Potential Improvements

### Short-term Improvements

1. **Enhanced Element Support**:
   - Add support for SVG elements
   - Include form elements (input, button, select)
   - Support for video and audio elements
   - Custom HTML element insertion

2. **Advanced Styling**:
   - Custom color picker with swatches
   - Gradient editor
   - Shadow and blur effect controls
   - Animation property editor

3. **User Experience**:
   - Keyboard shortcuts for common actions
   - Multi-select for batch operations
   - Element grouping and locking
   - Grid and ruler overlays
   - Zoom in/out functionality

4. **Export Options**:
   - Export as image (PNG, JPEG)
   - Export with inline styles or external CSS
   - Template system for reusable layouts
   - PDF export

### Long-term Improvements

1. **Collaboration Features**:
   - Real-time collaborative editing
   - User authentication and authorization
   - Project sharing and permissions
   - Comment and annotation system

2. **Cloud Integration**:
   - Save projects to cloud storage
   - Version control and history
   - Template marketplace
   - Asset library integration

3. **Advanced Features**:
   - Responsive design preview (mobile, tablet, desktop)
   - CSS Grid and Flexbox visual editor
   - Component library system
   - Animation timeline editor

4. **Performance Optimization**:
   - Virtual scrolling for large element trees
   - Web Worker for heavy computations
   - Lazy loading for images
   - Canvas virtualization

5. **Accessibility**:
   - Keyboard-only navigation support
   - Screen reader compatibility
   - ARIA attribute editor
   - Accessibility audit tool

6. **AI Integration**:
   - AI-powered layout suggestions
   - Automatic color scheme generation
   - Content generation and optimization
   - Responsive breakpoint suggestions

## Technology Stack

- **Framework**: Next.js 13.5.1 (React 18.2.0)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React Hooks
- **Build Tool**: Next.js built-in (Webpack/SWC)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Prefer TypeScript interfaces over types for objects
- Use named exports for components
- Keep components under 300 lines
- Extract complex logic into custom hooks or utilities

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react';
import { ComponentProps } from './types';

// 2. Type definitions
interface Props extends ComponentProps {
  // ...
}

// 3. Component definition
export function Component({ prop1, prop2 }: Props) {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Event handlers
  const handleClick = () => {
    // ...
  };

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Testing Strategy
While tests are not currently included, the architecture supports:
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for user flows
- E2E tests with Playwright or Cypress

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For issues, questions, or contributions, please refer to the project repository.
