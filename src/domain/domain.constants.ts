export const ATTRIBUTE_TYPES = [
  'text',
  'number',
  'select',
  'multiselect',
  'date',
  'email',
  'phone',
  'list',
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const LOCAL_STORAGE = {
  MANTINE_COLOR_SCHEME: 'mantine-color-scheme-value',
};

export const RENDERER_NAMES: Record<string, string> = {
  BaseDebuggerListRenderer: 'Base Debugger List',
  BaseTableListRenderer: 'Base Table List',
};
