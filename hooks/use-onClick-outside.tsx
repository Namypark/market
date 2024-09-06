import React, { RefObject, useEffect } from "react";
import { Event } from "@/types";

/***
 *
 * we'll add a @listener .
 * This is the function we'll call with the addEventListeners we'll add at the next step.
 * The listener function will look at the event, and if the user clicked on the ref,
 * or any children inside of the ref, we're not doing anything, we'll just exit the function.
 * Otherwise, if the user clicked outside of the ref ,
 * we'll call the handler function we passed to the useOnClickOutside hook.
 */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      //check if the click is outside the referenced element

      if (!ref.current || ref.current.contains(event.target as Node) || null) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    //clean up function
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
