import { signal } from '@preact/signals-react';

export const $attrFilterName = signal<string>( '' );
export const $attrFilterTags = signal<string[]>([]);
export const $attrFilterTypes = signal<string[]>([]);
