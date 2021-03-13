import { writable } from "svelte/store";

let stored = localStorage.getItem("authentication");

if (stored) {
    stored = JSON.parse(stored);
}

export const authentication = writable(stored);

authentication.subscribe(data => {
    localStorage.setItem("authentication", JSON.stringify(data));
});