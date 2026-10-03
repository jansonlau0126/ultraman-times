#!/usr/bin/env python3
"""Build the single-file game: src/*.{css,html,js} -> index.html"""
import pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
css = (src/'style.css').read_text(encoding='utf-8')
body = (src/'body.html').read_text(encoding='utf-8')
js = (src/'art.js').read_text(encoding='utf-8') + '\n' + (src/'game.js').read_text(encoding='utf-8')
html = f'''<!DOCTYPE html>
<html lang="zh-Hant-HK">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0b1033">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>運算超人</title>
<style>
{css}
</style>
</head>
<body data-screen="home">
{body}
<script>
(function(){{
'use strict';
{js}
}})();
</script>
</body>
</html>
'''
(root/'index.html').write_text(html, encoding='utf-8')
print('built', len(html), 'bytes')
