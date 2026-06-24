# Fixes Summary

Name:
Registration number:
Time spent:

## Bugs fixed

For each item, include the broken behavior, files changed, and how you verified the fix.

1. Issue: App crashed during production build due to JSX assignment operator instead of comparison
   Files changed: src/App.jsx
   Explanation: Changed `activeTab = 'dashboard'` to `activeTab === 'dashboard'` and removed unused Menu/X icon imports
   Verification: Run `npm run build` - completes without errors

2. Issue: Sidebar navigation did not switch between Dashboard, Assignments, and Announcements
   Files changed: src/components/Sidebar.jsx
   Explanation: Added local tab-change handler that sends clicked item's id to onChangeTab and closes sidebar on mobile
   Verification: Click Dashboard, Assignments, and Announcements in sidebar—each view switches correctly

3. Issue: Student search was case-sensitive and didn't handle extra spaces
   Files changed: src/App.jsx
   Explanation: Changed filter to use `toLowerCase()` and added `.trim()` for case-insensitive search with space handling
   Verification: Search for "john", "John", or "  john  "—all match "John" in student list

4. Issue: Department filter dropdown did not filter students correctly
   Files changed: src/App.jsx
   Explanation: Fixed filter logic from `student.department === 'All' || student.department === 'All'` to correct comparison and added value attributes to option elements
   Verification: Select "Computer Science"—only CS students appear. Select "All"—all students reappear

5. Issue: Student progress bar width used attendance percentage instead of progress percentage
   Files changed: src/components/StudentTable.jsx
   Explanation: Changed progress bar width from `student.attendance` to `student.progress` to match displayed text
   Verification: Progress bar width matches percentage number (e.g., 72% bar fills to 72% width)

6. Issue: Open Assignments panel displayed completed assignments instead of incomplete ones
   Files changed: src/App.jsx
   Explanation: Changed filter from `item.completed === true` to `item.completed === false`
   Verification: Open Assignments panel shows only assignments with unchecked status

7. Issue: Average project progress calculation was incorrect
   Files changed: src/App.jsx
   Explanation: Changed division from `assignmentItems.length` to `students.length`
   Verification: Average progress reflects correct mean of all student progress values

8. Issue: Student details modal needed proper state management and keyboard accessibility
   Files changed: src/App.jsx, src/components/StudentModal.jsx
   Explanation: Added showStudentModal state, handleStudentClick function, and Escape key support via useEffect
   Verification: Click student—modal opens. Press Escape—modal closes

9. Issue: Form fields erased each other while typing in assignment form
   Files changed: src/components/NewAssignmentForm.jsx
   Explanation: Changed `setForm({ field: value })` to `setForm({ ...form, [field]: value })` using spread operator
   Verification: Type in multiple form fields—all fields retain their values

10. Issue: Form validation only showed error when all fields were simultaneously empty
    Files changed: src/components/NewAssignmentForm.jsx
    Explanation: Changed validation from AND operator to OR: `if (!form.title || !form.course || !form.dueDate)`
    Verification: Submit with only title filled—error shows. All fields filled—assignment created

11. Issue: Form did not reset after successful assignment creation
    Files changed: src/components/NewAssignmentForm.jsx
    Explanation: Added `setForm(initialForm)` after onCreate(form) and cleared error state
    Verification: Fill form, click Create—all fields clear and ready for next entry

12. Issue: Assignment completion toggle did not update UI immediately
    Files changed: src/App.jsx
    Explanation: Replaced direct mutation with immutable `.map()` pattern creating new array with updated object
    Verification: Click checkbox on assignment—completed state toggles immediately

13. Issue: Assignments were not sorted correctly by due date or priority
    Files changed: src/components/AssignmentList.jsx
    Explanation: Changed to `new Date(a.dueDate) - new Date(b.dueDate)` for proper date comparison and added secondary sort by priority
    Verification: Assignments sorted by due date (earliest first). Same date shows higher priority first

14. Issue: Theme toggle showed wrong theme immediately after clicking
    Files changed: src/App.jsx
    Explanation: Added separate useEffect hook that applies document.body.className when theme state changes
    Verification: Click theme toggle—theme changes immediately and correctly

15. Issue: Theme preference did not persist after page refresh
    Files changed: src/hooks/useLocalStorage.js
    Explanation: Changed from saving initialValue to saving current value and updated dependency array
    Verification: Toggle theme, refresh page—theme preference persists

16. Issue: Mobile sidebar did not open when menu button clicked
    Files changed: src/styles.css
    Explanation: Changed .sidebar.open transform from translateX(-100%) to translateX(0)
    Verification: On mobile viewport, click menu button—sidebar slides in from left

17. Issue: Layout was not usable on mobile, tablet, and desktop screens
    Files changed: src/styles.css
    Explanation: Added comprehensive responsive breakpoints (≤480px, 481-768px, 769-1024px, 1025-1366px, 1367-1920px, 1921px+), reduced spacing/padding/fonts on mobile, removed min-width from student table
    Verification: Test on mobile, tablet, desktop—layout usable on all screen sizes without horizontal scroll

18. Issue: Tables and cards created unusable overflow on smaller screens
    Files changed: src/styles.css
    Explanation: Removed min-width from student table, set width to 100%, added overflow-x: hidden, added text wrapping for cards
    Verification: On mobile—tables and cards fit within screen width without horizontal scroll

19. Issue: Assignment toggle directly mutated the assignment object
    Files changed: src/App.jsx
    Explanation: Replaced direct mutation with immutable .map() pattern
    Verification: All state updates use immutable patterns (spread operator, .map(), .filter())

20. Issue: React could render incorrectly when lists changed due to unstable keys
    Files changed: src/components/StudentTable.jsx, src/components/AssignmentList.jsx
    Explanation: Changed student table to key={student.id} and assignment list to key={assignment.id}
    Verification: Filter/search students or add-delete assignments—UI updates without duplicate elements

21. Issue: Unused Pin import remained after button removal
    Files changed: src/components/AnnouncementPanel.jsx
    Explanation: Removed Pin from lucide-react import statement
    Verification: Run linter—no unused import warnings

22. Issue: Users could not close student modal with Escape key
    Files changed: src/components/StudentModal.jsx
    Explanation: Added useEffect hook with keydown event listener for Escape key
    Verification: Open modal, press Escape—modal closes immediately

23. Issue: Visual style was not clean and consistent across light and dark modes
    Files changed: src/styles.css
    Explanation: Added comprehensive dark mode styling for text, icons, backgrounds, borders, and interactive elements
    Verification: Toggle between light and dark modes—visual style clean and consistent with proper contrast

## UI improvements made

Only list improvements that directly support the assignment requirements.

- Added comprehensive responsive breakpoints for mobile, tablet, laptop, desktop, and large desktop screens
- Reduced spacing, padding, and font sizes on mobile to fit more content on screen
- Added text wrapping and overflow handling for announcement and assignment cards
- Added dark mode styling for all UI elements to ensure consistent visual style
- Made hero score circle more compact with appropriate sizing for all screen sizes
- Adjusted icon placement (calendar and flag) to right side of text for better visual balance
- Reduced menu button size and adjusted dash line thickness for better mobile appearance

## Out-of-scope changes

List any intentional refactors or behavior changes that were not directly required. Write `None` if you did not make any.

None

## Testing performed

- Desktop: Verified all functionality works correctly on desktop screen sizes (1367px+)
- Tablet: Verified layout and functionality on tablet screen sizes (769px-1024px)
- Mobile: Verified layout, sidebar, and all features on mobile screen sizes (≤480px, 481-768px)
- Browser console checked: No errors or warnings in browser console during normal usage
- Refresh/persistence checked: Theme preference persists across page refreshes

## Known limitations

None