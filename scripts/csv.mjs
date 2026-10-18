export function csvCell(value) {
  if(value!==null && typeof value==='object')throw new TypeError('CSV values must be scalar');
  let s=String(value??'');
  // formula starters, after any leading whitespace, control, zero-width or bidi characters
  if(/^[\s\u0000-\u001f\u007f-\u009f\u00ad\u200b-\u200f\u2028\u2029\u202a-\u202e\u2060-\u2064\ufeff]*[=+@-]/u.test(s)||/^[\t\r\n]/.test(s))s="'"+s;
  return '"'+s.replace(/"/g,'""')+'"';
}
export function toCsv(rows,{bom=true}={}) {
  if(!Array.isArray(rows)||rows.some(r=>!Array.isArray(r)))throw new TypeError('rows must be arrays');
  return (bom?'\ufeff':'')+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
}
