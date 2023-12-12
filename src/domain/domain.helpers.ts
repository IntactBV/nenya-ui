/* eslint-disable no-param-reassign */
export const slugify = ( str: string ) => {
  str = str.replace( /^\s+|\s+$/g, '' );
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  // eslint-disable-next-line no-plusplus
  for ( let i = 0, l = from.length; i < l; i++ ) {
    str = str.replace( new RegExp( from.charAt( i ), 'g' ), to.charAt( i ));
  }

  str = str.replace( /[^a-z0-9 -]/g, '' )
    .replace( /\s+/g, '-' )
    .replace( /-+/g, '-' );

  return str;
};

export const capitalize = ( source: string ) => source.charAt( 0 ).toUpperCase() + source.slice( 1 );
