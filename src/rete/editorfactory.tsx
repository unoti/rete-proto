// My own version of the editor creation stuff in default.ts.
// This version bypasses the nonsense of creating a different module based on URL parameters
// while still allowing me to return custom values from the createEditor.

/* eslint-disable */
import { createEditor as createDefaultEditor } from './default'
//import { createEditor as createPerfEditor } from './perf'
//import { createEditor as createCustomEditor } from './customization'
//import { createEditor as create3DEditor } from './3d'
//import { createEditor as createScopesEditor } from './scopes'
//import { isHeadless } from '../headless'

// const factory = {
//   'default': createDefaultEditor,
//   'perf': createPerfEditor,
//   'customization': createCustomEditor,
//   '3d': create3DEditor,
//   'scopes': createScopesEditor
// }

//const query = typeof location !== 'undefined' && new URLSearchParams(location.search)
//const name = ((query && query.get('template')) || 'default') as keyof typeof factory
//const name = 'default' as keyof typeof factory;

//const create = factory[name]
const create = createDefaultEditor;

export const createEditor = ((...args: Parameters<typeof create>) => {
  // if (isHeadless()) {
  //   args[0].classList.add('headless')
  //   document.body.style.overflow = 'hidden';
  // }
  return create.apply(this, args)
}) as typeof create
