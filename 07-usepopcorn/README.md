Section 12: Effects and Data Fetching
B140/ Intro

- useEffect

B141/ The component lifecycle

- different state of the component instance

1. Mount(born) / Initial render (very first time)
2. re-render (state / props / context update, parent com
   re-render)
3. UnMount(die) (component instance is completely
   destroyed and removed => state and props are destroyed
   too) EXAMPLE:

==> we define code to run at specific points in
time

B142/ How NOT to Fetch Data in React
=> it crashes the app, when fetching data and setting
state => infinite loop => never setState in render
logic
=> need set into useEffect hook

B143/ useEffect to the Rescue
useEffect(function(){}, [])

B144/ A First Look at Effects

- side effect -> interaction btw react component to
  the world outside the component

* happend in 2 places

1. event handler
2. useEffect Hook

- effect keep the code sync at different points
  with some external sys
  B145/ Using an async Function

* in React 18, useEffect will be called 2 times.
* Just in the development, when it becomes to
  the production, its no longer be a problem

B146/ Adding a Loading State

B147/ Handling Errors
try {} catch(err){};

- deal with:

1. loading movement
2. error existed movement
   2.1) internet can not be connected
   2.2) movies not found
3. found movies movement
