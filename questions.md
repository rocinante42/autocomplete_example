### Question Section:

**1. What is the difference between Component and PureComponent? give an
example where it might break my app.**

`PureComponents` are `React` components that would not trigger a new render, no matter if the `props`, `parent` or anything else has changed. `PureComponents` are great when nesting or having multiple sibling elements but they can also cause unexpected behavior if we are expecting to see some changes reflected on them after a change in our Application state.

**2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?**

On legacy React Class Components, you can alter the behaviour on when your component will render. However, this freedom comes with a cost. It can prevent propper props and state propagation, and that includes context. This can affect both our component implementing the lyfecycle `ShouldComponentUpdate` but also any `children` nested through it.

**3. Describe 3 ways to pass information from a component to its PARENT.**

The easiest way to pass information from children to parent is using a function that's being passed down by props from the parent component.

```
const ParentComponent = () => {
  const getColorFromChildrenComponent = (color) => {
    // here you can do whatever you want with the information
    ...
  }
  return (
    <>
      <MyChildrenComponent getColor={getColorFromChildrenComponent} />
    </>
  )
}

const ChildrenComponent = ({getColor}) => {
  const [color, setColor] = React.useState<string>('red')

  // This way we can pass the internal state to the parent component
  return <button onClick={()=>{getColor(color)}}>Get Color</button>

}
```

The second way is similar, but using context instead of props for passing down the getter functions. We can store in context any information or state from children component and get acces to them in any children consuming the context provider.

Lastly, you can always use localStorage and other browser native features for store and manage application state and moving information from one place to another.

Even if you are using a reactive system, the method is almost the same, a function that serves the purpose of getting the info from one place to the other.

***4. Give 2 ways to prevent components from re-rendering.***

You can use `React.memo(component, rules)` which will prevent rendering from prop changes unless you specify which ones will let it re-render.

You can use React.PureComponent which will not re render at all.

**5. What is a fragment and why do we need it? Give an example where it might
break my app.**

React expects your JSX enclosed into a single element. That means, you shouldn't and cannot return an array of elements as follows:

```
return (<div/><div/><div/>)
```
The code above will produce an error. A short term solution is encapsulating everything into `<div>`'s but that also fills the DOM with lots of noise and useless html elements. `React.Fragment` or `<></>` in JSX let us reduce the noise in the DOM tree by using a zero footprint element. 

One way it can break the app is that Fragments aren't real DOM nodes, they just exist on the virtual dom. However, there are a lot of UI libraries that deal with child components and array of nodes. And those could mistakenly count the `React.Fragment` as real par of the code.

**6. Give 3 examples of the HOC pattern.**

HoC are similar to Hig order functions. They are components that return other components and usually, extend their functionality via prop injection.

Three different implementation of HoC:

```
// Using them for extending composition and functionality:
<MyHoC>
  {(myCustomProps) => (
    <MyOtherComponent {...myCustomProps}>
  )}
</MyHoc>

// Using them for injecting props and requirement (Like authenthication) before exporting the component:

export default withAuth(MyOtherComponent);

// Or even combining multiple HoC at the same time

export default withAuth(withTheme(withSponsor(MyComponent)))
```

However, they are hard to debug and specially prone to weird bugs. For example, refs aren't passed through, because they are specially handled by react, just as the `key`, is not really a prop.


**7. what's the difference in handling exceptions in promises, callbacks and
async...await.**

With promises, you have you ways of throwing errors: either `throw()` or its own syntax `reject()`. Errors with reject can be grabbed both by `try {} catch {}` and `.catch()`.  However, if you are using setTimeOut or another callback function inside of a promise, chances are that the callbacks will be called from a different stack. This means that errors will propagate but not necessarily into our code. 

**8. How many arguments does setState take and why is it async.**

It depends on whether you are using classComponents or hooks. with Hooks, the setter function from useState takes one argument that can be both the value you want to set or a function that gets the previous value as a parameter. 

On Class Components, `setState()` takes the values you wanna set and a callback function to call after the state has been changed. The reason is treated as async, is so that the change in state doesn't block the user experience, since every change in state triggers a render and those operations can take time. 

**9. List the steps needed to migrate a Class to Function Component.**

It depends on the type of components you are working on. Ideally, I would have a number of tests available to make sure that changes and refactors aren't affecting the user experience and what's expected from the components. After that, it's a matter of understanding the state, and possible side effects after updating it. This would mean translating the setState to useState hook, and callbacks into the useEffect hook. 

**10. List a few ways styles can be used with components.**

You can style your components using plane CSS or CSS preprocessors like SASS, LESS. You can also use inline styling using Javascript Objects with CSS key mapped properties. You can use CSS in JS with libraries like Styled-component or Stitches. You can use CSS modules and Class utility frameworks like tailwindcss. (my favorite)

**11. How to render an HTML string coming from the server.**

This is a dangerous operation since you don't wanna parse code that can be manipulated. Ideally, you can hydrate React components using SSR and Suspense. NextJS now supports ES module with dynamic imports.

However, if SSR is not an option, you can always use in React the option: `dangerouslySetInnerHTML` for loading strings as html.