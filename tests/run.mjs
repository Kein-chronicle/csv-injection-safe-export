import test from 'node:test';
import assert from 'node:assert/strict';

import {csvCell,toCsv} from '../scripts/csv.mjs';
test('formula prefixes and leading controls are neutralized',()=>{
 for(const x of ['=1+1',' +1','@SUM(A1)','-2','\t=1','\rabc','\u0000=1'])assert.ok(csvCell(x).startsWith('"\''));
 assert.equal(csvCell('plain'),'"plain"'); assert.equal(csvCell(null),'""');
});
test('quotes, delimiters and newlines survive CSV encoding',()=>{
 assert.equal(toCsv([['a,b','say "hi"'],['a\nb',42]],{bom:false}),'"a,b","say ""hi"""\r\n"a\nb","42"');
 assert.throws(()=>toCsv([{}]));assert.throws(()=>csvCell({x:1}));
});

test('invisible characters before a formula starter do not hide it',()=>{
 for(const pre of ['\u007f','\u0085','\u200b','\u2060','\u00ad','\u202e','\ufeff',' ','\u00a0']) assert.equal(csvCell(pre+'=1+1'),'"\''+pre+'=1+1"',JSON.stringify(pre));
 assert.equal(csvCell('plain'),'"plain"');
});
