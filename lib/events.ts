/**
 * Tiny custom-event bus for the few cross-section interactions that would
 * otherwise require lifting state through the whole page.
 */

export const FOCUS_SKILL_GROUP = "portfolio:focus-skill-group";

export function focusSkillGroup(groupId: string) {
  window.dispatchEvent(new CustomEvent(FOCUS_SKILL_GROUP, { detail: groupId }));
}

export function onFocusSkillGroup(handler: (groupId: string) => void) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<string>).detail);
  };
  window.addEventListener(FOCUS_SKILL_GROUP, listener);
  return () => window.removeEventListener(FOCUS_SKILL_GROUP, listener);
}

export const FOCUS_PROJECT = "portfolio:focus-project";

export function focusProject(projectId: string) {
  window.dispatchEvent(new CustomEvent(FOCUS_PROJECT, { detail: projectId }));
}

export function onFocusProject(handler: (projectId: string) => void) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<string>).detail);
  };
  window.addEventListener(FOCUS_PROJECT, listener);
  return () => window.removeEventListener(FOCUS_PROJECT, listener);
}
