import { signal } from '@preact/signals-react';

export const $modulesFilterName = signal<string>( '' );
export const $modulesFilterTags = signal<string[]>([]);
export const $modulesFilterTypes = signal<string[]>([]);
