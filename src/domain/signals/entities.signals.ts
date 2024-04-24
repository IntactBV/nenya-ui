import { signal } from '@preact/signals-react';

export const $entitiesFilterName = signal<string>( '' );
export const $entitiesFilterTags = signal<string[]>([]);
export const $entitiesFilterTypes = signal<string[]>([]);
