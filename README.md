stackgo
---------

A browser plugin to automatically redirect Haddock library pages to Stackage pages. 

Why ?
------

I have hit upon too many cases where the Hackage docs were not
generated. So, this is my one hour solution to it.

Limitations/TODO
-------------------

* Right now, for an Hackage API module it redirects to the Stackage
  API module for LTS 6.14. It doesn't go to the exact version as
  requested by you. It will instead always go to the lst version of
  that package.
* For those package which are not yet in Stackage, it will redirect to
  a invalid page.

