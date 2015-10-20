exp-analytics
===

Expansive plugin for Google Analytics.

Provides the 'analytics' services. The exp-analytics plugin will insert a Google Analytics script into every html page
with a '.html' extension. Additional files to track may be specified via the 'extra' configuration property.

The analytics script is provided via contents/scripts/analytics.js. 

### To install:

    pak install exp-analytics

### To configure in expansive.json:

* code &mdash; Google Analytics ID
* extra &mdash; Extra files to explicitly add the analytics code. Typically used to add analytics to unprocessed files from
    the ./files directory.

```
{
    services: {
        analytics: {
            code: 'Google Analytics ID'
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/)
