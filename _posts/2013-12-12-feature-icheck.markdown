---
layout: pages/components-page
title:  "Feature: Icheck "
date:   2013-12-02 12:16:05
categories: boiler 
base_url: "../../../../../../"
---


<h1 id="feature_icheck">Feature: ICheck</h1>




For Zepto library, instead of jquery.icheck.js use zepto.icheck.js.

If you need a minified version, use jquery.icheck.min.js or zepto.icheck.min.js.

Make sure jQuery v1.7+ (or Zepto [polyfill, event, data]) is loaded before the iCheck.

Choose a color scheme, there are 10 different styles available:
Black — square.css
Red — red.css
Green — green.css
Blue — blue.css
Aero — aero.css
Grey — grey.css
Orange — orange.css
Yellow — yellow.css
Pink — pink.css
Purple — purple.css
Copy /skins/square/ folder and jquery.icheck.js file to your site.
Insert before </head> in your HTML (replace your-path and color-scheme):
{% highlight html linenos %}
<link href="your-path/square/color-scheme.css" rel="stylesheet">
<script src="your-path/jquery.icheck.js"></script>
{% endhighlight %}
Example for a Red color scheme:
{% highlight html linenos %}
<link href="your-path/square/red.css" rel="stylesheet">
<script src="your-path/jquery.icheck.js"></script>
{% endhighlight %}
Add some checkboxes and radio buttons to your HTML:
{% highlight html linenos %}
<input type="checkbox">
<input type="checkbox" checked>
<input type="radio" name="iCheck">
<input type="radio" name="iCheck" checked>
{% endhighlight %}
Add JavaScript to your HTML to launch iCheck plugin:
{% highlight javascript linenos %}
<script>
$(document).ready(function(){
  $('input').iCheck({
    checkboxClass: 'icheckbox_square',
    radioClass: 'iradio_square',
    increaseArea: '20%' // optional
  });
});
</script>
{% endhighlight %}
For different from black color schemes use this code (example for Red):
{% highlight javascript linenos %}
<script>
$(document).ready(function(){
  $('input').iCheck({
    checkboxClass: 'icheckbox_square-red',
    radioClass: 'iradio_square-red',
    increaseArea: '20%' // optional
  });
});
</script>

{% endhighlight %}
Done.


{% include boil/partials/icheck.html %}

