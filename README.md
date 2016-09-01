stackgo
---------

A browser plugin to automatically redirect Haddock library pages to Stackage pages. 

Install
--------

[Download Firefox](https://github.com/psibi/stackgo/blob/master/dist/stackgo-1.0-fx+an.xpi?raw=true)
[Download Chrome](https://chrome.google.com/webstore/detail/ojjalokgookadeklnffglgbnlbaiackn)

Why ?
------

I have hit upon too many cases where the Hackage docs were not
generated. So, this is my one hour solution to it.

Limitations/TODO
-------------------

* Right now, for an Hackage API module it redirects to the Stackage
  API module for LTS 6.14. It doesn't go to the exact version as
  requested by you. It will instead always go to the lts version of
  that package.
* For those package which are not yet in Stackage, it will probably
  redirect to a invalid page. (Haven't tested yet.)

