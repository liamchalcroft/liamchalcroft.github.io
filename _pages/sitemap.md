---
layout: archive
title: "Sitemap"
permalink: /sitemap/
sitemap: false
---

{% include base_path %}

An [XML sitemap]({{ base_path }}/sitemap.xml) is also available.

## Pages

<ul>
  <li><a href="{{ base_path }}/">Home</a></li>
  <li><a href="{{ base_path }}/publications/">Publications</a></li>
  <li><a href="{{ base_path }}/software/">Software</a></li>
  <li><a href="{{ base_path }}/cv/">CV</a></li>
</ul>

## Publications

<ul>
  {% assign pubs = site.publications | sort: 'date' | reverse %}
  {% for post in pubs %}
    <li><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
