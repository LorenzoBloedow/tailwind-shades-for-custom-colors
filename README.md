# About 
This is a [Tailwind](https://tailwindcss.com/) plugin for automatically generating shades for your custom colors defined under `theme.extend.colors` in the `tailwind.config.js` file.

## Usage
1. Install the package:
<pre><code>npm install tailwind-shades-for-custom-colors</code></pre>
 <br>
 <br>
2. Register the plugin on your `tailwind.config.js` file:
 <pre>
 <code>
 module.exports  = {
	content: {
		relative: true,
		files: ['./public/index.html']
	},
	theme: {
		extend: {},
	},
	<b>plugins: [require("shadesforcustomcolors")]</b>
}
 </code>
</pre>
<br>
<br>
 3.  Define your custom colors in <b>hex format</b>:
 <pre>
 <code>
 module.exports  = {
	content: {
		relative: true,
		files: ['./public/index.html']
	},
	theme: {
		extend: {
			<b>colors: {
				avocado: "#8df1ab"
			}</b>
		},
	},
	plugins: [require("shadesforcustomcolors")]
}
 </code>
</pre>
<br>
<br>
4. Enjoy :)
<pre>
<code>
	&lth1 class="text-avocado-100">
		Hello world!
	&lt/h1>
</code>
</pre>
