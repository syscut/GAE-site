## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
  integrity="sha384-xBsHBR6BS/LSlO3cOyY2D/4KkmaHjlNn3NnXUMFFc14HLZD7vwVgS3+6U/WkHAra"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"
  integrity="sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-o2RvzuEpU78s+xoEWs/++kMfb71T2QoVpd5kcyephebSrCF7IBl82kpINu7hXFCB /es/languages/apache.js
sha384-T5Wi3CdvOgNTDa/TQF3guYZxiCaiLFKzgYxX57ZCt1rVax+G6GP9EOlNdg8spAUs /es/languages/apache.min.js
sha384-0OZaeLK1yb5eP3nW4y0JP1fVharSrsuv/1mkI/6/8aRFm9laYIWIMXjCOqu+vRW5 /es/languages/c.js
sha384-G7WtwjMBNGrPly3ZsbPhfnT0v88hG3Ea9fQhrSWfzj7cNAsXsU7EKMQLyLGj7vTH /es/languages/c.min.js
sha384-Wjwd1YEG/PYlkLHTWIx+RlPK6XboMN3bEpveERJ8D8Z4RaNE02Ho19ZFrSRPGi0j /es/languages/cpp.js
sha384-Q4zTNH8WsDVdSZbiZtzWS1HmAUcvMSdTmth9Uqgfjmx7Qzw6B8E3lC9ieUbE/9u4 /es/languages/cpp.min.js
sha384-DA5ii4oN8R2fsamNkHOanSjuN4v7j5RIuheQqnxMQ4cFnfekeuhwu4IdNXiCf+UU /es/languages/css.js
sha384-OBugjfIr093hFCxTRdVfKH8Oe3yiBrS58bhyYYTUQJVobk6SUEjD7pnV8BPwsr8a /es/languages/css.min.js
sha384-/wYGIAWwdVeBvXFBq3HUPpdw6KUhW3wMMXruGXWjhlYT/IruTWojBeoPUbpGXaf5 /es/languages/dockerfile.js
sha384-DQdaFTXRCa9EQdAkBCHnMAhAomUgizSpJPmuCzoaDJMAshvgxlJF5d7J/ysvc6f/ /es/languages/dockerfile.min.js
sha384-TXDDfDMwXF7BNygA/q9QXXEhx93hAWyjoXCe991A0qRCBIkcv+ekdAn/xhvTD4R7 /es/languages/dts.js
sha384-UuvUHqhG03LaKnRfgywIMsS+lcwqusyfSh9FqB3eN4dm5YDwzRNVSDiWmWRMcz3m /es/languages/dts.min.js
sha384-XcoPs3a4/IR69b/Dm+Q+u2pZ1mkg4OLQY3nregS20Zi93M17jhVxokvDNVBKwocg /es/languages/go.js
sha384-27jMAcMfx5pzlW2ntRUz1R22f43tLLOnYyDHss8iJBUi23iVzYrxbwQKY+LPU35B /es/languages/go.min.js
sha384-WFJdA9Hz+G9NQx5vPba/tcGyIibm57UkKVY32wNB/94iT2FmPma5W7gY8p2l6qps /es/languages/java.js
sha384-coaxfgI2lKuDqSxfMlfyPq5WM0THaLGyATZHzaFMrWdIbPcLdduuItTe6AmT/m33 /es/languages/java.min.js
sha384-WCznKe2n87QvV/L1MlXN+S8R6NPUQGU34+AqogMuWGZJswSD6rt3Mgih+xuKlDgm /es/languages/javascript.js
sha384-eGsBtetyKPDKaLiTnxTzhSzTFM6A/yjHBQIj4rAMVaLPKW5tJb8U6XLr/AikCPd+ /es/languages/javascript.min.js
sha384-12GbYFzdyZCSmfBTmO2CR/qE89K5uE1PEuJ3QUwXH0Q9u+uoLNigjH9dG7LAxxiI /es/languages/json.js
sha384-+DT7AtubDhVDciRc6CgjJJRsCt0L8NC3Dh8n9Tj2tZWU8rWxDIj1ViubmUDn8OCY /es/languages/json.min.js
sha384-+5oyk7Ed3OlvEWGj8xracq/6e52BScKUN4kxcreNwB7kfRTVsAMs/aAJM58dzIFN /es/languages/python.js
sha384-ND/UH2UkaeWiej5v/oJspfKDz9BGUaVpoDcz4cof0jaiv/mCigjvy7RQ7e+3S6bg /es/languages/python.min.js
sha384-lRhSX2XDrY27NzrAS1t4YaeRtwjsY41kFBbIEYltkmnsfSE7lbBJMQVds2u/MqTT /es/languages/scss.js
sha384-RDUehV4j9Do6iGkYq9Gjn3aUxh6x+NFER1sHpLUXsNoCFjah8Ysrlad8ukLbIr4J /es/languages/scss.min.js
sha384-dzLjhd9nNJH62idgKI1vZEKHRBtZXSgwWQdPR+emG7tfAN4BW2g+A5Xs2315Uxii /es/languages/shell.js
sha384-RKUoelG22/D7BV/bNpoGLNzdTgWRf/ACQX7y4BGyIzK6E+xUoXtm68WNQW2tSW8X /es/languages/shell.min.js
sha384-rBAFhyrcRcMNbVJ9g4k5y3eQDkjGdgoOb3oTWTbHgwyUgUNv3CK9wLsGy/d+52oa /es/languages/sql.js
sha384-8G3qMPeOeXVKZ0wGzMQHgMVQWixLw3EXFAcU+IFNLRe0WoZB5St3L3ZLTK62Nzns /es/languages/sql.min.js
sha384-CS3qiWid6Sod3yAiQwgPzy2ZerR00u/cwhnMxQrETuI74o006r1p5qj1U9Gdo4uD /es/languages/typescript.js
sha384-HHgazax8ozQ9RDWlJQyaFzaTk/OgTFRVHH+lcaYInkE8wVu5fnpkqkB3KUdzKcvE /es/languages/typescript.min.js
sha384-OFoR8IZ+CFwcY8plx8HSDZNoCwLxc701CwdNGfoIEhSgwAbwhvInaxnEi3HYTt2Q /es/languages/xml.js
sha384-yFd3InBtG6WtAVgIl6iIdFKis8HmMC7GbbronB4lHJq3OLef3U8K9puak6MuVZqx /es/languages/xml.min.js
sha384-hK+QzfKnkrwE7Fgc3q6lpKfnWWKMecpkQObMVOPiwopZiJni16bBGVm37SMGcz6G /languages/apache.js
sha384-bvrESIqIr21pkx86VgiN+Vfq8sRk/6xTxMfbo0PDENLfqYr123El7PUCzqJmir4P /languages/apache.min.js
sha384-VZxKf0mjKYDwZIgrW+InqDfJ0YwYUFEMw/4YmpV1oKtVXFVmVq/Ga1vgq6zKTUqS /languages/c.js
sha384-mWenE7UXKnmYRcJ3mh+Os3iZ43BmFf9x3AZMM6gi/2sT6vxouPWspbTdREwWDO3w /languages/c.min.js
sha384-J4Ge+xXjXgzbK2FP+OyzIGHLfKU/RR0+cH4JJCaczeLETtVIvJdvqfikWlDuQ66e /languages/cpp.js
sha384-LMyrRAiUz6we2SGvYrwDd4TJoJZ+m/5c+4n4E64KVkfWFcZdlrs4Wabr0crMesyy /languages/cpp.min.js
sha384-r9czyL17/ovexTOK33dRiTbHrtaMDzpUXW4iRpetdu1OhhckHXiFzpgZyni2t1PM /languages/css.js
sha384-HpHXnyEqHVbcY+nua3h7/ajfIrakWJxA3fmIZ9X9kbY45N6V+DPfMtfnLBeYEdCx /languages/css.min.js
sha384-BBTUoNxAh4TWINjb22cp1mRwwVdcPyF6zzXZ/1EvQ28ls8EIGhlCKeLav689vLdl /languages/dockerfile.js
sha384-H3wUmCndJNBOuIIzcLSr2zLLZYs8PYuw6qKyENk7THEnYQJvOMDBu42P9XsJSRKw /languages/dockerfile.min.js
sha384-0euRt945mkwssRZQx/MQ80JXWV+utUeI4snhyIhqfW+vaRYj42RVM3nWaYt7gs9L /languages/dts.js
sha384-Ds5adkjVRA50t79I03B3O1Nf2RpYTYQ0m6arqivGOTJMiMffJyF+Jf4CmEil9LP9 /languages/dts.min.js
sha384-lDCjdnxlW/GRZYzy4Zqkj833wJD7Hc2FP927RAtySEdrShMiUSXsWuFy1IC02qxU /languages/go.js
sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI /languages/go.min.js
sha384-pYIeBYeCE96U9EkPcT4uJjNWyrB1BKB41JIadYJbvmGa5KacaoXtSQOUpBfeyWQX /languages/java.js
sha384-uUg+ux8epe42611RSvEkMX2gvEkMdw+l6xG5Z/aQriABp38RLyF9MjDZtlTlMuQY /languages/java.min.js
sha384-vJxw3XlwaqOQr8IlRPVIBO6DMML5W978fR21/GRI5PAF7yYi2WstLYNG1lXk6j9u /languages/javascript.js
sha384-44q2s9jxk8W5N9gAB0yn7UYLi9E2oVw8eHyaTZLkDS3WuZM/AttkAiVj6JoZuGS4 /languages/javascript.min.js
sha384-dq9sY7BcOdU/6YaN+YmFuWFG8MY2WYJG2w3RlDRfaVvjdHchE07Ss7ILfcZ56nUM /languages/json.js
sha384-RbRhXcXx5VHUdUaC5R0oV+XBXA5GhkaVCUzK8xN19K3FmtWSHyGVgulK92XnhBsI /languages/json.min.js
sha384-zdZio5RcGiKQJCpe/1IXujPle3bIY8sbmvCabSU5G5GzWAzZtoRZfg9QAQXCL08q /languages/python.js
sha384-IP4vv4Aoh9Lyg8QyzVkAmn2JGoDCpgVHzVSrD3Z+rVyn7+s4wx4pRjv+go3TEwfj /languages/python.min.js
sha384-fwYddFsITuK2bPhi9RuIzwi4PTULEXgtEJsQzTdx97vOS/GHfrk+aNSLxEHgzQa5 /languages/scss.js
sha384-6u+QpCDqQidb5pcO+yBqy0xLJ30x30VlrFvXm8J84LMwGIw9q3U4u+Z9vFXlhB5x /languages/scss.min.js
sha384-KW3ZDReTAemYUfVHvH1MNQ/v6agCYYdMGdMteP/yVV+NetIJeDMx0ruUMTbr/SD3 /languages/shell.js
sha384-PDEMny3uYpCrSKwqVGLAwqCsc9u+9hYXauxVPqO6RXmlxSNKLoRByEBigU5lahmK /languages/shell.min.js
sha384-Dy7I/j0yJlyliWiNrkNqXfxDrbN65q40s3JColgTYZQ7QJa7lcmK0WUL3i00/T51 /languages/sql.js
sha384-8q00eP+tyV9451aJYD5ML3ftuHKsGnDcezp7EXMEclDg1fZVSoj8O+3VyJTkXmWp /languages/sql.min.js
sha384-yZXtQC/OmWoPykosK7vE1nCvV4E/six6+apjNau4JwBkejkea5nP7VBEJJkGnvoF /languages/typescript.js
sha384-ORwtVEfrCZ0gzGacgmfv1wOtxcPIaVfHKwq8dKQjObRwx3qpKjsSg1ldTu1PEgXd /languages/typescript.min.js
sha384-+PuZYFfVX2UQZU2yKt/FsJUZNUPzZWxW7auXltsaecr1xLvzBYF3c5gYoyOs1++x /languages/xml.js
sha384-jgkY4GMNWfQcLLIoP1vg3FWXflDrRhcSXGBW6ONIWC2SOIv5H1Pa57sXs+aomCuZ /languages/xml.min.js
sha384-nzMGghxq3K0WLtWyYR5rEXPR7wL/P6bd6WIw2eOe80H0qz7wxdR92ZdGVn4z8Z31 /highlight.js
sha384-FB9sLGLa95mqyLQEregreB9Gziq/xqG70Hl1crwF/eFURfrYdIoGzoesswkl5Eid /highlight.min.js
```

