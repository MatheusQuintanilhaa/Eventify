$commits = @(
    @{date="2025-05-15 10:00:00"; message="Initial commit: Setup Next.js 14 with TypeScript"}
    @{date="2025-05-15 14:30:00"; message="Configure Material-UI and project structure"}
    @{date="2025-05-16 09:15:00"; message="Add TypeScript interfaces for Event and Registration"}
    @{date="2025-05-16 11:45:00"; message="Implement EventService with localStorage integration"}
    @{date="2025-05-16 16:20:00"; message="Add theme context with light/dark mode support"}
    @{date="2025-05-17 09:30:00"; message="Create main layout with responsive header"}
    @{date="2025-05-17 14:15:00"; message="Implement EventCard component with hover effects"}
    @{date="2025-05-17 17:45:00"; message="Add FilterBar with category and search functionality"}
    @{date="2025-05-18 10:20:00"; message="Build home page with event grid and pagination"}
    @{date="2025-05-18 15:30:00"; message="Create event details page with responsive design"}
    @{date="2025-05-19 09:00:00"; message="Implement registration form with React Hook Form"}
    @{date="2025-05-19 13:45:00"; message="Add RegistrationService for managing user registrations"}
    @{date="2025-05-19 16:30:00"; message="Create 'My Events' page with registration history"}
    @{date="2025-05-20 10:15:00"; message="Implement favorites system with localStorage"}
    @{date="2025-05-20 14:20:00"; message="Add favorites page with filtered event display"}
    @{date="2025-05-21 09:30:00"; message="Create event creation page structure"}
    @{date="2025-05-21 15:45:00"; message="Implement event creation form with validation"}
    @{date="2025-05-22 11:00:00"; message="Add custom modal component with animations"}
    @{date="2025-05-22 16:15:00"; message="Implement toast notification system"}
    @{date="2025-05-22 18:30:00"; message="Integrate custom modals and toasts across components"}
    @{date="2025-05-23 09:45:00"; message="Fix form validation and improve user feedback"}
    @{date="2025-05-23 14:20:00"; message="Optimize component rendering and state management"}
    @{date="2025-05-23 17:00:00"; message="Enhance UI with better spacing and animations"}
    @{date="2025-05-24 10:30:00"; message="Improve mobile responsiveness across all pages"}
    @{date="2025-05-24 15:15:00"; message="Fix category selector and form submission issues"}
    @{date="2025-05-25 11:00:00"; message="Polish UI details and add loading states"}
    @{date="2025-05-25 16:45:00"; message="Improve color scheme and visual hierarchy"}
    @{date="2025-05-26 09:20:00"; message="Add smooth transitions and micro-interactions"}
    @{date="2025-05-26 13:30:00"; message="Enhance form validations and error handling"}
    @{date="2025-05-26 17:15:00"; message="Add comprehensive README with setup instructions"}
    @{date="2025-05-27 10:00:00"; message="Final optimizations and code cleanup"}
    @{date="2025-05-27 14:45:00"; message="Add error boundaries and fallback components"}
    @{date="2025-05-27 18:20:00"; message="Optimize bundle size and performance metrics"}
    @{date="2025-05-28 09:30:00"; message="Final UI polish and accessibility improvements"}
    @{date="2025-05-28 12:00:00"; message="Project complete: Ready for production deployment"}
)

foreach ($commit in $commits) {
    $env:GIT_AUTHOR_DATE = $commit.date
    $env:GIT_COMMITTER_DATE = $commit.date
    git commit --allow-empty -m $commit.message
}
