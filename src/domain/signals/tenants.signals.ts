import { signal } from '@preact/signals-react';

export const $tenantsFilterName = signal<string>( '' );
export const $tenantsFilterTags = signal<string[]>([]);
