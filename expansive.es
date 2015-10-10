/*
    expansive.es - Configuration for exp-analytics
 */
Expansive.load({
    transforms: {
        name:     'analytics',
        files:    [ '**.html', '**.esp' ],
        mappings: 'html',
        script: `
            let collections = expansive.control.collections
            /*
                Add analytics.js to the default scripts collection
             */
            collections.scripts.push('scripts/analytics.js')

            function post(meta, service) {
                let dist = directories.dist
                let analytics: Path? = dist.files(['scripts/analytics.min.js', 'scripts/analytics.js'], {relative: true})[0]
                if (!analytics) {
                    trace('Warn', 'Cannot find scripts/analytics*')
                } else {
                    for each (file in dist.files(service.files, {directories: false, relative: true, contents: true})) {
                        let path = dist.join(file)
                        let contents = path.readString()
                        if (!contents.contains(analytics.name)) {
                            let url = analytics.relativeTo(file.dirname)
                            let html = '<script src="' + url + '"></script>'
                            if (contents.contains('</body>') || contents.contains('</BODY>')) {
                                contents = contents.replace(/^<\\/body>$/mg, html + '\n</body>')
                            } else {
                                contents += html
                            }
                            path.write(contents)
                        }
                    }
                }
            }
        `
    }
})
