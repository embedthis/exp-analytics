/*
    expansive.es - Configuration for exp-analytics
 */
Expansive.load({

    services: {
        name:   'analytics',

        /* Google analytics user-id code */
        code:   null,

        /* Extra files to patch with analytics */
        extra:  null

        transforms: {
            mappings: 'html',

            init: function() {
                /*
                    Add analytics.js to the default scripts collection
                    Pages can use removeItems to remove
                 */
                expansive.control.collections.scripts.push('scripts/analytics.js*')
            },

            post: function(transform) {
                let extra = transform.service.extra
                if (extra) {
                    let dist = directories.dist
                    let analytics: Path? = dist.files(['scripts/analytics.min.js', 'scripts/analytics.js'], 
                        {relative: true})[0]

                    if (!analytics) {
                        trace('Warn', 'Cannot find analytics in dist/scripts')
                    } else {
                        for each (file in dist.files(extra, {directories: false, relative: true, contents: true})) {
                            let path = dist.join(file)
                            let contents = path.readString()
                            if (!contents.contains(analytics.name)) {
                                let url = analytics.relativeTo(file.dirname)
                                let html = '<script src="' + url + '"></script>'
                                if (contents.contains('</body>') || contents.contains('</BODY>')) {
                                    contents = contents.replace(/^<\/body>$/mg, html + '\n</body>')
                                } else {
                                    if (contents.contains('<body>') || contents.contains('<BODY>')) {
                                        contents += html
                                    }
                                }
                                path.write(contents)
                            }
                        }
                    }
                }
            }
        }
    }
})
