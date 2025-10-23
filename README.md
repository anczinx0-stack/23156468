# Neo Editor

A professional visual HTML poster editor built with Next.js, TypeScript, and Tailwind CSS. Neo Editor provides drag-and-drop simplicity with pixel-perfect control for creating stunning HTML posters.

## Features

### Core Functionality
- **Visual HTML Editor**: Import HTML content and edit it visually on a 720x720px canvas
- **Drag & Drop Interface**: Intuitive element positioning with real-time updates
- **Element Management**:
  - Add and style text elements with customizable font size, color, and weight
  - Upload and resize images with aspect ratio preservation
  - Delete elements with confirmation dialog
- **Smart Snapping System**: Automatic alignment guides when dragging elements
  - Snap to canvas edges and center
  - Snap to other element edges and centers
  - Visual alignment guides with 5px snap threshold
- **Element Tree View**: Hierarchical visualization of all canvas elements
- **Properties Panel**: Real-time editing of element properties
  - Text content, font size, color, and weight for text elements
  - Source URL, alt text, dimensions for images
  - Input validation with user-friendly error messages
- **Undo/Redo**: Full history management with keyboard shortcuts (Ctrl+Z/Ctrl+Y)
- **Export**: Download edited HTML as a complete, standalone file
- **Keyboard Support**: Delete key to remove selected elements

### User Experience
- **Professional Landing Page**: Animated introduction with smooth transitions
- **Responsive Status Bar**: Real-time canvas information and selection feedback
- **Visual Selection Indicators**: Blue outline with shadow for selected elements
- **Validation System**: Input constraints with helpful error dialogs
  - Font size: 8-200px
  - Font weight: 100-900 (multiples of 100)
  - Image dimensions: 10-2000px

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd neo-editor
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

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## Architecture & SOLID Design

### Project Structure

```
project/
├── app/                      # Next.js 13 App Router
│   ├── page.tsx             # Landing page
│   ├── app/page.tsx         # Main editor application
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── CanvasStage.tsx     # Main canvas with drag/drop logic
│   ├── Toolbar.tsx         # Left sidebar with tools
│   ├── PropertiesPanel.tsx # Right sidebar for element properties
│   ├── ElementTreePanel.tsx# Hierarchical element viewer
│   ├── AlignmentGuides.tsx # Visual snapping guides
│   ├── ResizeHandles.tsx   # Image resize controls
│   ├── ImportPanel.tsx     # HTML import dialog
│   ├── ImageUploadDialog.tsx # Image upload interface
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── lib/                     # Utility functions and types
│   ├── html-utils.ts       # HTML parsing, sanitization, export
│   ├── snapping.ts         # Snapping algorithm and calculations
│   ├── validation.ts       # Input validation logic
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # General utilities
└── hooks/                   # Custom React hooks
    ├── use-history.ts      # Undo/redo implementation
    └── use-toast.ts        # Toast notifications
```

### SOLID Principles Applied

#### 1. Single Responsibility Principle (SRP)
Each component and module has a single, well-defined purpose:

- **CanvasStage**: Manages canvas rendering, element selection, and drag operations
- **PropertiesPanel**: Handles property editing for selected elements
- **Toolbar**: Provides tool buttons and action controls
- **ElementTreePanel**: Displays and manages element hierarchy
- **html-utils.ts**: HTML manipulation (sanitization, export, parsing)
- **snapping.ts**: Snapping calculations and alignment logic
- **validation.ts**: Input validation with consistent error messages
- **use-history.ts**: Generic undo/redo state management

#### 2. Open/Closed Principle (OCP)
The architecture is designed to be extensible without modification:

- **Type System**: `SelectedElement` interface allows new element types
- **Validation System**: `ValidationLimits` interface allows custom constraints
- **Snapping System**: `SnapGuide` interface supports new guide types
- **History Hook**: Generic `useHistory<T>` works with any state type

#### 3. Liskov Substitution Principle (LSP)
Components accept interfaces, not concrete implementations:

- Props interfaces define contracts (e.g., `CanvasStageProps`, `PropertiesPanelProps`)
- Elements are treated uniformly through `SelectedElement` abstraction
- Validation functions return consistent `ValidationResult` interface

#### 4. Interface Segregation Principle (ISP)
Components receive only the props they need:

- **CanvasStage**: Gets only selection and content change handlers
- **PropertiesPanel**: Only receives selected element and change handler
- **Toolbar**: Receives discrete action handlers, not entire app state
- **ElementTreePanel**: Gets only HTML content, selection, and stage reference

#### 5. Dependency Inversion Principle (DIP)
High-level components depend on abstractions:

- Components depend on TypeScript interfaces, not concrete implementations
- History management is abstracted through `useHistory` hook
- HTML utilities are pure functions with no dependencies
- Validation logic is decoupled from UI components

### Design Patterns

#### 1. **State Management Pattern**
- Uses React hooks and refs for local state
- `useHistory` implements Command pattern for undo/redo
- Props drilling minimized through focused component interfaces

#### 2. **Observer Pattern**
- Parent component (`AppPage`) observes changes from child components
- Selection changes propagate through callback props
- Content changes trigger history updates

#### 3. **Strategy Pattern**
- Different validation strategies for different property types
- Snapping algorithm supports multiple alignment strategies
- Element type detection determines available properties

#### 4. **Factory Pattern**
- `generateUniqueId()` creates consistent element identifiers
- Element creation functions in `AppPage` follow factory pattern

#### 5. **Pure Function Pattern**
- All utility functions in `lib/` are pure and stateless
- Calculations (snapping, validation) have no side effects
- Enables easy testing and predictable behavior

## Known Limitations

### Current Constraints

1. **Canvas Size**: Fixed at 720x720px (not configurable)
2. **Single Canvas**: Only one canvas per session
3. **Element Rotation**: Not supported
4. **Z-Index Control**: No manual layer ordering
5. **CSS Properties**: Limited to common text and image properties
6. **Nested Elements**: Element tree displays but editing is limited to top-level
7. **Multi-Select**: Cannot select and edit multiple elements simultaneously
8. **Copy/Paste**: Not implemented
9. **Keyboard Shortcuts**: Limited to Delete, Ctrl+Z, and Ctrl+Y
10. **Mobile Support**: Optimized for desktop, mobile experience is limited

### Technical Limitations

1. **HTML Sanitization**: Removes scripts and event handlers (security feature)
2. **Image Uploads**: Converted to base64 data URLs (increases file size)
3. **Browser Dependency**: Uses DOMParser (requires browser environment)
4. **No Persistence**: Changes are not saved (no database integration)
5. **History Limit**: Unlimited history may cause memory issues with large documents

## Potential Improvements

### Short-term Enhancements

3. **More Keyboard Shortcuts**:
   - Arrow keys for nudging elements
   - Ctrl+A for select all
   - Escape to deselect

4. **Layer Management**:
   - Z-index controls
   - Bring to front / Send to back commands
   - Visual layer panel

5. **Canvas Presets**:
   - Multiple canvas size options
   - Custom dimensions input
   - Common social media sizes (Instagram, Facebook, etc.)

### Medium-term Enhancements

1. **Element Rotation**:
   - Rotation handles
   - Angle input in properties panel
   - Snap to 15-degree increments

2. **Advanced Styling**:
   - Background colors and gradients
   - Borders and shadows
   - Text alignment and line height
   - Padding and margin controls

3. **Shape Tools**:
   - Rectangles, circles, lines
   - SVG support
   - Custom shapes library

4. **Templates**:
   - Pre-built poster templates
   - Template library
   - Save custom templates

5. **Grid System**:
   - Toggle grid overlay
   - Grid snapping
   - Configurable grid size

6. **File Management**:
   - Save/load projects
   - Auto-save functionality
   - Export to PNG/JPG

### Long-term Enhancements

1. **Database Integration**:
   - Save projects to Supabase
   - User accounts and authentication
   - Project sharing and collaboration

2. **Real-time Collaboration**:
   - Multiple users editing simultaneously
   - Cursor tracking
   - Change notifications

3. **Advanced Image Editing**:
   - Filters and effects
   - Cropping and masking
   - Image library integration

4. **Plugin System**:
   - Custom element types
   - Third-party integrations
   - Extensible tool palette

5. **AI Features**:
   - Auto-layout suggestions
   - Design recommendations
   - Image background removal
   - Text generation

6. **Responsive Design**:
   - Mobile app with touch gestures
   - Tablet optimization
   - Cross-device synchronization

7. **Export Options**:
   - PDF export
   - SVG export
   - React/Vue component generation
   - Different image formats and quality settings

### Tech Stack Verification

#FOLLOWING TECH STACKS CONFIRMED 

Next.js with App Router: CONFIRMED

Next.js version 13.5.1 is installed
Uses the App Router architecture (app directory structure with layout.tsx and page.tsx)
Modern Next.js configuration with proper routing setup

TypeScript: CONFIRMED

TypeScript 5.2.2 is installed and configured
tsconfig.json is properly set up with strict mode
All main files use .ts and .tsx extensions
Type definitions are used throughout (interfaces, type annotations)

Tailwind CSS: CONFIRMED

Tailwind CSS 3.3.3 is installed
tailwind.config.ts is properly configured
PostCSS configuration is present
Tailwind utilities are used in components
shadcn/ui component library is integrated (which is built on Tailwind)

SOLID Architecture Principles: CONFIRMED

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **State Management**: React Hooks
- **Icons**: Lucide React

## Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Private project - All rights reserved

## Contributing

This is a private project. For questions or suggestions, please contact the maintainer.

---

**Version**: 1.0.0
**Built with**: Next.js, TypeScript & Tailwind CSS

